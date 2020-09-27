//Variables iniciales

// Aquí selecciona el div donde colocará el estado del juego
const statusDisplay = document.querySelector ('.game--status');

//Booleano de juego activo
let gameActive = true;

//Estado inicial de la variable jugador
let currentPlayer = 'X';
//Estado inicial de las jugadas realizadas, recordar que son máximo 9
let gameState = ['', '', '', '', '', '', '', '', ''];

//Función que imprime el string de anuncio de victoria
const winningMessage = () => `Player ${currentPlayer} has won!`;

//Función que imprime el string de anuncio de empate
const drawMessage = () => `Game ended in a draw!`;

//Función que imprime el string de anuncio de turno
const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

//Imprimir en el estado del juego el anuncio del turno
statusDisplay.innerHTML = currentPlayerTurn ();

//Combinaciones ganadoras: por fila, columna y diagonal
const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

//Funciones

function handleCellPlayed (clickedCell, clickedCellIndex) {
  //Definir los elementos del array de gameState según el índice de la celda clicada
  gameState[clickedCellIndex] = currentPlayer;
  //Introducir como texto dentro de la celda el nombre del jugador: "X" ó "O"
  clickedCell.innerHTML = currentPlayer;
}

function handlePlayerChange () {
  //Cambio de jugador, si es X, pásalo a O y viceversa
  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  //Cambiar el statusDisplay al cambiar el turno del jugador
  statusDisplay.innerHTML = currentPlayerTurn ();
}

function handleResultValidation () {
  //Estado general del juego
  let roundWon = false;
  //Análisis de las casillas, hasta 8 ya que son 8 combinaciones ganadoras
  for (let i = 0; i <= 7; i++) {
    //Revisar cada combinación ganadora y separar cada uno de sus elementos
    const winCondition = winningConditions[i];
    let a = gameState[winCondition[0]];
    let b = gameState[winCondition[1]];
    let c = gameState[winCondition[2]];
    //Si alguna de las celdas de juego está vacía, continuar
    if (a === '' || b === '' || c === '') {
      continue;
    }
    //Si una combinación ganadora tiene el mismo texto (jugador), cambiar estado general
    //del juego y romper el ciclo
    if (a === b && b === c) {
      roundWon = true;
      break;
    }
  }
  //Si el resultado es victoria, cambiar el anuncio a anuncio ganador y cambiar el estado
  //de juego activo
  if (roundWon) {
    statusDisplay.innerHTML = winningMessage ();
    gameActive = false;
    return;
  }

  //Si todas las celdas están llenas, declarar empate
  let roundDraw = !gameState.includes ('');
  if (roundDraw) {
    statusDisplay.innerHTML = drawMessage ();
    gameActive = false;
    return;
  }
  //Una vez analizado el juego, cambiar de jugador
  handlePlayerChange ();
}

function handleCellClick (clickedCellEvent) {
  //Elemento que generó el evento (div de celda clicada)
  const clickedCell = clickedCellEvent.target;
  //Obtener el indice de la celda clicada a partir del atributo data cell index
  const clickedCellIndex = parseInt (
    clickedCell.getAttribute ('data-cell-index')
  );

  //Si la celda clicada no está vacía o el juego se detuvo (por victoria o empate)
  //no hacer nada
  if (gameState[clickedCellIndex] !== '' || !gameActive) {
    return;
  }
  //Invocar función que cambia el estado del juego
  handleCellPlayed (clickedCell, clickedCellIndex);
  //Invocar análisis de las celdas (ya que si hubo un evento clic)
  handleResultValidation ();
}

//Función que reestablece los parámetros iniciales del juego
function handleRestartGame () {
  gameActive = true;
  currentPlayer = 'X';
  gameState = ['', '', '', '', '', '', '', '', ''];
  statusDisplay.innerHTML = currentPlayerTurn ();
  document.querySelectorAll ('.cell').forEach (cell => (cell.innerHTML = ''));
}
//Aplicar la función handleCellClick a cada celda ante un evento click
document
  .querySelectorAll ('.cell')
  .forEach (cell => cell.addEventListener ('click', handleCellClick));
//Restaurar juego al hacer click sobre el botón restart
document
  .querySelector ('.game--restart')
  .addEventListener ('click', handleRestartGame);
