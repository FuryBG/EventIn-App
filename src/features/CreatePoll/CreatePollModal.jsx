import React, { useCallback } from 'react'
import { CreatePollModalStyled } from './CreatePollModal.styled'
import { Dialog } from 'primereact/dialog'
import CButton from '../../shared-components/CButton/CButton';
import CInput from '../../shared-components/CInput/CInput';
import { useFieldArray, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { createPoll } from '../../services/pollService';
import { useToast } from '../../hooks/useToast';

export default function CreatePollModal({ visible, header, onHide }) {
  const toastApi = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ['events'],
    mutationFn: (data) => createPoll(data),
    onSuccess: () => {
      queryClient.invalidateQueries('events');
      onHideModal();
      toastApi({severity: 'success', detail: "Successfully created event!" });
    }
  });

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({ mode: 'onSubmit', defaultValues: {
    title: "",
    options: [{ value: "", type: "select"}]
  } });

  const { fields, remove, append } = useFieldArray({
    name: "options",
    control: control
  });

  const onHideModal = useCallback(() =>  {
    onHide();
    reset();
  });

  function onSubmit(pollData) { 
    pollData.options = pollData.options.filter(o => o.value != '');
    mutate(pollData);
  }

  function onErrors(v) {
    console.log(v);
    let indexesForRemove = Object.keys(v.options);
    if(fields.length > indexesForRemove.length) {
      remove(indexesForRemove);
    }
  }

  function onDeleteField(fieldName) {
    let field = fields.find(f => f.id == fieldName);
    if(fields.length > 1) {
      remove(fields.indexOf(field));
    }
  }

  function watchInputValueDebounced(v) {
    let lastField = fields[fields.length -1];
    if(lastField.id == v.key) {
      append({ value: "", type: "select" });
    }
  };

  return (
    <Dialog visible={visible} onHide={onHideModal} draggable={false} style={{ width: '50vh', height: '500px' }} header={header}>
      <CreatePollModalStyled>
        <form onSubmit={handleSubmit(onSubmit,onErrors)}>
          <div>
            <CInput control={control} register={register('title', { required: true })} required={true} placeholder={'What would you like to ask?'}></CInput>
          </div>
          {fields.map((o, index) => {
            return(
            <div className='options-input-container' key={o.id}>
              <input type='radio' disabled></input>
              <CInput watchDebounced={watchInputValueDebounced} isDynamic={true} inputKey={o.id} control={control} register={register(`options.${index}.value`, { required: index == fields.length - 1 && fields.length > 1 ? false : true })} required={index == fields.length - 1 && fields.length > 1 ? false : true} placeholder={'Add option'}></CInput>
              <span className='delete-icon' onClick={() => onDeleteField(o.id)}></span>
            </div>
            )
          })}
          <div className='footer-buttons'>
            <CButton disabled={isLoading ? true : false} isLoading={isLoading} type={'submit'} text={'Launch'}></CButton>
          </div>
        </form>
      </CreatePollModalStyled>
    </Dialog>
  )
}

