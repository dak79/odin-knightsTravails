import { Queque } from './queque.js'

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

    const validInput = (input, s = size) => {
        if (input) {
            let [x, y] = input
            return x >= 0 && y >= 0 && x < s && y < s ? true : false
        }

        return false
    }

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
