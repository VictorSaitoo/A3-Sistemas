import React, { useState } from "react";
import axios from "axios";


const Cadastro = () => {
    
    const [email, setEmail] = useState('');
    const [nome, setNome] = useState('');
    const [password, setPassword] = useState('');
    const [mensagem, setMensagem] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
    
        try {
            // funcionara para quando for necessário autorização
            // const token = localStorage.getItem("token");
            // Configura os headers para a requisição com o token
            // const config = {
            //     headers: {
            //         Authorization: `Bearer ${token}`,
            //     },
            // };
            // await axios.post('http://localhost:3001/users', config, {
            //     nome, email, password
            // });

            await axios.post('http://localhost:3001/users', {
                nome, email, password
            });
            setMensagem('Usuário criado com sucesso')
        } catch (error) {
            if (error.responde && error.response.status === 400) {
                setMensagem("Credenciais invalidas");
            } else {
                setMensagem("Erro ao criar usuário o login")
            }
            console.log(error)
        }
    };
    const login = () =>{

        window.location.href = 'http://localhost:3000/';
    }

    return (
        <div className="container">
            <form onSubmit={handleLogin}>
                <h2>Cadastro</h2>
                <div>
                    <label>Nome: </label>
                    <input
                        type="nome"
                        value={nome}
                        onChange={(e) => setNome(e.target.value)} />
                </div>
                <div>
                    <label>Email: </label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    <label>Senha: </label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} />
                </div>
                
                <button type="submit" onClick={login}>Cadastro</button>
            </form>
        </div>
    );
    {mensagem && alert(mensagem)}
};

export default Cadastro;