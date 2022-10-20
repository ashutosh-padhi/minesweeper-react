export default function Setup(props) {
    return (
        <div className="w-full flex items-center flex-col">
            <img
                src="./logo512.png"
                className="w-[150px] rounded mt-4"
                alt="minesweeper logo"
            />
            <div className="text-6xl mb-4 mt-2">Minesweeper</div>
            <div className="mb-4">
                <span className="text-xl pr-1">Grid size:</span>
                <input
                    className="border-slate-400 border rounded p-1 w-[60px] text-center text-xl"
                    onChange={(e) => props.rowChange(e.target.value)}
                    value={props.row}
                ></input>
                <span className="text-2xl px-1">×</span>
                <input
                    className="border-slate-400 border rounded p-1 w-[60px] text-center text-xl"
                    onChange={(e) => props.colChange(e.target.value)}
                    value={props.col}
                ></input>
            </div>
            <div className="mb-4">
                <span className="text-xl pr-1">Bomb count:</span>
                <input
                    className="border-slate-400 border rounded p-1 w-[60px] text-center text-xl"
                    onChange={(e) => props.bombChange(+e.target.value)}
                    value={props.bomb}
                ></input>
            </div>
            <button
                className="bg-sky-600 text-white rounded w-24 text-xl p-1 font-bold"
                onClick={() => props.gameStart()}
            >
                start
            </button>
        </div>
    );
}
