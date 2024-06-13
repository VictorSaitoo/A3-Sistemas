import React, { useEffect, useState } from "react";
import './ldt.css';
import axios from "axios";
import instance from "../config/axiosConfig";



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
    
  return(
    <div class="todo-container">
      <header>
        <h1>Todo Avançado</h1>
        <button className="newTask" onClick={newTask}>
          Nova Tarefa
        </button>
      </header>
      <form id="edit-form" class="hide">
        <p>Edite sua tarefa</p>
        <div class="form-control">
          <input type="text" id="edit-input" />
          <button type="submit">
            Ok
          </button>
        </div>
        <button id="cancel-edit-btn">Cancelar</button>
      </form>
      
      <div id="todo-list">
      <ul>
       {task.map(task =>(
        <li key={task.id}>
        <strong>{task.title}</strong>{task.description}
        <br />
      </li>
       ))}
      </ul>
      </div>
    </div>
  );
}

export default Ldt;