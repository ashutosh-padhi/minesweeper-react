let TileBg = [
    "bg-yellow-50",
    "bg-yellow-100",
    "bg-yellow-200",
    "bg-yellow-300",
    "bg-yellow-400",
    "bg-yellow-500",
    "bg-yellow-600",
    "bg-yellow-700",
    "bg-yellow-800",
];
export default function Tile(props) {
    let tile = props.value;
    return (
        <div
            className={`w-[40px] h-[40px] flex justify-center 
            border border-white items-center text-xl 
            ${tile.mined ? TileBg[tile.bombCount] : "bg-gray-300"} ${
                tile.marked
                    ? "bg-[url(../public/images/flag.png)] bg-center bg-no-repeat"
                    : ""
            } ${
                tile.mined && tile.isBomb
                    ? "bg-[url(../public/images/bomb.png)] bg-center bg-no-repeat"
                    : ""
            }`}
            onClick={() => props.tileClicked(props.row, props.col)}
        >
            {tile.bombCount !== 0 && tile.mined && !tile.isBomb
                ? tile.bombCount
                : ""}
        </div>
    );
}
