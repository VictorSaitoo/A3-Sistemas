import { useParams } from "react-router-dom";
import instance from "../config/axiosConfig";
import { useEffect, useState } from "react";
import { updateTask } from "../service/service";

const EditTask = () => {
    const { id } = useParams();
    const [taskData, setTaskData] = useState({
        title: '',
        description: '',
        status: false,
        expirationDate: ''
    });
        
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await instance.get(`/tasks/${id}`);
                setTaskData(response.data);
            } catch (error) {
                console.error('There was an error fetching the task!', error);
            }
        };

        fetchTask();
    }, [id]);

    const handleUpdate = async () => {
        try {
            await instance.put(`/tasks/${id}`, taskData);
            // Após atualizar, você pode redirecionar para a lista de tarefas ou qualquer outra página
            window.location.href = '/listadetarefas'; // Exemplo simples de redirecionamento
        } catch (error) {
            console.error('There was an error updating the task!', error);
        }
    };

    const cancelBtn = () =>{
        window.location.href = 'http://localhost:3000/listadetarefas'
    }

    return (
        <div class="todo-container">

    <form id="todo-form" className="form" >
    <div>
            <h2>Edit Task</h2>
            <input
                type="text"
                value={taskData.title}
                onChange={(e) => setTaskData({ ...taskData, title: e.target.value })}
                placeholder="Title"
            />
            <input
                type="text"
                value={taskData.description}
                onChange={(e) => setTaskData({ ...taskData, description: e.target.value })}
                placeholder="Description"
            />
            <input
                type="checkbox"
                checked={taskData.status}
                onChange={(e) => setTaskData({ ...taskData, status: e.target.checked })}
            /> Completed
            <input
                type="date"
                value={taskData.expirationDate}
                onChange={(e) => setTaskData({ ...taskData, expirationDate: e.target.value })}
            />
            <button onClick={handleUpdate}>Update Task</button>
            <button onClick={cancelBtn}>Cancel</button>
        </div>
      </form>
        </div>
    );
};

export default EditTask;