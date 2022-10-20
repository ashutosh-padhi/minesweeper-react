import Tile from "./Tile";

export default function TileRow(props) {
    return (
        <div className="flex">
            {props.row.map((col, index) => {
                return (
                    <Tile
                        value={col}
                        col={index}
                        row={props.rowId}
                        key={index}
                        tileClicked={props.tileClicked}
                    />
                );
            })}
        </div>
    );
}
