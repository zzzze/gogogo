import Dot, {DOT_KIND} from "./dot"

export function reversePieceKind(kind: DOT_KIND.BLACK | DOT_KIND.WHITE) {
  return kind == DOT_KIND.BLACK ? DOT_KIND.WHITE : DOT_KIND.BLACK
}

export default class Piece extends Dot {
  kind: DOT_KIND.BLACK | DOT_KIND.WHITE

  constructor(x: number, y: number, kind: Piece['kind']) {
    super(x, y, kind)
    this.kind = kind
  }
}
