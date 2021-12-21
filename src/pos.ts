import cloneDeep from "lodash/cloneDeep"

export default class Pos {
  x: number
  y: number

  constructor(x: number, y: number) {
    this.x = x
    this.y = y
  }

  isSamePos(pos: Pos) {
    return this.x == pos.x && this.y == pos.y
  }

  static add<T extends Pos>(pos: T, x: number, y: number): T {
    const res = cloneDeep(pos)
    res.x += x
    res.y += y
    return res
  }

  static addX<T extends Pos>(pos: T, x: number): T {
    const res = cloneDeep(pos)
    res.x += x
    return res
  }

  static addY<T extends Pos>(pos: T, y: number): T {
    const res = cloneDeep(pos)
    res.y += y
    return res
  }

  static deduplicate(arr: Pos[]): Pos[] {
    const map: string[] = []
    const res: Pos[] = []
    arr.forEach(pos => {
      const key = `${pos.x}-${pos.y}`
      if (!map.includes(key)) {
        res.push(pos)
        map.push(key)
      }
    })
    return res
  }
}
