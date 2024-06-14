import React, { useState } from "react";
import instance from "../config/axiosConfig";

const UpdateTask = () =>{
    const[title, setTitle] = useState ('');
    const[description, setDescription] = useState('');
    const[status, setStatus] = useState('');
    const[expirationDate, setExpirationDate] = useState('');

    const update = async (e) => {
        e.preventDefault();

        await instance.put(`/task/`,{
            title, description, status, expirationDate
    });
}

const voltar = () =>{
    window.location.replace('http://localhost:3000/listadetarefas')
}

return(
    <div class="todo-container">

    <form id="todo-form" className="form" onSubmit={update} >
        <h2 className="editeSuaTarefa"><p>Edite sua tarefa</p></h2>
    <div className="update">
        <h3>Titulo: </h3>
    <div class="title">
        <input
        className="caixa"
        type="text"
        value = {title}
        placeholder="O que você vai fazer?"
        onChange={(e) => setTitle(e.target.value)}
        />
    </div>
    <h3>Descrição: </h3>
    <div className="descricao">
        <input
        className="caixa"
        type="text"
        value={description}
        placeholder="Descrição da tarefa"
        onChange={(e) => setDescription(e.target.value)}
        />
    </div>
    <h3>Status: </h3>
    <div className="status">
        <input
        className="caixa"
        type="text"
        value={status}
        placeholder="IN_PROGRESS | TO_DO"
        onChange={(e) => setStatus(e.target.value)}
        />
    </div>
    <h3>Data de expiração: </h3>
    <div className="expirationDate">
        <input
        className="caixa"
        type="text"
        value={expirationDate}
        placeholder="2024-06-13"
        onChange={(e) => setExpirationDate(e.target.value)}
        />
    </div>
    </div>
          <button type="submit">
            Ok
          </button>
    
        <button className="botao" onClick={voltar}>Cancelar</button>
      </form>
        </div>
    )
}
export default UpdateTask