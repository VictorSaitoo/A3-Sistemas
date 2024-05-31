import React from "react";
import './Login.css';

function Input(props){

  return(
   <div>
    <label htmlFor={props.id}> {props.label}</label>
    <input type={props.type} id={props.id} name={props.name} value={props.value} required/>
    </div>
  )

}

export default Input;