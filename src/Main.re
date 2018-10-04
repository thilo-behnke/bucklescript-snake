include Utils;
open Director;
open Dom_html;

type gameState =
  | GOING
  | WON;

type actorMember = ((int, int), Director.direction, bool);

type score = int;

type actor = {
  mutable body: list(actorMember),
  mutable direction: Director.direction,
};

type prey = {
  mutable pos: (int, int),
  symbol: string,
};

type game = {
  mutable state: gameState,
  mutable score,
  mutable actor,
  mutable superSpawn: (float, option(prey)),
  mutable spawn: option(prey),
};
let windowHeight = 256;
let windowWidth = 512;

let memberLength = 5;
let memberWidth = 3;

let currentGame = {
  state: GOING,
  score: 0,
  superSpawn: (Dom_html.performanceNow(Dom_html.performance), None),
  actor: {
    body: MyList.range(100) |> List.map(i => ((100 + i * memberLength, 100), Right, false)),
    direction: Right,
  },
  spawn: Some({pos: (100, 100), symbol: "*"}),
};

let clear_canvas = canvas => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  let cwidth = float_of_int(canvas##width);
  let cheight = float_of_int(canvas##height);
  ignore @@ context##clearRect(0., 0., cwidth, cheight);
};

let draw_actor = (canvas, body) => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  MyList.forEachi(
    (((x, y), direction, isEating), i) => {
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
      let lineWidth = isEating ? memberLength + 3 : memberLength;
      ignore @@ context##beginPath();
      context##strokeStyle #= color;
      context##lineWidth #= lineWidth;
      ignore @@ context##moveTo(fromX, fromY);
      ignore @@ context##lineTo(x, y);
      ignore @@ context##stroke();
      context##closePath();
    },
    body,
  );
};

let draw_prey = (canvas, prey) =>
  switch (prey) {
  | Some(p) =>
    let {pos: (x, y), symbol} = p;
    let canvas = Dom_html.canvasElementToJsObj(canvas);
    let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
    ignore @@ context##beginPath();
    context##lineWidth #= 6;
    ignore @@ context##moveTo(x - 6, y);
    ignore @@ context##lineTo(x, y);
    ignore @@ context##stroke();
    context##closePath();
  /*context##font #= "20px sans-serif";*/
  /*ignore @@ context##fillText(symbol, x, y);*/
  | None => ()
  };

let draw_debug = (canvas, actor, prey) => {
  let canvas = Dom_html.canvasElementToJsObj(canvas);
  let context = Dom_html.canvasRenderingContext2DToJsObj(canvas##getContext("2d"));
  context##strokeStyle #= "#ff0066";
  context##lineWidth #= 3;
  ignore @@ context##rect(300, 0, 150, 100);
  ignore @@ context##stroke();

  let {body} = actor;
  let bodLength = List.length(body);
  let actorStr = "Body Length: " ++ string_of_int(bodLength);
  Js.log(actorStr);
  ignore @@ context##fillText(actorStr, 310, 10);
  /*ignore @@ context##beginPath();*/
  /*context##lineWidth #= 6;*/
  /*ignore @@ context##moveTo(x - 6, y);*/
  /*ignore @@ context##lineTo(x, y);*/
  /*ignore @@ context##stroke();*/
  /*context##closePath();*/
};

let checkCollision = (actor, prey) =>
  switch (prey) {
  | None => false
  | Some(p) =>
    let {direction} = actor;
    let ((x, y), _, _) = List.hd @@ actor.body;
    let (preyX, preyY) = p.pos;
    switch (direction) {
    | Up
    | Down => abs(x - preyX) <= memberWidth && abs(y - preyY) < memberWidth
    | Right
    | Left => abs(x - preyX) < memberWidth && abs(y - preyY) <= memberWidth
    };
  };

let rec gameLoop = (t: float) => {
  let {actor: {body, direction}, superSpawn: (lastSpawn, prey), spawn} = currentGame;
  let ((x, y), _, _) = List.hd(body);
  let newHead = (calcNextPos(memberLength, (windowWidth, windowHeight), (x, y), direction), direction, false);
  currentGame.actor.body = Director.updateBody(newHead, body);
  let {actor: {body, direction}} = currentGame;
  let canvas_id = "canvas";
  let canvas =
    switch (Dom_html.getElementById(Dom_html.document, canvas_id)) {
    | None =>
      print_endline("cant find canvas " ++ canvas_id ++ " \n");
      failwith("fail");
    | Some(el) => Dom_html.elementToCanvasElement(el)
    };
  let (newSpawn, newBody) =
    switch (spawn) {
    | None =>
      let (x, y) =
        Director.spawnRandom(
          (4 * memberWidth, windowWidth - 4 * memberWidth),
          (4 * memberWidth, windowHeight - 4 * memberWidth),
          int_of_float(t),
        );
      (Some({pos: (x, y), symbol: "*"}), body);
    | Some(_) =>
      switch (checkCollision(currentGame.actor, spawn)) {
      | false => (spawn, body)
      | true =>
        let (pos, direction, _) = List.hd(body);
        (None, [(pos, direction, true), ...List.tl(body)]);
      }
    };
  currentGame.spawn = newSpawn;
  currentGame.actor.body = newBody;
  /*let (newSuperSpawn, newBody) =*/
  /*switch (prey) {*/
  /*| None =>*/
  /*if (t -. lastSpawn > 5000.) {*/
  /*let (x, y, s) =*/
  /*Director.spawnRandomSuper(*/
  /*(0, windowWidth - memberWidth),*/
  /*(0, windowHeight - memberWidth),*/
  /*int_of_float(t),*/
  /*);*/
  /*((t, Some({pos: (x, y), symbol: s})), body);*/
  /*} else {*/
  /*((lastSpawn, None), body);*/
  /*}*/
  /*| Some(p) =>*/
  /*switch (checkCollision(currentGame.actor, prey)) {*/
  /*| false =>*/
  /*if (t -. lastSpawn > 5000.) {*/
  /*((t, None), body);*/
  /*} else {*/
  /*((lastSpawn, prey), body);*/
  /*}*/
  /*| true =>*/
  /*let (pos, direction, _) = List.hd(body);*/
  /*((t, None), [(pos, direction, true), ...List.tl(body)]);*/
  /*}*/
  /*};*/
  /*currentGame.superSpawn = newSuperSpawn;*/
  /*currentGame.actor.body = newBody;*/
  let _ = clear_canvas(canvas);
  let _ = draw_actor(canvas, body);
  let _ = draw_prey(canvas, prey);
  let _ = draw_prey(canvas, spawn);
  let _ = draw_debug(canvas, currentGame.actor, spawn);

  Dom_html.requestAnimationFrame(t => gameLoop(t));
};

let _ =
  Dom_html.addEventListener(
    Dom_html.document,
    "keydown",
    evt => {
      let evt_obj = Dom_html.keyboardEventToJsObj(evt);
      currentGame.actor.direction = (
        switch (Director.handleKey(evt_obj##keyCode, currentGame.actor.direction)) {
        | Some(x) => x
        | None => currentGame.actor.direction
        }
      );
      true;
    },
    true,
  );

let _ = gameLoop(Dom_html.performanceNow(Dom_html.performance));
