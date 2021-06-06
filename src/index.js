import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//Se prueba como se recibe el componente
class Square extends React.Component {
  //El elemento setState me permite llevar el valor que en este caso es X al elemento
  render() {
    return (
      <button className="square" onClick={() => this.props.onClick()}>
        {this.props.value}
      </button>
    );
  }
}

//Se envia el value al componente Square
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Se define un arreglo con 9 valores y con el metodo .fill de javascript le digo que los 9 seran null
      squares: Array(9).fill(null),
    };
  }
  //Se agrega el evento handleClick este me pintara las X o O
  handleClick(i) {
    //El metodo slice devuelve una copia del array inicial sin modificarlo.(recibe el parametro de inicio y el de fin)
    const squares = this.state.squares.slice();
    squares[i] = 'X';
    this.setState({squares: squares});
  }
  renderSquare(i) {
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => {
          this.handleClick(i);
        }}
      />
    );
  }

  render() {
    const status = "Next player: X";

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
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

ReactDOM.render(<Game />, document.getElementById("root"));
