import { useState ,useEffect} from 'react'
import Navbar from './Components/Navbar.jsx' 
import Todos from './Components/Todos.jsx'
import Todo from './Components/Todo.jsx'

import './App.css'

function App() {
  const [selectedGrouping, setSelectedGrouping] = useState('user');

  return (
    <>
      <div>
         <Navbar selectedGrouping={selectedGrouping} setSelectedGrouping={setSelectedGrouping}/>
         <Todos selectedGrouping={selectedGrouping} setSelectedGrouping={setSelectedGrouping}/>
      </div>
    </>
  )
}

export default App
