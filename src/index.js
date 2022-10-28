import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import shipData from './shiplayout.json'

class Square extends React.Component {
    render() {
        return (
            <button id={this.props.value} key={this.props.value} className="square" onClick={function() {}}>
                {/* TODO */}
            </button>
        );
    }
}

class ScoreBoard extends React.Component{
    render() {
        return (
            <div>
                <div className="scoreTile player1">
                    <div className="score">00</div>
                    <hr className="scoreLine"/>
                    <div className="player">player 1</div>
                </div>
                <div className="scoreTile player2">
                    <div className="score">00</div>
                    <hr className="scoreLine"/>
                    <div className="player">player 2</div>
                </div>
            </div>
        );
    }
}

class ShipInfo extends React.Component{
    renderShip(shipType, count){
        var shipImgsDict ={
            battleship : "assets/Battleship Shape.png",
            carrier : "assets/Carrier Shape.png",
            submarine : "assets/Submarine Shape.png",
            cruiser : "assets/Cruiser Shape.png",
            destroyer : "assets/Aircraft Shape.png",
        }
        let imgPath = shipImgsDict[shipType]
        let size = "o ".repeat(count)
        return (
            <div key={shipType} className="ship">
                <img className="shipType" src={imgPath} alt={shipType}/>
                <div className="shipCount">{size}</div>
            </div>
        )
    }

    render(){
        let shipInfo = []
        for(let ship in shipData.shipTypes){
            console.log(ship + " : " + shipData.shipTypes[ship].size)
            shipInfo.push(this.renderShip(ship, shipData.shipTypes[ship].size))
        }
        return (
            <div className="shipInfo">
                {shipInfo}
            </div>
        );
    }
}

class Board extends React.Component {
    renderSquare(i) {
        return <Square value={i}/>;
    }

    render() {
        var board = []
        for(let i = 0; i < 10; i++){
                let squares = []
                for(let j = 0; j < 10; j++){
                    squares.push(this.renderSquare(i + "," + j))
                }
                let rowId = "row" + i ;
                let element = (
                    <div className="board-row" key={rowId}>
                        {squares}
                    </div>
                )
                board.push(element)
        }
        return (
            <div className="game-board">
                {board}
            </div>
        );
    }
}

class Game extends React.Component {
    render() {
        return (
            <div className="game">
                <div className="game-info">
                    <ScoreBoard />
                </div>
                <ShipInfo />
                <Board />
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
