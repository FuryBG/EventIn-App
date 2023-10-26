import React, { useState } from 'react'
import { ViewPollStyled } from './ViewPoll.styled'
import { useParams } from 'react-router-dom'
import useSignalR from '../../hooks/useSignalR';
import CRadioButton from '../../shared-components/CRadioButton/CRadioButton';
import { useForm } from 'react-hook-form';
import CButton from '../../shared-components/CButton/CButton';
import GlobalLoader from '../../shared-components/GlobalLoader/GlobalLoader'

export default function ViewPoll() {
    let params = useParams();
    const { data, onVote } = useSignalR(params.eguid);
    const [isResult, setisResult] = useState(null);
    const { register, control, handleSubmit, reset } = useForm({
        mode: 'onSubmit',
        values: {
            title: data?.title,
            selectedOption: {}
        }
    });

    if(data == null) return null;
    function onSubmit(data) {
        onVote(JSON.parse(data.selectedOption));
        setisResult(true);
    }

    function onToggleResultVote() {
        setisResult(prev => !prev);
    }

    return (
        <ViewPollStyled>
            <div>
                <header>
                    <span>What is your favorite color?</span>
                    <span>{data.votesCount}</span>
                </header>
                <div className='result' style={isResult ? null : { left: '-100%', position: "fixed" }}>
                    {data.options.map((option, index) => {
                        return (
                            <>
                                <span key={index}>{option.value}</span>
                                <div className='option-percentage'>
                                    <div className='percentage-bar-container'>
                                        <span className='bar' style={isResult ? { width: `${option.precentage}%` } : { width: 0 }}></span>
                                        <h5 style={isResult ? {left: `${option.precentage - 2}%`} : {left: 0}}>{option.precentage}%</h5>
                                    </div>
                                </div>
                            </>
                        )
                    })}
                    <div className='buttons-container'>
                        <span onClick={onToggleResultVote}>Change Vote</span>
                    </div>
                </div>
                {!isResult ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {data.options.map((option, index) => {
                            return (
                                <div className='option-container' key={index}>
                                    <CRadioButton register={register("selectedOption", { required: true })} forValue={index} control={control} value={JSON.stringify(option)} ></CRadioButton>
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
