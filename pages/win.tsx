import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Link from 'next/link';
//todo fetch props?

const Win: NextPage = () => {
  const [winner, setWinner] = useState('');
  useEffect(() => {
    const { gameOutcome } = JSON.parse(sessionStorage.getItem('tttState'));
    setWinner(gameOutcome);
  }, []);

  return (
    <main>
      <h1>Congratulations {winner}. You win!</h1>
      <Link href="/">
        <a>Play Again?</a>
      </Link>
    </main>
  );
};

export default Win;
