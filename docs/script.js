var queue = new createjs.LoadQueue(true);

let soundObjects = {};

function handleSoundsLoad(event){
    var item = event.item; 
    soundObjects[item.id] = new Audio(item.src);
    // console.log(soundObjects);
}

function handleSoundsComplete(event){
    loadPage();
    console.log(soundObjects);
}

var soundFiles = [
    {
        id:"click1", src:"/sounds/click-1.mp3", index: 1
    },
    {
        id:"owlTone", src:"/sounds/tone-1.mp3", index: 2
    },
    {
        id:"coinTone", src:"/sounds/coin-1.mp3", index: 3
    },
    {
        id:"tone2", src:"/sounds/tone-2.mp3", index: 4
    },
    {
        id:"tone3", src:"/sounds/tone-3.mp3", index: 5
    },
    {
        id:"gameover", src:"/sounds/gameover.mp3", index: 6
    },
    {
        id:"crash", src:"/sounds/crash.mp3", index: 7
    },
];
queue.loadManifest(soundFiles);

queue.on("fileload", handleSoundsLoad, this);
queue.on("complete", handleSoundsComplete, this);

function loadPage(){
    function soundStop() {
        for (sound in soundObjects) {
            if (soundObjects[sound].currentTime > 0) {
                soundObjects[sound].pause();
                soundObjects[sound].currentTime = 0;
            }
        }
    }
        var w = window.innerWidth;
        var h = window.innerHeight;
    
        console.log(w,h);
    
        var intro = document.getElementById('intro');
        var username = document.getElementById('username');
        var game = document.getElementById('game');
        var griffindor = document.getElementById('griffindor');
        var slytherin = document.getElementById('slytherin');
        var ravenclaw = document.getElementById('ravenclaw');
        var hufflepuff = document.getElementById('hufflepuff');
    
        var startButton = document.getElementById('start');
        var instButton = document.getElementById('instructions');
        //normal index
        var rules1 = document.getElementById('rules-1');
        var rules2 = document.getElementById('rules-2');
        var rules3 = document.getElementById('rules-3');
    
        var nextBtn1 = document.getElementById('nextBtn1');
        var nextBtn2 = document.getElementById('nextBtn2');
    
        var backBtn1 = document.getElementById('backBtn1');
        var backBtn2 = document.getElementById('backBtn2');
        var backBtn3 = document.getElementById('backBtn3');
    
        var toStart = document.getElementById('to-start');
    
        var name;
        var owl;
        var background;
        var boss;
        var ranBoss;
        var gameBoard;
        var player;
        var finalBoss;
        var sprites;
        var space;
    
        var dementors = [];
        var snitchs = [];
        var lives = [];
        var owls = [];
        var bossArr = [];
    
        var b1 = new Image(400, 400);
        b1.src = './images/hp-bg1.png';
        var b2 = new Image();
        b2.src = './images/hp-bg2.png';
        var b3 = new Image();
        b3.src = './images/hp-bg3.png';
        var b4 = new Image();
        b4.src = './images/hp-bg4.png';
    
        var bgBig = new Image();
        bgBig.src = './images/cloudy-bg-sml.png';
        var bgSmall = new Image();
        bgSmall.src = './images/cloudy-bg-iphone.png';
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
    
        //controls for ipad
        var rightC = new Image();
        rightC.src = './images/c-right.png';
        var upC = new Image();
        upC.src = './images/c-up.png';
        var downC = new Image();
        downC.src = './images/c-down.png';
        var leftC = new Image();
        leftC.src = './images/c-left.png';
    
        griffindor.onclick = () => {
            soundStop();
            soundObjects["tone2"].play();
            b1.onload = document.body.style.backgroundImage = "url('./images/hp-bg1.png')";
        };
        slytherin.onclick = () => {
            soundStop();
            soundObjects["tone2"].play();
            b2.onload = document.body.style.backgroundImage = "url('./images/hp-bg2.png')";
        };
        ravenclaw.onclick = () => {
            soundStop();
            soundObjects["tone2"].play();
            b3.onload = document.body.style.backgroundImage = "url('./images/hp-bg3.png')";
        };
        hufflepuff.onclick = () => {
            soundStop();
            soundObjects["tone2"].play();
            b4.onload = document.body.style.backgroundImage = "url('./images/hp-bg4.png')";
        };
    
        instButton.onclick = () => {
            soundStop();
            soundObjects["click1"].play();
            intro.classList.add('hide');
            rules1.classList.remove('hide');
            if (name == undefined) {
                name = this.prompt("What's your name?");
                username.innerHTML = name;
            }
        };
    
        nextBtn1.onclick = () => {
            rules1.classList.add('hide');
            rules2.classList.remove('hide');
            soundStop();
            soundObjects["click1"].play();
        };
        backBtn1.onclick = () => {
            rules1.classList.add('hide');
            intro.classList.remove('hide');
            soundStop();
            soundObjects["click1"].play();
        };
        nextBtn2.onclick = () => {
            rules2.classList.add('hide');
            rules3.classList.remove('hide');
            soundStop();
            soundObjects["click1"].play();
        };
        backBtn2.onclick = () => {
            rules2.classList.add('hide');
            rules1.classList.remove('hide');
            soundStop();
            soundObjects["click1"].play();
        };
        backBtn3.onclick = () => {
            rules3.classList.add('hide');
            rules2.classList.remove('hide');
            soundStop();
            soundObjects["click1"].play();
        };
        toStart.onclick = () => {
            rules3.classList.add('hide');
            intro.classList.remove('hide');
            soundStop();
            soundObjects["tone2"].play();
        };
    
        background = {
            img: bgBig,
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
                    ctx.drawImage(this.img, this.x - this.img.width, 0);
                };
            },
        };
    
        function roundedRect(ctx, x, y, width, height, radius) {
            ctx.beginPath();
            ctx.moveTo(x, y + radius);
            ctx.lineTo(x, y + height - radius);
            ctx.arcTo(x, y + height, x + radius, y + height, radius);
            ctx.lineTo(x + width - radius, y + height);
            ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
            ctx.lineTo(x + width, y + radius);
            ctx.arcTo(x + width, y, x + width - radius, y, radius);
            ctx.lineTo(x + radius, y);
            ctx.arcTo(x, y, x, y + radius, radius);
            ctx.fill();
        };
    
        function removeSprite(sp) {
            let s = sp;
            if (s != undefined) {
                for (let i = 0; i < s.length; i++) {
                    if (s[i].x < 0 - s[i].width) {
                        s.splice(i, 1);
                    };
                };
            };
        };
    
        function float(sp) {
            if (sp != undefined) {
                for (let i = 0; i < sp.length; i++) {
                    sprite = sp[i];
                    if (sprite instanceof Boss) {
                        if (sprite.borderTop == false) {
                            if (sprite.y > 0) {
                                sprite.y--;
                            };
                            if (sprite.y == 0) {
                                sprite.borderTop = true;
                            };
                        };
                        if (sprite.borderTop == true) {
                            if (sprite.y < gameBoard.canvas.height - sprite.height) {
                                sprite.y++;
                            };
                            if (sprite.y == gameBoard.canvas.height - sprite.height) {
                                sprite.borderTop = false;
                            };
                        }
                        
                        sprite.update();
                        return;
                    };
                    sprite.x--;
    
                    if (sprite.x < gameBoard.canvas.width && sprite.x >= gameBoard.canvas.width - 100 ||
                        sprite.x < gameBoard.canvas.width - 299 && sprite.x >= gameBoard.canvas.width - 400 ||
                        sprite.x < gameBoard.canvas.width - 599 && sprite.x >= gameBoard.canvas.width - 700) {
                        sprite.y--;
                    };
                    if (sprite.x < gameBoard.canvas.width - 99 && sprite.x >= gameBoard.canvas.width - 300 ||
                        sprite.x < gameBoard.canvas.width - 399 && sprite.x >= gameBoard.canvas.width - 600 ||
                        sprite.x < gameBoard.canvas.width - 699 && sprite.x >= gameBoard.canvas.width - 800) {
                        sprite.y++;
                    };
                    sprite.newPos();
                    sprite.update();
                };
            };
        };
    
        function backgroundUpdate() {
            background.move();
            background.draw();
        };
    
        function drawLives() {
            space = 0;
            for (let i = 0; i < lives.length; i++) {
                lives[i].update(space);
                space += 70;
            };
        };
    
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
            };
    
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
            };
    
            this.moveUp = () => {
                this.speedY -= 5;
            };
            this.moveDown = () => {
                this.speedY += 5;
            };
            this.moveLeft = () => {
                this.speedX -= 5;
            };
            this.moveRight = () => {
                this.speedX += 5;
            };
    
            this.stopMove = () => {
                this.speedX = 0;
                this.speedY = 0;
            };
    
            this.left = function () {
                return this.x;
            };
            this.right = function () {
                return (this.x + this.width);
            };
            this.top = function () {
                return this.y;
            };
            this.bottom = function () {
                return this.y + (this.height);
            };
            this.crashWith = function (obstacle) {
                return !((this.bottom() < obstacle.top()) ||
                    (this.top() > obstacle.bottom()) ||
                    (this.right() < obstacle.left()) ||
                    (this.left() > obstacle.right()));
            };
        };
    
        function Dementor(x, y) {
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.height = 60;
            this.width = 60;
            this.update = function () {
                ctx.drawImage(dementor, this.x, this.y, this.width, this.height);
            };
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
            };
    
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
                    (this.left() > obstacle.right()));
            };
        };
    
        function Boss(x, y, speed) {
            this.speedX = speed;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.height = 80;
            this.width = 60;
            this.update = function () {
                ctx.drawImage(boss, this.x, this.y, this.width, this.height);
            };
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
            };
            this.borderTop = false;
    
            this.left = function () {
                return this.x;
            };
            this.right = function () {
                return (this.x + this.width);
            };
            this.top = function () {
                return this.y;
            };
            this.bottom = function () {
                return this.y + (this.height);
            };
            this.crashWith = function (obstacle) {
                return !((this.bottom() < obstacle.top()) ||
                    (this.top() > obstacle.bottom()) ||
                    (this.right() < obstacle.left()) ||
                    (this.left() > obstacle.right()));
            };
        };
    
        function Coin(x, y) {
            this.speedX = -1;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.height = 20;
            this.width = 35;
            this.update = function () {
                ctx.drawImage(snitch, this.x, this.y, this.width, this.height);
            };
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
            };
    
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
            };
        }
    
        function Owl(x, y) {
            this.speedX = 0;
            this.speedY = 0;
            this.x = x;
            this.y = y;
            this.height = 30;
            this.width = 25;
            this.update = function () {
                ctx.drawImage(owl, this.x, this.y, this.width, this.height);
            };
            this.newPos = function () {
                this.x += this.speedX;
                this.y += this.speedY;
            };
    
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
            };
        };
    
        function Life() {
            this.update = (space) => {
                ctx.drawImage(star, 230 + space, gameBoard.canvas.height - 50, 30, 30);
            };
        };
    
        function Control(direction,x,y,height,width,name){
            this.id = name;
            this.x = x;
            this.y = y;
            this.height =height;
            this.width = width;
            this.direction = direction;
            this.update = () => {
                ctx.drawImage(direction, this.x, this.y,this.height,this.width);
            };
        }
    
                var upDir;
                var rightDir;
                var leftDir ;
                var downDir ;
    
                var controls;
    
        function drawControls() {
            controls.forEach((control) => {
                control.update();
            });
        } ;
    
        function keyHandlers() {
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
                };
            };
    
            document.onkeyup = function (e) {
                if(player != undefined){
                    player.stopMove();
                }
            };
        };
    
        $(function () {
            $("#svg-html").load("./svg/svgs.html");
        });
    
        function dementorCrash() {
            for (i = 0; i < dementors.length; i += 1) {
                if (player.crashWith(dementors[i])) {
                    soundStop();
                    soundObjects["crash"].play();
                    dementors.splice(i, 1);
                    gameBoard.points -= 200;
                    player.lives--;
                    lives.splice('', 1);
                };
            };
        };
    
        function snitchCrash() {
            for (let i = 0; i < snitchs.length; i += 1) {
                if (player.crashWith(snitchs[i])) {
                    soundStop();
                    soundObjects["coinTone2"].play();
                    snitchs.splice(i, 1);
                    gameBoard.points += 150;
                };
            };
        };
    
        function owlCrash() {
            for (let i = 0; i < owls.length; i += 1) {
                if (player.crashWith(owls[i])) {
                    soundStop();
                    soundObjects["owlTone"].play();
                    owls.splice(i, 1);
                    if (player.lives < 5) {
                        player.lives++;
                        var life = new Life();
                        lives.push(life);
                    } else if (player.lives === 5) {
                        gameBoard.points += 250;
                    };
                };
            };
        };
    
        function dementorGenerator() {
            if (Math.random() < 1 - Math.pow(.993, gameBoard.frames / 8500)) {
                var y = Math.floor(Math.random() * (gameBoard.canvas.height));
                var dem = new Dementor(gameBoard.canvas.width, y);
                dementors.push(dem);
            };
        };
    
        function snitchGenerator() {
            if (gameBoard.frames % 100 === 0) {
                var t = Math.floor(Math.random() * (gameBoard.canvas.height));
                var sni = new Coin(gameBoard.canvas.width, t);
                snitchs.push(sni);
            };
        };
    
        function bossGenerator() {
            if (gameBoard.points > 18000 && gameBoard.points < 18200) {
                finalBoss = new Boss(gameBoard.canvas.width - 100, 200);
                bossArr.push([finalBoss]);
            };
        };
    
        function owlGenerator() {
            if (gameBoard.frames % 1000 === 0) {
                var o = Math.floor(Math.random() * (gameBoard.canvas.height));
                var ranOwl = Math.floor(Math.random() * (4));
                owl = new Image();
                if (ranOwl == 0) {
                    ranOwl++;
                }
                owl.src = './images/owl-' + ranOwl + '.png';
                var owlSprite = new Owl(gameBoard.canvas.width, o);
                owls.push(owlSprite);
            };
        };
    
        startButton.onclick = () => {
            soundStop();
            soundObjects["tone3"].play();
            intro.classList.remove('flex');
            intro.classList.add('hide');
            game.classList.add('flex');
    
            player = new Player(100, 100, 60, 55);
            gameBoard.start();
            updateGameArea();
        };
    
        document.onkeypress = (e) => {
            if (e.keyCode == 32) {
                gameBoard.pause = !gameBoard.pause;
                updateGameArea();
            };
        };
    
        gameBoard = {
            canvas: document.createElement("canvas"),
            start: function () {
                if (window.matchMedia("(max-height: 376px)").matches) {
                    this.canvas.width = 660;
                    this.canvas.height = 370;
                    background.img = bgSmall;
                } else {
                    this.canvas.width = 750;
                    this.canvas.height = 500;
                };
                ctx = this.canvas.getContext("2d");
                document.getElementById('game').appendChild(this.canvas);
                for (let i = 0; i < player.lives; i++) {
                    var life = new Life();
                    lives.push(life);
                };
                ranBoss = Math.ceil(Math.random() * (4));
                boss = new Image();
                boss.src = './images/boss-' + ranBoss + '.png';
                upDir = new Control(upC, 70, gameBoard.canvas.height - 150, 70, 70, 'up control');
                rightDir = new Control(rightC, 110, gameBoard.canvas.height - 115, 70, 70, 'right control');
                leftDir = new Control(leftC, 30, gameBoard.canvas.height - 115, 70, 70, 'left control');
                downDir = new Control(downC, 70, gameBoard.canvas.height - 75, 70, 70, 'down control');
    
                controls = [upDir, rightDir, leftDir, downDir];
            },
            clear: function () {
                ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            },
            frames: 0,
            points: 0,
            score: function () {
                if (this.frames % 60 === 0) {
                    this.points += 100;
                    this.gameTime++;
                }
    
                ctx.font = '18px monospace';
                ctx.fillStyle = 'black';
                ctx.fillText('Score: ' + this.points, this.canvas.width *0.5 - 30, 50);
            },
            gameTime: 0,
            pause: false,
            boundaries: () => {
                if (player.x >= gameBoard.canvas.width - player.width) {
                    player.x = gameBoard.canvas.width - player.width -20;
                }
                if (player.y >= gameBoard.canvas.height - player.height) {
                    player.y = gameBoard.canvas.height - player.height - 20;
                }
                if (player.x < 0) {
                    player.x = 0;
                }
                if (player.y < 0) {
                    player.y = 0;
                }
            },
            gameOver: () => {
                soundStop();
                soundObjects["gameover"].play();
                ctx.fillStyle = 'black';
                roundedRect(ctx, 250, 150, 300, 200, 15);
                ctx.font = '48px monospace';
                ctx.strokeStyle = 'white';
                ctx.strokeText('GAME OVER', 280, 250);
                ctx.fillStyle = 'white';
                ctx.font = '16px monospace';
                ctx.fillText('your final score is: ' + gameBoard.points, 290, 300);
            }
        };
        
        //   else {
        //     /* the viewport is less than 400 pixels wide */
        //   }
    
        function isIntersect(point,control,x,y){
            if(point.x >= control.x && point.x <= (control.x + control.width)){
                x = true;
            };
            if(point.y >= control.y && point.y <= (control.y + control.height)){
                y = true;
            };
            if(x && y){
                return true;
            }
        };
        
        gameBoard.canvas.addEventListener('touchstart', process_touchstart, false);
        gameBoard.canvas.addEventListener('touchmove', process_touchmove, false);
        
        // touchstart handler
        var onGoingTouch = false;
    
        function process_touchmove(ev) {
            ev.preventDefault();
          }
        function process_touchend(ev) {
            onGoingTouch = false;
            player.stopMove();
            ev.preventDefault();
          }
        function process_touchstart(ev) {
            gameBoard.canvas.addEventListener('touchend', process_touchend, false);
            onGoingTouch = true;
            process_touchmove(ev);
    
            var x = false;
            var y = false;
            const mousePoint = {
                x: ev.touches[0].clientX - ((w - gameBoard.canvas.width) / 2),
                y: ev.touches[0].clientY - ((h - gameBoard.canvas.height) / 2),
            };
    
            controls.forEach(control => {
                if (isIntersect(mousePoint, control, x, y)) {
                    switch (control) {
                        case upDir:
                        if(onGoingTouch){
                            player.moveUp();
                        };
                            break;
                        case downDir:
                            player.moveDown();
                            break;
                        case leftDir:
                            player.moveLeft();
                            break;
                        case rightDir:
                            player.moveRight();
                            break;
                    };
                };
            });
        };
    
        function updateGameArea() {
            keyHandlers();
            gameBoard.boundaries();
            gameBoard.frames++;
    
            if (gameBoard.pause) {
                return;
            }
            if (player.lives === 0) {
                gameBoard.gameOver();
                return;
            }
            backgroundUpdate();
            gameBoard.score();
            //when the player crashes with a dementor
            dementorCrash();
            //when a player crashes with a snitch
            snitchCrash();
            //when a player crashes with an owl
            owlCrash();
    
            drawLives();
            drawControls();
    
            dementorGenerator();
            snitchGenerator();
            owlGenerator();
            bossGenerator();
    
            sprites = [dementors, snitchs, owls, bossArr[0]];
    
            if (sprites != undefined) {
                for (let i = 0; i <= sprites.length; i++) {
                    float(sprites[i]);
                };
                for (let i = 0; i < sprites.length; i++) {
                    removeSprite(sprites[i]);
                };
            }
            //make it faster every 1000 frames
    
            // if (gameBoard.frames % (60 * 20) === 0) {
            //     background.speed -= 0.8;
            //     for (let i = 0; i < dementors.length; i++) {
            //         dementors[i].speedX = background.speed;
            //         dementors[i].newPos();
            //         dementors[i].update();
            //     }
            // };
    
            player.newPos();
            player.update();
            gameBoard.score();
    
            requestAnimationFrame(updateGameArea);
        }
}
// window.addEventListener("load", function (event) {
// //https://createjs.com/docs/preloadjs/classes/LoadQueue.html
// function soundStop() {
//     for (sound in soundObjects) {
//         if (soundObjects[sound].currentTime > 0) {
//             soundObjects[sound].pause();
//             soundObjects[sound].currentTime = 0;
//         }
//     }
// }
//     var w = window.innerWidth;
//     var h = window.innerHeight;

//     console.log(w,h);

//     var intro = document.getElementById('intro');
//     var username = document.getElementById('username');
//     var game = document.getElementById('game');
//     var griffindor = document.getElementById('griffindor');
//     var slytherin = document.getElementById('slytherin');
//     var ravenclaw = document.getElementById('ravenclaw');
//     var hufflepuff = document.getElementById('hufflepuff');

//     var startButton = document.getElementById('start');
//     var instButton = document.getElementById('instructions');
//     //normal index
//     var rules1 = document.getElementById('rules-1');
//     var rules2 = document.getElementById('rules-2');
//     var rules3 = document.getElementById('rules-3');

//     var nextBtn1 = document.getElementById('nextBtn1');
//     var nextBtn2 = document.getElementById('nextBtn2');

//     var backBtn1 = document.getElementById('backBtn1');
//     var backBtn2 = document.getElementById('backBtn2');
//     var backBtn3 = document.getElementById('backBtn3');

//     var toStart = document.getElementById('to-start');

//     var name;
//     var owl;
//     var background;
//     var boss;
//     var ranBoss;
//     var gameBoard;
//     var player;
//     var finalBoss;
//     var sprites;
//     var space;

//     var dementors = [];
//     var snitchs = [];
//     var lives = [];
//     var owls = [];
//     var bossArr = [];

//     var b1 = new Image(400, 400);
//     b1.src = './images/hp-bg1.png';
//     var b2 = new Image();
//     b2.src = './images/hp-bg2.png';
//     var b3 = new Image();
//     b3.src = './images/hp-bg3.png';
//     var b4 = new Image();
//     b4.src = './images/hp-bg4.png';

//     var bgBig = new Image();
//     bgBig.src = './images/cloudy-bg-sml.png';
//     var bgSmall = new Image();
//     bgSmall.src = './images/cloudy-bg-iphone.png';
//     var icon = new Image();
//     icon.src = './images/broom.png';
//     // var dementor = new Image();
//     // dementor.src = './images/dementor.png'
//     var dementor = new Image();
//     dementor.src = './images/dem2.png';
//     var snitch = new Image();
//     snitch.src = './images/snitch1.png';
//     var star = new Image();
//     star.src = './images/star.png';

//     //controls for ipad
//     var rightC = new Image();
//     rightC.src = './images/c-right.png';
//     var upC = new Image();
//     upC.src = './images/c-up.png';
//     var downC = new Image();
//     downC.src = './images/c-down.png';
//     var leftC = new Image();
//     leftC.src = './images/c-left.png';

//     griffindor.onclick = () => {
//         soundStop();
//         soundObjects["tone2"].play();
//         b1.onload = document.body.style.backgroundImage = "url('./images/hp-bg1.png')";
//     };
//     slytherin.onclick = () => {
//         soundStop();
//         soundObjects["tone2"].play();
//         b2.onload = document.body.style.backgroundImage = "url('./images/hp-bg2.png')";
//     };
//     ravenclaw.onclick = () => {
//         soundStop();
//         soundObjects["tone2"].play();
//         b3.onload = document.body.style.backgroundImage = "url('./images/hp-bg3.png')";
//     };
//     hufflepuff.onclick = () => {
//         soundStop();
//         soundObjects["tone2"].play();
//         b4.onload = document.body.style.backgroundImage = "url('./images/hp-bg4.png')";
//     };

//     instButton.onclick = () => {
//         soundStop();
//         soundObjects["click1"].play();
//         intro.classList.add('hide');
//         rules1.classList.remove('hide');
//         if (name == undefined) {
//             name = this.prompt("What's your name?");
//             username.innerHTML = name;
//         }
//     };

//     nextBtn1.onclick = () => {
//         rules1.classList.add('hide');
//         rules2.classList.remove('hide');
//         soundStop();
//         soundObjects["click1"].play();
//     };
//     backBtn1.onclick = () => {
//         rules1.classList.add('hide');
//         intro.classList.remove('hide');
//         soundStop();
//         soundObjects["click1"].play();
//     };
//     nextBtn2.onclick = () => {
//         rules2.classList.add('hide');
//         rules3.classList.remove('hide');
//         soundStop();
//         soundObjects["click1"].play();
//     };
//     backBtn2.onclick = () => {
//         rules2.classList.add('hide');
//         rules1.classList.remove('hide');
//         soundStop();
//         soundObjects["click1"].play();
//     };
//     backBtn3.onclick = () => {
//         rules3.classList.add('hide');
//         rules2.classList.remove('hide');
//         soundStop();
//         soundObjects["click1"].play();
//     };
//     toStart.onclick = () => {
//         rules3.classList.add('hide');
//         intro.classList.remove('hide');
//         soundStop();
//         soundObjects["tone2"].play();
//     };

//     background = {
//         img: bgBig,
//         x: 0,
//         speed: -1,
//         move: function () {
//             this.x += this.speed;
//             this.x %= gameBoard.canvas.width;
//         },

//         draw: function () {
//             ctx.drawImage(this.img, this.x, 0);
//             if (this.speed < 0) {
//                 ctx.drawImage(this.img, this.x + gameBoard.canvas.width, 0);
//             } else {
//                 ctx.drawImage(this.img, this.x - this.img.width, 0);
//             };
//         },
//     };

//     function roundedRect(ctx, x, y, width, height, radius) {
//         ctx.beginPath();
//         ctx.moveTo(x, y + radius);
//         ctx.lineTo(x, y + height - radius);
//         ctx.arcTo(x, y + height, x + radius, y + height, radius);
//         ctx.lineTo(x + width - radius, y + height);
//         ctx.arcTo(x + width, y + height, x + width, y + height - radius, radius);
//         ctx.lineTo(x + width, y + radius);
//         ctx.arcTo(x + width, y, x + width - radius, y, radius);
//         ctx.lineTo(x + radius, y);
//         ctx.arcTo(x, y, x, y + radius, radius);
//         ctx.fill();
//     };

//     function removeSprite(sp) {
//         let s = sp;
//         if (s != undefined) {
//             for (let i = 0; i < s.length; i++) {
//                 if (s[i].x < 0 - s[i].width) {
//                     s.splice(i, 1);
//                 };
//             };
//         };
//     };

//     function float(sp) {
//         if (sp != undefined) {
//             for (let i = 0; i < sp.length; i++) {
//                 sprite = sp[i];
//                 if (sprite instanceof Boss) {
//                     if (sprite.borderTop == false) {
//                         if (sprite.y > 0) {
//                             sprite.y--;
//                         };
//                         if (sprite.y == 0) {
//                             sprite.borderTop = true;
//                         };
//                     };
//                     if (sprite.borderTop == true) {
//                         if (sprite.y < gameBoard.canvas.height - sprite.height) {
//                             sprite.y++;
//                         };
//                         if (sprite.y == gameBoard.canvas.height - sprite.height) {
//                             sprite.borderTop = false;
//                         };
//                     }
                    
//                     sprite.update();
//                     return;
//                 };
//                 sprite.x--;

//                 if (sprite.x < gameBoard.canvas.width && sprite.x >= gameBoard.canvas.width - 100 ||
//                     sprite.x < gameBoard.canvas.width - 299 && sprite.x >= gameBoard.canvas.width - 400 ||
//                     sprite.x < gameBoard.canvas.width - 599 && sprite.x >= gameBoard.canvas.width - 700) {
//                     sprite.y--;
//                 };
//                 if (sprite.x < gameBoard.canvas.width - 99 && sprite.x >= gameBoard.canvas.width - 300 ||
//                     sprite.x < gameBoard.canvas.width - 399 && sprite.x >= gameBoard.canvas.width - 600 ||
//                     sprite.x < gameBoard.canvas.width - 699 && sprite.x >= gameBoard.canvas.width - 800) {
//                     sprite.y++;
//                 };
//                 sprite.newPos();
//                 sprite.update();
//             };
//         };
//     };

//     function backgroundUpdate() {
//         background.move();
//         background.draw();
//     };

//     function drawLives() {
//         space = 0;
//         for (let i = 0; i < lives.length; i++) {
//             lives[i].update(space);
//             space += 70;
//         };
//     };

//     function Player(x, y, width, height) {
//         this.speedX = 0;
//         this.speedY = 0;
//         this.x = x;
//         this.y = y;
//         this.height = height;
//         this.width = width;
//         this.lives = 5;
//         this.update = function () {
//             ctx.drawImage(icon, this.x, this.y, this.width, this.height);
//         };

//         this.newPos = function () {
//             this.x += this.speedX;
//             this.y += this.speedY;
//         };

//         this.moveUp = () => {
//             this.speedY -= 5;
//         };
//         this.moveDown = () => {
//             this.speedY += 5;
//         };
//         this.moveLeft = () => {
//             this.speedX -= 5;
//         };
//         this.moveRight = () => {
//             this.speedX += 5;
//         };

//         this.stopMove = () => {
//             this.speedX = 0;
//             this.speedY = 0;
//         };

//         this.left = function () {
//             return this.x;
//         };
//         this.right = function () {
//             return (this.x + this.width);
//         };
//         this.top = function () {
//             return this.y;
//         };
//         this.bottom = function () {
//             return this.y + (this.height);
//         };
//         this.crashWith = function (obstacle) {
//             return !((this.bottom() < obstacle.top()) ||
//                 (this.top() > obstacle.bottom()) ||
//                 (this.right() < obstacle.left()) ||
//                 (this.left() > obstacle.right()));
//         };
//     };

//     function Dementor(x, y) {
//         this.speedX = 0;
//         this.speedY = 0;
//         this.x = x;
//         this.y = y;
//         this.height = 60;
//         this.width = 60;
//         this.update = function () {
//             ctx.drawImage(dementor, this.x, this.y, this.width, this.height);
//         };
//         this.newPos = function () {
//             this.x += this.speedX;
//             this.y += this.speedY;
//         };

//         this.left = function () {
//             return this.x
//         };
//         this.right = function () {
//             return (this.x + this.width)
//         };
//         this.top = function () {
//             return this.y
//         };
//         this.bottom = function () {
//             return this.y + (this.height)
//         };
//         this.crashWith = function (obstacle) {
//             return !((this.bottom() < obstacle.top()) ||
//                 (this.top() > obstacle.bottom()) ||
//                 (this.right() < obstacle.left()) ||
//                 (this.left() > obstacle.right()));
//         };
//     };

//     function Boss(x, y, speed) {
//         this.speedX = speed;
//         this.speedY = 0;
//         this.x = x;
//         this.y = y;
//         this.height = 80;
//         this.width = 60;
//         this.update = function () {
//             ctx.drawImage(boss, this.x, this.y, this.width, this.height);
//         };
//         this.newPos = function () {
//             this.x += this.speedX;
//             this.y += this.speedY;
//         };
//         this.borderTop = false;

//         this.left = function () {
//             return this.x;
//         };
//         this.right = function () {
//             return (this.x + this.width);
//         };
//         this.top = function () {
//             return this.y;
//         };
//         this.bottom = function () {
//             return this.y + (this.height);
//         };
//         this.crashWith = function (obstacle) {
//             return !((this.bottom() < obstacle.top()) ||
//                 (this.top() > obstacle.bottom()) ||
//                 (this.right() < obstacle.left()) ||
//                 (this.left() > obstacle.right()));
//         };
//     };

//     function Coin(x, y) {
//         this.speedX = -1;
//         this.speedY = 0;
//         this.x = x;
//         this.y = y;
//         this.height = 20;
//         this.width = 35;
//         this.update = function () {
//             ctx.drawImage(snitch, this.x, this.y, this.width, this.height);
//         };
//         this.newPos = function () {
//             this.x += this.speedX;
//             this.y += this.speedY;
//         };

//         this.left = function () {
//             return this.x
//         };
//         this.right = function () {
//             return (this.x + this.width)
//         };
//         this.top = function () {
//             return this.y
//         };
//         this.bottom = function () {
//             return this.y + (this.height)
//         };
//         this.crashWith = function (obstacle) {
//             return !((this.bottom() < obstacle.top()) ||
//                 (this.top() > obstacle.bottom()) ||
//                 (this.right() < obstacle.left()) ||
//                 (this.left() > obstacle.right()))
//         };
//     }

//     function Owl(x, y) {
//         this.speedX = 0;
//         this.speedY = 0;
//         this.x = x;
//         this.y = y;
//         this.height = 30;
//         this.width = 25;
//         this.update = function () {
//             ctx.drawImage(owl, this.x, this.y, this.width, this.height);
//         };
//         this.newPos = function () {
//             this.x += this.speedX;
//             this.y += this.speedY;
//         };

//         this.left = function () {
//             return this.x
//         };
//         this.right = function () {
//             return (this.x + this.width)
//         };
//         this.top = function () {
//             return this.y
//         };
//         this.bottom = function () {
//             return this.y + (this.height)
//         };
//         this.crashWith = function (obstacle) {
//             return !((this.bottom() < obstacle.top()) ||
//                 (this.top() > obstacle.bottom()) ||
//                 (this.right() < obstacle.left()) ||
//                 (this.left() > obstacle.right()))
//         };
//     };

//     function Life() {
//         this.update = (space) => {
//             ctx.drawImage(star, 230 + space, gameBoard.canvas.height - 50, 30, 30);
//         };
//     };

//     function Control(direction,x,y,height,width,name){
//         this.id = name;
//         this.x = x;
//         this.y = y;
//         this.height =height;
//         this.width = width;
//         this.direction = direction;
//         this.update = () => {
//             ctx.drawImage(direction, this.x, this.y,this.height,this.width);
//         };
//     }

//             var upDir;
//             var rightDir;
//             var leftDir ;
//             var downDir ;

//             var controls;

//     function drawControls() {
//         controls.forEach((control) => {
//             control.update();
//         });
//     } ;

//     function keyHandlers() {
//         document.onkeydown = function (e) {
//             switch (e.keyCode) {
//                 case 38:
//                     player.moveUp();
//                     break;
//                 case 40:
//                     player.moveDown();
//                     break;
//                 case 37:
//                     player.moveLeft();
//                     break;
//                 case 39:
//                     player.moveRight();
//                     break;
//             };
//         };

//         document.onkeyup = function (e) {
//             if(player != undefined){
//                 player.stopMove();
//             }
//         };
//     };

//     $(function () {
//         $("#svg-html").load("./svg/svgs.html");
//     });

//     function dementorCrash() {
//         for (i = 0; i < dementors.length; i += 1) {
//             if (player.crashWith(dementors[i])) {
//                 soundStop();
//                 soundObjects["crash"].play();
//                 dementors.splice(i, 1);
//                 gameBoard.points -= 200;
//                 player.lives--;
//                 lives.splice('', 1);
//             };
//         };
//     };

//     function snitchCrash() {
//         for (let i = 0; i < snitchs.length; i += 1) {
//             if (player.crashWith(snitchs[i])) {
//                 soundStop();
//                 soundObjects["coinTone2"].play();
//                 snitchs.splice(i, 1);
//                 gameBoard.points += 150;
//             };
//         };
//     };

//     function owlCrash() {
//         for (let i = 0; i < owls.length; i += 1) {
//             if (player.crashWith(owls[i])) {
//                 soundStop();
//                 soundObjects["owlTone"].play();
//                 owls.splice(i, 1);
//                 if (player.lives < 5) {
//                     player.lives++;
//                     var life = new Life();
//                     lives.push(life);
//                 } else if (player.lives === 5) {
//                     gameBoard.points += 250;
//                 };
//             };
//         };
//     };

//     function dementorGenerator() {
//         if (Math.random() < 1 - Math.pow(.993, gameBoard.frames / 8500)) {
//             var y = Math.floor(Math.random() * (gameBoard.canvas.height));
//             var dem = new Dementor(gameBoard.canvas.width, y);
//             dementors.push(dem);
//         };
//     };

//     function snitchGenerator() {
//         if (gameBoard.frames % 100 === 0) {
//             var t = Math.floor(Math.random() * (gameBoard.canvas.height));
//             var sni = new Coin(gameBoard.canvas.width, t);
//             snitchs.push(sni);
//         };
//     };

//     function bossGenerator() {
//         if (gameBoard.points > 18000 && gameBoard.points < 18200) {
//             finalBoss = new Boss(gameBoard.canvas.width - 100, 200);
//             bossArr.push([finalBoss]);
//         };
//     };

//     function owlGenerator() {
//         if (gameBoard.frames % 1000 === 0) {
//             var o = Math.floor(Math.random() * (gameBoard.canvas.height));
//             var ranOwl = Math.floor(Math.random() * (4));
//             owl = new Image();
//             if (ranOwl == 0) {
//                 ranOwl++;
//             }
//             owl.src = './images/owl-' + ranOwl + '.png';
//             var owlSprite = new Owl(gameBoard.canvas.width, o);
//             owls.push(owlSprite);
//         };
//     };

//     startButton.onclick = () => {
//         soundStop();
//         soundObjects["tone3"].play();
//         intro.classList.remove('flex');
//         intro.classList.add('hide');
//         game.classList.add('flex');

//         player = new Player(100, 100, 60, 55);
//         gameBoard.start();
//         updateGameArea();
//     };

//     document.onkeypress = (e) => {
//         if (e.keyCode == 32) {
//             gameBoard.pause = !gameBoard.pause;
//             updateGameArea();
//         };
//     };

//     gameBoard = {
//         canvas: document.createElement("canvas"),
//         start: function () {
//             if (window.matchMedia("(max-height: 376px)").matches) {
//                 this.canvas.width = 660;
//                 this.canvas.height = 370;
//                 background.img = bgSmall;
//             } else {
//                 this.canvas.width = 750;
//                 this.canvas.height = 500;
//             };
//             ctx = this.canvas.getContext("2d");
//             document.getElementById('game').appendChild(this.canvas);
//             for (let i = 0; i < player.lives; i++) {
//                 var life = new Life();
//                 lives.push(life);
//             };
//             ranBoss = Math.ceil(Math.random() * (4));
//             boss = new Image();
//             boss.src = './images/boss-' + ranBoss + '.png';
//             upDir = new Control(upC, 70, gameBoard.canvas.height - 150, 70, 70, 'up control');
//             rightDir = new Control(rightC, 110, gameBoard.canvas.height - 115, 70, 70, 'right control');
//             leftDir = new Control(leftC, 30, gameBoard.canvas.height - 115, 70, 70, 'left control');
//             downDir = new Control(downC, 70, gameBoard.canvas.height - 75, 70, 70, 'down control');

//             controls = [upDir, rightDir, leftDir, downDir];
//         },
//         clear: function () {
//             ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
//         },
//         frames: 0,
//         points: 0,
//         score: function () {
//             if (this.frames % 60 === 0) {
//                 this.points += 100;
//                 this.gameTime++;
//             }

//             ctx.font = '18px monospace';
//             ctx.fillStyle = 'black';
//             ctx.fillText('Score: ' + this.points, this.canvas.width *0.5 - 30, 50);
//         },
//         gameTime: 0,
//         pause: false,
//         boundaries: () => {
//             if (player.x >= gameBoard.canvas.width - player.width) {
//                 player.x = gameBoard.canvas.width - player.width -20;
//             }
//             if (player.y >= gameBoard.canvas.height - player.height) {
//                 player.y = gameBoard.canvas.height - player.height - 20;
//             }
//             if (player.x < 0) {
//                 player.x = 0;
//             }
//             if (player.y < 0) {
//                 player.y = 0;
//             }
//         },
//         gameOver: () => {
//             soundStop();
//             soundObjects["gameover"].play();
//             ctx.fillStyle = 'black';
//             roundedRect(ctx, 250, 150, 300, 200, 15);
//             ctx.font = '48px monospace';
//             ctx.strokeStyle = 'white';
//             ctx.strokeText('GAME OVER', 280, 250);
//             ctx.fillStyle = 'white';
//             ctx.font = '16px monospace';
//             ctx.fillText('your final score is: ' + gameBoard.points, 290, 300);
//         }
//     };
    
//     //   else {
//     //     /* the viewport is less than 400 pixels wide */
//     //   }

//     function isIntersect(point,control,x,y){
//         if(point.x >= control.x && point.x <= (control.x + control.width)){
//             x = true;
//         };
//         if(point.y >= control.y && point.y <= (control.y + control.height)){
//             y = true;
//         };
//         if(x && y){
//             return true;
//         }
//     };
    
//     gameBoard.canvas.addEventListener('touchstart', process_touchstart, false);
//     gameBoard.canvas.addEventListener('touchmove', process_touchmove, false);
    
//     // touchstart handler
//     var onGoingTouch = false;

//     function process_touchmove(ev) {
//         ev.preventDefault();
//       }
//     function process_touchend(ev) {
//         onGoingTouch = false;
//         player.stopMove();
//         ev.preventDefault();
//       }
//     function process_touchstart(ev) {
//         gameBoard.canvas.addEventListener('touchend', process_touchend, false);
//         onGoingTouch = true;
//         process_touchmove(ev);

//         var x = false;
//         var y = false;
//         const mousePoint = {
//             x: ev.touches[0].clientX - ((w - gameBoard.canvas.width) / 2),
//             y: ev.touches[0].clientY - ((h - gameBoard.canvas.height) / 2),
//         };

//         controls.forEach(control => {
//             if (isIntersect(mousePoint, control, x, y)) {
//                 switch (control) {
//                     case upDir:
//                     if(onGoingTouch){
//                         player.moveUp();
//                     };
//                         break;
//                     case downDir:
//                         player.moveDown();
//                         break;
//                     case leftDir:
//                         player.moveLeft();
//                         break;
//                     case rightDir:
//                         player.moveRight();
//                         break;
//                 };
//             };
//         });
//     };

//     function updateGameArea() {
//         keyHandlers();
//         gameBoard.boundaries();
//         gameBoard.frames++;

//         if (gameBoard.pause) {
//             return;
//         }
//         if (player.lives === 0) {
//             gameBoard.gameOver();
//             return;
//         }
//         backgroundUpdate();
//         gameBoard.score();
//         //when the player crashes with a dementor
//         dementorCrash();
//         //when a player crashes with a snitch
//         snitchCrash();
//         //when a player crashes with an owl
//         owlCrash();

//         drawLives();
//         drawControls();

//         dementorGenerator();
//         snitchGenerator();
//         owlGenerator();
//         bossGenerator();

//         sprites = [dementors, snitchs, owls, bossArr[0]];

//         if (sprites != undefined) {
//             for (let i = 0; i <= sprites.length; i++) {
//                 float(sprites[i]);
//             };
//             for (let i = 0; i < sprites.length; i++) {
//                 removeSprite(sprites[i]);
//             };
//         }
//         //make it faster every 1000 frames

//         // if (gameBoard.frames % (60 * 20) === 0) {
//         //     background.speed -= 0.8;
//         //     for (let i = 0; i < dementors.length; i++) {
//         //         dementors[i].speedX = background.speed;
//         //         dementors[i].newPos();
//         //         dementors[i].update();
//         //     }
//         // };

//         player.newPos();
//         player.update();
//         gameBoard.score();

//         requestAnimationFrame(updateGameArea);
//     }
// });