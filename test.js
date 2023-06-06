import { GameBoard } from './index.js'

const game = GameBoard(8)
console.log('-------------------------------------------')
game.knightMoves([3, 3], [4, 3])
console.log('-------------------------------------------')
