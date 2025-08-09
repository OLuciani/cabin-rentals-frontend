export interface CalendarEvent {
  title: string;
  start: string | Date;
  end: string | Date;
  display?: "background" | "auto" | "list-item";
  color?: string;
}