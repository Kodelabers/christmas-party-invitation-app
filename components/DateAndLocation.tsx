import { EVENT_ADDRESS_TEXT, EVENT_DATE_TEXT } from '@/lib/constants'

const DateAndLocation = () => {
  return (
    <div className="mt-4 mb-2">
            <p className="text-sm text-brand-muted">Date & time</p>
            <p className="text-lg text-brand-text font-semibold">{EVENT_DATE_TEXT}</p>
            <p className="text-sm text-brand-muted mt-4">Address</p>
            <p className="text-lg text-brand-text font-semibold">{EVENT_ADDRESS_TEXT}</p>
          </div>
  )
}
export default DateAndLocation