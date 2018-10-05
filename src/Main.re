include Utils;
open Director;
open Draw;
open Constants;

type mutableState = {mutable direction: Actor.direction};

let currentState = {direction: Right};

let initialGame = {
  state: Going,
  eaten: [],
  snake: Actor.Snake.init(100, Right, constantsState.memberLength),
  spawn: Normal({pos: (100, 100), symbol: "*"}),
};

let rec gameLoop = (t: float, currentGame: game) => {
  let newGame = Director.updateGame(t, currentGame, currentState.direction, constantsState);

  let canvas = load_canvas("canvas");
  let _ = draw_game(canvas, newGame, constantsState.memberLength);

  Dom_html.requestAnimationFrame(t =>
    switch (newGame.state) {
    | Going => gameLoop(t, newGame)
    | Lost => ()
    }
  );
};

let _ =
  Dom_html.addEventListener(
    Dom_html.document,
    "keydown",
    evt => {
      let evt_obj = Dom_html.keyboardEventToJsObj(evt);
      currentState.direction = (
        switch (Director.handleKey(evt_obj##keyCode, currentState.direction)) {
        | Some(x) => x
        | None => currentState.direction
        }
      );
      true;
    },
    true,
  );

let _ = gameLoop(Dom_html.performanceNow(Dom_html.performance), initialGame);
