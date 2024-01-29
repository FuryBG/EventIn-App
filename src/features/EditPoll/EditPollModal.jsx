import { Dialog } from 'primereact/dialog'
import React from 'react'
import { EditPollModalStyled } from './EditPollModal.styled'
import CButton from '../../shared-components/CButton/CButton';
import { useFieldArray, useForm } from 'react-hook-form';
import CInput from '../../shared-components/CInput/CInput';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getPollById, updatePoll } from '../../services/pollService';
import { useCallback } from 'react';
import { useToast } from '../../hooks/useToast';

export default function EditPollModal({ visible, header, pollData, onHide }) {
  const toastApi = useToast();
  const queryClient = useQueryClient();
  const { data, error } = useQuery({
    enabled: pollData ? true : false,
    queryKey: ['events', pollData?.pollEventId],
    queryFn: () => getPollById(pollData?.pollEventId)
  });

  const { mutate, isLoading } = useMutation({
    mutationKey: ['events', pollData?.eventGuid],
    mutationFn: (updatedPoll) => updatePoll(updatedPoll),
    onSuccess: () => {
      queryClient.invalidateQueries( ['events'], { exact: true });
      toastApi({severity: 'success', detail: "Successfully updated event!" });
    }
  });

  const { register, handleSubmit, reset, formState: { errors }, control } = useForm({ mode: 'onSubmit', values: data });
  const { fields, remove, append } = useFieldArray({
    name: "options",
    control: control
  });

  const onHideModal = useCallback(() =>  {
    onHide();
    reset();
  });

  function onEdit(pollData) {
    pollData.options = pollData.options.filter(o => o.value != '');
    mutate(pollData);
    onHide();
  }
  function onErrors(v) {
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
    <Dialog focusOnShow={false} visible={visible} header={header} onHide={onHideModal} draggable={false} style={{ width: '50vh', height: '500px' }}>
        <EditPollModalStyled>
        <form onSubmit={handleSubmit(onEdit,onErrors)}>
          <div>
            <CInput control={control} register={register('title', { required: true })} required={true} placeholder={'What would you like to ask?'}></CInput>
          </div>
          {fields.map((o, index) => {
            return(
            <div className='options-input-container' key={o.id}>
              <input type='radio' disabled></input>
              <CInput watchDebounced={watchInputValueDebounced} inputKey={o.id} control={control} register={register(`options.${index}.value`, { required: index == fields.length - 1 && fields.length > 1 ? false : true })} required={index == fields.length - 1 && fields.length > 1 ? false : true} placeholder={'Add option'}></CInput>
              <span className='delete-icon' onClick={() => onDeleteField(o.id)}></span>
            </div>
            )
          })}
          <div className='footer-buttons'>
            <CButton disabled={isLoading ? true : false} isLoading={isLoading} type={'submit'} text={'Save'}></CButton>
          </div>
        </form>
        </EditPollModalStyled>
    </Dialog>
  )
}
