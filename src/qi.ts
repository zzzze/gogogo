import cloneDeep from "lodash/cloneDeep"
import Pos from "./pos";

export default class Qi {
  private _data: Pos[]

  constructor(data: Pos[]) {
    this._data = data ?? []
  }

  get data() {
    return cloneDeep(this._data)
  }

  add(pos: Pos) {
    this._data.push(pos)
    this._data = Pos.deduplicate(this._data)
  }

  remove(pos: Pos) {
    this._data = this._data.filter(item => !item.isSamePos(pos))
  }

  forEach(...args: Parameters<typeof this._data['forEach']>) {
    return this._data.forEach(...args)
  }

  get length() {
    return this._data.length
  }

  static merge(...objs: Qi[]): Qi {
    const data = objs.reduce<Pos[]>((acc, item) => {
      acc = acc.concat(item._data)
      return acc
    }, [])
    return new Qi(Pos.deduplicate(data))
  }
}
