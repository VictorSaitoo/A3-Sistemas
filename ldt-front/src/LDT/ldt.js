import React, { useEffect, useState } from "react";
import './ldt.css';
import axios from "axios";
import instance from "../config/axiosConfig";
import DeleteItem from "../delete/delete";



const Ldt = () => {

  const [task, setTask] = useState([]);

    useEffect(() => {
      const fetchTask = async () => {
        try {
          const response = await instance.get('/task');
          setTask(response.data);
        }catch (error){
          console.error('Não foi possivel encontrar as tasks', error)
        }
      }
      fetchTask();
    }, []);
  
  const newTask = () =>{
    window.location.href = 'http://localhost:3000/nova-tarefa'
  }
  
  const edit = () =>{
    
    window.location.href = 'http://localhost:3000/update'
 }

 const handleDelete = (id) => {
  setTask(task.filter(task =>  task.id !== id));
 }
  return(
    <div class="todo-container">
      <header>
        <h1>Lista de Tarefas</h1>
        <button className="newTask" onClick={newTask}>
          Nova Tarefa
        </button>
      </header>
      <div id="search">
          <h2>Filtrar:</h2>
          <select id="filter-select">
            <option value="all">Todos</option>
            <option value="done">Feitos</option>
            <option value="todo">A fazer</option>
          </select>
        </div>
      <div id="todo-list">
      <ul>
       {task.map(task =>(
        <li className="lista"key={task.id}>
        <strong >{task.title}</strong>
        <i className="statusLista">{task.status}</i>
        <br/> 
        {task.description}
        <p>
        <button className="editBtn" onClick={edit}>Editar</button>
        <button className="deleteBtn" onClick={handleDelete}>Deletar</button>
        </p>
      </li>
       ))}
      </ul>
      </div>
    </div>
  );
}

export default Ldt;