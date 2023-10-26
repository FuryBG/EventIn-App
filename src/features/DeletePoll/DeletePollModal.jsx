import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DeletePollModalStyled } from './DeletePollModal.styled'
import CButton from '../../shared-components/CButton/CButton';
import { useMutation, useQueryClient } from 'react-query';
import { deletePoll } from '../../services/pollService';
import { useToast } from '../../hooks/useToast';

export default function DeletePollModal({ visible, header, pollData, onHide }) {
  const toastApi = useToast();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationKey: ['events', pollData?.pollEventId],
    mutationFn: (pollId) => deletePoll(pollId),
    onSuccess: () => {
      queryClient.invalidateQueries(['events']);
      toastApi({severity: 'success', detail: "Successfully deleted event!" });
      onHide();
    }
  });
  
  function onDelete() {
    mutate(pollData.pollEventId);
  }

  return (
    <Dialog visible={visible} header={header} onHide={onHide} draggable={false} style={{ width: '50vh' }}>
        <DeletePollModalStyled>
            <CButton disabled={isLoading ? true : false} isLoading={isLoading} onClick={onDelete} text={"Delete"}></CButton>
            <span onClick={onHide}>Cancel</span>
        </DeletePollModalStyled>
    </Dialog>
  )
}
