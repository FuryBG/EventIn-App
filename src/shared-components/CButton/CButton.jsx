import React from 'react'
import { CButtonStyled } from './CButton.styled'

export default function CButton({ type, style, disabled, text, onClick }) {
  return (
    <CButtonStyled className='primary' disabled={disabled} type={type} onClick={onClick}>{text}</CButtonStyled>
  )
}
