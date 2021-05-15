import React from 'react'


const TextInput = ({ id, type, label, change, intialValue }) =>
{
    return (
        <div className="txtinp" >
            <label className="lgntxt" htmlFor={label}>{label}</label>{" "}
            <input id={id} type={type} onChange={change} placeholder={intialValue} />
        </div>
    )
}


export default TextInput