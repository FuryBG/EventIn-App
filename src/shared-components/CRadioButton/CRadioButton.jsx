import React from 'react'
import { CRadioButtonStyled } from './CRadioButton.styled'
import { useFormState } from 'react-hook-form';

export default function CRadioButton({ value, checked, register, control, forValue, required }) {
    const { errors } = useFormState({control});
  return (
    <CRadioButtonStyled>
      <input className={errors[register.name] ? 'error' : null} type='radio' id={forValue} {...register} required={required} value={value} defaultChecked={checked}></input>
      <label htmlFor={forValue}></label>
    </CRadioButtonStyled>
  )
}
