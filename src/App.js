import React from 'react';
import { useEffect, useState } from 'react';
import api from './services/api';
import './styles.css';

export default function App() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUsuarios() {
      const response = await api.get('users');
      setUsuarios(response.data);
      setLoading(false);
    }
    loadUsuarios();
  }, []);

  function deleteUsuario(id) {
    const novaLista = usuarios.filter((i) => i.id !== id);
    setUsuarios(novaLista);
    window.alert('Usuário será excluído!');
  }

  if (loading) {
    return (
      <div className="pag-loading">
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <div className="container">
      <header>
        <h1>Lista de usuários</h1>
      </header>

      <table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Empresa</th>
            <th></th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((i) => {
            return (
              <tr key={i.id}>
                <td> {i.name} </td>
                <td> {i.email} </td>
                <td> {i.company.name} </td>

                <td>
                  <button onClick={() => deleteUsuario(i.id)}> Excluir </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
