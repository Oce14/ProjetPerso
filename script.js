window.onload = function() 
{
    var canvasWidth = 900;
    var canvasHeight = 600;
    var blockSize = 30;
    var ctx;
    var delay = 1000;
    var snakee;
    var apple;
    var widthInBlocks = canvasWidth/blockSize;
    var heightInBlocks = canvasHeight/blockSize;


    init();

    function init()
    {
        console.log("init");
        canvas = document.createElement("canvas");
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        canvas.style.border = "1px solid";
        document.body.appendChild(canvas);
        ctx = canvas.getContext("2d");
        body=[[6,4],[5,4],[4,4]];
        direction = "left";
        snakee = new Snake(body,direction);
        apple = new Apple([10,10]);
        refreshCanvas();
    }

    function refreshCanvas()
    {
        //console.log("refreshCanvas");
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        snakee.advance();
        snakee.draw();
        apple.draw();
        setTimeout(refreshCanvas, delay);
    }

    function drawBlock(ctx, position)
    {
        //console.log("drawBlock");
        var x = position[0] * blockSize;
        var y = position[1] * blockSize;
        ctx.fillRect(x, y, blockSize, blockSize);
    }

    function Snake(body, direction)
    {
        //console.log(body)
        //console.log(direction);
        //console.log("Snake");
        this.body = body;
        this.direction = direction;
        //console.log(this.direction);
        this.draw = function()
        {
            //console.log("draw");
            ctx.save();
            ctx.fillStyle = "#ff0000";
            for(var i = 0; i < this.body.length; i++)
            {
                drawBlock(ctx, this.body[i]);
            }
            ctx.restore();
        };
        this.advance = function()
        {
            //console.log("advance");
            var nextPosition = this.body[0].slice();
            //console.log(this.body[0]);
            //console.log(nextPosition[0]);
            //console.log(this.direction);
            switch(this.direction)
            {
                case "left":
                    nextPosition[0] -= 1;
                    console.log("left");
                    break;
                case "right":
                    nextPosition[0] += 1;
                    //console.log("right");
                    break;
                case "down":
                    nextPosition[1] += 1;
                    console.log("down");
                    break;
                case "up":
                    nextPosition[1] -= 1;
                    console.log("up");
                    break;
                default:
                    console.log("default");
                    throw("Invalid Direction");
            }
            this.body.unshift(nextPosition);
            this.body.pop();
        };
        this.setDirection=function(newDirection)
        {
            console.log("setDirection");
            var allowedDirections;
            switch(this.direction)
            {
                case "left":
                case "right":
                    console.log("left/right");
                    allowedDirections = ["up", "down"];
                    break;
                case "down":
                case "up":
                    console.log("down/up");
                    allowedDirections = ["left", "right"];
                    break;
                default:
                    console.log("default");
                    throw("Invalid Direction");
            }
            if(allowedDirections.indexOf(newDirection) > -1)
            {
                console.log("newDirection");
                this.direction = newDirection;
            }

        };
        this.checkCollision = function()
        {
            var wallCollision = false;
            var snakeCollision = false;
            var head = this.body[0];
            var rest = this.body.slice(1);
            var snakeX = head[0];
            var snakeY = head[1];
            var minX = 0;
            var minY = 0;
            var maxX = widthInBlocks - 1;
            var maxY = heightInBlocks - 1;
            var isNotBetweenHorizontalWalls = snakeX < minX || snakeX > maxX;
            var isNotBetweenVerticalWalls = snakeY < minY || snakeY > maxY;
            if(isNotBetweenHorizontalWalls || isNotBetweenVerticalWalls)
            {
                wallCollision = true;
            }
            for(var i = 0; i < rest.length; i++)
            {
                if(snakeX === rest[i][0] && snakeY === rest[i][1])
                {
                    snakeCollision = true;
                }
            }
            return wallCollision || snakeCollision;

        };
    }

    function Apple(position)   
    {
        this.position = position;  
        this.draw = function()
        {
            ctx.save();
            ctx.fillStyle = "#33cc33";
            ctx.beginPath();
            var radius = blockSize/2;
            var x = position[0]*blockSize + radius;
            var y = position[1]*blockSize + radius;
            ctx.arc(x, y, radius, 0, Math.PI*2, true);
            ctx.fill();
            ctx.restore();
        }

    }

    document.onkeydown = function handleKeyDown(e)
    {
        console.log("handleKeyDown");
        var key = e.keyCode;
        var newDirection;
        switch(key)
        {
            case 37:
                console.log("left");
                newDirection = "left";
                break;
            case 38:
                console.log("up");
                newDirection = "up";
                break;
            case 39:
                console.log("right");
                newDirection = "right";
                break;
            case 40:
                console.log("down");
                newDirection = "down";
                break;
            default:
                console.log("default");
                return;
        }
        snakee.setDirection(newDirection);
    }

}