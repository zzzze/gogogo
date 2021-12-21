import BlockManager, {FORBIDDEN_POINT_ERR} from "./block-manager"
import Board from "./board"
import {DOT_KIND} from "./dot"
import Piece from "./piece"
import PieceMap from "./piece-map"
import Pos from "./pos"
import QiMap from "./qi-map"

class Engine {
  board: Board
  qiMap: QiMap
  pieceMap: PieceMap
  bm: BlockManager

  constructor(size: number, initialData: DOT_KIND[]) {
    this.board = new Board(size)
    this.qiMap = new QiMap
    this.pieceMap = new PieceMap
    this.bm = new BlockManager(this.board, this.qiMap, this.pieceMap)
    this.init(initialData)
  }

  init(data: DOT_KIND[]) {
    const size = this.board.size
    data.forEach((item, i) => {
      if (item == DOT_KIND.NULL) {
        return
      }
      const m = Math.floor(i / size)
      const n = i % size
      this.put(new Pos(m, n), item)
    })
  }

  put(pos: Pos, kind: Piece['kind']) {
    if (!this.board.isBlank(pos.x, pos.y)) {
      return
    }
    try {
      this.bm.create(new Piece(pos.x, pos.y, kind))
    } catch(err) {
      if (err != FORBIDDEN_POINT_ERR) {
        throw err
      }
    }
  }
}

export default Engine
