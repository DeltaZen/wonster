import { getCurrentSolution } from '../../lib/words'
import { Cell } from './Cell'

export const EmptyRow = () => {
  const solution = getCurrentSolution().solution
  const emptyCells = Array.from(Array(solution.length))

  return (
    <div className="mb-1 flex justify-center">
      {emptyCells.map((_, i) => (
        <Cell key={i} />
      ))}
    </div>
  )
}
