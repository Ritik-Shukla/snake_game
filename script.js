let inputDir = {x:0, y:0};
let speed = 6;
let score = 0;
let lastPaintTime = 0;
let snakeArr = [
    {x:13 ,y :15}
]
food = {x:6,y:7};

// game function 
function main(ctime){
    window.requestAnimationFrame(main);
    // console.log(ctime)
if((ctime-lastPaintTime)/1000 < 1/speed){
    return ;
}
lastPaintTime = ctime;
gameEngine();
}


function isCollide(snake){
// if bite the own body 
for(let i = 1;i<snakeArr.length;i++){
if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
    return true;
}
}
if(snake[0].x >= 25 || snake[0].x<=0  || snake[0].y>=25 || snake[0].y<=0){
return true;
}
}




function gameEngine(){
// updating the snake array and food
if(isCollide(snakeArr)){
    inputDir = {x:0 , y:0};
    alert("game over press any key to start again")
    snakeArr = [
        {x:13 ,y :15}
    ];
    score = 0;
}

// if food is eaten ,increment the scre and regenrate the score 
if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
    score += 1;
    if(score>Highscoreval){
        Highscoreval = score;
        localStorage.setItem("Highscore",JSON.stringify(Highscoreval));
        HighscoreBox.innerHTML = "Hiscore: "+ Highscoreval;
    }
    scoreBox.innerHTML = "score: "+score;
    snakeArr.unshift({x: snakeArr[0].x +inputDir.x, y: snakeArr[0].y +inputDir.y})
    let a = 1;
    let b = 24;
    food = {x: Math.round(a+ (b-a)*Math.random()), y: Math.round(a+ (b-a)*Math.random())}
}

// moving the snake 
for(let i = snakeArr.length-2; i>=0; i--){
    snakeArr[i+1] = {...snakeArr[i]};
}
    

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;

// display the snake 
    board.innerHTML = "";
    snakeArr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        
        if(index === 0){
            snakeElement.classList.add('head');
        }else{
            snakeElement.classList.add('snake')
        }
        board.appendChild(snakeElement);
    });
// display the food 
    foodElement = document.createElement('div');
        foodElement.style.gridRowStart = food.y;
        foodElement.style.gridColumnStart = food.x;
        foodElement.classList.add('food')
        board.appendChild(foodElement);
}










// main logic
let Highscore = localStorage.getItem("Highscore");
if(Highscore===null){
    Highscoreval = 0;
    localStorage.setItem("Highscore",JSON.stringify(Highscoreval));
}else{
    Highscoreval = JSON.parse(Highscore);
    HighscoreBox.innerHTML = "Hiscore: "+ Highscore;
}
window.requestAnimationFrame(main);
window.addEventListener('keydown',e =>{
    inputDir = {x:0,y:1}
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;

        break;
        case "ArrowDown":
            console.log("ArrowDown")
            inputDir.x = 0;
            inputDir.y = 1;
        break;
        case "ArrowLeft":
            console.log("ArrowLeft")
            inputDir.x = -1;
            inputDir.y = 0;
        break;
        case "ArrowRight":
            console.log("ArrowRight")
            inputDir.x = 1;
            inputDir.y = 0;
        break;
        default:
            break;
    }
});