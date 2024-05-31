import React from "react";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {

    const[email, setEmail] = useState(' ');
    const[nome, setNome] = useState(' ');
    const[password, setPassword] = useState(' ');
    const[mensagem, setMensagem] = useState(' ');

    const handleLogin = async(e) =>{
        e.preventDefault();

        try {
            await axios.post('http://localhost:3000/auth/login', { 
                tipo: 'validateUser',
                dados: {nome,email,password}
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
        <div className="container">
            <form onSubmit={handleLogin}>
            <h2>Login</h2>
                <div>
                    <label>Nome: </label>
                    <input 
                    type = "nome" 
                    value = {nome} 
                    onChange = {(e) => setNome(e.target.value)}/>
                </div>
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
                    value = {password} 
                    onChange = {(e) => setPassword(e.target.value)}/>
                </div>
            <button type = "submit">Login</button>
            </form>
        </div>

    );
};

export default LoginPage;