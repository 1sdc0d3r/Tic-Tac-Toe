export default function Board(props) {
    //? typescript type with extracting tileCount
    var tileCount = props.tileCount;
    var tileState = props.tileState; //? typescript any->object
    var player = props.player;
    var toggleTile = props.toggleTile;
    var tiles = Array.from(Array(tileCount).keys(), function (i) { return i + 1; }); //creates array starting with 1
    return (<div className="board-wrapper w-3/4 h-3/4 border-2 border-solid border-black flex flex-wrap m-auto ">
      {tiles.map(function (e, i) { return tile(e, i, tileState[e], player); })}
    </div>);
    function tile(tileNumber, iterator, state, player) {
        //   const color = iterator % 2 ? 'black' : 'white';
        // console.log({ tileNumber, state });
        return (<div className={"tile test-border w-1/3 h-1/3 flex overflow-hidden"} key={iterator} onClick={function () { return toggleTile(player, tileNumber); }}>
        <p className="text-red-600 text-9xl w-win h-min m-auto text-center">
          {state}
        </p>
      </div>);
    }
}
