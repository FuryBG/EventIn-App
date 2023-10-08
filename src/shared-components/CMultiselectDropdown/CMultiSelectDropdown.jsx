import React from 'react'
import { useController } from 'react-hook-form';
import { StyledCMultiSelectDropdown } from './CMultiSelectDropdown.styled';
import Select from 'react-select';

export default function CMultiSelectDropdown({ control, required, defaultValue, options, controlName }) {
  const { field: { ref, name, onBlur, onChange, value }, fieldState } = useController({ name: controlName, defaultValue: defaultValue ? defaultValue : [], control, rules: { required: required }});
  return (

    <StyledCMultiSelectDropdown haveError={fieldState.error ? true : false}>
      <Select className='error' classNamePrefix={"rs"} ref={ref} onChange={onChange} name={name} onBlur={onBlur} value={value} isMulti={true} options={options} closeMenuOnSelect={false}></Select>
      {required ? <span className={fieldState.error ? 'error' : ''}>Required*</span> : null}
    </StyledCMultiSelectDropdown>
  )
}
