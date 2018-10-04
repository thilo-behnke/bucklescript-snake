open Utils
open Dom_html
type direction =
  | Up
  | Right
  | Down
  | Left
let handleKey key_code c_direction =
  match key_code with
  | 38 ->
      if (c_direction <> Up) && (c_direction <> Down) then Some Up else None
  | 39 ->
      if (c_direction <> Right) && (c_direction <> Left)
      then Some Right
      else None
  | 40 ->
      if (c_direction <> Down) && (c_direction <> Up)
      then Some Down
      else None
  | 37 ->
      if (c_direction <> Left) && (c_direction <> Right)
      then Some Left
      else None
  | _ -> None
let calcNextPos n (max_x,max_y) (x,y) =
  function
  | Up  -> let new_y = if y > 0 then y - n else max_y in (x, new_y)
  | Right  -> let new_x = if x < max_x then x + n else 0 in (new_x, y)
  | Down  -> let new_y = if y < max_y then y + n else 0 in (x, new_y)
  | Left  -> let new_x = if x > 0 then x - n else max_x in (new_x, y)
let updateBody newMember body =
  let rec inner m l =
    match (m, l) with
    | (m',h::t) -> m' :: (inner h t)
    | (m',[]) ->
        let (pos,direction,isEating) = m' in
        if isEating then [(pos, direction, false)] else [] in
  inner newMember body
let spawnRandom (fromX,toX) (fromY,toY) seed =
  let _ = Random.init @@ seed in
  (((Random.int toX) + fromX), ((Random.int toY) + fromY))
let spawnRandomSuper (fromX,toX) (fromY,toY) seed =
  let cs = ["x"; "o"; ">"] in
  let _ = Random.init @@ seed in
  (((Random.int toX) + fromX), ((Random.int toY) + fromY),
    ((List.nth cs) @@ (Random.int 3)))
