// ...existing code...
import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';
import cors from 'cors';
import fs from 'fs';

const app = express();

app.use(cors());
app.use(express.json());

// Caminho para o arquivo JSON da conta de serviço
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'service-account.json');
const calendarId = 'barbearia2830@gmail.com';

// Carrega o JSON da conta de serviço e passa como credentials para evitar aviso de deprecated
const serviceAccount = JSON.parse(fs.readFileSync(SERVICE_ACCOUNT_FILE, 'utf8'));

const auth = new google.auth.GoogleAuth({
    credentials: serviceAccount,
    scopes: ['https://www.googleapis.com/auth/calendar'],
});
// ...existing code...

app.post('/agendar', async (req, res) => {
    try {
        const { name, service, date, time, phone, barber, barberName, barberEmail } = req.body;
        const DURATIONS = { corte: 45, barba: 30, 'corte-barba': 75, coloracao: 60 };
        const duration = DURATIONS[service] || 60;

        const barberIdStr = String(barber || barberName || '');
        const barberNameFinal = String(barberName || barber || '');

        const start = new Date(`${date}T${time}:00`);
        const end = new Date(start.getTime() + duration * 60000);

        const client = await auth.getClient();
        const calendar = google.calendar({ version: 'v3', auth: client });

        // consulta uma janela um pouco maior para garantir pegar eventos que se sobrepõem
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
        // detecta sobreposição e mesmo barbeiro
        const conflict = items.some(ev => {
            const evStart = new Date(ev.start?.dateTime || ev.start?.date || 0);
            const evEnd = new Date(ev.end?.dateTime || ev.end?.date || 0);
            const overlaps = evStart < end && evEnd > start;
            if (!overlaps) return false;

            const evBarberId = ev?.extendedProperties?.private?.barberId;
            if (evBarberId && String(evBarberId) === barberIdStr) return true;

            // fallback: se o summary/description contém o nome do barbeiro
            if (barberNameFinal && ((ev.summary || '').includes(barberNameFinal) || (ev.description || '').includes(barberNameFinal))) return true;

            return false;
        });

        if (conflict) {
            return res.status(409).json({ success: false, error: 'Horário já reservado para este barbeiro' });
        }

        const event = {
            summary: `${barberNameFinal} - ${service}`,
            description: `Serviço: ${service}\nCliente: ${name}\nContacto: ${phone || '-'}\nBarbeiro: ${barberNameFinal}`,
            start: { dateTime: start.toISOString(), timeZone: 'Europe/Lisbon' },
            end: { dateTime: end.toISOString(), timeZone: 'Europe/Lisbon' },
            extendedProperties: {
                private: { barberId: barberIdStr, barberName: barberNameFinal }
            }
            // NOTA: não enviamos attendees para evitar erro "Service accounts cannot invite attendees..."
        };

        const insertRes = await calendar.events.insert({
            calendarId,
            resource: event
        });

        res.json({ success: true, event: insertRes.data });
    } catch (error) {
        console.error('Erro no endpoint /agendar:', error);
        res.status(500).json({ success: false, error: error.message || String(error) });
    }
});

// coloca o listen fora das rotas (apenas uma vez)
app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});
// ...existing code...