import React from 'react';
import Board from './Board';


export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null)
            }],
            xIsNext: true,
        };
    }

    handleClick(i) {
        const history = this.state.history;
        const squares = [...history[history.length - 1].squares];
        if(checkWinner(squares) || squares[i]){
            return;
        }
        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState(prevState => ({
            history: [...prevState.history, {squares}],
            xIsNext: !this.state.xIsNext
        }));
    }

    render() {
        const history = this.state.history;
        const currentBoard = history[history.length - 1].squares;
        const winner = checkWinner(currentBoard);
        const status = 
        winner
        ? `The winner is: ${winner}`
        : `Next player is: ${this.state.xIsNext ? 'X' : 'O'}`
        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        squares={currentBoard}
                        onClick = {(i) => this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        )
    }
}

function checkWinner(squares) {
    const winOptions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ]
    for (let i = 0; i < winOptions.length; i++) {
        const [a, b ,c] = winOptions[i];
        if(squares[a] && squares[a] === squares[b] && squares[a] === squares[c]){
            return squares[a];
        }
    }
    return null;
}
