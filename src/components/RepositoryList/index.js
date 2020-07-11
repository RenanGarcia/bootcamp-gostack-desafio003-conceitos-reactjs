import React from "react";

// import { Container } from './styles';
import Repository from "./Repository";

function RepositoryList({ repositories = [], onRemoveItem }) {
  return (
    <ul data-testid="repository-list">
      {repositories.map(({ id, title }) => (
        <Repository
          key={`repository-list_${id}`}
          title={title}
          onRemove={() => onRemoveItem(id)}
        />
      ))}
    </ul>
  );
}

export default RepositoryList;
