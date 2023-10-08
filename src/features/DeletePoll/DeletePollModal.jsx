import { Dialog } from 'primereact/dialog'
import React from 'react'
import { DeletePollModalStyled } from './DeletePollModal.styled'
import CButton from '../../shared-components/CButton/CButton';
import { useFetcher } from '../../hooks/useFetcher';

export default function DeletePollModal({ visible, header, pollData, onHide }) {
  const [data, error, isLoading, deletePoll, refetch] = useFetcher('post', "/poll/deletepoll?pollId=" + pollData?.id, "Successfully deleted!");
  
  function onDelete() {
    deletePoll();
    onHide();
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
