var cellIdentity = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var cellsAvailable = 9;
var gameStarterDecide = 0;
var player2Chance = 0;
const winningCombinations = [
    [1,2,3], [4,5,6], [7,8,9], [1,4,7], [2,5,8], [3,6,9], [1,5,9], [3,5,7]
]
function resultCheck(){
    
    for(let combo of winningCombinations){
        const[a, b, c] = combo;
        var cellA = $(".cell"+a).text();
        var cellB = $(".cell"+b).text();
        var cellC = $(".cell"+c).text();
        if(cellA != "" && cellA === cellB && cellB === cellC){
            $(".cell"+a).addClass("win");
            $(".cell"+b).addClass("win");
            $(".cell"+c).addClass("win");
            if(cellA==="X"){
                $("h1").html("Player 1 wins!🎉🎉<br>Click anywhere to restart").addClass("game-over");
            }
            else{
                $("h1").html("Player 2 wins!🎉🎉<br>Click anywhere to restart").addClass("game-over");
            }
            $(".cell").off("click");
            gameStarterDecide = !gameStarterDecide;
            player2Chance = gameStarterDecide;
            $(document).one("click", startGame);
            return true;
        }
    }
    if(cellsAvailable===0){
        $("h1").html("Draw<br>Click anywhere to restart").addClass("game-over");
        gameStarterDecide = !gameStarterDecide;
        player2Chance = gameStarterDecide;
        $(document).one("click", startGame);
        return true;
    }

    return false;
}
function player1Turn(){
    $("h1").text("Player 1's turn");
}
function player2Turn(){
    $("h1").text("Player 2's turn")
}
function userClick(){
    $(".cell").off("click").on("click",function(){
        var clicked = this;
        $btn = $(this);
        if ($btn.text().trim() !== "") return;
        $(this).fadeOut(200).fadeIn(200);
        setTimeout(function(){
            if(!player2Chance){
                $btn.text("X");
            }
            else{
                $btn.text("O");
            }
            var cellClicked = parseInt(clicked.classList[1].slice(4));
            cellIdentity = cellIdentity.filter(num => num!=cellClicked);
            cellsAvailable--;
            player2Chance = !player2Chance;
            setTimeout(function(){
                const over = resultCheck();
                if(!over){
                    if(!player2Chance) player1Turn();
                    else player2Turn();
                }
            }, 150);
        }, 150);
    });
}
function gameStarts(){
    $(document).one("click", startGame);
}
function startGame(){
        cellIdentity = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        cellsAvailable = 9;
        userClick();
        $(".cell").text("");
        $("h1").removeClass("game-over");
        $(".cell").removeClass("win");
        if(gameStarterDecide==0) player1Turn();
        else player2Turn();
}
gameStarts();
