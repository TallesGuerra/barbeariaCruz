import { GOOGLE_CALENDAR_CONFIG, DateUtils, ADMIN_SETTINGS } from '../config/calendarConfig'

export class GoogleCalendarService {
  constructor() {
    this.apiKey = GOOGLE_CALENDAR_CONFIG.API_KEY
    this.baseUrl = 'https://www.googleapis.com/calendar/v3'
  }


  async getBarberEvents(barberId, date) {
    try {
      const barber = GOOGLE_CALENDAR_CONFIG.BARBERS[barberId]
      if (!barber) return []
      const startDate = new Date(date); startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(date); endDate.setHours(23, 59, 59, 999)
      const url = `${this.baseUrl}/calendars/${encodeURIComponent(barber.calendarId)}/events?timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}&singleEvents=true&orderBy=startTime&key=${this.apiKey}`
      const res = await fetch(url)
      if (!res.ok) return []
      const data = await res.json();
      return data.items || []
    } catch { return [] }
  }

  async checkAvailability(barberId, date, time, serviceDuration = 45) {
    const events = await this.getBarberEvents(barberId, date)
    const requestedStart = new Date(`${date}T${time}`)
    const requestedEnd = new Date(requestedStart.getTime() + serviceDuration * 60000)
    for (const event of events) {
      const eventStart = new Date(event.start.dateTime || event.start.date)
      const eventEnd = new Date(event.end.dateTime || event.end.date)
      if (requestedStart < eventEnd && requestedEnd > eventStart) return false
    }
    return true
  }

  async getAvailableSlots(barberId, date) {
    const daySlots = DateUtils.generateTimeSlots(new Date(date), barberId)
    const available = []
    const barber = GOOGLE_CALENDAR_CONFIG.BARBERS[barberId]
    if (!barber) return []

    // Apply quotas
    const override = ADMIN_SETTINGS.quotasOverride?.[barberId]
    const quotas = { ...barber.quotas, ...override }
    const events = await this.getBarberEvents(barberId, date)
    const dayCount = events.length
    if (quotas?.maxPerDay && dayCount >= quotas.maxPerDay) return []

    for (const slot of daySlots) {
      const ok = await this.checkAvailability(barberId, date, slot)
      if (ok) available.push(slot)
    }
    return available
  }

  async getBarberEvents(barberId, date) {
    try {
      const barber = GOOGLE_CALENDAR_CONFIG.BARBERS[barberId]
      if (!barber) return []
      const startDate = new Date(date); startDate.setHours(0, 0, 0, 0)
      const endDate = new Date(date); endDate.setHours(23, 59, 59, 999)
      const url = `${this.baseUrl}/calendars/${encodeURIComponent(barber.calendarId)}/events?timeMin=${startDate.toISOString()}&timeMax=${endDate.toISOString()}&singleEvents=true&orderBy=startTime&key=${this.apiKey}`
      const res = await fetch(url)
      if (!res.ok) return []
      const data = await res.json();
      const items = data.items || []


      const sameCalendarCount = Object.values(GOOGLE_CALENDAR_CONFIG.BARBERS)
        .filter(b => b.calendarId === barber.calendarId).length

      if (sameCalendarCount > 1) {

        return items.filter(ev => {
          const evBarberId = ev?.extendedProperties?.private?.barberId
          if (evBarberId) return evBarberId === String(barberId)

          if (ev.attendees && Array.isArray(ev.attendees)) {
            return ev.attendees.some(a => a.email === barber.email)
          }

          return false
        })
      }

      return items
    } catch { return [] }
  }

  async countWeekEvents(barberId, date) {
    const d = new Date(date)
    const day = d.getDay()
    const diffToMonday = (day + 6) % 7
    const monday = new Date(d); monday.setDate(d.getDate() - diffToMonday); monday.setHours(0, 0, 0, 0)
    const sunday = new Date(monday); sunday.setDate(monday.getDate() + 6); sunday.setHours(23, 59, 59, 999)
    const all = []
    for (let cur = new Date(monday); cur <= sunday; cur.setDate(cur.getDate() + 1)) {
      const items = await this.getBarberEvents(barberId, cur.toISOString().slice(0, 10))
      all.push(...items)
    }
    return all.length
  }

  async canBookOnWeek(barberId, date) {
    const barber = GOOGLE_CALENDAR_CONFIG.BARBERS[barberId]
    if (!barber) return false
    const override = ADMIN_SETTINGS.quotasOverride?.[barberId]
    const quotas = { ...barber.quotas, ...override }
    if (!quotas?.maxPerWeek) return true
    const count = await this.countWeekEvents(barberId, date)
    return count < quotas.maxPerWeek
  }

  async createBooking({ name, phone, service, date, time, barber }) {
    try {
      // obter barberName/barberEmail do config para enviar ao backend
      const barberObj = GOOGLE_CALENDAR_CONFIG.BARBERS[barber] || {};
      const barberName = barberObj.name || '';
      const barberEmail = barberObj.email || '';

      const res = await fetch('/api/agendar', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          phone,
          service,
          date,
          time,
          barber,
          barberName,    // agora enviamos o nome do barbeiro
          barberEmail    // e o email (opcional) para attendees/filtros
        })
      });
      const data = await res.json();
      if (!res.ok) {
        return { success: false, error: data.error || `HTTP ${res.status}` };
      }
      return { success: true, event: data.event || data };
    } catch (err) {
      return { success: false, error: err.message };
    }
  }
}




export async function agendarServico({ name, service, date, time, phone, barber }) {
  try {
    const response = await fetch('/api/agendar', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, service, date, time, phone, barber })
    });
    const data = await response.json();
    if (data.success) {
      alert('Agendamento realizado com sucesso!');
    } else {
      alert('Erro ao agendar: ' + (data.error || 'Erro desconhecido'));
    }
    return data;
  } catch (err) {
    alert('Erro de conexão com o servidor!');
    return { success: false, error: err.message };
  }
}



export const googleCalendarService = new GoogleCalendarService()