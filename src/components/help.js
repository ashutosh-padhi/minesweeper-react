export default function Help() {
    return (
        <div className="flex flex-col items-center">
            <div className="text-center w-[400px] mt-1">
                press{" "}
                <span className="font-mono bg-gray-500 text-white rounded p-1">
                    ctrl
                </span>{" "}
                for mark-mode. In mark-mode you can mark an unexplored tile as
                marked.
            </div>
            <div className="text-center">
                Minesweeper @ Made with React and Tailwind CSS
                <span className="text-rose-600">♥</span>
            </div>
        </div>
    );
}
