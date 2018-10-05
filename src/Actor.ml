open Utils
type position = (int* int)
type direction =
  | Up
  | Right
  | Down
  | Left
module type Actor  =
  sig
    type member
    type body
    val init : int -> direction -> int -> body
    val head : body -> (int* int)
    val move : body -> direction -> int -> (int* int) -> body
    val eat : body -> body
    val length : body -> int
    val checkCollision : body -> position -> int -> bool
    val checkSelfCollision : body -> bool
    val getData : body -> (position* direction* bool) list
  end
module Snake : Actor =
  struct
    type member = (position* direction* bool)
    type body = member list
    let init n d ml =
      (MyList.range n) |>
        (List.map (fun i  -> (((100 + (i * ml)), 100), d, false)))
    let head b = let ((x,y),_,_) = List.hd b in (x, y)
    let move b d ml (maxX,maxY) =
      let calcNextPos n (max_x,max_y) (x,y) =
        function
        | Up  -> let new_y = if y > 0 then y - n else max_y in (x, new_y)
        | Right  -> let new_x = if x < max_x then x + n else 0 in (new_x, y)
        | Down  -> let new_y = if y < max_y then y + n else 0 in (x, new_y)
        | Left  -> let new_x = if x > 0 then x - n else max_x in (new_x, y) in
      let ((x,y),_,_) = List.hd b in
      let h' = ((calcNextPos ml (maxX, maxY) (x, y) d), d, false) in
      let rec inner m l =
        match (m, l) with
        | (m',h::t) -> m' :: (inner h t)
        | (m',[]) ->
            let (pos,direction,isEating) = m' in
            if isEating then [(pos, direction, false)] else [] in
      inner h' b
    let eat b = let h::t = b in let (pos,d,_) = h in (pos, d, true) :: t
    let length b = List.length b
    let checkCollision b (objX,objY) mw =
      let ((x,y),d,_) = List.hd b in
      match d with
      | Up |Down  -> ((abs (x - objX)) <= mw) && ((abs (y - objY)) < mw)
      | Right |Left  -> ((abs (x - objX)) < mw) && ((abs (y - objY)) <= mw)
    let checkSelfCollision b =
      let ((x,y),_,_)::tail = b in
      let hasCollidedWithItself =
        MyList.find_opt (fun ((x',y'),_,_)  -> (x = x') && (y = y')) tail in
      match hasCollidedWithItself with | None  -> false | Some _ -> true
    let getData b = b
  end 
