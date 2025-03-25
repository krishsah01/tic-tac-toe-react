import { Board } from './Board'
import './App.css'
import { useState } from "react"

function App() {

const [gridSize, setGridSize] = useState(3);

  return (
    <>
      <div>
        <h1>Tic Tac Toe</h1>
        <br />
        <div>
          <label htmlFor='input'>Enter Gridsize
          <input 
            type="number" 
            placeholder='Ex. 3' 
            id='input' 
            value={gridSize} 
            onChange={(event) =>
              setGridSize(event.target.value)}/>
          </label>
        </div>
          <Board gridSize = {gridSize} />
      </div>
    </>
  )
}

export default App
