import './App.css'
import { Button } from '@material-ui/core'
import NavBar from './components/NavBar'
import MyCard from './components/MyCard'
import { getMatches } from './api/Api'
import { useEffect, useState } from 'react'
import { grey } from '@material-ui/core/colors'

function App() {
  const [matches, setMatches] = useState([])
  useEffect(() => {
    getMatches()
      .then((data) => setMatches(data.matches))
      .catch((err) => console.log(err))
  }, [])

  return (
    <div className='App' style={{ background: '#ede8ed' }}>
      <NavBar />
      <h1>Cricket Score Board</h1>
      {matches.map((match) => {
        return (match.type === 'Twenty20' && 
          <MyCard key={match.unique_id} match={match} />
        ) 
      })}
    </div>
  )
}

export default App
