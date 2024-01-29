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
import { useMutation, useQuery } from 'react-query';
import { getUserPolls, updatePoll } from '../../services/pollService';
import { useToast } from '../../hooks/useToast';
import { useNavigate } from 'react-router-dom';
import { resetVotes } from '../../services/voteService';
import InvitePollModal from '../../features/Invite/InvitePollModal';

export default function Home() {
  const [selected, setSelected] = useState();
  const [showDialogCreate, setShowDialogCreate] = useState();
  const [showDialogEdit, setShowDialogEdit] = useState();
  const [showDialogDelete, setShowDialogDelete] = useState();
  const [showDialogInvite, setShowDialogInvite] = useState();
  const toastApi = useToast();
  const navigate = useNavigate();
  const { data, isError, isLoading, refetch } = useQuery({
    queryKey: ['events'],
    queryFn: getUserPolls,
    onError: (error) => {
      toastApi({severity: 'error', detail: 'Cannot fetch events! Please try again later.'});
    },
    retry: 0
  });

  const { mutate } = useMutation({
    mutationKey: ["events"],
    mutationFn: (data) => updatePoll(data),
    onError: (error) => {
      toastApi({severity: 'error', detail: 'Cannot start event! Please try again later.'});
    },
    onSuccess: (data) => {
      if(data.data.isActive) {
        toastApi({severity: 'success', detail: 'Event is successfully started!'});
      }
      else {
        toastApi({severity: 'success', detail: 'Event is successfully stopped!'});
      }
    }
  });

  const { mutate: mutateResetVotes } = useMutation({
    mutationKey: ["events"],
    mutationFn: (data) => resetVotes(data),
    onError: (error) => {
      toastApi({severity: 'error', detail: 'Cannot reset votes! Please try again later.'});
    },
    onSuccess: (data) => {
      toastApi({severity: 'success', detail: 'Votes are successfully reset!'});
  }});

  function onEdit(row) {
    setSelected(row);
    setShowDialogEdit(true);
  }

  function onDelete(row) {
    setSelected(row);
    setShowDialogDelete(true);
  }

  function onInvite(row) {
    setSelected(row);
    setShowDialogInvite(true);
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

  function onToggleInviteModal() {
    setShowDialogInvite(p => !p);
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

  function onSeeResults(row) {
    navigate("/event/" + row.eventGuid);
  }

  function onPlay(row) {
    row.isActive = true;
    mutate(row);
  }

  function onReset(row) {
    mutateResetVotes(row.pollEventId);
  }

  function onStop(row) {
    row.isActive = false;
    mutate(row);
  }

  return (
    <StyledHome>
      <div className='home-header'>
        <CButton text={"Create Poll"} onClick={onToggleCreatePollDialog}>Create Poll</CButton>
      </div>
      <div className='user-events'>
      <CResultTable emptyMessage={'You don\'t have any events.'} value={data ? data : []} loading={isLoading} dataKey={'pollEventId'}>
        <Column header='Poll' field='title' sortable></Column>
        <Column style={{width: '5%'}} body={(rowData) => rowData.isActive ? <StopButton onClick={() => onStop(rowData)}></StopButton> : <PlayButton onClick={() => onPlay(rowData)}></PlayButton>}></Column>
        <Column style={{width: '5%'}} body={(rowData) => <CMiniMenu model={[
            { label: "See Results", command: () => onSeeResults(rowData)},
            { label: "Reset Results", command: () => onReset(rowData) },
            { label: "Edit", command: () => onEdit(rowData) },
            { label: "Delete", command: () => onDelete(rowData) },
            { label: "Invite", command: () => onInvite(rowData) }
          ] }
          ></CMiniMenu>}></Column>
      </CResultTable>
      </div>
      <CreatePollModal visible={showDialogCreate} header={"Create Poll"} onHide={onToggleCreatePollDialog}></CreatePollModal>
      <EditPollModal visible={showDialogEdit} header={"Edit Poll"} onHide={onToggleEditPollDialog} pollData={selected}></EditPollModal>
      <DeletePollModal visible={showDialogDelete} header={"Are you sure to delete?"} onHide={onToggleDeletePollDialog} pollData={selected}></DeletePollModal>
      <InvitePollModal visible={showDialogInvite} header={"Invite"} onHide={onToggleInviteModal} pollData={selected}></InvitePollModal>
    </StyledHome>
  )
}
