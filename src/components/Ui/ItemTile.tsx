import type { NextPage } from 'next'
import type { ScriptProps } from 'next/script'
import React from 'react'

const ItemTile: NextPage<ScriptProps> = (props) => {
  return (
    <div className={`${props.className} text-lg `}>
      {props.children}
    </div>
  )
}

export default ItemTile