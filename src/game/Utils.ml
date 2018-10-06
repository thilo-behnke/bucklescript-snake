module Utils =
  struct
    let add a b = a + b
    let inc i = i + 1
    let dec i = i - 1
    let double i = i * 2
    let incDouble i = (inc i) |> double
    let sub a b = a - b
    let sum a b = a + b
  end
module MyString = struct let append s s' = s ^ s' end
module MyList =
  struct
    let rec map f = function | [] -> [] | x::xs -> (f x) :: (map f xs)
    let rec forEach f = function | [] -> () | x::xs -> (f x; forEach f xs)
    let forEachi f l =
      let rec inner i =
        function | [] -> () | x::xs -> (f x i; inner (i + 1) xs) in
      inner 0 l
    let range n =
      let rec inner acc i =
        match i < n with | true  -> inner (i :: acc) (i + 1) | false  -> acc in
      inner [] 0
    let rec find_opt pred =
      function
      | [] -> None
      | x::xs -> if pred x then Some x else find_opt pred xs
  end
let (|>) x f = f x
let (<|) f x = x f
