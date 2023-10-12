import React from 'react'
import { GlobalLoaderStyled } from './GlobalLoader.styled'
import { ProgressSpinner } from 'primereact/progressspinner'

export default function GlobalLoader() {
  return (
    <GlobalLoaderStyled>
        <div>
            <ProgressSpinner strokeWidth='6'></ProgressSpinner>
        </div>
    </GlobalLoaderStyled>
  )
}
