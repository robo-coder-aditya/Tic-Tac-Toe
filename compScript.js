var cellIdentity = [1, 2, 3, 4, 5, 6, 7, 8, 9];
var cellsAvailable = 9;
var gameStarterDecide = 0;
var compTurn = 0;
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
                $("h1").html("You win!🎉🎉<br>Press Any key to restart").addClass("game-over");
            }
            else{
                $("h1").html("Computer Wins!<br>Press Any key to restart").addClass("game-over");
            }
            $(".cell").off("click");
            gameStarterDecide = !gameStarterDecide;
            compTurn = gameStarterDecide;
            $(document).one("keydown", startGame);
            return true;
        }
    }
    if(cellsAvailable===0){
        $("h1").html("Draw<br>Press any key to restart").addClass("game-over");
        gameStarterDecide = !gameStarterDecide;
        compTurn = gameStarterDecide;
        $(document).one("keydown", startGame);
        return true;
    }

    return false;
}
function compChoice(){
    $("h1").text("Computer's turn");
    var compSelectedNumber = Math.floor(Math.random()*cellsAvailable);
    var cellNumber = cellIdentity[compSelectedNumber];
    var cellSelectedByComp = ".cell"+cellNumber;
    console.log(cellSelectedByComp);
    if(cellIdentity.length!=0){
        setTimeout(function(){
            $(cellSelectedByComp).fadeOut(200).fadeIn(200);
            setTimeout(function(){
                $(cellSelectedByComp).text("O");
                cellIdentity = cellIdentity.filter(num => num!=cellNumber);
                cellsAvailable--;
                setTimeout(function(){
                    const over = resultCheck();
                    if(!over){
                        compTurn = !compTurn;
                        userTurn();
                    }
                }, 50);
            }, 150);
        
        }, 800);
    
    }
}
function userTurn(){
    $("h1").text("Your turn");
}
function userClick(){
    $(".cell").off("click").on("click", function(){
        var clicked = this;
        $btn = $(this);
        if ($btn.text().trim() !== "") return;
        $(this).fadeOut(200).fadeIn(200);
        setTimeout(function(){
            $btn.text("X");
            var cellClicked = parseInt(clicked.classList[1].slice(4));
            cellIdentity = cellIdentity.filter(num => num!=cellClicked);
            cellsAvailable--;
            setTimeout(function(){
                const over = resultCheck();
                if(!over){
                    compTurn = !compTurn;
                    compChoice();
                }
            },50);
        }, 150);
        
    });
}
function gameStarts(){
    $(document).one("keydown", startGame);
}
function startGame(){
        cellIdentity = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        cellsAvailable = 9;
        userClick();
        $(".cell").text("");
        $("h1").removeClass("game-over");
        $(".cell").removeClass("win");
        if(gameStarterDecide==0) userTurn();
        else compChoice();
}
gameStarts();