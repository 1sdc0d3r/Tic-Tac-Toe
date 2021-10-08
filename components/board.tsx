export default function Board(props: any) {
  //? typescript type with extracting tileCount
  const tileCount: number = props.tileCount;
  const tiles = Array.from(Array(tileCount).keys(), (i) => i + 1); //creates array starting with 1
  return (
    <div className="board-wrapper w-3/4 h-3/4 border-2 border-solid border-black flex flex-wrap m-auto ">
      {tiles.map((e, i) => tile(e, i))}
    </div>
  );
}

const tile = (tileNumber: number, iterator: number) => {
  return (
    <div className="tile test-border w-1/3 h-1/3" key={iterator}>
      <p className="text-red-600">{tileNumber}</p>
    </div>
  );
};
