import React from 'react'
import { ViewPollStyled } from './ViewPoll.styled'
import { useParams } from 'react-router-dom'
import useSignalR from '../../hooks/useSignalR';
import CRadioButton from '../../shared-components/CRadioButton/CRadioButton';
import { useFieldArray, useForm } from 'react-hook-form';
import { RadioButton } from 'primereact/radiobutton';

export default function ViewPoll() {
    let params = useParams();
    const { data, onVote } = useSignalR(params.eguid);
    const { register, control, handleSubmit, reset } = useForm({
        mode: 'onSubmit',
        defaultValues: {
            id: 0,
            options: [{ value: "", type: "select" }]
        },
        values: data
    });
    const { fields, remove, append } = useFieldArray({
        name: "options",
        control: control
      });
    if (data == null) return;

    return (
        <ViewPollStyled>
            <div>
                <header>
                    <span>What is your favorite color?</span>
                    <span>I</span>
                </header>
                <div>
                    {fields.map((option, index) => {
                        return (
                            <div key={index}>
                                <input register={register(`options`)} type='radio' control={control} value={option.value}></input>
                                <span>{option.value}</span>
                            </div>
                        )
                    })}
                </div>
            </div>
        </ViewPollStyled>
    )
}
