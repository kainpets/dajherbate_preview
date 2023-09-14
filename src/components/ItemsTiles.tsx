import React from 'react'
import ItemTile from './Ui/ItemTile'
import { Footprints, Wind, Backpack, PersonStanding, Glasses, MoreHorizontal, Shirt } from 'lucide-react'
import TileContainer from './Ui/TileContainer'
import { Button } from './Ui/button'


const ItemsTiles = () => {
  const iconsSize = 120;
  const strokeWidth = 0.75;

  return (
    <div className='flex flex-col items-center gap-4'>
      {/* // TODO: add a basket for a preview of to-be-added package items */}
      {/* // TODO: fetch package items from db for each ItemTile  */}
      <div className="grid grid-cols-3 gap-4">
        <TileContainer className='flex flex-col items-center'>
          <Footprints size={iconsSize} strokeWidth={strokeWidth} />
          <ItemTile>Obuwie</ItemTile>
        </TileContainer>
        <TileContainer>
          <Shirt size={iconsSize} strokeWidth={strokeWidth} />
          <ItemTile>Odzież</ItemTile>
        </TileContainer>
        <TileContainer>
          <PersonStanding size={iconsSize} strokeWidth={strokeWidth} />
          <ItemTile>Bielizna</ItemTile>
        </TileContainer>
        <TileContainer>
          <Wind size={iconsSize} strokeWidth={strokeWidth} />
          <ItemTile>Higiena</ItemTile>
        </TileContainer>
        <TileContainer>
          <Glasses size={iconsSize} strokeWidth={strokeWidth} />
          <ItemTile>Dodatki</ItemTile>
        </TileContainer>
        <TileContainer>
          <Backpack size={iconsSize} strokeWidth={strokeWidth} />
          <ItemTile>Sprzęt</ItemTile>
        </TileContainer>
        <TileContainer>
          <MoreHorizontal size={iconsSize} strokeWidth={strokeWidth} />
          <ItemTile>Pozostałe</ItemTile>
        </TileContainer>
      </div>
      <Button>Dodaj Zapis</Button>
    </div>
  )
}

export default ItemsTiles