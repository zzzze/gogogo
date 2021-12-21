import Dot, {DOT_KIND} from "./dot"

export default class Piece extends Dot {
  kind: DOT_KIND.BLACK | DOT_KIND.WHITE

  constructor(x: number, y: number, kind: Piece['kind']) {
    super(x, y, kind)
    this.kind = kind
  }
}
