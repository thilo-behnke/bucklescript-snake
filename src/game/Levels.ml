open Utils
open Constants
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
module Levels =
  struct
    let levels =
      [(1,
         ("---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ----",
           (Count 20)));
      (2,
        ("---- ---- ---- ---- n bbbb bbbb bbb- bbbb n ---- ---- -lr- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n bbbb b--b bbbb bbbb n ---- ---- ---- ---- n ---- ---- ---- ----",
          (Count 20)));
      (3,
        ("bbbb bbbb ---- bbbb n bbbb bbbb bbb- bbbb n ---- ---- -lr- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n bbbb b--b bbbb bbbb n ---- ---- ---- ---- n bbbb bbbb ---- bbbb",
          (Count 20)))]
    let load_level =
      function
      | i ->
          let (levelStr,winCondition) = List.assoc i levels in
          let grid =
            (MyList.reducei
               (fun acc i c ->
                      let pos =
                        ((i mod
                            (constantsState.windowWidth /
                               constantsState.tileSize)),
                          (i /
                             (constantsState.windowWidth /
                                constantsState.tileSize))) in
                      match c with
                      | '-' -> (pos, Empty) :: acc
                      | 'b' -> (pos, Block) :: acc
                      | 'l' -> (pos, LeftWall) :: acc
                      | 'r' -> (pos, RightWall) :: acc
                      | _ -> acc))
              @@
              ((List.filter (fun c  -> (c <> 'n') && (c <> ' '))) @@
                 (MyString.explode @@ (String.trim levelStr))) in
          { grid; winCondition }
  end
