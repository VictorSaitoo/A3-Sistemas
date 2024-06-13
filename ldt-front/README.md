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