export default class MineModel {
    static TileDirection = Object.freeze({
        LEFT: "L",
        RIGHT: "R",
        TOP: "T",
        BOTTOM: "B",
        TOP_LEFT: "TL",
        TOP_RIGHT: "TR",
        BOTTOM_LEFT: "BL",
        BOTTOM_RIGHT: "BR",
    });
    constructor(row, col, bomb) {
        this.row = row;
        this.col = col;
        this.bomb = bomb;
    }
    generateGameBoard() {
        let mineModel = [];
        for (let i = 0; i < this.row; i++) {
            let mineRow = [];
            for (let j = 0; j < this.col; j++) {
                mineRow.push({
                    mined: false,
                    isBomb: false,
                    id: i * this.col + j,
                    bombCount: 0,
                    marked: false,
                });
            }
            mineModel.push(mineRow);
        }
        let bombCoordinates = this.generateRandomBombPosition();
        bombCoordinates.forEach((b) => {
            mineModel[b[0]][b[1]].isBomb = true;
            this.reportBombOnSurroundingTiles(mineModel, b);
        });
        return mineModel;
    }
    reportBombOnSurroundingTiles(model, pos) {
        for (let dirName in MineModel.TileDirection) {
            let tile = this.getTileOnPosition(
                model,
                this.getPositionOnDirection(
                    MineModel.TileDirection[dirName],
                    pos
                )
            );
            if (tile) tile.bombCount++;
        }
    }

    getTileOnPosition(model, pos) {
        if (
            model[pos[0]] === undefined ||
            model[pos[0]][pos[1]] === undefined
        ) {
            return null;
        }
        return model[pos[0]][pos[1]];
    }
    getPositionOnDirection(dir, pos) {
        var [row, col] = pos;
        switch (dir) {
            case MineModel.TileDirection.TOP:
                return [row - 1, col];
            case MineModel.TileDirection.BOTTOM:
                return [row + 1, col];
            case MineModel.TileDirection.LEFT:
                return [row, col - 1];
            case MineModel.TileDirection.RIGHT:
                return [row, col + 1];
            case MineModel.TileDirection.TOP_LEFT:
                return [row - 1, col - 1];
            case MineModel.TileDirection.TOP_RIGHT:
                return [row - 1, col + 1];
            case MineModel.TileDirection.BOTTOM_LEFT:
                return [row + 1, col - 1];
            case MineModel.TileDirection.BOTTOM_RIGHT:
                return [row + 1, col + 1];
            default:
                throw new Error("Direction is invalid");
        }
    }
    clearEmptyTiles(model, pos, onMarkedTileFound) {
        let traversedTiles = new Set();
        let traversalQueue = [pos];
        while (traversalQueue.length !== 0) {
            let thisPos = traversalQueue.shift();
            let tile = this.getTileOnPosition(model, thisPos);
            if (!tile || traversedTiles.has(tile.id)) continue;
            traversedTiles.add(tile.id);
            tile.mined = true;
            if (tile.marked && onMarkedTileFound) {
                onMarkedTileFound(tile);
            }
            if (tile.bombCount !== 0) continue;
            for (let dirName in MineModel.TileDirection) {
                let tempPos = this.getPositionOnDirection(
                    MineModel.TileDirection[dirName],
                    thisPos
                );
                traversalQueue.push(tempPos);
            }
        }
        return { model };
    }
    markAllMined(model) {
        for (let row = 0; row < this.row; row++) {
            for (let col = 0; col < this.col; col++) {
                model[row][col].mined = true;
            }
        }
        return { model };
    }
    generateRandomBombPosition() {
        let bombPositions = new Set();
        let maxIndex = this.row * this.col;
        let bombCoordinates = [];
        while (bombPositions.size < this.bomb) {
            let newBombPosition = Math.floor(Math.random() * maxIndex);
            if (!bombPositions.has(newBombPosition)) {
                bombCoordinates.push([
                    Math.floor(newBombPosition / this.col),
                    newBombPosition % this.col,
                ]);
            }
            bombPositions.add(newBombPosition);
        }
        this.bombPositions = bombPositions;
        return bombCoordinates;
    }
    compareBombPositions(bombs) {
        let isSuccess = true;
        for (let bombPos of bombs) {
            isSuccess &&= this.bombPositions.has(bombPos);
        }
        console.log("compared");
        return isSuccess;
    }
}
