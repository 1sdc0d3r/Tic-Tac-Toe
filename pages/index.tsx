import type { NextPage } from 'next';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Board from '../dist/board';

//todo keep state (session storage)
//todo create a "WIN/Stalemate/Lose" page/layover of index
//todo play against computer
//todo choose play style (PvP || PvC)

const Home: NextPage = () => {
  const [tileState, setTileState] = useState({});
  const [activePlayer, setActivePlayer] = useState(0);
  const [moveCount, setMoveCount] = useState(0);
  const [gameActive, setGameActive] = useState(true);
  const [gameOutcome, setGameOutcome] = useState(null);
  const [winCount, setWinCount] = useState({ X: 0, O: 0 });
  const [gameCount, setGameCount] = useState(0);

  function toggleTile(player: number, tileNumber: number): void {
    if (!tileState[tileNumber] && gameActive) {
      // Only run function if tile has not been selected
      const symbol = player ? 'X' : 'O';
      setActivePlayer(player ? 0 : 1);
      setTileState({ ...tileState, [tileNumber]: symbol });
      setMoveCount(moveCount + 1);
    } else if (!gameActive) console.log('game already over');
    else console.log('tile taken');
  }
  //* check win
  useEffect(() => {
    let win: boolean = false;

    const possibleWins: number[][] = [
      [1, 2, 3], //row-top
      [4, 5, 6], //row-middle
      [7, 8, 9], //row-bottom
      [1, 4, 7], //column-left
      [2, 5, 8], //column-middle
      [3, 6, 9], //column-right
      [1, 5, 9], //diagonal-topL-bottomR
      [3, 5, 7], //diagonal-topR-bottomL
    ];

    if (Object.keys(tileState).length > 3 && !win) {
      possibleWins.forEach((arr) => {
        const values: number[] = arr.map((tile: number) => tileState[tile]);
        if (
          !values.includes(undefined) &&
          values[0] === values[1] &&
          values[0] === values[2] &&
          !win //* reduce runtime
        ) {
          console.log('WIN');
          setGameActive(false);
          setGameOutcome(values[0]);
          setWinCount({ ...winCount, [values[0]]: winCount[values[0]] + 1 });
          setGameCount(gameCount + 1);
          win = true;
        }
      });
    }
    if (!win && moveCount === 9) {
      setGameActive(false);
      setGameCount(gameCount + 1);
      console.log('staleMate');
    }
  }, [tileState]);

  function saveSession(): void {
    sessionStorage.setItem(
      'tttState',
      JSON.stringify({
        tileState,
        activePlayer,
        moveCount,
        gameActive,
        gameOutcome,
        winCount,
        gameCount,
      })
    ); //? better to set each key:value separate or as object
  }

  function resetGame() {
    setTileState({});
    setActivePlayer(0);
    setMoveCount(0);
    setGameActive(true);
    setGameOutcome(null);
    setWinCount({ X: 0, O: 0 });
  }

  function newGame() {
    if (!gameActive) {
      setTileState({});
      setActivePlayer(gameOutcome === 'O' ? 0 : 1); //todo set to winning player
      setMoveCount(0);
      setGameActive(true);
      //todo update player win count
    } else console.log('Please finish current game first');
  }

  return (
    <div className="h-screen">
      <Head>
        <title>Tic-Tac-Toe</title>
        <meta
          name="description"
          content="Tic-Tac-Toe game created in Next.js"
        />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>

      <main className="h-full w-full test-border flex flex-col">
        <h1>
          O: {winCount['O']} X: {winCount['X']} Games Played: {gameCount}
        </h1>
        <h2>Player Turn: {activePlayer ? 'X' : 'O'}</h2>
        <Board
          tileCount={9}
          tileState={tileState}
          player={activePlayer}
          toggleTile={toggleTile}
        />
        <button onClick={resetGame}>Reset</button>
        {/* //! change color on win/stalemate */}
        <button onClick={newGame}>New Game</button>
        <Link href="/rules">
          <a className="w-min self-center hover:text-blue-400">Rules</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
