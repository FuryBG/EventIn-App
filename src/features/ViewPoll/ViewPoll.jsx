import React, { useState } from 'react'
import { ViewPollStyled } from './ViewPoll.styled'
import { useParams } from 'react-router-dom'
import useSignalR from '../../hooks/useSignalR';
import CRadioButton from '../../shared-components/CRadioButton/CRadioButton';
import { useForm } from 'react-hook-form';
import CButton from '../../shared-components/CButton/CButton';

export default function ViewPoll() {
    let params = useParams();
    const { data, onVote } = useSignalR(params.eguid);
    const [ isResult, setisResult ] = useState(null);
    const { register, control, handleSubmit, reset } = useForm({
        mode: 'onSubmit',
        values: {
            title: data?.title,
            selectedOption: {}
        }
    });

    if (data == null) return;

    function onSubmit(data) {
        onVote(JSON.parse(data.selectedOption));
        setisResult(true);
    }

    return (
        <ViewPollStyled>
            <div>
                <header>
                    <span>What is your favorite color?</span>
                    <span>I</span>
                </header>
                {!isResult ?
                    <form onSubmit={handleSubmit(onSubmit)}>
                        {data.options.map((option, index) => {
                            return (
                                <div className='option-container' key={index}>
                                    <CRadioButton register={register("selectedOption")} control={control} value={JSON.stringify(option)} ></CRadioButton>
                                    <span>{option.value}</span>
                                </div>
                            )
                        })}
                        <div className='buttons-container'>
                            <CButton type={'submit'} text={'Vote'}></CButton>
                        </div>
                    </form>
                    :
                    <div className='result'>
                        <h1>{data.options[0].precentage}</h1>
                    </div>
                }
            </div>
        </ViewPollStyled>
    )
}
