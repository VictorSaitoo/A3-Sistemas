function LoginPage(){
  return(
    <div className="container">
      <form>
        <h2>Tela de Login</h2>
        <Input type="text" label="E-mail"  id="email" name="username"/> 
        <Input type="password" label="Senha" id="password" name="password"/> 
        <Input type="submit" value="Login"/>
        <h6>
          Ainda não tem cadastro? 
          <a href="http://localhost:3000/cadastro">Cadastrar-se</a>
        </h6>

      </form>
    </div>

  );
}

export default LoginPage;

<div className="container">
      <form onSubmit={handleLogin}>
        <h2>Tela de Login</h2>


        <Input type="text" 
        label="Nome"  
        id="username" 
        name="username"
        onChange={(e) => setNome(e.target.value)} /> 

        <Input type="text" 
        label="E-mail"  
        id="email" 
        name="username" 
        onChange={(e) => setEmail(e.target.value)} /> 

        <Input type="password" 
        
        label="Senha" 
        id="password" 
        name="password"
        onChange={(e) => setPassword(e.target.value)}/> 

        <Input type="submit" value="Login"/>

        <h6>
          Ainda não tem cadastro? 
          <a href="http://localhost:3001/cadastro">Cadastrar-se</a>
        </h6>

      </form>
      {message && <p>{message}</p>}
    </div>


    import React, { useState } from "react";
import Input from "./Input";
import './Login.css';
import axios from "axios";



  function LoginPage(){
    const [email, setEmail] = useState(' ');
    const [nome, setNome] = useState(' ');
    const [password, setPassword] = useState(' ');
    const [message, setMessage] = useState(' ');
    
    const handleLogin = async (event) =>{
      event.preventDefault();
      
      try{
        const response = await axios.post('http://localhost:3000/auth/login' , {
        nome,
        email,
        password,
      });
      setMessage('Login concluido')
      console.log('Token', response.data.token)
    }catch(error){
      alert (setMessage('Login não realizado'))
    }
  }
  
    
    return (
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
                    value = {password} 
                    onChange = {(e) => setPassword(e.target.value)}/>
                </div>
            <button type = "submit">Login</button>
            </form>
        </div>
);
}




export default LoginPage;