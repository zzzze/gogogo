import Pos from '../pos'

describe('Pos', () => {
  test('.isSamePos', () => {
    const p1 = new Pos(11, 34)
    const p2 = new Pos(11, 34)
    expect(p1.isSamePos(p2)).toBeTruthy()
  })

  test('#add', () => {
    const p1 = new Pos(11, 34)
    const p2 = Pos.add(p1, 3, 9)
    expect(p1.x).toBe(11)
    expect(p1.y).toBe(34)
    expect(p2.x).toBe(14)
    expect(p2.y).toBe(43)
  })

  test('#addX', () => {
    const p1 = new Pos(11, 34)
    const p2 = Pos.addX(p1, 3)
    expect(p1.x).toBe(11)
    expect(p1.y).toBe(34)
    expect(p2.x).toBe(14)
    expect(p2.y).toBe(34)
  })

  test('#addY', () => {
    const p1 = new Pos(11, 34)
    const p2 = Pos.addY(p1, 9)
    expect(p1.x).toBe(11)
    expect(p1.y).toBe(34)
    expect(p2.x).toBe(11)
    expect(p2.y).toBe(43)
  })

  test('#deduplicate', () => {
    const data = [
      new Pos(1, 3),
      new Pos(1, 3),
      new Pos(1, 3),
      new Pos(1, 3),
      new Pos(1, 3),
      new Pos(2, 4),
      new Pos(2, 4),
      new Pos(3, 5),
    ]
    expect(Pos.deduplicate(data)).toHaveLength(3)
  })
})
