import React from "react";
import axios from "axios";
import { useState } from "react";

const LoginPage = () => {

    const[email, setEmail] = useState(' ');
    const[password, setPassword] = useState('');
    const[mensagem, setMensagem] = useState(' ');

    const handleLogin = async(e) =>{
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:3001/auth/login', { 
                email,password
            });
            const meutoken = response.data.access_token; 
            console.log("batata frita", response, " meu token ", meutoken)
            if(meutoken ){ 
                setMensagem('Login realizado com sucesso')
                console.log("batata frita", meutoken)
                localStorage.setItem("token", meutoken); 
            } else {
                setMensagem('Dados inválidos')
            }
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
            <h2 className="login">Login</h2>
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
            
                <div className="proxPg">
                <h8> Ainda não tem cadastro? <a className="cliqueAqui" href="/cadastro">Clique Aqui!</a> </h8>
                </div>
            
            </form>
         
        </div>

    );
    mensagem && alert(mensagem)
};

export default LoginPage;