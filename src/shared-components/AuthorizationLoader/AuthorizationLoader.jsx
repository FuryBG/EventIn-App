import React from 'react'
import { AuthorizationLoaderStyled } from './AuthorizationLoader.styled'
import { ProgressSpinner } from 'primereact/progressspinner'

export default function AuthorizationLoader() {
  return (
    <AuthorizationLoaderStyled>
        <div>
            <ProgressSpinner strokeWidth='6'></ProgressSpinner>
            <h1>Authorize...</h1>
        </div>
    </AuthorizationLoaderStyled>
  )
}
