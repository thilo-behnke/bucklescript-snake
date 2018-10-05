module Utils: sig
    val add: int -> int -> int
    val inc: int -> int
    val dec: int -> int
    val double: int -> int
    val incDouble: int -> int
    val sub: int -> int -> int
    val sum: int -> int -> int
end

module MyList: sig
    val map: ('a -> 'b) -> 'a list -> 'b list
    val forEach: ('a -> unit) -> 'a list -> unit
    val forEachi: ('a -> int -> unit) -> 'a list -> unit
    val range: int -> int list
    val find_opt: ('a -> bool) -> 'a list -> 'a option
    end