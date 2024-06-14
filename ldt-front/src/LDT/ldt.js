import React, { useEffect, useState, useRef  } from "react";
import './ldt.css';
import instance from "../config/axiosConfig";
import { deleteTask, updateTask } from "../service/service";





const Ldt = () => {

  const [task, setTask] = useState([]);
  const [editingTask, setEditingTask] = useState(null);
  const [taskData, setTaskData] = useState({
      title: '',
      description: '',
      status: false,
      expirationDate: ''
  });

  const editSectionRef = useRef (null);

    useEffect(() => {
      fetchTask();
    }, []);

      const fetchTask = async () => {
        try {
          const response = await instance.get('/task');
          setTask(response.data);

          if (editSectionRef.current) {
            editSectionRef.current.scrollIntoView({ behavior: 'smooth' });
        }
        }catch (error){
          console.error('Não foi possivel encontrar as tasks', error)
        }
      }
      fetchTask();
  
  
  const newTask = () =>{
    window.location.href = 'http://localhost:3000/nova-tarefa'
  }

 const handleDelete = async (id) => {
  await deleteTask(id);
  fetchTask();
 }

 const handleEditClick = (task) => {
  setEditingTask(task);
  setTaskData({
      title: task.title,
      description: task.description,
      status: task.status,
      expirationDate: task.expirationDate
  });
};

const handleUpdate = async () => {
  if (editingTask) {
      await updateTask(editingTask.id, taskData);
      setEditingTask(null);
      fetchTask(); // Refetch the tasks after update
  }
  if (editSectionRef.current) {
    editSectionRef.current.scrollIntoView({ behavior: 'smooth' });
};
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
      <div id="todo-list" className="listaTarefas">
      <ul>
       {task.map(task =>(
       <li className="lista"key={task.id}>
       <strong className="taskTitle">{task.title}</strong>
       <i className="statusLista">{task.status}</i>
       <br/> 
       {task.description}
       <p>
       <button className="editBtn" onClick={() => handleEditClick(task)}>Editar</button>
       <button className="deleteBtn" onClick={() => handleDelete(task.id)}>Deletar</button>
       </p>
     </li>
       ))}
      </ul>
      </div>
      {editingTask && (
                      <div className="todo-container" >
                        <form className="updateForm"> 

                        <h2 className="editeSuaTarefa">Editar Tarefa</h2>
                    <input
                      className="textUpdate"
                      type="text"
                      value={taskData.title}
                      onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                        placeholder="Title"
                    />
                    <input
                        className="textUpdate"
                        type="text"
                        value={taskData.description}
                        onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                        placeholder="Description"
                    />
                    <input
                        className="dateUpdate"
                        type="date"
                        value={taskData.expirationDate}
                        onChange={(e) => setTaskData({ ...taskData, expirationDate: e.target.value })}
                    />
                    <button className="updateBtn" onClick={handleUpdate}>Update Task</button>
                    <button className="CancelBtn" onClick={() => setEditingTask(null)}>Cancel</button>
            </form>
                </div>
            )}
      
    </div>
  );
}

export default Ldt;