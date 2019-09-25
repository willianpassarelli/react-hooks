import React, { useState, useEffect, useMemo, useCallback } from 'react';

function App() {
  // Substitui o state
  const [tech, setTech] = useState(['ReactJS', 'React Native']);
  const [newTech, setNewTech] = useState('');

  // Só ser recriada na memoria quando as variaveis newTech e Tech receberem alterações
  const handleAdd = useCallback(() => {
    setTech([...tech, newTech]);
    setNewTech('');
  }, [newTech, tech]);

  // É executada uma vez (componentDidMount)
  useEffect(() => {
    const storageTech = localStorage.getItem('tech');

    if (tech) {
      setTech(JSON.parse(storageTech));
    }
  }, []);

  // Monitora o estado a cada vez que atualizado (componentDidUpdate)
  useEffect(() => {
    localStorage.setItem('tech', JSON.stringify(tech));
  }, [tech]);

  // Atualiza quando alguma variavél recebe uma alteração
  const techSize = useMemo(() => tech.length, [tech]);

  return (
    <>
      <ul>
        {tech.map(t => (
          <li key={t}>{t}</li>
        ))}
      </ul>
      <strong>Você tem {techSize} tecnologias</strong>
      <br />
      <input value={newTech} onChange={e => setNewTech(e.target.value)} />
      <button type="button" onClick={handleAdd}>
        Adicionar
      </button>
    </>
  );
}

export default App;
