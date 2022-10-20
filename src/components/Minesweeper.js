import React from "react";
import ControlBar from "./ControlBar";
import Help from "./help";
import MineModal from "./MineModal";
import MineModel from "./MineModel";
import TileRow from "./TileRow";

let btn = "w-32 p-1 rounded bg-sky-600 text-white m-2";
export default class Minesweeper extends React.Component {
    constructor(props) {
        super(props);
        this.mineModel = new MineModel(props.row, props.col, props.bomb);
        let mineModelState = this.mineModel.generateGameBoard();
        this.state = {
            model: mineModelState,
            markMode: false,
            gameOver: false,
            paused: false,
            won: false,
            remainingBombs: props.bomb,
            preStart: false,
        };
        this.bombPositions = new Set();
        this.gameContainer = React.createRef();
        this.controller = React.createRef();
    }

    updateMinedTile(row, col) {
        this.setState((prevState) => {
            let tile = this.mineModel.getTileOnPosition(prevState.model, [
                row,
                col,
            ]);
            if (!tile.mined) {
                if (prevState.markMode) {
                    tile.marked = !tile.marked;
                    if (tile.marked) {
                        this.bombPositions.add(tile.id);
                        if (
                            this.bombPositions.size === this.props.bomb &&
                            this.mineModel.compareBombPositions(
                                this.bombPositions
                            )
                        ) {
                            this.controller.current.stopClock();
                            let newState = this.mineModel.markAllMined(
                                prevState.model
                            );
                            newState.won = true;
                            newState.remainingBombs =
                                this.props.bomb - this.bombPositions.size;
                            return newState;
                        }
                    } else {
                        this.bombPositions.delete(tile.id);
                    }
                    return {
                        model: prevState.model,
                        remainingBombs:
                            this.props.bomb - this.bombPositions.size,
                    };
                }
                if (tile.isBomb && !tile.marked) {
                    this.controller.current.stopClock();
                    let newState = this.mineModel.markAllMined(prevState.model);
                    newState.gameOver = true;
                    return newState;
                }
                if (!tile.marked) {
                    tile.mined = true;
                    if (tile.bombCount === 0)
                        return this.mineModel.clearEmptyTiles(
                            prevState.model,
                            [row, col],
                            (t) => {
                                t.marked = false;
                                this.bombPositions.delete(t.id);
                            }
                        );
                }
            }
            return {};
        });
    }
    /**
     * @param {React.KeyboardEvent} e
     */
    handleCtrlKeydown(e) {
        if (e.ctrlKey) {
            this.setState({ markMode: true });
        }
    }
    /**
     * @param {React.KeyboardEvent} e
     */
    handleCtrlKeyup(e) {
        if (!e.ctrlKey) {
            this.setState({ markMode: false });
        }
    }
    componentDidMount() {
        this.focusGame();
    }
    componentDidUpdate() {
        this.focusGame();
    }
    focusGame() {
        this.gameContainer.current.focus();
    }
    restartGame() {
        this.setState({
            model: this.mineModel.generateGameBoard(),
            gameOver: false,
            won: false,
            paused: false,
            remainingBombs: this.props.bomb,
            preStart: false,
        });
        this.controller.current.resetClock();
        this.bombPositions.clear();
    }
    render() {
        var that = this;
        return (
            <div
                className={`w-full flex flex-col items-center cursor-bomb-marker h-full`}
                tabIndex={0}
                ref={this.gameContainer}
                onKeyDown={this.handleCtrlKeydown.bind(this)}
                onKeyUp={this.handleCtrlKeyup.bind(this)}
            >
                <ControlBar
                    ref={this.controller}
                    onRestart={() => this.restartGame()}
                    onPause={() => {
                        this.setState({ paused: true });
                        this.controller.current.stopClock();
                    }}
                    hidePause={this.state.preStart}
                    bombs={this.state.remainingBombs}
                />
                {this.state.gameOver && (
                    <MineModal
                        title={() => "Game Over!"}
                        actions={() => (
                            <>
                                <button
                                    className={btn}
                                    onClick={this.restartGame.bind(this)}
                                >
                                    Restart
                                </button>
                                <button
                                    className={btn}
                                    onClick={() => {
                                        this.setState({
                                            gameOver: false,
                                            preStart: true,
                                        });
                                    }}
                                >
                                    Show Game
                                </button>
                            </>
                        )}
                    />
                )}
                {this.state.paused && (
                    <MineModal
                        title={() => "Paused !"}
                        actions={() => (
                            <button
                                className={btn}
                                onClick={() => {
                                    this.setState({ paused: false });
                                    this.controller.current.startClock();
                                }}
                            >
                                Resume
                            </button>
                        )}
                    />
                )}
                {this.state.won && (
                    <MineModal
                        title={() => "You Won :)"}
                        actions={() => (
                            <>
                                <button
                                    className={btn}
                                    onClick={this.restartGame.bind(this)}
                                >
                                    Restart
                                </button>
                                <button
                                    className={btn}
                                    onClick={() => {
                                        this.setState({
                                            won: false,
                                            preStart: true,
                                        });
                                    }}
                                >
                                    Show Game
                                </button>
                            </>
                        )}
                    />
                )}
                <div
                    className={
                        this.state.markMode
                            ? "cursor-[url(../public/images/flag.png),auto]"
                            : "cursor-pointer"
                    }
                >
                    {this.state.model.map((row, index) => {
                        return (
                            <TileRow
                                row={row}
                                rowId={index}
                                key={index}
                                tileClicked={(r, c) =>
                                    that.updateMinedTile(r, c)
                                }
                            />
                        );
                    })}
                </div>
                <Help />
            </div>
        );
    }
}
