import cloneDeep from "lodash/cloneDeep"
import Block from "./block"
import Piece from "./piece"
import Pieces from "./pieces"

export default class PieceMap {
  private _data: Record<string, Block | undefined>
  private _bak: PieceMap['_data'] | null = null

  constructor() {
    this._data = {}
  }

  get data() {
    return cloneDeep(this._data)
  }

  set(piece: Piece, block: Block) {
    this._data[`${piece.x},${piece.y}`] = block
  }

  setBlockToPieces(pieces: Piece[] | Pieces, block: Block) {
    pieces.forEach(piece => {
      this.set(piece, block)
    })
  }

  get(piece: Piece): Block | undefined {
    return this._data[`${piece.x},${piece.y}`]
  }

  del(piece: Piece) {
    let b = this._data[`${piece.x},${piece.y}`]
    if (b) {
      b.pieces.remove(piece)
    }
    delete this._data[`${piece.x},${piece.y}`]
  }

  backup() {
    this._bak = cloneDeep(this._data)
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
