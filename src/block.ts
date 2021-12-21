import {nanoid} from "nanoid"
import {DOT_KIND} from "./dot"
import Piece from "./piece"
import Qi from "./qi"
import Pieces from "./pieces"

export default class Block {
  pieces: Pieces
  id: string
  qi: Qi
  kind: DOT_KIND.WHITE | DOT_KIND.BLACK

  constructor(pieces: Pieces, qi: Qi, kind: Piece['kind']) {
    this.pieces = pieces
    this.qi = qi
    this.kind = kind
    this.id = nanoid()
  }
}
