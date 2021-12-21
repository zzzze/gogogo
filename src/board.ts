import {DOT_KIND} from "./dot"
import Piece from "./piece"
import Pos from "./pos"

export default class Board {
  private _data: DOT_KIND[]
  private _bak: Board['_data'] | null = null
  size: number

  constructor(size: number) {
    this.size = size
    this._data = new Array<DOT_KIND>(size * size).fill(DOT_KIND.NULL)
  }

  get data() {
    return [...this._data]
  }

  isBlank(x: number, y: number) {
    return this.getKind(x, y) == DOT_KIND.NULL
  }

  getKind(x: number, y: number): DOT_KIND {
    return this._data[x * this.size + y]
  }

  setKind(x: number, y: number, kind: DOT_KIND) {
    this._data[x * this.size + y] = kind
  }

  kill(x: number, y: number) {
    this.setKind(x, y, DOT_KIND.NULL)
  }

  getSurroundingBlanks(x: number, y: number): Pos[] {
    const res: Pos[] = [
      Pos.addX(new Pos(x, y), 1),
      Pos.addX(new Pos(x, y), -1),
      Pos.addY(new Pos(x, y), 1),
      Pos.addY(new Pos(x, y), -1),
    ]
    return res.filter(pos => {
      if (pos.x < 0 || pos.y < 0 || pos.x >= this.size || pos.y >= this.size) {
        return false
      }
      return this.isBlank(pos.x, pos.y)
    })
  }

  getSurroundingPieces(x: number, y: number, kind: Piece['kind']): Piece[] {
    const res: Piece[] = [
      Piece.addX(new Piece(x, y, kind), 1),
      Piece.addX(new Piece(x, y, kind), -1),
      Piece.addY(new Piece(x, y, kind), 1),
      Piece.addY(new Piece(x, y, kind), -1),
    ]
    return res.filter(pos => {
      if (pos.x < 0 || pos.y < 0 || pos.x >= this.size || pos.y >= this.size) {
        return false
      }
      return this.getKind(pos.x, pos.y) == kind
    })
  }

  backup() {
    this._bak = [...this._data]
  }

  restore() {
    if (this._bak) {
      this._data = this._bak
    }
  }

  cleanBackup() {
    this._bak = null
  }
}
