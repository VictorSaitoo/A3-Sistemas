import React from 'react';
import axios from 'axios';
import instance from '../config/axiosConfig';

const DeleteItem = ({ task, onDelete }) => {
  const handleDelete = async () => {
    try {
      await instance.delete(`/task/${task.id}`);
      onDelete(task.id); // Atualiza o estado do componente pai
    } catch (error) {
      console.error('Erro ao deletar task: ', error);
    }
  };

  return (
    <div>
      <span>{task.title}</span>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default DeleteItem;
