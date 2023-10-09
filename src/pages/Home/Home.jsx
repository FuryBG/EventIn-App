import React, { useState } from 'react'
import { StyledHome } from './Home.styled'
import CResultTable from '../../shared-components/CResultTable/CResultTable'
import { Column } from 'primereact/column';
import CMiniMenu from '../../shared-components/CMiniMenu/CMiniMenu';
import CButton from '../../shared-components/CButton/CButton';
import CreatePollModal from '../../features/CreatePoll/CreatePollModal';
import DeletePollModal from '../../features/DeletePoll/DeletePollModal';
import PlayButton from '../../shared-components/PlayButton/PlayButton';
import StopButton from '../../shared-components/StopButton/StopButton';
import EditPollModal from '../../features/EditPoll/EditPollModal';
import { useQuery } from 'react-query';
import { getUserPolls } from '../../services/pollService';
import { useToast } from '../../hooks/useToast';

export default function Home() {
  const [selected, setSelected] = useState(null);
  const [showDialogCreate, setShowDialogCreate] = useState(null);
  const [showDialogEdit, setShowDialogEdit] = useState();
  const [showDialogDelete, setShowDialogDelete] = useState(null);
  const toastApi = useToast();
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: getUserPolls,
    onError: (error) => {
      toastApi({severity: 'error', detail: 'Cannot fetch events! Please try again later.'});
    }
  });

  function onEdit(row) {
    setSelected(row);
    setShowDialogEdit(true);
  }

  function onDelete(row) {
    setSelected(row);
    setShowDialogDelete(true);
  }

  function onToggleCreatePollDialog() {
    setShowDialogCreate(show => !show);
    if(showDialogCreate) {
      setSelected(null);
    }
  }

  function onToggleDeletePollDialog() {
    setShowDialogDelete(p => !p);
    if(showDialogDelete) {
      setSelected(null);
    }
  }

  function onToggleEditPollDialog() {
    setShowDialogEdit(p => !p);
    if(showDialogEdit) {
      setSelected(null);
    }
  }

  function onPlay() {
    console.log("PLAY");
  }

  function onStop() {
    console.log("STOP");
  }

  return (
    <StyledHome>
      <div className='home-header'>
        <CButton text={"Create Poll"} onClick={onToggleCreatePollDialog}>Create Poll</CButton>
      </div>
      <div className='user-events'>
      <CResultTable emptyMessage={'You don\'t have any events.'} value={data ? data : []} loading={isLoading} dataKey={'id'}>
        <Column header='Poll' field='title' sortable></Column>
        <Column style={{width: '5%'}} body={(rowdata) => rowdata.isActive ? <StopButton onClick={onStop}></StopButton> : <PlayButton onClick={onPlay}></PlayButton>}></Column>
        <Column style={{width: '5%'}} body={(rowdata) => <CMiniMenu model={[
            { label: "See Results" },
            { label: "Reset Results", command: () => onReset(rowdata) },
            { label: "Edit", command: () => onEdit(rowdata) },
            { label: "Delete", command: () => onDelete(rowdata) },
          ] }
          ></CMiniMenu>}></Column>
      </CResultTable>
      </div>
      <CreatePollModal visible={showDialogCreate} header={"Create Poll"} onHide={onToggleCreatePollDialog}></CreatePollModal>
      <EditPollModal visible={showDialogEdit} header={"Edit Poll"} onHide={onToggleEditPollDialog} pollData={selected}></EditPollModal>
      <DeletePollModal visible={showDialogDelete} header={"Are you sure to delete?"} onHide={onToggleDeletePollDialog} pollData={selected}></DeletePollModal>
    </StyledHome>
  )
}
