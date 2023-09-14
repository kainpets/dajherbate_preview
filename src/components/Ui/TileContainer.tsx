import type { NextPage } from 'next'
import type { ScriptProps } from 'next/script'
import React from 'react'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './dropdown-menu'

// this will eventually be fetched from db
const packageItems = [
  "Buty sportowe",
  "Półbuty",
  "Buty zimowe",
  "Klapki",
]

const TileContainer: NextPage<ScriptProps> = (props) => {
  return (
    <div className={`${props.className} bg-slate-300 p-4 flex flex-col items-center border-[1px] border-sky-700 border-opacity-50 rounded shadow-md hover:shadow-xl`}>
      <DropdownMenu>
        <DropdownMenuTrigger>{props.children}</DropdownMenuTrigger>
        <DropdownMenuContent className='bg-slate-400 '>
          {packageItems.map((item, index) => (
            <DropdownMenuItem key={index} className='text-xl hover:bg-slate-500 rounded'>{item}</DropdownMenuItem>))}
        </DropdownMenuContent>
      </DropdownMenu>

    </div >
  )
}

export default TileContainer