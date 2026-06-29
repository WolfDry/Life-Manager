import { create } from 'zustand'
import { CalendarEvent } from '../types/calendar.types'

type CalendarState = {
  /** Événements actuellement affichés dans le calendrier. */
  events: CalendarEvent[]
  /** Clé de remontage forçant FullCalendar à se redessiner après un rechargement complet. */
  calendarKey: number

  /** Remplace l'ensemble des événements (ex : résultat d'une planification). */
  setEvents: (events: CalendarEvent[]) => void
  /** Ajoute des événements à ceux déjà présents (ex : futurs repas / séances de sport). */
  addEvents: (events: CalendarEvent[]) => void
  /** Met à jour un événement existant (ex : déplacement / redimensionnement dans FullCalendar). */
  updateEvent: (id: string, patch: Partial<CalendarEvent>) => void
  /** Supprime un événement par son identifiant. */
  removeEvent: (id: string) => void
  /** Vide le calendrier. */
  clearEvents: () => void
}

export const useCalendarStore = create<CalendarState>((set) => ({
  events: [],
  calendarKey: 0,

  setEvents: (events) =>
    set((state) => ({ events, calendarKey: state.calendarKey + 1 })),

  addEvents: (newEvents) =>
    set((state) => ({
      events: [...state.events, ...newEvents],
      calendarKey: state.calendarKey + 1,
    })),

  updateEvent: (id, patch) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...patch } : e)),
    })),

  removeEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  clearEvents: () =>
    set((state) => ({ events: [], calendarKey: state.calendarKey + 1 })),
}))
