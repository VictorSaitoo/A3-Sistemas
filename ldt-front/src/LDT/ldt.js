import React from "react";
import './ldt.css';

function Ldt(){
  return(
    <div class="todo-container">
      <header>
        <h1>Todo Avançado</h1>
      </header>
      <form id="todo-form">
        <p>Adicione sua tarefa</p>
        <div class="form-control">
          <input
            type="text"
            id="todo-input"
            placeholder="O que você vai fazer?"
          />
          <button type="submit">
            OK
          </button>
        </div>
      </form>
      <form id="edit-form" class="hide">
        <p>Edite sua tarefa</p>
        <div class="form-control">
          <input type="text" id="edit-input" />
          <button type="submit">
            Ok
          </button>
        </div>
        <button id="cancel-edit-btn">Cancelar</button>
      </form>
      <div id="toolbar">
        <div id="search">
          <h4>Pesquisar:</h4>
          <form>
            <input type="text" id="search-input" placeholder="Buscar..." />
            <button id="erase-button">
              Ok
            </button>
          </form>
        </div>
        <div id="filter">
          <h4>Filtrar:</h4>
          <select id="filter-select">
            <option value="all">Todos</option>
            <option value="done">Feitos</option>
            <option value="todo">A fazer</option>
          </select>
        </div>
      </div>
      <div id="todo-list">
      </div>
    </div>
  );
}

export default Ldt;