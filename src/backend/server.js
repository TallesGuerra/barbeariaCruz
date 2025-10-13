import express from 'express';
import { google } from 'googleapis';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
app.use(express.json());

// Caminho para o arquivo JSON da conta de serviço
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SERVICE_ACCOUNT_FILE = path.join(__dirname, 'service-account.json');
const calendarId = 'barbearia2830@gmail.com';

const auth = new google.auth.GoogleAuth({
    keyFile: SERVICE_ACCOUNT_FILE,
    scopes: ['https://www.googleapis.com/auth/calendar'],
});

app.post('/agendar', async (req, res) => {
    try {
        const { name, service, date, time } = req.body;
        const client = await auth.getClient();
        const calendar = google.calendar({ version: 'v3', auth: client });

        const event = {
            summary: `${service} - ${name}`,
            start: { dateTime: `${date}T${time}:00`, timeZone: 'Europe/Lisbon' },
            end: { dateTime: `${date}T${time}:00`, timeZone: 'Europe/Lisbon' }, // ajuste a duração conforme necessário
        };

        await calendar.events.insert({
            calendarId,
            resource: event,
        });

        res.json({ success: true });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
});