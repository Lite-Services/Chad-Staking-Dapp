import { useState } from 'react'
import './App.css'
import Home from './services/Home';
import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";


function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <HashRouter>
      <Routes>
      <Route path="/" element={<Home/>} />
      </Routes>
      </HashRouter>
    </div>
  )
}

export default App
