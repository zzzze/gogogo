import Block from '../block'
import {DOT_KIND} from '../dot'
import Piece from '../piece'
import Pieces from '../pieces'
import Qi from '../qi'
import PieceMap from '../piece-map'

describe('PieceMap', () => {
  test('.set', () => {
    const map = new PieceMap()
    const b1 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.set(new Piece(2, 5, DOT_KIND.BLACK), b1)
    const b2 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.set(new Piece(2, 5, DOT_KIND.BLACK), b2)
    const b3 = new Block(new Pieces([]), new Qi([]), DOT_KIND.WHITE)
    map.set(new Piece(4, 5, DOT_KIND.BLACK), b3)
    expect(map.data).toEqual({
        '4,5': b3,
        '2,5': b2,
    })
  })

  test('.get', () => {
    const map = new PieceMap()
    const b1 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.set(new Piece(2, 5, DOT_KIND.BLACK), b1)
    const b2 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.set(new Piece(3, 5, DOT_KIND.BLACK), b2)
    expect(map.get(new Piece(2, 5, DOT_KIND.BLACK))).toEqual(b1)
    expect(map.get(new Piece(3, 5, DOT_KIND.BLACK))).toEqual(b2)
  })

  test('.del', () => {
    const map = new PieceMap()
    const b1 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.set(new Piece(2, 5, DOT_KIND.BLACK), b1)
    const b2 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.set(new Piece(3, 5, DOT_KIND.BLACK), b2)
    map.del(new Piece(3, 5, DOT_KIND.BLACK))
    expect(map.get(new Piece(2, 5, DOT_KIND.BLACK))).toEqual(b1)
    expect(map.get(new Piece(3, 5, DOT_KIND.BLACK))).toEqual(undefined)
  })
})
