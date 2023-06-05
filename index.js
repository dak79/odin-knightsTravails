export const GameBoard = (boardSize) => {
    const size = boardSize
    const board = new Map()
    let x = 0
    let y = 0
    const knight = [
        [x - 1, y + 2],
        [x + 1, y + 2],
        [x - 2, y + 1],
        [x + 2, y + 1],
        [x - 2, y - 1],
        [x + 2, y - 1],
        [x - 1, y - 2],
        [x + 1, y - 2]
    ]

    const generateBoard = (s = size) => {
        for (let x = 0; x < s; x++) {
            for (let y = 0; y < s; y++) {
                board.set(`${[x, y]}`, [])
            }
        }
        return board
    }

    const possibleMove = (
        board = generateBoard(size),
        chess = knight,
        s = size
    ) => {
        for (let square of board.keys()) {
            let coordinate = [...square.replaceAll(',', '')].map((str) =>
                parseInt(str)
            )
            let [x, y] = coordinate
            chess.forEach((move) => {
                if (
                    move[0] + x >= 0 &&
                    move[1] + y >= 0 &&
                    move[0] + x < s &&
                    move[1] + y < s
                ) {
                    board.get(square).push([move[0] + x, move[1] + y])
                }
            })
        }
    }

    const printBoard = (b = board) => b
    /**
     * TODO:
     * Knight move with BFS - The shortest path.
     * argument = adjacency list create from possibleMove, start and end
     *
     *
     * */
    return {
        printBoard,
        possibleMove
    }
}