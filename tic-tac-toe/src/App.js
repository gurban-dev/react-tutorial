import { useState } from 'react';

// value and onSquareClick are props.
// Props are read-only inputs passed from a parent
// component to a child.
// They let components share data and behavior.
function Square({ value, onSquareClick }) {
  return (
    <button className="square" onClick={onSquareClick}>
      {/* To render the JavaScript variable called value
          from your component, not the word “value” use
          curly braces to “escape into JavaScript” from JSX. */}
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    // i is the index of the square that was clicked.
    console.log(`Tile ${i} clicked.`);

    if (calculateWinner(squares) || squares[i]) {
      return;
    }

    // The JavaScript Array slice() method makes a shallow
    // copy of an array.
    // The copy is new, but its elements still reference
    // the same objects.
    // Mutating those objects also changes the original.
    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  }

  const winner = calculateWinner(squares);

  let status;

  if (winner) {
    status = 'Winner: ' + winner;
  } else {
    status = 'Next player: ' + (xIsNext ? 'X' : 'O');
  }

  return (
    // React components must return a single JSX elements.
    // For this reason, multiple JSX elements are wrapped
    // in fragments: <></>
    <>
      <div className="status">{status}</div>

      <div className="board-row">
        {/* Pass the handleClick() function to the onSquareClick
            prop that belongs to the Square component.
            
            When the square is clicked, the code after the => "arrow"
            will run, calling handleClick(0). */}
        <Square value={squares[0]} onSquareClick={() => handleClick(0)} />

        {/* The Square components are children of the Board component. */}
        <Square value={squares[1]} onSquareClick={() => handleClick(1)} />

        <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
      </div>

      <div className="board-row">
        <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
      </div>

      <div className="board-row">
        <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  );
}

// Preceding a component's name with export default marks it
// as the "main" value a JavaScript module chooses to expose.
export default function Game() {
  // The state variable "history" was lifted up into this Game component.
  // This makes it possible for two child components to communicate with
  // each other.

  // The Board and Square child components are communicating
  // with each other in this context.

  // Array(9).fill(null) creates an array with 9 elements,
  // all null.

  // Notice how two lines below, the array is enclosed
  // inside another array:
  // [Array(9).fill(null)]

  /*
  [
    [null, null, null, null, null, null, null, null, null], // move 0
    ['X', null, null, null, null, null, null, null, null],  // move 1
    ['X', null, null, null, 'O', null, null, null, null],   // move 2
    ...
  ]
  */
  const [history, setHistory] = useState([Array(9).fill(null)]);

  // The state variable currentMove is needed so that the
  // Game component can keep track of which step the user
  // is currently viewing.
  const [currentMove, setCurrentMove] = useState(0);

  // currentMove is an even number when X is being played
  // and an odd number when O is being played.
  const xIsNext = currentMove % 2 === 0;

  console.log('currentMove:', currentMove);

  // This way the Game component renders the currently
  // selected move.
  const currentSquares = history[currentMove];

  console.log('currentSquares: ' + currentSquares);

  function handlePlay(nextSquares) {
    console.log('...history.slice(0, currentMove + 1):', ...history.slice(0, currentMove + 1));

    console.log('nextSquares:', nextSquares);

    /* The .slice() method will make a shallow copy of all elements
       from the beginning (0) up to (but not including) index
       currentMove + 1.

       This effectively discards any "future" moves that exist
       after the current move.

       E.g.
       history = [a, b, c, d, e];
       currentMove = 2;

       // [a, b, c]
       history.slice(0, currentMove + 1);

       The spread operator (...) takes the resulting array and
       expands its elements into the new array being constructed.

       A new array (nextHistory) is created with:
       All the sliced history up to the current move.

       Plus the new nextSquares appended at the end.
    */
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];

    // Calling the setHistory() function will trigger a re-render
    // of the Board component and its children which are the Square
    // components.
    setHistory(nextHistory);

    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    console.log('nextMove:', nextMove);

    setCurrentMove(nextMove);
  }

  console.log('history:', history);

  const moves = history.map((squares, move) => {
    // squares is the current board state (each item in the history
    // array).
    // "squares" is a two-dimensional array/nested array.

    // move is the index of the current item in the "history" array.

    // Array.prototype.map() always calls the callback like this:
    // callback(currentElement, index, array)

    // If you only write one parameter then the "move"
    // parameter would receive the first argument, i.e.
    // the board state rather than the index.

    let description;

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    console.log('move:', move);

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });

  return (
    <div className="game">
      <div className="game-board">
        {/* The best approach is to store the game's state
            in the parent Board component instead of in each
            Square. The Board component can tell each Square
            what to display by passing a prop. */}
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moves}</ol>
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }

  return null;
}