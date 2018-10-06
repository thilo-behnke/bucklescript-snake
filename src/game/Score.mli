open Director

module Score: sig
    val map_eaten_to_score: enemy list -> int list
    val sum_score: enemy list -> int
end