import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Board from '../dist/board';

const Home: NextPage = () => {
  const router = useRouter();

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
    let gameOver: boolean = false;

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
    if (!gameOver && moveCount === 9) {
      setGameActive(false);
      setGameCount(gameCount + 1);
      gameOver = true;
      router.push('/stalemate');
    } else if (Object.keys(tileState).length > 3 && !gameOver) {
      possibleWins.forEach((arr) => {
        const values: number[] = arr.map((tile: number) => tileState[tile]);
        if (
          !values.includes(undefined) &&
          values[0] === values[1] &&
          values[0] === values[2] &&
          !gameOver //* reduce runtime
        ) {
          console.log('WIN');
          setGameActive(false);
          setGameOutcome(values[0]);
          setWinCount({ ...winCount, [values[0]]: winCount[values[0]] + 1 });
          setGameCount(gameCount + 1);
          gameOver = true;
        }
      });
    }
    //todo stalemate page
    if (gameOver)
      setTimeout(() => {
        router.push('/win');
      }, 500);
  }, [tileState]);

  function saveSession(): void {
    sessionStorage.setItem(
      'tttState',
      JSON.stringify({
        winCount,
        gameCount,
        gameOutcome,
      })
    ); //? better to set each key:value separate or as object
  }

  useEffect((): void => {
    const sessionRestore = JSON.parse(sessionStorage.getItem('tttState'));
    if (sessionRestore) {
      const { winCount, gameCount, gameOutcome } = sessionRestore;
      setWinCount(winCount);
      setGameCount(gameCount);
      setGameOutcome(gameOutcome);
      setActivePlayer(gameOutcome === 'O' ? 0 : 1);
    }
  }, []);

  useEffect((): void => {
    saveSession();
  }, [gameCount]);

  function resetGame(): void {
    setTileState({});
    setActivePlayer(0);
    setMoveCount(0);
    setGameActive(true);
    setGameOutcome(null);
    setWinCount({ X: 0, O: 0 });
  }

  // function newGame(): void {
  //   if (!gameActive) {
  //     setTileState({});
  //     setActivePlayer(gameOutcome === 'O' ? 0 : 1);
  //     setMoveCount(0);
  //     setGameActive(true);
  //   } else console.log('Please finish current game first');
  // }

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
        {/* <button onClick={newGame}>New Game</button> */}
        <Link href="/rules">
          <a className="w-min self-center hover:text-blue-400">Rules</a>
        </Link>
      </main>
    </div>
  );
};

export default Home;
