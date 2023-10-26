import React from 'react'
import { CButtonStyled } from './CButton.styled'
import { ProgressSpinner } from 'primereact/progressspinner'

export default function CButton({ type, disabled, text, onClick, isLoading }) {
  return (
    <CButtonStyled className='primary' disabled={disabled} type={type} onClick={onClick}>
      {isLoading 
      ?
      <ProgressSpinner style={{ height: '0.7rem', width: '0rem', padding: "0 1rem" }} strokeWidth='6'></ProgressSpinner>
      :
      text
      }
    </CButtonStyled>
  )
}
