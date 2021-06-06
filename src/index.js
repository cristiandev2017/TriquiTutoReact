import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

//Se convierte en un componente tipo funcion evitando que se renderice y simplemente se envie algo para renderizar por otro componente.Se reciben los props por parametro
function Square(props) {
  return (
    //Se quita el this en el onClick porque es algo que ya viene como parametro de la board y no en el contexto en el que me encuentro
    //Se quita la funcion de flecha react reconoce el onClick como funcion
    <button className="square" onClick={props.onClick}>
      {props.value}
    </button>
  );
}

//Se envia el value al componente Square
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //Se define un arreglo con 9 valores y con el metodo .fill de javascript le digo que los 9 seran null
      squares: Array(9).fill(null),
      //Se deine un nuevo parametro indicando si ya se marco la X para que nos aparezca la O
      xIsNext: true,
    };
  }
  //Se agrega el evento handleClick este me pintara las X o O
  handleClick(i) {
    //El metodo slice devuelve una copia del array inicial sin modificarlo.(recibe el parametro de inicio y el de fin)
    const squares = this.state.squares.slice();
    //Se utiliza un operador ternario para definir si va X o O para eso utilizaremos nuestra variable xIsNext
    squares[i] = this.state.xIsNext ? "X" : "O";
    //Como el set es el que me envia el dato aca estamos mandando el que tenemos definido en la linea anterior
    this.setState({ squares: squares, xIsNext: !this.state.xIsNext });
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
    const status = "Next player:"+(this.state.xIsNext ? 'X' : 'O');

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
