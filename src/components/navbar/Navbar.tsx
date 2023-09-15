import {
  CalendarIcon,
  ChartBarIcon,
  CogIcon,
  InformationCircleIcon,
} from '@heroicons/react/outline'

import { ENABLE_ARCHIVED_GAMES } from '../../constants/settings'
import { GAME_TITLE } from '../../constants/strings'
import { WORDLISTS } from '../../constants/wordlist'
import { ChangeEvent, useRef } from 'react'

type Props = {
  setIsInfoModalOpen: (value: boolean) => void
  setIsStatsModalOpen: (value: boolean) => void
  setIsDatePickerModalOpen: (value: boolean) => void
  setIsSettingsModalOpen: (value: boolean) => void
}

export const Navbar = ({
  setIsInfoModalOpen,
  setIsStatsModalOpen,
  setIsDatePickerModalOpen,
  setIsSettingsModalOpen,
}: Props) => {
  let selected_lang: keyof typeof WORDLISTS = localStorage.getItem("selected_lang") as keyof typeof WORDLISTS || "en"
  if (!Object.keys(WORDLISTS).includes(selected_lang)) {
    selected_lang = "en"
  }
  const selector = useRef<HTMLSelectElement | null>(null)
  const onSelectLang = (ev: ChangeEvent) => {
    if (selector.current?.value) {
      localStorage.setItem("selected_lang", selector.current.value)
      window.location.reload()
    }
  }

  return (
    <div className="navbar">
      <div className="navbar-content px-5 short:h-auto">
        <div className="flex">
          <InformationCircleIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsInfoModalOpen(true)}
          />
          {ENABLE_ARCHIVED_GAMES && (
            <CalendarIcon
              className="ml-3 h-6 w-6 cursor-pointer dark:stroke-white"
              onClick={() => setIsDatePickerModalOpen(true)}
            />
          )}
          <select className="language-select h-6 w-12 ml-3 cursor-pointer dark:text-white font-bold" onChange={onSelectLang} ref={selector}>
            {Object.keys(WORDLISTS).map((code) => {
              return <option value={code} selected={selected_lang === code}>{WORDLISTS[code as keyof typeof WORDLISTS]?.label}</option>
            })}
          </select>
        </div>
        <p className="text-xl font-bold dark:text-white">{GAME_TITLE}</p>
        <div className="right-icons">
          <ChartBarIcon
            className="mr-3 h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsStatsModalOpen(true)}
          />
          <CogIcon
            className="h-6 w-6 cursor-pointer dark:stroke-white"
            onClick={() => setIsSettingsModalOpen(true)}
          />
        </div>
      </div>
      <hr></hr>
    </div>
  )
}
