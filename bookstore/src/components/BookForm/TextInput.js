import React from "react";


const TextInput = ({ name, label, onChange, placeholder, value, }) =>
{
  return (
    <div className="txtinp">
      <label htmlFor={name} className="lbl">{label}</label>
      <div className="field">
        <input
          type="text"
          name={name}
          className="form-control"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};



export default TextInput;
