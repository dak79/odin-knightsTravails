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

    const printBoard = (b = board) => b
    /**
     * TODO:
     * Optimize, readability.
     *
     *
     * */
    const findPath = (
        source,
        dest,
        moves = possibleMoves(),
        visited = {},
        path = []
    ) => {
        for (let vertex of moves.keys()) {
            visited[vertex] = { distance: null, predecessor: null }
        }
        // console.log(visited)
        visited[source.toString()].distance = 0
        // console.log(visited)
        const queque = []
        queque.push(source)

        while (queque.length > 0) {
            let u = queque.shift()
            // console.log(u)
            let n = moves.get(u.toString())
            // console.log('n', n)

            for (let i = 0; i < n.length; i++) {
                let v = n[i]
                // console.log(v)
                if (visited[v.toString()].distance === null) {
                    visited[v.toString()].distance =
                        visited[u.toString()].distance + 1
                    visited[v.toString()].predecessor = u
                    queque.push(v)
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
            console.log(path)
            let dist = path[dest.toString()].distance
            let moves = []
            let curr = path[dest.toString()].predecessor
            while (curr) {
                moves.unshift(curr.toString()).predecessor
                curr = path[curr.toString()].predecessor
            }
            moves.push(dest.toString())

            console.log(`You made it in ${dist} moves! Here your path:\n`)
            for (let move in moves) {
                console.log(`[${moves[move]}]\n`)
            }
            return 0
        }

        console.log('Error: source or destination not valid')
        return 'Error'
    }

    return {
        printBoard,
        possibleMoves,
        findPath,
        knightMoves
    }
}
