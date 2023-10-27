import React, { useEffect, useState } from 'react'
import { ViewPollStyled } from './ViewPoll.styled'
import { useParams } from 'react-router-dom'
import useSignalR from '../../hooks/useSignalR';
import CRadioButton from '../../shared-components/CRadioButton/CRadioButton';
import { useForm } from 'react-hook-form';
import CButton from '../../shared-components/CButton/CButton';

export default function ViewPoll() {
    let params = useParams();
    const { data, onVote } = useSignalR({
        pollGuid: params.eguid,
        onDataReceive: (data) => {
            if (data?.userVote) {
                onToggleResultVote();
            }
        }
    });
    const [showResult, setShowResult] = useState(null);
    const { register, control, handleSubmit, reset } = useForm({
        mode: 'onSubmit',
        values: {
            title: data?.title,
            selectedOption: {}
        }
    });

    if (data == null) return null;

    function onSubmit(data) {
        onVote(JSON.parse(data.selectedOption));
        setShowResult(true);
    }

    function onToggleResultVote() {
        setShowResult(prev => !prev);
    }

    return (
        <ViewPollStyled>
            <div>
                <header>
                    <span>What is your favorite color?</span>
                    <div>
                        <span className='votes-count'>{data.votesCount}</span>
                        <span className='poll-icon'></span>
                    </div>
                </header>
                <div className='result' style={showResult ? null : { left: '-100%', position: "fixed" }}>
                    {data.options.map((option, index) => {
                        return (
                            <React.Fragment key={index}>
                                <span key={index}>{option.value}</span>
                                <div className='option-percentage'>
                                    <div className='percentage-bar-container'>
                                        <span className='bar' style={showResult ? { width: `${option.precentage}%` } : { width: 0 }}></span>
                                        <h5 style={showResult ? { left: `${option.precentage - 2}%` } : { left: 0 }}>{option.precentage}%</h5>
                                    </div>
                                </div>
                            </React.Fragment>
                        )
                    })}
                    <div className='buttons-container'>
                        <span onClick={onToggleResultVote}>Change Vote</span>
                    </div>
                </div>
                {!showResult ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {data.options.map((option, index) => {
                            return (
                                <div className='option-container' key={index}>
                                    <CRadioButton register={register("selectedOption", { required: true })} forValue={index} control={control} checked={option.pollOptionId == data.userVote?.pollOptionId ? true : false} value={JSON.stringify(option)} ></CRadioButton>
                                    <span>{option.value}</span>
                                </div>
                            )
                        })}
                        <div className='buttons-container'>
                            <span onClick={onToggleResultVote}>View Result</span>
                            <CButton type={'submit'} text={'Vote'}></CButton>
                        </div>
                    </form> : null}
            </div>
        </ViewPollStyled>
    )
}
