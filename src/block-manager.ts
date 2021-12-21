import Block from "./block"
import Board from "./board"
import {DOT_KIND} from "./dot"
import Piece from "./piece"
import PieceMap from "./piece-map"
import Pos from "./pos"
import QiMap from "./qi-map"
import Qi from "./qi"
import Pieces from "./pieces"

export const FORBIDDEN_POINT_ERR = Error('forbidden point')

export default class BlockManager {
  private _board: Board
  private _qiMap: QiMap
  private _pieceMap: PieceMap

  constructor(board: Board, qiMap: QiMap, pieceMap: PieceMap) {
    this._board = board
    this._qiMap = qiMap
    this._pieceMap = pieceMap
  }

  private _backupState() {
    this._board.backup()
    this._qiMap.backup()
    this._pieceMap.backup()
  }

  private _restoreState() {
    this._board.restore()
    this._qiMap.restore()
    this._pieceMap.restore()
  }

  private _cleanStateBackup() {
    this._board.cleanBackup()
    this._qiMap.cleanBackup()
    this._pieceMap.cleanBackup()
  }

  create(piece: Piece): Block {
    if (!this._board.isBlank(piece.x, piece.y)) {
      throw Error(`pos(${piece.x},${piece.y}) is not blank`)
    }
    this._backupState()
    this._board.setKind(piece.x, piece.y, piece.kind)
    const blanks = this._board.getSurroundingBlanks(piece.x, piece.y)
    const qi = new Qi(blanks)
    let b = new Block(new Pieces([piece]), qi, piece.kind)
    this._pieceMap.set(piece, b)
    this._qiMap.setBlockToPoslist(qi, b)
    b = this._maybeMergeBlock(piece, b)
    const killedBlocks = this._qiMap.del(piece)
    if (!b.qi.length && !killedBlocks.length) { // forbidden point
      this._restoreState()
      throw FORBIDDEN_POINT_ERR
    }
    this._killBlocks(killedBlocks)
    this._cleanStateBackup()
    return b
  }

  private _maybeMergeBlock(piece: Piece, block: Block): Block {
    const blocks = this._qiMap.getBlocks(piece, piece.kind)
    if (!blocks.length) {
      return block
    }
    return this._mergeBlocks([block, ...blocks])
  }

  private _mergeBlocks(blocks: Block[]): Block {
    if (!blocks.length) {
      throw Error("blocks should not be empty")
    }
    const pieces = Pieces.merge(...blocks.map(item => item.pieces))
    const qi = Qi.merge(...blocks.map(item => item.qi))
    this._qiMap.removeBlocks(qi, blocks)
    const block = new Block(pieces, qi, blocks[0].kind)
    this._pieceMap.setBlockToPieces(pieces, block)
    this._qiMap.setBlockToPoslist(qi, block)
    return block
  }

  private _killBlocks(blocks: Block[]) {
    if (!blocks.length) {
      return
    }
    const pieces = Pieces.merge(...blocks.map(block => block.pieces))
    const kind = blocks[0].kind == DOT_KIND.BLACK ? DOT_KIND.WHITE : DOT_KIND.BLACK
    pieces.forEach(killedDot => {
      this._pieceMap.del(killedDot)
      this._board.kill(killedDot.x, killedDot.y)
      const surroundingPieces = this._board.getSurroundingPieces(killedDot.x, killedDot.y, kind)
      surroundingPieces.map(surroundingPiece => {
        const surroundingBlock = this._pieceMap.get(surroundingPiece)
        if (!surroundingBlock) {
          throw Error(`can't find any blocks for piece(${surroundingPiece.x},${surroundingPiece.y})`)
        }
        surroundingBlock.qi.add(new Pos(killedDot.x, killedDot.y))
        this._qiMap.setBlock(killedDot, surroundingBlock)
      })
    })
  }
}
