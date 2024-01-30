import styles from './index.module.css'
import sqlLogo from './assets/sql-server.png'
import {useState} from 'react'

function App() {
  const [queryDescription, setQueryDescription] = useState('')
  const [sqlQuery, setSqlQuery] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault()
    console.log(queryDescription);
    const query = await generateQuery();
    setSqlQuery(query);
  }

  const generateQuery = async () => {
    const response = await fetch("http://localhost:3005/generate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ queryDescription: queryDescription }),
    });

    const data = await response.json();
    return data.sqlQuery.trim();
  };

  return (
    <main className={styles.main}>
      <img src={sqlLogo} className={styles.icon}></img>
      <h3>Generate SQL with AI</h3>
      <form onSubmit={onSubmit}>
        <input type="text" 
        name="query-description" 
        placeholder='Describe your query'
        onChange={(e) => setQueryDescription(e.target.value)} />
        <input type="submit" value="Generate query" />
      </form>
      <pre>{sqlQuery}</pre>
    </main>
  )
}

export default App
