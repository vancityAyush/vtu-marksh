import React from 'react'
import Logo from './Logo'
import PySphere from './PySphere'

export default function LogoName(props) {
  return (
    <div className="flex flex-col items-center space-y-4 md:mx-40 mx-20">
      <Logo className="w-full" />
      <PySphere className="w-full" />
    </div>
  )
}