import classnames from 'classnames'

import { REVEAL_TIME_MS } from '../../constants/settings'
import { CharStatus } from '../../lib/statuses'

type Props = {
  value?: string
  status?: CharStatus
  isRevealing?: boolean
  isCompleted?: boolean
  position?: number
}

export const Cell = ({
  value,
  status,
  isRevealing,
  isCompleted,
  position = 0,
}: Props) => {
  const isFilled = value && !isCompleted
  const shouldReveal = isRevealing && isCompleted
  const animationDelay = `${position * REVEAL_TIME_MS}ms`

  const classes = classnames(
    'xxshort:w-9 xxshort:h-9 xshort:w-10 xshort:h-10 short:w-11 short:h-11 short:text-2xl w-12 h-12 border-solid border-2 flex items-center justify-center mx-0.5 text-3xl font-bold rounded dark:text-white',
    {
      'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-600':
        !status,
      'border-black dark:border-slate-100': value && !status,
      'absent shadowed bg-slate-700 text-white border-slate-700':
        status === 'absent',
      'correct shadowed bg-correct text-white border-correct':
        status === 'correct',
      'present shadowed bg-present text-white border-present':
        status === 'present',
      'cell-fill-animation': isFilled,
      'cell-reveal': shouldReveal,
    }
  )

  return (
    <div className={classes} style={{ animationDelay }}>
      <div className="letter-container" style={{ animationDelay }}>
        {value}
      </div>
    </div>
  )
}
