import { useState, useEffect } from "react"
import { Square } from "./Square"
import { checkWinningLines } from "./tictactoe"
export function Board({gridSize}){
    const [squares, setSquares] = useState(Array(gridSize ** 2).fill(null))
    const [currentPlayer, setCurrentPlayer] = useState('X')
    const [winner, setWinner] = useState('')
    const [gameOver,setGameOver] = useState(false)

    useEffect(() => {
        setSquares(Array(gridSize ** 2).fill(null))
        setCurrentPlayer("X");
        setGameOver(false);
        setWinner(null);
    }, [gridSize])
    
    function onSquareClick(index){
        if (squares[index] || gameOver) return;

        const newSquare = squares.slice()
        newSquare[index] = currentPlayer;
        setSquares(newSquare)

        const gameWinner = checkWinningLines(gridSize, squares)
        if(gameWinner){
            setGameOver(true)
            setWinner(gameWinner)
        }
        else setCurrentPlayer(currentPlayer === 'X'? 'O' : 'X')
        
    }

    function handleGameRestart(){
        setSquares(Array(gridSize ** 2).fill(null));
        setCurrentPlayer('X');
    }

    return (
    <>
        {gameOver &&  <h2>Game Winner is {winner}</h2>}
        <div style={{
        display: `grid`,
        gridTemplateColumns: `repeat(${gridSize}, 34px)`
    }}>
        {
        squares.map((square, index) => (
                <Square value= {square} onSquareClick={() => onSquareClick(index)}/>
        ))
        }
    </div>
        <button onClick={handleGameRestart}>Reset</button>
    </>
    )
}