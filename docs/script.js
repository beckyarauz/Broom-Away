window.addEventListener("load", function (event) {
    var intro = document.getElementById('intro');
    var username = document.getElementById('username');
    var game = document.getElementById('game');
    var griffindor = document.getElementById('griffindor');
    var slytherin = document.getElementById('slytherin');
    var ravenclaw = document.getElementById('ravenclaw');
    var hufflepuff = document.getElementById('hufflepuff');

    var startButton = document.getElementById('start');
    var instButton = document.getElementById('instructions');

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

    var owlTone = new Audio('./sounds/tone-1.mp3');
    var coinTone = new Audio('./sounds/coin-1.mp3');
    var coinTone2 = new Audio('./sounds/coin-2.mp3');
    var tone2 = new Audio('./sounds/tone-2.mp3');
    var tone3 = new Audio('./sounds/tone-3.mp3');
    var click1 = new Audio('./sounds/click-1.mp3');
    var gameover = new Audio('./sounds/gameover.mp3');
    var crash = new Audio('./sounds/crash.mp3');
    
    
    function soundStop() {
        let sounds = [owlTone, coinTone, coinTone2, tone2, tone3, crash,click1];
        for (let i = 0; i < sounds.length; i++) {
            if (sounds[i].currentTime > 0) {
                sounds[i].pause();
                sounds[i].currentTime = 0;
            }
        }
    }

    var b1 = new Image(400, 400);
    b1.src = './images/hp-bg1.png';
    var b2 = new Image();
    b2.src = './images/hp-bg2.png';
    var b3 = new Image();
    b3.src = './images/hp-bg3.png';
    var b4 = new Image();
    b4.src = './images/hp-bg4.png';

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

    griffindor.onclick = () => {
        soundStop();
        tone2.onload = tone2.play();
        b1.onload = document.body.style.backgroundImage = "url('./images/hp-bg1.png')"
        
    };
    slytherin.onclick = () => {
        soundStop();
        tone2.play();
        b2.onload = document.body.style.backgroundImage = "url('./images/hp-bg2.png')"
    };
    ravenclaw.onclick = () => {
        soundStop();
        tone2.play();
        b3.onload = document.body.style.backgroundImage = "url('./images/hp-bg3.png')"
    };
    hufflepuff.onclick = () => {
        soundStop();
        tone2.play();
        b4.onload = document.body.style.backgroundImage = "url('./images/hp-bg4.png')"
    };

    instButton.onclick = () => {
        soundStop();
        click1.play();
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
        click1.play();
    };
    backBtn1.onclick = () => {
        rules1.classList.add('hide');
        intro.classList.remove('hide');
        soundStop();
        click1.play();
    };
    nextBtn2.onclick = () => {
        rules2.classList.add('hide');
        rules3.classList.remove('hide');
        soundStop();
        click1.play();
    };
    backBtn2.onclick = () => {
        rules2.classList.add('hide');
        rules1.classList.remove('hide');
        soundStop();
        click1.play();
    };
    backBtn3.onclick = () => {
        rules3.classList.add('hide');
        rules2.classList.remove('hide');
        soundStop();
        click1.play();
    };
    toStart.onclick = () => {
        rules3.classList.add('hide');
        intro.classList.remove('hide');
        soundStop();
        tone2.play();
    };

    background = {
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
            ctx.drawImage(star, 230 + space, 450, 30, 30);
        };
    };

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
            player.stopMove();
        };
    };

    $(function () {
        $("#svg-html").load("./svg/svgs.html");
    });

    function dementorCrash() {
        for (i = 0; i < dementors.length; i += 1) {
            if (player.crashWith(dementors[i])) {
                soundStop();
                crash.play();
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
                coinTone2.play();
                snitchs.splice(i, 1);
                gameBoard.points += 150;
            };
        };
    };

    function owlCrash() {
        for (let i = 0; i < owls.length; i += 1) {
            if (player.crashWith(owls[i])) {
                soundStop();
                owlTone.play();
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
        tone3.play();
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

    keyHandlers();

    gameBoard = {
        canvas: document.createElement("canvas"),
        start: function () {
            this.canvas.width = 750;
            this.canvas.height = 500;
            ctx = this.canvas.getContext("2d");
            document.getElementById('game').appendChild(this.canvas);
            for (let i = 0; i < player.lives; i++) {
                var life = new Life();
                lives.push(life);
            };
            ranBoss = Math.ceil(Math.random() * (4));
            boss = new Image();
            boss.src = './images/boss-' + ranBoss + '.png';
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
            ctx.fillText('Score: ' + this.points, 350, 50);
        },
        gameTime: 0,
        pause: false,
        boundaries: () => {
            if (player.x >= gameBoard.canvas.width - player.width) {
                player.x = gameBoard.canvas.width - player.width;
            }
            if (player.y >= gameBoard.canvas.height - player.height) {
                player.y = gameBoard.canvas.height - player.height;
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
            gameover.play();
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

    function updateGameArea() {

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
});