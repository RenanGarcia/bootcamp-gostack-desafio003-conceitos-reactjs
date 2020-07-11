import React from "react";

// import { Container } from './styles';

function Repository({ title, onRemove }) {
  return (
    <li>
      {title}
      <button onClick={onRemove}>Remover</button>
    </li>
  );
}

export default Repository;
