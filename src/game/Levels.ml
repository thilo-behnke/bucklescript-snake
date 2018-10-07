open Utils
open Constants
type position = (int* int)
type tile =
  | Empty
  | Block
  | LeftWall
  | RightWall
type grid = (position* tile) list
module Levels =
  struct
    let levels =
      [(1,
         "---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n ---- ---- ---- ----");
      (2,
        "---- ---- ---- ---- n bbbb bbbb bbb- bbbb n ---- ---- -lr- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n bbbb b--b bbbb bbbb n ---- ---- ---- ---- n ---- ---- ---- ----");
      (3,
        "bbbb bbbb ---- bbbb n bbbb bbbb bbb- bbbb n ---- ---- -lr- ---- n ---- ---- ---- ---- n ---- ---- ---- ---- n bbbb b--b bbbb bbbb n ---- ---- ---- ---- n bbbb bbbb ---- bbbb")]
    let load_level =
      function
      | i ->
          let levelStr = List.assoc i levels in
          (MyList.reducei
             (fun acc  ->
                fun i  ->
                  fun c  ->
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
               (MyString.explode @@ (String.trim levelStr)))
  end
