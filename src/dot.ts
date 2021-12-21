import type Piece from "./piece"
import Pos from "./pos"

export enum DOT_KIND {
  NULL,
  BLACK,
  WHITE,
}

export default class Dot extends Pos {
  kind: DOT_KIND

  constructor(x: number, y: number, kind: DOT_KIND) {
    super(x, y)
    this.kind = kind
  }

  isPiece(): this is Piece {
    return this.kind != DOT_KIND.NULL
  }
}
