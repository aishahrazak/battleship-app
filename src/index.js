import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import shipData from './shiplayout.json'

//Get all board coordinate where ship is on it and its corresponding ship type
var shipPositions = shipData.layout.reduce(function (layout, current){ return current.positions.forEach(pos => layout[pos] = current.ship), layout }, {})
const shipImgsDict = {
    battleship: "assets/Battleship Shape.png",
    carrier: "assets/Aircraft Shape.png",
    submarine: "assets/Submarine Shape.png",
    cruiser: "assets/Cruiser Shape.png",
    destroyer: "assets/Carrier Shape.png"
}

class Square extends React.Component {
    constructor(props){
        super(props)
        let shipType = ""
        let uri = null
        if (this.props.value in shipPositions){
            shipType = shipPositions[this.props.value]
            uri = shipImgsDict[shipType]
        }
        this.state = {
            clicked: false,
            ship: shipType,
            imageUri: uri,
            hitMissUri : ""
        };
    }

    handleClick =() => {
        //only update state for the first click. cant click twice
        if(this.state.clicked === false){
            if(this.state.ship !== ""){
                this.setState({clicked: true, hitMissUri : "assets/Hit.png"})
                this.props.updateShipCount(this.state.ship)
            }else{
                this.setState({clicked: true, hitMissUri : "assets/Miss.png"})
            }
        }
    }

    render() {
        return (
            <button id={this.props.value} className="square" onClick={this.handleClick}>
                {this.state.imageUri !== null && <img className="shipOnBoard" src={this.state.imageUri} alt="ship on board" hidden/>}
                {this.state.clicked && <img className="hitmiss" src={this.state.hitMissUri} alt="hit or miss fire"/>}
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
    renderShip(shipType) {
        let imgPath = shipImgsDict[shipType]
        let hitCount = this.props.shipCount[shipType].count
        let missCount = this.props.shipCount[shipType].size - hitCount
        return (
            <div key={shipType} className="ship">
                <img className="shipType" src={imgPath} alt={shipType} />
                <div className="shipCount">{missCount} {hitCount}</div>
            </div>
        )
    }

    render() {
        let shipInfo = []
        for (let ship in shipData.shipTypes) {
            shipInfo.push(this.renderShip(ship))
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
        return <Square value={i} key={i} updateShipCount={this.props.updateShipCount}/>;
    }

    render() {
        var board = []
        for (let i = 0; i < 10; i++) {
            let squares = []
            for (let j = 0; j < 10; j++) {
                let coord = i + "," + j
                squares.push(this.renderSquare(coord))
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
    constructor(props){
        super(props)
        //Initialize each ship type hit counts
        var hitMissCount = shipData.shipTypes
        for (let ship in hitMissCount){
            hitMissCount[ship].count = 0
        }
        this.state = {
            shipHitMissCount : hitMissCount
        }
        //Bind the function
        this.updateCount = this.updateCount.bind(this)
    }

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

    updateCount(val){
        this.setState(prevState => {
            let oldCounts = {...prevState.shipHitMissCount}
            oldCounts[val].count ++
            return {oldCounts}
        })
    }

    render() {
        return (
            <div>
                {this.renderHeader()}
                <div className="game">
                    <Board updateShipCount={this.updateCount}/>
                    <div className="game-info">
                        <ScoreBoard />
                        <ShipInfo shipCount={this.state.shipHitMissCount}/>
                    </div>
                </div>
            </div>
        );
    }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);
