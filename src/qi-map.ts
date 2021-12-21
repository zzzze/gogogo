import cloneDeep from "lodash/cloneDeep"
import Block from "./block"
import {DOT_KIND} from "./dot"
import Piece, {reversePieceKind} from "./piece"
import Pos from "./pos"
import Qi from "./qi"

export default class QiMap {
  private _data: Record<Piece['kind'], Record<string, Block[]>>
  private _bak: QiMap['_data'] | null = null

  constructor() {
    this._data = {
      [DOT_KIND.WHITE]: {},
      [DOT_KIND.BLACK]: {},
    }
  }

  get data() {
    return cloneDeep(this._data)
  }

  setBlock(pos: Pos, block: Block) {
    if (!this._data[block.kind][`${pos.x},${pos.y}`]) {
      this._data[block.kind][`${pos.x},${pos.y}`] = []
    }
    this._data[block.kind][`${pos.x},${pos.y}`].push(block)
  }

  setBlockToPoslist(posList: Pos[] | Qi, block: Block) {
    posList.forEach(pos => {
      this.setBlock(pos, block)
    })
  }

  getBlocks(pos: Pos, kind: Piece['kind']): Block[] {
    return this._data[kind][`${pos.x},${pos.y}`]??[]
  }

  removeBlocks(posList: Pos[] | Qi, blocks: Block[]) {
    if (!blocks.length) {
      return
    }
    posList.forEach(pos => {
      if (!this._data[blocks[0].kind][`${pos.x},${pos.y}`]) {
        return
      }
      this._data[blocks[0].kind][`${pos.x},${pos.y}`] = this._data[blocks[0].kind][`${pos.x},${pos.y}`].filter(item => {
        return blocks.every(b => b.id != item.id)
      })
    })
  }

  del(piece: Piece): Block[] {
    let blocks = this.getBlocks(piece, piece.kind)
    blocks.map(b => {
      b.qi.remove(piece)
    })
    delete this._data[piece.kind][`${piece.x},${piece.y}`]
    const kind = reversePieceKind(piece.kind)
    blocks = this.getBlocks(piece, kind)
    const killed = blocks.reduce<Block[]>((acc, b) => {
      b.qi.remove(piece)
      if (b.qi.length == 0) {
        acc.push(b)
      }
      return acc
    }, [])
    delete this._data[kind][`${piece.x},${piece.y}`]
    return killed
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
