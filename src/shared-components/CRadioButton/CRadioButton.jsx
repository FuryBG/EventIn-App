import React from 'react'
import { CRadioButtonStyled } from './CRadioButton.styled'
import { useFormState } from 'react-hook-form';

export default function CRadioButton({ value, register, control, forValue, required }) {
    const { errors } = useFormState({control});
  return (
    <CRadioButtonStyled>
      <input type='radio' id={forValue} {...register} required={required} value={value}></input>
      <label htmlFor={forValue}></label>
    </CRadioButtonStyled>
  )
}
