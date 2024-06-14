try{

            const token = localStorage.getItem("token");
        const config = {
            headers: {
                method:'POST',
            Authorization: `Bearer ${token}`,
            },
        };
        await axios.create('http://localhost:3001/task', config, {
            title, description, status, expirationDate
        });
        setMensagem('Task criada com sucesso')
    }catch (error) {
        if (error.responde && error.response.status === 400) {
            setMensagem("Credenciais invalidas");
        } else {
            setMensagem("Erro ao criar usuário o login")
        }
        console.log(error)
    }

    danilo.miguel@saojudas.br

    <TaskItem key={task.id} task={task} onDelete={handleDelete} />

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