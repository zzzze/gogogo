import cloneDeep from "lodash/cloneDeep"
import Piece from "./piece";

export default class Pieces {
  private _data: Piece[]

  constructor(data: Piece[]) {
    this._data = data ?? []
  }

  get data() {
    return cloneDeep(this._data)
  }

  add(pos: Piece) {
    this._data.push(pos)
  }

  remove(pos: Piece) {
    this._data = this._data.filter(item => !item.isSamePos(pos))
  }

  forEach(...args: Parameters<typeof this._data['forEach']>) {
    return this._data.forEach(...args)
  }

  get length() {
    return this._data.length
  }

  static merge(...objs: Pieces[]): Pieces {
    const data = objs.reduce<Piece[]>((acc, item) => {
      acc = acc.concat(item._data)
      return acc
    }, [])
    return new Pieces(data)
  }
}
