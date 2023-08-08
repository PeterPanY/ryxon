import { withInstall } from '../utils'
import _Calendar from './Calendar'

export const Calendar = withInstall(_Calendar)
export default Calendar

export type { calendarPcProps } from './Calendar'
export type { CalendarVars, DateCell } from './type'

declare module 'vue' {
  export interface GlobalComponents {
    RCalendar: typeof Calendar
  }
}
