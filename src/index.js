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
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => {
          this.props.onClick(i);
        }}
      />
    );
  }

  render() {
    return (
      <div>
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
  //Se agrega este constructor con el fin de manejar el historial
  constructor(props) {
    super(props);
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
        }
      ],
      stepNumber: 0,
      xIsNext: true
    };
  }
  //Se agrega el evento handleClick este me pintara las X o O
  handleClick(i) {
    //Se agrega el history
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    //El metodo slice devuelve una copia del array inicial sin modificarlo.(recibe el parametro de inicio y el de fin)
    const squares = current.squares.slice();
    //Se agrega validacion para verificar si ya se hizo triqui
    if (calculateWinner(squares) || squares[i]) {
      //Al tener este return se saldra y no ejecutara mas la funcion por lo que no pintara
      return;
    }
    //Se utiliza un operador ternario para definir si va X o O para eso utilizaremos nuestra variable xIsNext
    squares[i] = this.state.xIsNext ? "X" : "O";
    this.setState({
      //Manejando lo de la mutabilidad con concat no se muta el array anterior por esto es preferido me agrega el elemento pero no me cambia el original
      history: history.concat([
        {
          squares: squares,
        },
      ]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext,
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: step % 2 === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winner = calculateWinner(current.squares);

    const moves = history.map((step, move) => {
      const desc = move ? "Go to move #" + move : "Go to game start";
      return (
        <li key={move}>
          <button onClick={() => this.jumpTo(move)}>{desc}</button>
        </li>
      );
    });

    let status;
    if (winner) {
      status = "Winner: " + winner;
    } else {
      status = "Next player: " + (this.state.xIsNext ? "X" : "O");
    }

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
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
