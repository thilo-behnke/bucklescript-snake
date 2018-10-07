type position = (int* int)

type tile =
  | Empty
  | Block
  | LeftWall
  | RightWall
type grid = (position* tile) list

module Levels: sig
    val levels: (int * string) list
    val load_level: int -> grid
end