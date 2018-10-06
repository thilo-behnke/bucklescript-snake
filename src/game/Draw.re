open Dom_html;
open Actor;
open Utils;
open Director;
open Constants;
open Score;

let load_canvas = canvas_id =>
  switch (Dom_html.getElementById(Dom_html.document, canvas_id)) {
  | None =>
    print_endline("cant find canvas " ++ canvas_id ++ " \n");
    failwith("fail");
  | Some(el) => Dom_html.elementToCanvasElement(el)
  };

let clear_canvas = canvas => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  let cwidth = float_of_int(canvas##width);
  let cheight = float_of_int(canvas##height);
  ignore @@ context##clearRect(0., 0., cwidth, cheight);
};

let draw_actor = (canvas, snake, memberLength, memberWidth) => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
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
    let {pos: (x, y), symbol} = p;
    let canvas = Dom_html.canvasElementToJsObj(canvas);
    let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
    let color =
      switch (prey) {
      | Normal(_) => "#000000"
      | Special(_) => "#ff0066"
      | None => "#ffff00"
      };
    ignore @@ context##beginPath();
    context##strokeStyle #= color;
    context##lineWidth #= 6;
    ignore @@ context##moveTo(x - 6, y);
    ignore @@ context##lineTo(x, y);
    ignore @@ context##stroke();
    context##closePath();
  | None => ()
  };

let draw_debug = (canvas, game) => {
  let {snake, spawn, eaten, state} = game;
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  context##beginPath();
  context##strokeStyle #= "#ff0066";
  context##lineWidth #= 3;
  ignore @@ context##rect(300, 0, 150, 100);
  ignore @@ context##stroke();
  context##closePath();

  let bodLength = Snake.length(snake);
  let actorStr = "Body Length: " ++ string_of_int(bodLength);
  ignore @@ context##fillText(actorStr, 310, 10);
  let eatenNr = eaten |> List.length |> string_of_int |> MyString.append("Eaten: ");
  let scoreStr = "Score: " ++ string_of_int(Score.sum_score(eaten));
  ignore @@ context##fillText(scoreStr ++ "(" ++ eatenNr ++ ")", 310, 20);
  let stateStr =
    "State: "
    ++ (
      switch (state) {
      | Going => "Going"
      | Lost => "Lost"
      }
    );
  ignore @@ context##fillText(stateStr, 310, 30);
};

let draw_boundary = (canvas, constants) => {
  let {windowWidth, windowHeight} = constants;
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  context##beginPath();
  context##strokeStyle #= "#000000";
  context##lineWidth #= 3;
  ignore @@ context##rect(0, 0, windowWidth, windowHeight);
  ignore @@ context##stroke();
  context##closePath();
};

let draw_game = (canvas, game, constants) => {
  let {snake, spawn, eaten} = game;
  let {memberLength, memberWidth} = constants;
  ignore @@ clear_canvas(canvas);
  ignore @@ draw_actor(canvas, snake, memberLength, memberWidth);
  ignore @@ draw_prey(canvas, spawn);
  ignore @@ draw_debug(canvas, game);
  ignore @@ draw_boundary(canvas, constants);
};
