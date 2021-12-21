import Board from '../board'
import {DOT_KIND} from '../dot'
import Pos from '../pos'

test('Board', () => {
  const board = new Board(5)
  // 0, 1, 1, 1, 1,
  // 0, 0, 1, 0, 0,
  // 2, 0, 1, 1, 1,
  // 1, 2, 0, 0, 1,
  // 1, 0, 0, 0, 1,
  board.setKind(0, 1, DOT_KIND.BLACK)
  board.setKind(0, 2, DOT_KIND.BLACK)
  board.setKind(0, 3, DOT_KIND.BLACK)
  board.setKind(0, 4, DOT_KIND.BLACK)
  board.setKind(1, 2, DOT_KIND.BLACK)
  board.setKind(2, 0, DOT_KIND.WHITE)
  board.setKind(2, 2, DOT_KIND.BLACK)
  board.setKind(2, 3, DOT_KIND.BLACK)
  board.setKind(2, 4, DOT_KIND.BLACK)
  board.setKind(3, 0, DOT_KIND.BLACK)
  board.setKind(3, 1, DOT_KIND.WHITE)
  board.setKind(3, 4, DOT_KIND.BLACK)
  board.setKind(4, 0, DOT_KIND.BLACK)
  board.setKind(4, 4, DOT_KIND.BLACK)
  expect(board.isBlank(0, 0)).toBeTruthy()
  expect(board.isBlank(0, 1)).toBeFalsy()
  expect(board.isBlank(2, 2)).toBeFalsy()
  expect(board.isBlank(4, 3)).toBeTruthy()
  expect(board.getKind(2, 2)).toBe(DOT_KIND.BLACK)
  expect(board.getKind(3, 1)).toBe(DOT_KIND.WHITE)
  board.kill(2, 2)
  expect(board.isBlank(2, 2)).toBeTruthy()
  expect(board.getSurroundingBlanks(2, 3)).toHaveLength(3)
  expect(board.getSurroundingBlanks(4, 0)).toEqual([new Pos(4, 1)])
  expect(board.getSurroundingPieces(3, 3, DOT_KIND.BLACK)).toHaveLength(2)
  expect(board.getSurroundingPieces(1, 4, DOT_KIND.WHITE)).toHaveLength(0)
})
