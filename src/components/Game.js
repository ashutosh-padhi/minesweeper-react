import React from "react";
import Minesweeper from "./Minesweeper";
import Setup from "./Setup";

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            setup: false,
            row: 12,
            col: 20,
            bomb: 26,
            markMode: false,
        };
    }
    render() {
        return (
            <div>
                {this.state.setup ? (
                    <Minesweeper
                        row={this.state.row}
                        col={this.state.col}
                        bomb={this.state.bomb}
                    />
                ) : (
                    <Setup
                        gameStart={() => {
                            this.setState({ setup: true });
                        }}
                        colChange={(col) => this.setState({ col })}
                        rowChange={(row) => this.setState({ row })}
                        bombChange={(bomb) => this.setState({ bomb })}
                        row={this.state.row}
                        col={this.state.col}
                        bomb={this.state.bomb}
                    />
                )}
                <div className="flex justify-center m-3">
                    &copy; all rights reserved with Ashutosh Padhi
                </div>
            </div>
        );
    }
}
