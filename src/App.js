import React, {useState, useEffect} from "react";

import api from './services/api';

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");

  useEffect(() => {
      handleAllRepositories();
  }, []);

  async function handleAllRepositories(){
    const response = await api.get('/repositories');
    const repositories = response.data;

    setRepositories(repositories)
  }

  async function handleAddRepository() {
    const response = await api.post(`/repositories`, {title});
    const repository = response.data;

    setRepositories([...repositories, repository])
    setTitle('');
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const response = repositories.filter(repository => repository.id !== id );

    setRepositories(response)
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => (
          <li key={repository.id}>
            <span className="box">{repository.title}</span>
          <button className="btn btn-remove" onClick={() => handleRemoveRepository(repository.id)}>
            Remover
          </button>
        </li>
        ))}
      </ul>
      <div className="add-repositor">
        <form>
          <input 
            type="text" 
            name="title"
            className="input-field" 
            value={title} 
            placeholder="Informe um projeto"
            onChange={e => setTitle(e.target.value)}
          />
        </form>
        <button className="btn btn-default" onClick={handleAddRepository}>Adicionar</button>
      </div>
    </div>
  );
}

export default App;
