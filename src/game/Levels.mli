type position = (int* int)

type tile =
  | Empty
  | Block
  | LeftWall
  | RightWall
type grid = (position* tile) list
type winCondition =
  | Time of int
  | Count of int
  | Length of int
type level = {
  grid: grid;
  winCondition: winCondition;}
module Levels: sig
    val levels: (int * (string * winCondition)) list
    val load_level: int -> level
end