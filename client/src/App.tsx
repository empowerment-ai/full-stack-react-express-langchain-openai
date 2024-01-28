import styles from './index.module.css'
import sqlLogo from './assets/sql-server.png'
import {useState} from 'react'

function App() {
  const [queryDescription, setQueryDescription] = useState<string>('')

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(queryDescription)
  }

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
    </main>
  )
}

export default App
