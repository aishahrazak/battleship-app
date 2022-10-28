import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

class Square extends React.Component {
    render() {
        return (
            <button className="square" onClick={function() {}}>
                {/* TODO */}
            </button>
        );
    }
}

class ScoreBoard extends React.Component{
    render() {
        return <div></div>
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square />;
    }

    render() {
        var board = []
        for(let i = 0; i < 10; i++){
                let squares = []
                for(let j = 0; j < 10; j++){
                    squares.push(this.renderSquare())
                }
                let element = (
                    <div className="board-row">
                        {squares}
                    </div>
                )
                board.push(element)
        }
        return (
            <div>
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-board">
                    <Board />
                </div>
                <div className="game-info">
                    <div>{/* status */}</div>
                    <ol>{/* TODO */}</ol>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
