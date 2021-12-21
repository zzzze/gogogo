import {nanoid} from "nanoid"
import Piece from "./piece"
import Qi from "./qi"
import Pieces from "./pieces"

export default class Block {
  pieces: Pieces
  id: string
  qi: Qi
  kind: Piece['kind']

  constructor(pieces: Pieces, qi: Qi, kind: Piece['kind']) {
    this.pieces = pieces
    this.qi = qi
    this.kind = kind
    this.id = nanoid()
  }
}
