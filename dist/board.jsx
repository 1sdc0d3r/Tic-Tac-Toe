export default function Board(props) {
    //? typescript type with extracting tileCount
    var tileCount = props.tileCount;
    var tiles = Array.from(Array(tileCount).keys(), function (i) { return i + 1; }); //creates array starting with 1
    return (<div className="board-wrapper w-3/4 h-3/4 border-2 border-solid border-black flex flex-wrap m-auto ">
      {tiles.map(function (e, i) { return tile(e, i); })}
    </div>);
}
var tile = function (tileNumber, iterator) {
    return (<div className="tile test-border w-1/3 h-1/3" key={iterator}>
      <p className="text-red-600">{tileNumber}</p>
    </div>);
};
