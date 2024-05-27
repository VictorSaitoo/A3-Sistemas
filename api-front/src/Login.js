import React from "react";
import axios from "axios";
import { useState } from "react";

const Login = () => {

    const[email, setEmail] = useState(' ');
    const[senha, setSenha] = useState(' ');
    const[mensagem, setMensagem] = useState(' ');

    const handleLogin = async(e) =>{
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/users', { 
                tipo: 'UsuarioLogado',
                dados: {email,senha}
            });
            setMensagem('Login realizado com sucesso')
        }catch(error){
            if(error.responde && error.response.status === 400){
                setMensagem("Credenciais invalidas");
            }else{
                setMensagem("Erro ao tentar o login")
            }
            console.log(error)
        }
    };

    return(
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email: </label>
                    <input 
                    type = "email" 
                    value = {email} 
                    onChange = {(e) => setEmail(e.target.value)}/>
                </div>
                <div>
                    <label>Senha: </label>
                    <input 
                    type = "password" 
                    value = {senha} 
                    onChange = {(e) => setSenha(e.target.value)}/>
                </div>
            <button type = "submit">Login</button>
            </form>
        </div>

    );
};

export default Login;