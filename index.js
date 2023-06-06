import { Queque } from './queque.js'

/**
 * GameBoard.
 * Factory for creating the game
 * @param {Number} boardSize - Size of board
 */
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

    /**
     * generateBoard.
     * Generate the vertices of board
     * @param {Number} s - Size
     * @returns {Map} S * S board / vertices
     */
    const generateBoard = (s = size) => {
        for (let x = 0; x < s; x++) {
            for (let y = 0; y < s; y++) {
                board.set(`${[x, y]}`, [])
            }
        }
        return board
    }

    /**
     * possibleMoves.
     * Create the edges according to the movent rule of a chess
     * @param {Map} board - Graph with only vertices
     * @param {Number[][]} chess - Rule of movement
     * @param {Number} s - Board size
     * @returns {Map} edges in an adjacency list.
     */
    const possibleMoves = (
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

        return board
    }

    /**
     * findPath.
     * Find the shortest path between source and dest with BFS
     * @param {Number[]} source - Starting square
     * @param {Number[]} dest - Final square
     * @param {Map} moves - Complete Graph with vertex and edges in an adjacency
     * list.
     * @param {Object[]} visited - visited squares
     * @returns {Object[]} visited square with distance from source and path
     */
    const findPath = (source, dest, moves = possibleMoves(), visited = {}) => {
        for (let vertex of moves.keys()) {
            visited[vertex] = { distance: null, predecessor: null }
        }
        visited[source.toString()].distance = 0

        const queque = Queque()
        queque.enqueque(source)

        while (!queque.isEmpty()) {
            const u = queque.dequeque()
            const neigh = moves.get(u.toString())

            for (let i = 0; i < neigh.length; i++) {
                let v = neigh[i]
                if (visited[v.toString()].distance === null) {
                    visited[v.toString()].distance =
                        visited[u.toString()].distance + 1
                    visited[v.toString()].predecessor = u
                    queque.enqueque(v)
                    if (JSON.stringify(u) === JSON.stringify(dest)) {
                        return visited
                    }
                }
            }
        }
        return visited
    }

    /**
     * validInput.
     * Check if the input exist and it is on the chessboard
     * @param {Number[]} input
     * @param {Number} s
     * @returns {Boolean}
     */
    const validInput = (input, s = size) => {
        if (input) {
            let [x, y] = input
            return x >= 0 && y >= 0 && x < s && y < s ? true : false
        }

        return false
    }

    /**
     * knightMoves.
     * Compute and print the shortest path.
     *
     * @param {Number[]} source - Coordinate of starting square
     * @param {Number[]} dest - Coordinate of the end square
     */
    const knightMoves = (source, dest) => {
        if (validInput(source) && validInput(dest)) {
            const path = findPath(source, dest)
            let dist = path[dest.toString()].distance
            let moves = []
            moves.push(dest.toString())
            let curr = path[dest.toString()].predecessor
            while (curr) {
                moves.push(curr.toString()).predecessor
                curr = path[curr.toString()].predecessor
            }
            const movesLength = moves.length
            console.log(`You made it in ${dist} moves! Here your path:\n`)
            for (let i = movesLength - 1; i >= 0; i--) {
                console.log(`[${moves[i]}]\n`)
            }
            return 0
        }

        console.log('Error: source or destination not valid')
        return 'Error'
    }

    return {
        knightMoves
    }
}
