    window.addEventListener("load", function(event) {
    var startButton = document.getElementById('start');
    var intro = document.getElementById('intro');
    var game = document.getElementById('game');
    var griffindor = document.getElementById('griffindor');
    var slytherin = document.getElementById('slytherin');
    var ravenclaw = document.getElementById('ravenclaw');
    var hufflepuff = document.getElementById('hufflepuff');

    var b1 = new Image();
    b1.src = '/images/hp-bg1.png';
    var b2 = new Image();
    b2.src = '/images/hp-bg2.png';
    var b3 = new Image();
    b3.src = '/images/hp-bg3.png';
    var b4 = new Image();
    b4.src = '/images/hp-bg4.png';

    griffindor.onclick = () =>{
        b1.onload = document.body.style.backgroundImage = 'url(/images/hp-bg1.png)'
    };
    slytherin.onclick = () =>{
        b2.onload = document.body.style.backgroundImage = 'url(/images/hp-bg2.png)'
    };
    ravenclaw.onclick = () =>{
        b3.onload = document.body.style.backgroundImage = 'url(/images/hp-bg3.png)'
    };
    hufflepuff.onclick = () =>{
        b4.onload = document.body.style.backgroundImage = 'url(/images/hp-bg4.png)'
    };

    function roundedRect(ctx, x, y, width, height, radius) {
        ctx.beginPath();
        ctx.moveTo(x, y + radius);
        ctx.lineTo(x, y + height - radius);
        ctx.arcTo(x, y + height, x + radius, y + height, radius);
        ctx.lineTo(x + width - radius, y + height);
        ctx.arcTo(x + width, y + height, x + width, y + height-radius, radius);
        ctx.lineTo(x + width, y + radius);
        ctx.arcTo(x + width, y, x + width - radius, y, radius);
        ctx.lineTo(x + radius, y);
        ctx.arcTo(x, y, x, y + radius, radius);
        ctx.fill();
      };

    var bg = new Image();
    bg.src = './images/cloudy-bg-sml.png';
    var icon = new Image();
    icon.src = './images/broom.png';
    // var dementor = new Image();
    // dementor.src = './images/dementor.png'
    var dementor = new Image();
    dementor.src = './images/dem2.png';
    var snitch = new Image();
    snitch.src = './images/snitch1.png';
    var star = new Image();
    star.src = './images/star.png';
    var owl = new Image();
    owl.src = './images/owl-1.png';

    var background = {
        img: bg,
        x: 0,
        speed: -1,

        move: function () {
            this.x += this.speed;
            this.x %= gameBoard.canvas.width;
        },

        draw: function () {
            ctx.drawImage(this.img, this.x, 0);
            if (this.speed < 0) {
                ctx.drawImage(this.img, this.x + gameBoard.canvas.width, 0);
            } else {
                ctx.drawImage(this.img, this.x - this.img.width,0);
            }
        },
    };

    startButton.onclick = () => {
        var ranBoss = Math.ceil(Math.random() * (3));
        intro.classList.remove('flex');
        intro.classList.add('hide');
        game.classList.add('flex');
        player = new Player(100, 100, 60, 55);
        gameBoard.start();
        boss = new Image();
        boss.src = './images/boss-'+ranBoss+'.png';
        updateGameArea();
    };
    
    var dementors = [];
    var snitchs = [];
    var lives = [];    
    var owls = [];
    var bossArr = [];    

    var ctx;
    var boss;

    document.onkeydown = function (e) {
        switch (e.keyCode) {
            case 38:
                player.moveUp();
                break;
            case 40:
                player.moveDown();
                break;
            case 37:
                player.moveLeft();
                break;
            case 39:
                player.moveRight();
                break;
        }
    }

    document.onkeypress = (e) => {
        //create a pause class or smth so at the next space press the game continues
        if (e.keyCode == 32) {
            gameBoard.pause = !gameBoard.pause;
            updateGameArea();
        }
    };
    document.onkeyup = function (e) {
        player.stopMove();
    }


    function Player(x, y, width, height) {
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.height = height;
        this.width = width;
        this.lives = 5;
        this.update = function () {
            ctx.drawImage(icon, this.x, this.y, this.width, this.height);
        }

        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        }

        this.moveUp = () => {
                this.speedY -= 5 ;
        }
        this.moveDown = () => {
                this.speedY += 5 ;
        }
        this.moveLeft = () => {
                this.speedX -= 5 ;                
        }
        this.moveRight = () => {
                this.speedX += 5 ;
        }

        this.stopMove = () => {
            this.speedX = 0;
            this.speedY = 0;
        }

        this.left = function () {
            return this.x
        };
        this.right = function () {
            return (this.x + this.width)
        };
        this.top = function () {
            return this.y
        };
        this.bottom = function () {
            return this.y + (this.height)
        };
        this.crashWith = function (obstacle) {
            return !((this.bottom() < obstacle.top()) ||
                (this.top() > obstacle.bottom()) ||
                (this.right() < obstacle.left()) ||
                (this.left() > obstacle.right()))
        }
    }

    function Dementor(x, y,speed){
        this.speedX = speed * this.dt;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 60;
        this.update = function () {
            ctx.drawImage(dementor, this.x, this.y, this.width, this.height);
        }
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        }

        this.left = function () {
            return this.x
        };
        this.right = function () {
            return (this.x + this.width)
        };
        this.top = function () {
            return this.y
        };
        this.bottom = function () {
            return this.y + (this.height)
        };
        this.crashWith = function (obstacle) {
            return !((this.bottom() < obstacle.top()) ||
                (this.top() > obstacle.bottom()) ||
                (this.right() < obstacle.left()) ||
                (this.left() > obstacle.right()))
        }
    }

    function Boss(x, y,speed){
        this.speedX = speed;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.height = 80;
        this.width = 60;
        this.update = function () {
            ctx.drawImage(boss, this.x, this.y, this.width, this.height);
        }
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        }

        this.left = function () {
            return this.x
        };
        this.right = function () {
            return (this.x + this.width)
        };
        this.top = function () {
            return this.y
        };
        this.bottom = function () {
            return this.y + (this.height)
        };
        this.crashWith = function (obstacle) {
            return !((this.bottom() < obstacle.top()) ||
                (this.top() > obstacle.bottom()) ||
                (this.right() < obstacle.left()) ||
                (this.left() > obstacle.right()))
        }
    }

    function Coin(x,y){
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.height = 20;
        this.width = 35;
        this.update = function () {
            ctx.drawImage(snitch, this.x, this.y, this.width, this.height);
        }
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        }

        this.left = function () {
            return this.x
        };
        this.right = function () {
            return (this.x + this.width)
        };
        this.top = function () {
            return this.y
        };
        this.bottom = function () {
            return this.y + (this.height)
        };
        this.crashWith = function (obstacle) {
            return !((this.bottom() < obstacle.top()) ||
                (this.top() > obstacle.bottom()) ||
                (this.right() < obstacle.left()) ||
                (this.left() > obstacle.right()))
        }
    }

    function Owl(x,y){
        this.speedX = 0;
        this.speedY = 0;
        this.x = x;
        this.y = y;
        this.height = 30;
        this.width = 25;
        this.update = function () {
            ctx.drawImage(owl, this.x, this.y, this.width, this.height);
        }
        this.newPos = function () {
            this.x += this.speedX;
            this.y += this.speedY;
        }

        this.left = function () {
            return this.x
        };
        this.right = function () {
            return (this.x + this.width)
        };
        this.top = function () {
            return this.y
        };
        this.bottom = function () {
            return this.y + (this.height)
        };
        this.crashWith = function (obstacle) {
            return !((this.bottom() < obstacle.top()) ||
                (this.top() > obstacle.bottom()) ||
                (this.right() < obstacle.left()) ||
                (this.left() > obstacle.right()))
        }
    }

    function Life(){
        this.update = (space) => {
            ctx.drawImage(star,230 + space,450,30,30);
        }
    }

    var gameBoard = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 750;
            this.canvas.height = 500;
            ctx = this.canvas.getContext("2d");
            document.getElementById('game').appendChild(this.canvas);
            // this.interval = setInterval(updateGameArea, 10);
            for (let i = 0; i < player.lives; i++) {
                var life = new Life();
                lives.push(life);
            };
        },
        clear: function () {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        frames: 0,
        points: 0,
        score: function () {
            ctx.font = '18px monospace';
            ctx.fillStyle = 'black';
            ctx.fillText('Score: ' + this.points, 350, 50);
        },
        gameTime: 0,
        pause: false,
    };

    function Over(){
        this.gameOver = () =>{
          ctx.fillStyle = 'black';
          roundedRect(ctx, 250, 150, 300, 200, 15);
        //   ctx.fillRect(250,150,300,200);
          ctx.font = '48px monospace';
          ctx.strokeStyle = 'white';
          ctx.strokeText('GAME OVER', 280, 250);
          ctx.fillStyle = 'white';
          ctx.font = '16px monospace';
          ctx.fillText('your final score is: ' + gameBoard.points, 290, 300);
        }
      }

     var finalBoss;

     var lastTime;

    var sprites;
    function float(sp){
        for(let i = 0; i < sp.length; i++){
            sprite = sp[i];
            if(sprite instanceof Boss){
                if((gameBoard.frames / 60) % 2 < 1){
                    sprite.y --;
                } else{
                    sprite.y++;
                }
                sprite.update();
                return;
            }
            sprite.x --;
            
            if(sprite.x < gameBoard.canvas.width && sprite.x  >= gameBoard.canvas.width-100 || 
                sprite.x < gameBoard.canvas.width-299 && sprite.x  >= gameBoard.canvas.width-400|| 
                sprite.x < gameBoard.canvas.width-599 && sprite.x  >= gameBoard.canvas.width-700){
                sprite.y --;
            }
            if(sprite.x < gameBoard.canvas.width-99 && sprite.x  >= gameBoard.canvas.width-300 ||
                sprite.x < gameBoard.canvas.width-399 && sprite.x  >= gameBoard.canvas.width-600 ||
                sprite.x < gameBoard.canvas.width-699 && sprite.x  >= gameBoard.canvas.width-800){
                sprite.y++;
            }    
            sprite.update();
        }
    };

    function boundaries (){
        if(player.x >= gameBoard.canvas.width - player.width){
            player.x = gameBoard.canvas.width - player.width;
        }
        if(player.y >= gameBoard.canvas.height - player.height){
            player.y = gameBoard.canvas.height - player.height;
        }
        if(player.x < 0){
            player.x = 0;
        }
        if(player.y < 0){
            player.y = 0;
        }
    }

    function updateGameArea() {
        if(gameBoard.pause){
            return;
        }

        gameBoard.clear;
        background.move();
        background.draw();
        
        gameBoard.frames++;

        //setting boundaries inside the canvas
        boundaries();

        //when the player crashes with a dementor
        for (i = 0; i < dementors.length; i += 1) {
            if (player.crashWith(dementors[i])) {
                dementors.splice(i, 1);
                gameBoard.points -= 200;
                player.lives--;
                lives.splice('', 1);
                if (player.lives === 0) {
                    var over = new Over();
                    over.gameOver();
                    return;
                }
            }
          }

          //when a player crashes with a snitch
        for (let i = 0; i < snitchs.length; i += 1) {
            if (player.crashWith(snitchs[i])) {
                snitchs.splice(i, 1);
                gameBoard.points += 150;
            }
          }
          //when a player crashes with an owl
        for (let i = 0; i < owls.length; i += 1) {
            if (player.crashWith(owls[i])) {
                owls.splice(i, 1);
                if(player.lives < 5){
                    player.lives ++;
                    var life = new Life();
                    lives.push(life);
                } else if(player.lives === 5){
                    gameBoard.points += 250;
                };
            }
            
          }

          //draw lives

          var space = 0;
        for (let i = 0; i < lives.length; i++) {
            lives[i].update(space);
            space += 70;
        }
        
          //make a new dementor appear
        if(Math.random() < 1 - Math.pow(.993, gameBoard.frames/8500)){
            y = Math.floor(Math.random() * (gameBoard.canvas.height));
            var dem = new Dementor(gameBoard.canvas.width,y,background.speed);
            dementors.push(dem);
        }
        //make a new Snitch appear
        if(gameBoard.frames % 100 === 0){
            t = Math.floor(Math.random() * (gameBoard.canvas.height));
            var sni = new Coin(gameBoard.canvas.width,t);
            snitchs.push(sni);
        }
        // make a new Owl appear
        if(gameBoard.frames % 1000 === 0){
            o = Math.floor(Math.random() * (gameBoard.canvas.height));
            var owl = new Owl(gameBoard.canvas.width,o);
            owls.push(owl);
        }

        if(sprites != undefined){
            for(let i = 0; i <= sprites.length ; i++){
                if(sprites[i] != undefined){
                        float(sprites[i]);
                };
            }
        };

        //add points
        if(gameBoard.frames % 60 === 0){
            gameBoard.points += 100;
            gameBoard.gameTime ++;
        } 

        //make it faster every 1000 frames

        if(gameBoard.frames % (60*20) === 0){
            background.speed -= 0.8;
            for(let i = 0; i< dementors.length; i++){
                dementors[i].speedX = background.speed;
                dementors[i].newPos();
                dementors[i].update();
            }
        }

        if(gameBoard.points > 18000 && gameBoard.points < 18200){
                y = Math.floor(Math.random() * (gameBoard.canvas.height - 160));
                finalBoss = new Boss(gameBoard.canvas.width - 100, y);
                bossArr.push([finalBoss]);
        }

        sprites = [dementors,snitchs,owls,bossArr[0]];

        player.newPos();
        player.update();
        gameBoard.score();

        
        requestAnimationFrame(updateGameArea);
    }
});