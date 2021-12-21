import Block from '../block'
import {DOT_KIND} from '../dot'
import Piece from '../piece'
import Pos from '../pos'
import QiMap from '../qi-map'
import Qi from '../qi'
import Pieces from '../pieces'

describe('QiMap', () => {
  test('.setBlock', () => {
    const map = new QiMap()
    const b1 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b1)
    const b2 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b2)
    const b3 = new Block(new Pieces([]), new Qi([]), DOT_KIND.WHITE)
    map.setBlock(new Pos(4, 5), b3)
    expect(map.data).toEqual({
      [DOT_KIND.WHITE]: {
        '4,5': [b3],
      },
      [DOT_KIND.BLACK]: {
        '2,5': [b1, b2],
      },
    })
  })

  test('.getBlocks', () => {
    const map = new QiMap()
    const b1 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b1)
    const b2 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b2)
    const b3 = new Block(new Pieces([]), new Qi([]), DOT_KIND.WHITE)
    map.setBlock(new Pos(2, 5), b3)
    expect(map.getBlocks(new Pos(2, 5), DOT_KIND.BLACK)).toEqual([b1, b2])
    expect(map.getBlocks(new Pos(2, 5), DOT_KIND.WHITE)).toEqual([b3])
    expect(map.getBlocks(new Pos(4, 5), DOT_KIND.WHITE)).toEqual([])
  })

  test('.removeBlocks', () => {
    const map = new QiMap()
    const b1 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b1)
    const b2 = new Block(new Pieces([]), new Qi([]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b2)
    const b3 = new Block(new Pieces([]), new Qi([]), DOT_KIND.WHITE)
    map.setBlock(new Pos(2, 5), b3)
    map.removeBlocks([new Pos(2, 5)], [b1])
    expect(map.getBlocks(new Pos(2, 5), DOT_KIND.BLACK)).toEqual([b2])
  })

  test('.del', () => {
    const map = new QiMap()
    const b1 = new Block(new Pieces([]), new Qi([new Pos(2, 5)]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b1)
    const b2 = new Block(new Pieces([]), new Qi([new Pos(2, 5)]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b2)
    const b3 = new Block(new Pieces([]), new Qi([new Pos(2, 5)]), DOT_KIND.WHITE)
    map.setBlock(new Pos(2, 5), b3)
    const b4 = new Block(new Pieces([]), new Qi([new Pos(2, 5), new Pos(3, 6)]), DOT_KIND.BLACK)
    map.setBlock(new Pos(2, 5), b4)
    const killedBlocks = map.del(new Piece(2, 5, DOT_KIND.WHITE))
    expect(map.getBlocks(new Pos(2, 5), DOT_KIND.BLACK)).toEqual([])
    expect(map.getBlocks(new Pos(2, 5), DOT_KIND.WHITE)).toEqual([])
    expect(killedBlocks).toEqual([b1, b2])
  })
})
