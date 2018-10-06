open Director
open Utils
module Score =
  struct
    let map_eaten_to_score enemies =
      List.map
        (fun x  ->
           match x with | Normal _ -> 10 | Special _ -> 50 | None  -> 0)
        enemies
    let sum_score enemies =
      (List.fold_left Utils.sum 0) @@ (map_eaten_to_score enemies)
  end
