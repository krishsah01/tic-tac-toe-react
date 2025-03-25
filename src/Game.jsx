import { useState, useEffect } from "react"
import { Board } from "./Board"
import { checkWinningLines } from "./tictactoe"

export function Game() {
    const [gridSize, setGridSize] = useState(3);
    const [history, setHistory] = useState([Array(3 * 3).fill(null)]); // Initialize correctly
    const [currentMove, setCurrentMove] = useState(0);
    const [winner, setWinner] = useState(null);
    const currentSquares = history[currentMove] || Array(gridSize * gridSize).fill(null);

    useEffect(() => {
        resetGame(gridSize); // Reset game when grid size changes
    }, [gridSize]);

    const handleGridSizeChange = (event) => {
        const newSize = Math.min(Math.max(3, Number(event.target.value)), 10);
        setGridSize(newSize);
    };

    function handlePlay(nextSquares) {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);

        const gameResult = checkWinningLines(gridSize, nextSquares);
        if (gameResult) {
            setWinner(gameResult);
        }
    }

    function resetGame(size = gridSize) {
        setHistory([Array(size * size).fill(null)]);
        setCurrentMove(0);
        setWinner(null);
    }

    function jumpTo(moveIndex) {
        setCurrentMove(moveIndex);
        setWinner(null);
    }

    const moves = history.map((squares, move) => (
        <li key={move}>
            <button onClick={() => jumpTo(move)}>
                {move > 0 ? `Go to move #${move}` : 'Go to game start'}
            </button>
        </li>
    ));

    return (
        <div className="game-container">
            <div className="game-controls">
                <label htmlFor="input">
                    Enter Grid Size
                    <input 
                        type="number" 
                        placeholder="Ex. 3" 
                        id="input" 
                        min="3"
                        max="10"
                        value={gridSize} 
                        onChange={handleGridSizeChange}
                    />
                </label>
                <button onClick={() => resetGame()}>
                    Reset Game
                </button>
            </div>
            <div className="game-content">
                <div className="game-board">
                    <Board 
                        gridSize={gridSize} 
                        squares={currentSquares} 
                        onPlay={handlePlay}
                        winner={winner}
                        resetGame={resetGame}
                    />
                    {console.log("Rendering Board with gridSize:", gridSize, "currentSquares:", currentSquares)
}
                </div>
                <div className="game-info">
                    <h3>Move History</h3>
                    <ol>{moves}</ol>
                </div>
            </div>
        </div>
    );
}
