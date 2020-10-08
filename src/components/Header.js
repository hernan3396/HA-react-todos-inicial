import React from 'react';
import TodoTextInput from './TodoTextInput';
import { useDispatch } from 'react-redux';
import { addTodo } from '../redux/todo.slice';

const Header = () => {
  const dispatch = useDispatch();
  const onSave = (text) => {
    if (text.length !== 0) {
      dispatch(addTodo(text));
    }
  };
  return (
    <header className="header">
      <h1>Tareas</h1>
      <TodoTextInput onSave={onSave} placeholder="¿Qué vamos a hacer hoy?" />
    </header>
  );
};

export default Header;
