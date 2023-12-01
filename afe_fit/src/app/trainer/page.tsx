// pages/personal-trainer/clients.tsx
import React from 'react';

const ClientsPage: React.FC = () => {
  // Fetch and display a list of clients
  const clients = []; // Fetch your clients from the API

  return (
    <div>
      <h1>Clients</h1>
      <ul>
        {clients.map((client) => (
          <li key={client.id}>
            <a href={`/personal-trainer/${client.id}`}>{client.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ClientsPage;
