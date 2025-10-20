import { google } from 'googleapis';

export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

    try {
        const body = req.body && Object.keys(req.body).length ? req.body : await getJsonBody(req);
        const { name, service, date, time, phone, barber, barberName } = body;

        const DURATIONS = { corte: 45, barba: 30, 'corte-barba': 75, coloracao: 60 };
        const duration = DURATIONS[service] || 60;

        const start = new Date(`${date}T${time}:00`);
        const end = new Date(start.getTime() + duration * 60000);

        if (!process.env.SERVICE_ACCOUNT) {
            return res.status(500).json({ success: false, error: 'SERVICE_ACCOUNT not configured' });
        }
        const serviceAccount = typeof process.env.SERVICE_ACCOUNT === 'string'
            ? JSON.parse(process.env.SERVICE_ACCOUNT)
            : process.env.SERVICE_ACCOUNT;

        const auth = new google.auth.GoogleAuth({
            credentials: serviceAccount,
            scopes: ['https://www.googleapis.com/auth/calendar'],
        });
        const client = await auth.getClient();
        const calendar = google.calendar({ version: 'v3', auth: client });

        const calendarId = process.env.CALENDAR_ID;
        if (!calendarId) return res.status(500).json({ success: false, error: 'CALENDAR_ID not configured' });

        const windowStart = new Date(start.getTime() - 60 * 60 * 1000).toISOString();
        const windowEnd = new Date(end.getTime() + 60 * 60 * 1000).toISOString();

        const listRes = await calendar.events.list({
            calendarId,
            timeMin: windowStart,
            timeMax: windowEnd,
            singleEvents: true,
            orderBy: 'startTime',
        });

        const items = listRes.data.items || [];
        const barberIdStr = String(barber || barberName || '');
        const barberNameFinal = String(barberName || barber || '');

        const conflict = items.some(ev => {
            const evStart = new Date(ev.start?.dateTime || ev.start?.date || 0);
            const evEnd = new Date(ev.end?.dateTime || ev.end?.date || 0);
            const overlaps = evStart < end && evEnd > start;
            if (!overlaps) return false;
            const evBarberId = ev?.extendedProperties?.private?.barberId;
            if (evBarberId && String(evBarberId) === barberIdStr) return true;
            if (barberNameFinal && ((ev.summary || '').includes(barberNameFinal) || (ev.description || '').includes(barberNameFinal))) return true;
            return false;
        });

        if (conflict) return res.status(409).json({ success: false, error: 'Horário já reservado para este barbeiro' });

        const event = {
            summary: `${barberNameFinal} - ${service}`,
            description: `Serviço: ${service}\nCliente: ${name}\nContacto: ${phone || '-'}\nBarbeiro: ${barberNameFinal}`,
            start: { dateTime: start.toISOString(), timeZone: 'Europe/Lisbon' },
            end: { dateTime: end.toISOString(), timeZone: 'Europe/Lisbon' },
            extendedProperties: { private: { barberId: barberIdStr, barberName: barberNameFinal } }
        };

        const insertRes = await calendar.events.insert({ calendarId, resource: event });
        return res.status(200).json({ success: true, event: insertRes.data });

    } catch (err) {
        console.error('API /agendar error:', err);
        return res.status(500).json({ success: false, error: err.message || String(err) });
    }
}

async function getJsonBody(req) {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', chunk => data += chunk);
        req.on('end', () => {
            try { resolve(JSON.parse(data || '{}')); } catch (e) { reject(e); }
        });
        req.on('error', reject);
    });
}