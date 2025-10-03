export const GOOGLE_CALENDAR_CONFIG = {
  CALENDAR_ID: 'barbeariacruz@gmail.com',
  API_KEY: import.meta.env.VITE_GOOGLE_API_KEY || 'SUA_API_KEY_AQUI',
  BARBERS: {
    '1': {
      name: 'Rogério',
      email: 'rogerio@barbeariacruz.com',
      calendarId: 'rogerio@barbeariacruz.com',
      photoUrl: '/src/assets/rogerioBarbeiro.jpg',
      quotas: { maxPerDay: 12, maxPerWeek: 50 },
      workingHours: {
        monday: { start: '09:00', end: '19:00' },
        tuesday: { start: '09:00', end: '19:00' },
        wednesday: { start: '09:00', end: '19:00' },
        thursday: { start: '09:00', end: '19:00' },
        friday: { start: '09:00', end: '19:00' },
        saturday: { start: '08:00', end: '18:00' },
        sunday: { start: null, end: null }
      }
    },
    '2': {
      name: 'Thiago Loureiro',
      email: 'thiago.loureiro@barbeariacruz.com',
      calendarId: 'thiago.loureiro@barbeariacruz.com',
      photoUrl: '/src/assets/loureiroBarbeiro.png',
      quotas: { maxPerDay: 12, maxPerWeek: 50 },
      workingHours: {
        monday: { start: '09:00', end: '19:00' },
        tuesday: { start: '09:00', end: '19:00' },
        wednesday: { start: '09:00', end: '19:00' },
        thursday: { start: '09:00', end: '19:00' },
        friday: { start: '09:00', end: '19:00' },
        saturday: { start: '08:00', end: '18:00' },
        sunday: { start: null, end: null }
      }
    },
    '3': {
      name: 'Thiago',
      email: 'thiago@barbeariacruz.com',
      calendarId: 'thiago@barbeariacruz.com',
      photoUrl: '/src/assets/thiagoBarbeiro.jpg',
      quotas: { maxPerDay: 12, maxPerWeek: 50 },
      workingHours: {
        monday: { start: '09:00', end: '19:00' },
        tuesday: { start: '09:00', end: '19:00' },
        wednesday: { start: '09:00', end: '19:00' },
        thursday: { start: '09:00', end: '19:00' },
        friday: { start: '09:00', end: '19:00' },
        saturday: { start: '08:00', end: '18:00' },
        sunday: { start: null, end: null }
      }
    },
    '4': {
      name: 'Gustavo',
      email: 'gustavo@barbeariacruz.com',
      calendarId: 'gustavo@barbeariacruz.com',
      photoUrl: '/src/assets/gustavoBarbeiro.png',
      quotas: { maxPerDay: 10, maxPerWeek: 40 },
      workingHours: {
        monday: { start: '09:00', end: '19:00' },
        tuesday: { start: '09:00', end: '19:00' },
        wednesday: { start: '09:00', end: '19:00' },
        thursday: { start: '09:00', end: '19:00' },
        friday: { start: '09:00', end: '19:00' },
        saturday: { start: '08:00', end: '18:00' },
        sunday: { start: null, end: null }
      }
    },
    '5': {
      name: 'Isac',
      email: 'isac@barbeariacruz.com',
      calendarId: 'isac@barbeariacruz.com',
      photoUrl: '/src/assets/isacBarbeiro.png',
      quotas: { maxPerDay: 8, maxPerWeek: 35 },
      workingHours: {
        monday: { start: '09:00', end: '19:00' },
        tuesday: { start: '09:00', end: '19:00' },
        wednesday: { start: '09:00', end: '19:00' },
        thursday: { start: '09:00', end: '19:00' },
        friday: { start: '09:00', end: '19:00' },
        saturday: { start: '08:00', end: '18:00' },
        sunday: { start: null, end: null }
      }
    }
  },
  SERVICES: {
    corte: { name: 'Corte ', price: 35.0, duration: 45 },
    barba: { name: 'Barba', price: 25.0, duration: 30 },
    'corte-barba': { name: 'Corte + Barba', price: 50.0, duration: 75 },
    coloracao: { name: 'Coloração', price: 40.0, duration: 60 }
  },
  TIME_SLOTS: { interval: 30, buffer: 15 }
}

// Admin can override quotas here at runtime (could be persisted via API in futuro)
export const ADMIN_SETTINGS = {
  quotasOverride: {
    // example: joao: { maxPerDay: 10, maxPerWeek: 45 }
  }
}

export const DateUtils = {
  parseDate(dateString) { return new Date(dateString + 'T00:00:00') },
  formatDate(date) { return date.toLocaleDateString('pt-BR', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }) },
  formatTime(time) { return time },
  isWorkingDay(date) { const d = date.getDay(); return d >= 1 && d <= 6 },
  getDayName(date) { return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()] },
  // Safe ISO (YYYY-MM-DD) without timezone shift
  toISODate(date) {
    const y = date.getFullYear()
    const m = String(date.getMonth() + 1).padStart(2, '0')
    const d = String(date.getDate()).padStart(2, '0')
    return `${y}-${m}-${d}`
  },
  generateTimeSlots(date, barberId) {
    const dayName = this.getDayName(date)
    const barber = GOOGLE_CALENDAR_CONFIG.BARBERS[barberId]
    if (!barber || !barber.workingHours[dayName] || !barber.workingHours[dayName].start) return []
    const { start, end } = barber.workingHours[dayName]
    const slots = []
    const interval = GOOGLE_CALENDAR_CONFIG.TIME_SLOTS.interval
    let currentTime = new Date(`2000-01-01T${start}`)
    const endTime = new Date(`2000-01-01T${end}`)
    while (currentTime < endTime) {
      slots.push(currentTime.toTimeString().slice(0, 5))
      currentTime.setMinutes(currentTime.getMinutes() + interval)
    }
    return slots
  }
}


