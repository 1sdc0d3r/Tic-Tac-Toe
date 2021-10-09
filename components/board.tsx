export default function Board(props: any) {
  //? typescript type with extracting tileCount
  const tileCount: number = props.tileCount;
  const tileState: any = props.tileState; //? typescript any->object
  const player: number = props.player;
  const toggleTile: (player: number, tileNumber: number) => void =
    props.toggleTile;

  const tiles = Array.from(Array(tileCount).keys(), (i) => i + 1); //creates array starting with 1
  return (
    <div className="board-wrapper w-3/4 h-3/4 border-2 border-solid border-black flex flex-wrap m-auto ">
      {tiles.map((e, i) => tile(e, i, tileState[e], player))}
    </div>
  );

  function tile(
    tileNumber: number,
    iterator: number,
    state: string,
    player: number
  ) {
    //   const color = iterator % 2 ? 'black' : 'white';
    // console.log({ tileNumber, state });
    return (
      <div
        className={`tile test-border w-1/3 h-1/3 flex overflow-hidden`}
        key={iterator}
        onClick={() => toggleTile(player, tileNumber)}
      >
        <p className="text-red-600 text-9xl w-win h-min m-auto text-center select-none">
          {state}
        </p>
      </div>
    );
  }
}
