import React from 'react'
import ThemeSwitch from './ThemeSwitch'

type Props = {}

function Header({}: Props) {
  return (
    <div>
      <div className="m-4 flex h-10 justify-between">
        <div className="flex rounded-xl">FF Trade Transactions</div>
        <div className="">
          <ThemeSwitch />
        </div>
      </div>
    </div>
  )
}

export default Header
