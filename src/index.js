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
    //Se agrega validacion para verificar si ya se hizo triqui
    if(calculateWinner(squares) || squares[i]){
        //Al tener este return se saldra y no ejecutara mas la funcion por lo que no pintara
        return;
    }
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
    //Ahora llamaremos el ganador 
    const winner = calculateWinner(this.state.squares);
    let status;
    if(winner){
        status = 'Winner:' +winner;
    }else{
        status = 'Next player:' + (this.state.xIsNext ? 'X' : 'O');
    }

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

function calculateWinner(squares) {
  //Esta me dira cuando se gana
  const lines = [
    //Si se hace triqui en horizontal ---
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    //Si se hace triqui en vertical
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    //Por ultimo las 2 diagonales
    [0, 4, 8],
    [2, 4, 6],
  ];
  //Aca validaremos primero defino un for hasta el tamaño de la lista anterior
  for (let i = 0; i < lines.length; i++) {
    //Esta es una forma de decirle a javascript que mi primer elemento tendra una asignacion de variable de a la b como el segundo valor y asi con los elementos
    const [a, b, c] = lines[i];
    //Lo que retornara es el valor final donde termine en el a es decir O o X porque ese es el valor que tendria en ese momento
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// ========================================

ReactDOM.render(<Game />, document.getElementById("root"));
