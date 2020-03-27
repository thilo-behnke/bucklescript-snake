open Actor;
open Utils;
open Director;
open Levels;
open Constants;
open Score;

[@bs.module "../../../../bug.svg"] external bug: string = "default";

let load_canvas = canvas_id =>
  switch (Dom_html.getElementById(Dom_html.document, canvas_id)) {
  | None =>
    print_endline("cant find canvas " ++ canvas_id ++ " \n");
    failwith("fail");
  | Some(el) => Dom_html.elementToCanvasElement(el)
  };

let clear_canvas = canvas => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context =
    Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  let cwidth = float_of_int(canvas##width);
  let cheight = float_of_int(canvas##height);
  ignore @@ context##clearRect(0., 0., cwidth, cheight);
};

let draw_actor = (canvas, snake, memberLength, memberWidth) => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context =
    Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  Snake.getData(snake)
  |> MyList.forEachi((((x, y), direction, isEating), i) => {
       let (fromX, fromY) =
         switch (direction) {
         | Up => (x, y + memberLength)
         | Right => (x - memberLength, y)
         | Down => (x, y - memberLength)
         | Left => (x + memberLength, y)
         };
       let color =
         switch (i mod 3) {
         | 0 => "#ff0066"
         | 1 => "#0066ff"
         | 2 => "#00cc00"
         | _ => "#ffff00"
         };
       let lineWidth = isEating ? memberWidth + 3 : memberWidth;
       ignore @@ context##beginPath();
       context##strokeStyle #= color;
       context##lineWidth #= lineWidth;
       ignore @@ context##moveTo(fromX, fromY);
       ignore @@ context##lineTo(x, y);
       ignore @@ context##stroke();
       context##closePath();
     });
};

let draw_prey = (canvas, prey) =>
  switch (prey) {
  | Normal(p)
  | Special(p) =>
    let {pos: (x, y)} = p;
    let canvas = Dom_html.canvasElementToJsObj(canvas);
    let context =
      Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
    ignore @@ context##beginPath();
    let img = Dom_html.createImg(15, 15);
    let jsImg = Dom_html.imageObjToJsObj(img);
    jsImg##src #= bug;
    ignore @@ context##drawImage(jsImg, x - 15 / 2, y - 15 / 2);
    context##closePath();
  | None => ()
  };

let draw_debug = (canvas, game) => {
  let {snake, eaten, state} = game;
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context =
    Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  ignore @@ context##beginPath();
  context##strokeStyle #= "#ff0066";
  context##lineWidth #= 3;
  ignore @@ context##rect(1300, 0, 150, 100);
  ignore @@ context##stroke();
  ignore @@ context##closePath();

  let bodLength = Snake.length(snake);
  let actorStr = "Body Length: " ++ string_of_int(bodLength);
  ignore @@ context##fillText(actorStr, 1310, 10);
  let eatenNr =
    eaten |> List.length |> string_of_int |> MyString.append("Eaten: ");
  let scoreStr = "Score: " ++ string_of_int(Score.sum_score(eaten));
  ignore @@ context##fillText(scoreStr ++ "(" ++ eatenNr ++ ")", 1310, 20);
  let stateStr =
    "State: "
    ++ (
      switch (state) {
      | Going => "Going"
      | Lost => "Lost"
      | Won => "Won"
      }
    );
  ignore @@ context##fillText(stateStr, 1310, 30);
};

let draw_boundary = (canvas, constants) => {
  let {windowWidth, windowHeight} = constants;
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context =
    Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  ignore @@ context##beginPath();
  context##strokeStyle #= "#000000";
  context##lineWidth #= 3;
  ignore @@ context##rect(0, 0, windowWidth, windowHeight);
  ignore @@ context##stroke();
  context##closePath();
};

let draw_grid = (canvas, grid, {tileSize}) => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context =
    Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));

  MyList.forEach(
    (((x, y), tile)) => {
      ignore @@ context##beginPath();

      ignore @@
      (
        switch (tile) {
        | Empty =>
          context##strokeStyle #= "#D3D3D3";
          context##lineWidth #= 1;
          ignore @@
          context##rect(x * tileSize, y * tileSize, tileSize, tileSize);
        | Block =>
          context##strokeStyle #= "#000000";
          ignore @@
          context##fillRect(x * tileSize, y * tileSize, tileSize, tileSize);
        | LeftWall =>
          context##strokeStyle #= "#000000";
          ignore @@
          context##fillRect(
            x * tileSize,
            y * tileSize,
            tileSize / 2,
            tileSize,
          );
        | RightWall =>
          context##strokeStyle #= "#000000";
          ignore @@
          context##fillRect(
            x * tileSize + tileSize / 2,
            y * tileSize,
            tileSize / 2,
            tileSize,
          );
        }
      );
      ignore @@
      context##fillText(
        string_of_int(x) ++ " / " ++ string_of_int(y),
        x * tileSize,
        y * tileSize + tileSize / 2,
      );
      ignore @@ context##stroke();
      context##closePath();
    },
    grid,
  );
  /*ignore @@ context##rect(0, 0, windowWidth, windowHeight);*/
};

let draw_game = (canvas, game, currentState, constants) => {
  let {snake, spawn} = game;
  let {level: {grid}} = currentState;
  let {memberLength, memberWidth} = constants;
  ignore @@ clear_canvas(canvas);
  ignore @@ draw_actor(canvas, snake, memberLength, memberWidth);
  ignore @@ draw_prey(canvas, spawn);
  /*  ignore @@ draw_debug(canvas, game);
      ignore @@ draw_grid(canvas, grid, constants);*/
  ignore @@ draw_boundary(canvas, constants);
};
