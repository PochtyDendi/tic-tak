import React, { Component } from 'react';
import './App.css';
import Announcement from './Announcement';
import ResetButton from './ResetButton';
import Tile from './Tile';

class App extends Component {
  constructor() {
      super();
      this.getInitialState();
      this.state = {
        gameBoard: [[1],[1]],
                  walking: 1
      }
  }

  getInitialState() {
    return fetch('http://606ep.ru:8080/').then(result=>result.json())
      .then(items=> {
        this.setState({gameBoard: items, winner: null, moves: 0})
        console.log('90909=====',this.state.gameBoard);
      })

  }

  getWinner(player) {
    return player === 1 ? 'x' : 'o';
  }

  updateBoard(row, column, player) {
    if(this.state.gameBoard[row][column] === 1 || this.state.gameBoard[row][column] === -1 || this.state.winner ){
      return;
    }

    let currentGameBoard = this.state.gameBoard;
    currentGameBoard[row][column] = player;
    this.setState({gameBoard: currentGameBoard});

    let topRow = this.state.gameBoard[0][0] + this.state.gameBoard[0][1] + this.state.gameBoard[0][2]; 
    if (topRow === 3 || topRow === -3) {
      this.setState({winner: this.getWinner(this.state.walking)});
      return;
    }

    let middleRow = this.state.gameBoard[1][0] + this.state.gameBoard[1][1] + this.state.gameBoard[1][2];
    console.log('middleRow', middleRow);
    if (middleRow === 3 || middleRow === -3) {
      this.setState({winner: this.getWinner(this.state.walking)});
      return;
    }

    let bottomRow = this.state.gameBoard[2][0] + this.state.gameBoard[2][1] + this.state.gameBoard[2][2];
    console.log('bottomRow', bottomRow);
    if (bottomRow === 3 || bottomRow === -3) {
     this.setState({winner: this.getWinner(this.state.walking)});
      return;
    }

    let leftCol = this.state.gameBoard[0][0] + this.state.gameBoard[1][0] + this.state.gameBoard[2][0];
    console.log('leftCol', leftCol);
    if (leftCol === 3 || leftCol === -3) {
      this.setState({winner: this.getWinner(this.state.walking)});
      return;
    }

    let middleCol = this.state.gameBoard[0][1] + this.state.gameBoard[1][1] + this.state.gameBoard[2][1];
     console.log('middleCol', middleCol);
    if (middleCol === 3 || middleCol === -3) {
      this.setState({winner: this.getWinner(this.state.walking)});
      return;
    }

    let rightCol = this.state.gameBoard[0][2] + this.state.gameBoard[1][2] + this.state.gameBoard[2][2];
    console.log('rightCol', rightCol);
    if (rightCol === 3 || rightCol === -3) {
      this.setState({winner: this.getWinner(this.state.walking)});
      return;
    }

    let leftDiag = this.state.gameBoard[0][0] + this.state.gameBoard[1][1] + this.state.gameBoard[2][2];
    console.log('leftDiag', leftDiag);
    if (leftDiag === 3 || leftDiag === -3) {
      this.setState({winner: this.getWinner(this.state.walking)});
      return;
  }

    let rightDiag = this.state.gameBoard[0][2] + this.state.gameBoard[1][1] + this.state.gameBoard[2][0];
    console.log('rightDiag', rightDiag);
    if (rightDiag === 3 || rightDiag === -3) {
      this.setState({winner: this.getWinner(this.state.walking)});
      return;
  }

    this.gameIsEnd(this.state.gameBoard);
   
  
  this.setState({walking : this.state.walking === 1 ? -1 : 1});
}
  resetBoard(){
    this.getInitialState();
  }

  gameIsEnd(gameBoard){
    for (let i=0; i<gameBoard.length; i++){
      for (let j=0; j<gameBoard[i].length; j++){
        if (gameBoard[i][j] === 0){
          return;
        }
      }
    }
      

       this.setState({winner : 'невыявлен'});
      
  }
  getText(props) {
    console.log('get', props);
    switch(props) {
      case 1: return 'x';
      case -1: return 'o';
      default: return '';
    }
  }

  render() {
    console.count();
    var rows = this.state.gameBoard.map((row, i) => {
            var entry = row.map((element, j) => {
                return ( 
                    <Tile 
                       key={i+j}
                       row={i}
                       column={j}
                       value={element}
                       updateBoard={this.updateBoard.bind(this)}
                       walking={this.state.walking} />
                );
            });
            return (<div key={i}>{entry}</div>)
        });
        console.log(rows);
    return(
    <div className="container"> 
        <div className="menu">
            <h1> Крестики-нолики </h1>
            <h1> {'Ходит - ' + this.getText(this.state.walking)} </h1>
            <Announcement winner={this.state.winner}/>
            <ResetButton reset={this.resetBoard.bind(this)}/> 
        </div>
       {rows}
    </div> 
   );
  }
}

export default App;
