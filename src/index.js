import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import shipData from './shiplayout.json'

var shipPositions = shipData.layout.reduce(function (layout, current){ return current.positions.forEach(pos => layout[pos] = current.ship), layout }, {})

class Square extends React.Component {
    constructor(props){
        super(props)
        let shipType = ""
        if (this.props.value in shipPositions){
            shipType = shipPositions[this.props.value]
        }
        this.state = {
            clicked: false,
            ship: shipType,
            imageUri: ""
        };
    }

    handleClick =() => {
        if(this.state.ship !== ""){
            this.setState({clicked: true, imageUri : "assets/Hit.png"})
        }else{
            this.setState({clicked: true, imageUri : "assets/Miss.png"})
        }
    }

    render() {
        return (
            <button id={this.props.value} key={this.props.value} className="square" onClick={this.handleClick}>
                {this.state.clicked && <img class="hitmiss" src={this.state.imageUri}/>}
            </button>
        );
    }
}

class ScoreBoard extends React.Component {
    render() {
        return (
            <div className="scoreBoard">
                <div className="scoreTile player1">
                    <div className="score">00</div>
                    <hr className="scoreLine" />
                    <div className="player">player 1</div>
                </div>
                <div className="scoreTile player2">
                    <div className="score">00</div>
                    <hr className="scoreLine" />
                    <div className="player">player 2</div>
                </div>
            </div>
        );
    }
}

class ShipInfo extends React.Component {
    renderShip(shipType, count) {
        var shipImgsDict = {
            battleship: "assets/Battleship Shape.png",
            carrier: "assets/Aircraft Shape.png",
            submarine: "assets/Submarine Shape.png",
            cruiser: "assets/Cruiser Shape.png",
            destroyer: "assets/Carrier Shape.png",
        }
        let imgPath = shipImgsDict[shipType]
        let size = "o ".repeat(count)
        return (
            <div key={shipType} className="ship">
                <img className="shipType" src={imgPath} alt={shipType} />
                <div className="shipCount">{size}</div>
            </div>
        )
    }

    render() {
        let shipInfo = []
        for (let ship in shipData.shipTypes) {
            //console.log(ship + " : " + shipData.shipTypes[ship].size)
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
    renderSquare(i, shipType) {
        return <Square value={i} />;
    }

    render() {
        var board = []
        for (let i = 0; i < 10; i++) {
            let squares = []
            for (let j = 0; j < 10; j++) {
                let coord = i + "," + j
                // if (coord in shipPositions){
                //     console.log(i + "," + j)
                // }else{
                    squares.push(this.renderSquare(coord))
                //}
            }
            let rowId = "row" + i;
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
    renderHeader(){
        return (
            <div className="header">
                <button className="menuBtn"/>
                <div className="searchBar"/>
                <button className="searchBtn"/>
                <button className="appBtn"/>
                <button className="appBtn"/>
                <button className="appBtn"/>
            </div>
        );
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <div className="game">
                    <Board />
                    <div className="game-info">
                        <ScoreBoard />
                        <ShipInfo />
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
