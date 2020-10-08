import React, { useState } from 'react';

export default function TodoTextInput({ placeholder, onSave }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    const text = e.target.value.trim();
    if (e.which === 13) {
      onSave(text);
      setText('');
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  return (
    <input
      className={'new-todo'}
      type="text"
      placeholder={placeholder}
      autoFocus={true}
      value={text}
      onChange={handleChange}
      onKeyDown={handleSubmit}
    />
  );
}
