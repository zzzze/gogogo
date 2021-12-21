import {DOT_KIND} from '../dot'
import Engine from '../engine'
import Pos from '../pos'

function getInitialData(data: string[]) {
  return data.join('').split('').map(item => {
    switch(item) {
      case '@':
        return 1
      case 'O':
        return 2
      default:
        return 0
    }
  })
}

test('init engine without initialData', () => {
  const engine = new Engine(5, [])
  expect(engine.board.data).toEqual([
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
    0, 0, 0, 0, 0,
  ])
});

test('init engine with initialData', () => {
  const initialData = getInitialData([
    '-@@@@',
    '--@--',
    '--@@@',
    '----@',
    '----@',
  ])
  const engine = new Engine(5, initialData)
  expect(engine.board.data).toEqual([
    0, 1, 1, 1, 1,
    0, 0, 1, 0, 0,
    0, 0, 1, 1, 1,
    0, 0, 0, 0, 1,
    0, 0, 0, 0, 1,
  ])
  expect(engine.qiMap.getBlocks(new Pos(0, 0), DOT_KIND.WHITE)).toEqual([])
  const blocks = engine.qiMap.getBlocks(new Pos(0, 0), DOT_KIND.BLACK)
  expect(blocks).toHaveLength(1)
  const blocksOfPieceMap = Object.values(engine.pieceMap.data)
  expect(blocksOfPieceMap).toHaveLength(10)
  blocksOfPieceMap.forEach(b => {
    expect(b).toEqual(blocks[0])
  })
  expect(blocksOfPieceMap[0]?.qi).toHaveLength(8)
});

test('kill pieces', () => {
  const initialData = getInitialData([
    '-@@@@',
    '--@O-',
    'O-@@@',
    '@O--@',
    '@---@',
  ])
  const engine = new Engine(5, initialData)
  expect(engine.board.data).toEqual([
    0, 1, 1, 1, 1,
    0, 0, 1, 2, 0,
    2, 0, 1, 1, 1,
    1, 2, 0, 0, 1,
    1, 0, 0, 0, 1,
  ])

  // kill (1, 3)
  engine.put(new Pos(1, 4), DOT_KIND.BLACK)
  expect(engine.board.data).toEqual([
    0, 1, 1, 1, 1,
    0, 0, 1, 0, 1,
    2, 0, 1, 1, 1,
    1, 2, 0, 0, 1,
    1, 0, 0, 0, 1,
  ])

  // kill (3, 0) (4, 0)
  engine.put(new Pos(4, 1), DOT_KIND.WHITE)
  expect(engine.board.data).toEqual([
    0, 1, 1, 1, 1,
    0, 0, 1, 0, 1,
    2, 0, 1, 1, 1,
    0, 2, 0, 0, 1,
    0, 2, 0, 0, 1,
  ])

  engine.put(new Pos(1, 3), DOT_KIND.WHITE)
  expect(engine.board.data).toEqual([
    0, 1, 1, 1, 1,
    0, 0, 1, 0, 1,
    2, 0, 1, 1, 1,
    0, 2, 0, 0, 1,
    0, 2, 0, 0, 1,
  ])

  engine.put(new Pos(3, 0), DOT_KIND.BLACK)
  engine.put(new Pos(4, 0), DOT_KIND.BLACK)
  expect(engine.board.data).toEqual([
    0, 1, 1, 1, 1,
    0, 0, 1, 0, 1,
    2, 0, 1, 1, 1,
    1, 2, 0, 0, 1,
    0, 2, 0, 0, 1,
  ])

  engine.put(new Pos(0, 0), DOT_KIND.WHITE)
  engine.put(new Pos(1, 1), DOT_KIND.WHITE)
  engine.put(new Pos(2, 1), DOT_KIND.WHITE)
  engine.put(new Pos(3, 2), DOT_KIND.WHITE)
  engine.put(new Pos(3, 3), DOT_KIND.WHITE)
  engine.put(new Pos(4, 3), DOT_KIND.WHITE)
  expect(engine.board.data).toEqual([
    2, 1, 1, 1, 1,
    0, 2, 1, 0, 1,
    2, 2, 1, 1, 1,
    1, 2, 2, 2, 1,
    0, 2, 0, 2, 1,
  ])
  engine.put(new Pos(1, 3), DOT_KIND.WHITE)
  expect(engine.board.data).toEqual([
    2, 0, 0, 0, 0,
    0, 2, 0, 2, 0,
    2, 2, 0, 0, 0,
    1, 2, 2, 2, 0,
    0, 2, 0, 2, 0,
  ])

  // kill (3, 0)
  engine.put(new Pos(4, 0), DOT_KIND.WHITE)
  expect(engine.board.data).toEqual([
    2, 0, 0, 0, 0,
    0, 2, 0, 2, 0,
    2, 2, 0, 0, 0,
    0, 2, 2, 2, 0,
    2, 2, 0, 2, 0,
  ])
});
