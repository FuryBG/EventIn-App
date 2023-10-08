import { InputWrapper } from './CInput.styled';
import { useFormState, useWatch } from 'react-hook-form';
import { useDebounce } from '../../hooks/useDebounce';

export default function CInput({ inputKey, register, control, type, required, placeholder, isDynamic, watchDebounced }) {
    const { errors } = useFormState({control});
    const watchedValue = useWatch({ name: register.name, control: control });

    let haveError = false;
    
    if(!isDynamic) {
      haveError = errors[register.name] ? true : false;
    }
    else {
      let [fieldName, fieldIndex, fieldValudProperty] = register.name.split('.');
      if(errors[fieldName] && errors[fieldName][fieldIndex]) {
        haveError = true;
      }
    }
    useDebounce(() => {
      if(watchDebounced && watchedValue) {
        watchDebounced({ value:watchedValue, name: register.name, key: inputKey });
      }
    }, 500, [watchedValue]);

  return (
    <>
        <InputWrapper>
        <input  {...register} type={type} className={haveError ? 'error' : ''} placeholder={placeholder}></input>
        {required ? <span className={haveError ? 'error' : ''} >Required*</span> : null}
        </InputWrapper>
    </>
  )
}
