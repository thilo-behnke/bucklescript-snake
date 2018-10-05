open Actor
open Constants
type gameState =
  | Going
  | Lost
type prey = {
  pos: position;
  symbol: string;}
type enemy =
  | Normal of prey
  | Special of prey
  | None
type game =
  {
  state: gameState;
  eaten: enemy list;
  snake: Snake.body;
  spawn: enemy;}
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
let spawnRandom (fromX,toX) (fromY,toY) seed =
  let _ = Random.init @@ seed in
  (((Random.int toX) + fromX), ((Random.int toY) + fromY))
let spawnRandomSuper (fromX,toX) (fromY,toY) seed =
  let cs = ["x"; "o"; ">"] in
  let _ = Random.init @@ seed in
  (((Random.int toX) + fromX), ((Random.int toY) + fromY),
    ((List.nth cs) @@ (Random.int 3)))
let updateGame t oldGame direction constants =
  let { memberWidth; memberLength; windowWidth; windowHeight } = constants in
  let spawnPrey seed =
    spawnRandom ((4 * memberWidth), (windowWidth - (4 * memberWidth)))
      ((4 * memberWidth), (windowHeight - (4 * memberWidth))) seed in
  let getNormalEaten eaten =
    List.length @@
      (List.filter (fun x  -> match x with | Normal _ -> true | _ -> false)
         eaten) in
  let { snake; spawn; eaten } = oldGame in
  let updatedSnake =
    Snake.move snake direction memberLength (windowWidth, windowHeight) in
  let (newSpawn,collided) =
    match spawn with
    | None  ->
        let (x,y) = (int_of_float t) |> spawnPrey in
        let normalEaten = getNormalEaten eaten in
        (match (normalEaten > 0) && ((normalEaten mod 10) = 0) with
         | true  -> ((Special { pos = (x, y); symbol = "+" }), None)
         | false  -> ((Normal { pos = (x, y); symbol = "*" }), None))
    | Normal prey|Special prey ->
        let { pos } = prey in
        (match Snake.checkCollision updatedSnake pos memberWidth with
         | false  -> (spawn, None)
         | true  -> (None, spawn)) in
  let newSnake =
    match collided with
    | Normal _|Special _ -> Snake.eat updatedSnake
    | None  -> updatedSnake in
  {
    state =
      (match Snake.checkSelfCollision updatedSnake with
       | true  -> Lost
       | false  -> Going);
    snake = newSnake;
    spawn = newSpawn;
    eaten =
      (match collided with
       | None  -> eaten
       | Normal _|Special _ -> collided :: eaten)
  }
