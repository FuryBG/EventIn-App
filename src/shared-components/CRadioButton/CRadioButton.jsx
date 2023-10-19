import React from 'react'
import { CRadioButtonStyled } from './CRadioButton.styled'
import { RadioButton } from 'primereact/radiobutton'
import { useFormState } from 'react-hook-form';

export default function CRadioButton({ value, register, control, required }) {
    const { errors } = useFormState({control});
    console.log(register);
  return (
    <CRadioButtonStyled>
        <RadioButton {...register} required={required} value={value}></RadioButton>
    </CRadioButtonStyled>
  )
}
