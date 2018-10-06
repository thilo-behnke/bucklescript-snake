let component = ReasonReact.statelessComponent("Game");

include Utils;
open Director;
open Draw;
open Constants;

type mutableState = {
  mutable direction: Actor.direction,
  mutable reset: bool,
  mutable isRunning: bool,
};

let currentState = {direction: Right, reset: false, isRunning: true};

let initialGame = {
  state: Going,
  eaten: [],
  snake: Actor.Snake.init(100, Right, constantsState.memberLength),
  spawn: Normal({pos: (100, 100), symbol: "*"}),
};

let getTimeStamp = () => Dom_html.performanceNow(Dom_html.performance);

let rec gameLoop = (t: float, currentGame: game) => {
  let newGame = Director.updateGame(t, currentGame, currentState.direction, constantsState);

  let canvas = load_canvas("canvas");
  let _ = draw_game(canvas, newGame, constantsState);

  Dom_html.requestAnimationFrame(t =>
    currentState.reset ?
      {
        currentState.reset = false;
        gameLoop(getTimeStamp(), initialGame);
      } :
      (
        switch (newGame.state) {
        | Going => gameLoop(t, newGame)
        | Lost =>
          currentState.isRunning = false;
          ();
        }
      )
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

let _ = gameLoop(getTimeStamp(), initialGame);

let resetGame = (_event, _self) =>
  currentState.isRunning ?
    currentState.reset = true :
    {
      currentState.direction = Right;
      currentState.reset = false;
      currentState.isRunning = true;
      gameLoop(getTimeStamp(), initialGame);
    };

let make = _children => {
  ...component,
  render: self => <button onClick={self.handle(resetGame)}> {ReasonReact.string("Reset Game")} </button>,
};
