import React, { useRef } from 'react'
import { CMiniMenuStyled } from './CMiniMenu.styled'
import { Menu } from 'primereact/menu';

export default function CMiniMenu({ model }) {
    const menu = useRef(null);
  return (
    <CMiniMenuStyled>
        <span className='dots-menu' onClick={(event) => menu.current.toggle(event)}></span>
        <Menu model={model} popup={true} ref={menu}></Menu>
    </CMiniMenuStyled>
  )
}
