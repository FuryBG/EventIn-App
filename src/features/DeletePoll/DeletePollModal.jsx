import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DeletePollModalStyled } from './DeletePollModal.styled'
import CButton from '../../shared-components/CButton/CButton';
import { useMutation } from 'react-query';
import { deletePoll } from '../../services/pollService';

export default function DeletePollModal({ visible, header, pollData, onHide }) {
  const { mutate } = useMutation({
    mutationKey: ['events', pollData?.id],
    mutationFn: (pollId) => deletePoll(pollId),
    onSuccess: () => {
      toast.setToaster({severity: 'success', detail: "Successfully deleted event!" });
      onHide();
    }
  });
  
  function onDelete() {
    mutate(pollData.id);
  }

  return (
    <Dialog visible={visible} header={header} onHide={onHide} draggable={false} style={{ width: '50vh' }}>
        <DeletePollModalStyled>
            <CButton onClick={onDelete} text={"Delete"}></CButton>
            <span onClick={onHide}>Cancel</span>
        </DeletePollModalStyled>
    </Dialog>
  )
}
