open Actor
open Utils
open Constants
open Levels
type gameState =
  | Going
  | Won
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
type mutableState =
  {
  mutable direction: Actor.direction;
  mutable reset: bool;
  mutable isRunning: bool;
  mutable level: level;}
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
let getHeadTile snake tileSize =
  let ((x,y),_,_) = (Snake.getData snake) |> List.hd in
  ((x / tileSize), (y / tileSize))
let checkGridCollision snake grid tileSize =
  let ((x,_),_,_) = (Snake.getData snake) |> List.hd in
  let headTile = getHeadTile snake tileSize in
  let tile =
    MyList.find_opt
      (fun ((x,y),_)  -> (x = (fst headTile)) && (y = (snd headTile))) grid in
  match tile with
  | None  -> false
  | Some ((x',_),t) ->
      (match t with
       | Empty  -> false
       | Block  -> true
       | LeftWall  -> x <= ((x' * tileSize) + (tileSize / 2))
       | RightWall  -> x >= ((x' * tileSize) + (tileSize / 2)))
let updateGame t oldGame mutableState constants =
  let { memberWidth; memberLength; windowWidth; windowHeight; tileSize } =
    constants in
  let { level; direction } = mutableState in
  let { grid; winCondition } = level in
  let rec getAllowedSpawningPositions =
    function
    | [] -> []
    | (_,Block )::xs -> getAllowedSpawningPositions xs
    | ((gridX,gridY),Empty )::xs ->
        let x = gridX * tileSize in
        let y = gridY * tileSize in (x, (y + (tileSize / 2))) ::
          ((x + (tileSize / 2)), y) ::
          ((x + (tileSize / 2)), (y + (tileSize / 2))) ::
          ((x + (tileSize / 2)), (y + tileSize)) ::
          ((x + tileSize), (y + (tileSize / 2))) ::
          (getAllowedSpawningPositions xs)
    | ((gridX,gridY),LeftWall )::xs ->
        let x = gridX * tileSize in
        let y = gridY * tileSize in ((x + (tileSize / 2)), y) ::
          ((x + (tileSize / 2)), (y + (tileSize / 2))) ::
          ((x + (tileSize / 2)), (y + tileSize)) ::
          ((x + tileSize), (y + (tileSize / 2))) ::
          (getAllowedSpawningPositions xs)
    | ((gridX,gridY),RightWall )::xs ->
        let x = gridX * tileSize in
        let y = gridY * tileSize in ((x + (tileSize / 2)), y) ::
          ((x + (tileSize / 2)), y) ::
          ((x + (tileSize / 2)), (y + (tileSize / 2))) ::
          ((x + (tileSize / 2)), (y + tileSize)) ::
          (getAllowedSpawningPositions xs) in
  let spawnPrey seed =
    let _ = Random.init @@ seed in
    let allowedPositions = getAllowedSpawningPositions grid in
    let r =
      (List.nth allowedPositions) @@
        (Random.int @@ (List.length @@ (getAllowedSpawningPositions grid))) in
    Js.log r; r in
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
  let gridCollision = checkGridCollision snake grid tileSize in
  let hasWon =
    match winCondition with
    | Count n -> (List.length eaten) >= n
    | _ -> false in
  {
    state =
      (if gridCollision
       then Lost
       else
         if hasWon
         then Won
         else
           (match Snake.checkSelfCollision updatedSnake with
            | true  -> Lost
            | false  -> Going));
    snake = newSnake;
    spawn = newSpawn;
    eaten =
      (match collided with
       | None  -> eaten
       | Normal _|Special _ -> collided :: eaten)
  }
