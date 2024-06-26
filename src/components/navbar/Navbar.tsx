import {
  ChartBarIcon,
  InformationCircleIcon,
} from '@heroicons/react/24/outline'

import { GAME_TITLE } from '../../constants/strings'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
}

export const Navbar = ({ setIsInfoModalOpen, setIsStatsModalOpen }: Props) => {
  return (
    <div className="navbar">
      <div className="navbar-content px-5 xshort:h-auto">
        <div className="flex">
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
        </div>
        <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
          <ChartBarIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
