let component = ReasonReact.statelessComponent("Game");

include Utils;
open Director;
open Draw;
open Constants;
open Levels;

let currentState = {direction: Right, reset: false, isRunning: true, level: Levels.load_level(1)};

let initialGame = {
  state: Going,
  eaten: [],
  snake: Actor.Snake.init(400, Right, constantsState.memberLength),
  spawn: None,
};

let getTimeStamp = () => Dom_html.performanceNow(Dom_html.performance);

let rec gameLoop = (t: float, currentGame: game) => {
  let newGame = Director.updateGame(t, currentGame, currentState, constantsState);

  let canvas = load_canvas("canvas");
  let _ = draw_game(canvas, newGame, currentState, constantsState);

  Dom_html.requestAnimationFrame(t =>
    currentState.reset ?
      {
        currentState.reset = false;
        gameLoop(getTimeStamp(), initialGame);
      } :
      (
        switch (newGame.state) {
        | Going => gameLoop(t, newGame)
        | Won
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

let changeLevel = (lvl, _event, _self) =>
  currentState.isRunning ?
    {
      currentState.level = Levels.load_level(lvl);
      currentState.direction = Right;
      currentState.reset = true;
    } :
    {
      currentState.level = Levels.load_level(lvl);
      currentState.direction = Right;
      currentState.reset = false;
      currentState.isRunning = true;
      gameLoop(getTimeStamp(), initialGame);
    };

let make = _children => {
  ...component,
  render: self =>
    <div>
      <button onClick={self.handle(resetGame)}> {ReasonReact.string("Reset Game")} </button>
      <button onClick={self.handle(changeLevel(1))}> {ReasonReact.string("1")} </button>
      <button onClick={self.handle(changeLevel(2))}> {ReasonReact.string("2")} </button>
      <button onClick={self.handle(changeLevel(3))}> {ReasonReact.string("3")} </button>
    </div>,
};
