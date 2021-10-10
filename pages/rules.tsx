import type { NextPage } from 'next';

const Rules: NextPage = () => {
  return (
    <main>
      <h1>Rules of Tic-Tac-Toe</h1>
      <ol>
        <li>
          The game is played on a grid that&apos;s 3 squares by 3 squares.
        </li>
        <li>
          You are X or O, your friend (or possibly the computer) is X or O that
          hasn&apos;t been chosen. Players take turns putting their marks in
          empty squares.
        </li>
        <li>
          The first player to get 3 of her marks in a row (up, down, across, or
          diagonally) is the winner.
        </li>
        <li>
          When all 9 squares are full, the game is over. If no player has 3
          marks in a row, the game ends in a tie and no points are awarded (if
          playing multiple games).
        </li>
      </ol>
    </main>
  );
};

export default Rules;
