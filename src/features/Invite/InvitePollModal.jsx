import { Dialog } from 'primereact/dialog'
import React from 'react'
import { InvitePollModalStyled } from './InvitePollModal.styled';
import { useToast } from '../../hooks/useToast';

export default function InvitePollModal({ visible, header, pollData, onHide }) {
    const toastApi = useToast();
    if(!pollData) return null;

    function onCopy() {
        navigator.clipboard.writeText(window.location.href + 'event/' + pollData.eventGuid);
        toastApi({severity: 'success', detail: "Event link copied!" });
    }

  return (
    <Dialog focusOnShow={false} visible={visible} header={header} onHide={onHide} draggable={false} style={{ width: '50vh' }}>
        <InvitePollModalStyled>
            <div className='content-container'>
                <div>
                    <label>Link:</label>
                    <span className='copy-icon' onClick={onCopy}></span>
                </div>
                <span>{window.location.href + 'event/' + pollData.eventGuid}</span>
                <div>
                    <label>QR:</label>
                    <a className='copy-icon' download='QR.jpeg' target='_blank' href={'https://localhost:7029/poll/generateqr/?guid=' + pollData.eventGuid + '&host=' + window.location.href + '&path=event/'}></a>
                </div>
            </div>
        </InvitePollModalStyled>
    </Dialog>
  )
}
