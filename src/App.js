import { useState } from 'react';
import { FiSearch } from 'react-icons/fi';
import './style.css';
import api from './services/api';

function App() {

  const [input, setInput] = useState('');
  const [cep, setCep] = useState({});

  async function handleSearch() {
    if (input === '') {
      alert("Preencha com algum cep !")
    }
    try {
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");
    }
    catch {
      alert("Cep não encontrado !")
      setInput("");
    }
  }


  return (
    <div className="container">
      <h1 className="title">Buscador CEP</h1>

      <div className="containerInput">
        <input
          type="text"
          placeholder="Dígite o Cep..."
          value={input}
          onChange={(event) => setInput(event.target.value)}
        />

        <button className="buttonSeach" onClick={handleSearch}>
          <FiSearch size={25} color="#ffffff" />
        </button>
      </div>

      {Object.keys(cep).length > 0 && (

        <main className='main'>
          <h2>Cep:{cep.cep} </h2>
          <span>{cep.logradouro}</span>
          <span>Complemento: {cep.complemento}</span>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>
        </main>

      )}




    </div>
  );
}

export default App;