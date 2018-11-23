
// $(window).on('load', function () {
    if (window.matchMedia("(max-height: 375px)").matches) {
        $('#bosses div').removeClass('row');
    };

    function soundStop() {
        for (sound in soundObjects) {
            if (soundObjects[sound].currentTime > 0) {
                soundObjects[sound].pause();
                soundObjects[sound].currentTime = 0;
            };
        };
    };
    var w = window.innerWidth;
    var h = window.innerHeight;

    var intro = document.getElementById('intro');
    var username = document.getElementById('username');
    var game = document.getElementById('game');
    var griffindor = document.getElementById('griffindor');
    var slytherin = document.getElementById('slytherin');
    var ravenclaw = document.getElementById('ravenclaw');
    var hufflepuff = document.getElementById('hufflepuff');

    var startButton = document.getElementById('start');
    var inst = $('#instructions');

    var rules1 = $('#rules-1');
    var rules2 = $('#rules-2');
    var rules3 = $('#rules-3');
    var scores = $('#scores');

    var nextBtn = $('.next');

    var backBtn = $('.back');

    var castle = $('.to-start');

    var name;
    var owl;
    var background;
    var ranBoss;
    var gameBoard;
    var player;
    var finalBoss;
    var sprites;
    var space;
    var spell;
    var now;
    var last;

    var upDir;
    var rightDir;
    var leftDir;
    var downDir;

    var controls;

    var dementors = [];
    var snitchs = [];
    var lives = [];
    var owls = [];
    var bossArr = [];
    var spells = [];
    var spellsBoss = [];

    rules1.toggle();
    rules2.toggle();
    rules3.toggle();
    scores.toggle();

    //controls for ipad
    var rightC = new Image();
    rightC.src = './images/c-right.png';
    var upC = new Image();
    upC.src = './images/c-up.png';
    var downC = new Image();
    downC.src = './images/c-down.png';
    var leftC = new Image();
    leftC.src = './images/c-left.png';
    var shoot = new Image();
    shoot.src = './images/magic-wand.png';

    griffindor.onclick = () => {
        soundStop();
        soundObjects["coinTone2"].play();
        document.body.style.backgroundImage = "url(" + imageObjects['b1'].src + ")";
    };
    slytherin.onclick = () => {
        soundStop();
        soundObjects["coinTone2"].play();
        document.body.style.backgroundImage = "url(" + imageObjects['b2'].src + ")";
    };
    ravenclaw.onclick = () => {
        soundStop();
        soundObjects["coinTone2"].play();
        document.body.style.backgroundImage = "url(" + imageObjects['b3'].src + ")";
    };
    hufflepuff.onclick = () => {
        soundStop();
        soundObjects["coinTone2"].play();
        document.body.style.backgroundImage = "url(" + imageObjects['b4'].src + ")";
    };

    //parents
    inst.click(function () {
        soundStop();
        soundObjects["click1"].play();
        $(this).parent().parent().toggle();
        $(this).parentsUntil('#main').next().toggle();
        if (name == undefined) {
            name = prompt("What's your name?");
            username.innerHTML = name;
        }
    })

    nextBtn.click(function () {
        $(this).parent().parent().toggle();
        $(this).parentsUntil('#main').next().toggle();
        soundStop();
        soundObjects["click1"].play();
    });


    backBtn.click(function () {
        $(this).parent().parent().toggle();
        $(this).parentsUntil('#main').prev().toggle();
        soundStop();
        soundObjects["click1"].play();
    });

    castle.click(function () {
        $(this).parent().parent().toggle();
        $('#intro').toggle();
        soundStop();
        soundObjects["tone2"].play();
    });

    background = {
        img: '',
        x: 0,
        speed: 0,
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
                    // sprite = sp;
                    // console.log(sprite);
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
                    };
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

    function drawControls() {
        controls.forEach((control) => {
            control.update();
        });
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
                case 83:
                    spell = new Spell(player.x + player.width, player.y);
                    spells.push(spell);
                    soundStop();
                    soundObjects['shoot'].play()
                    break;
            };
        };

        document.onkeyup = function (e) {
            if (player != undefined) {
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
                soundObjects["tone2"].play();
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
    function spellCrash() {
        for (var i = 0; i < spells.length; i += 1) {
            if (dementors.length > 0 && spells.length > 0) {
                for (var j = 0; j < dementors.length; j++) {
                    if (spells[i].crashWith(dementors[j])) {
                        soundStop();
                        soundObjects['kill'].play();
                        dementors.splice(j, 1);
                        spells.splice(i, 1);
                        gameBoard.points += 50;
                    };
                };
            };
            if (finalBoss != undefined && spells.length > 0) {
                if (spells[i] != undefined) {
                    if (spells[i].crashWith(bossArr[0])) {
                        console.log('Boss hit!');
                        soundStop();
                        soundObjects['kill'].play();
                        spells.splice(i, 1);
                        bossArr[0].hp -= 100;
                        console.log(bossArr[0].hp);
                        gameBoard.points += 100;
                        if (bossArr[0].hp == 0) {
                            finalBoss = undefined;
                            soundStop();
                            soundObjects['boss-kill'].play();
                            bossArr.splice(0, 1);
                            gameBoard.over = true;
                        };
                    };
                };
            };
        };
    };

    startButton.onclick = () => {
        soundStop();
        soundObjects["tone3"].play();
        now = new Date().getTime() / 1000;
        intro.classList.remove('flex');
        intro.classList.add('hide');
        game.classList.add('flex');

        player = new Player(100, 100, 60, 55);
        gameBoard.start();
        background.speed = gameBoard.speed;
        updateGameArea();
    };

    document.onkeypress = (e) => {
        if (e.keyCode == 32) {
            gameBoard.pause = !gameBoard.pause;
            updateGameArea();
        };
    };

    gameBoard = {
        speed: -1,
        frames: 0,
        points: 0,
        gameTime: 0,
        pause: false,
        over: false,
        lastScore: localStorage.getItem('score'),
        canvas: document.createElement("canvas"),
        start: function () {
            if (window.matchMedia("(max-height: 375px)").matches) {
                this.canvas.width = 660;
                this.canvas.height = 370;
                background.img = imageObjects['bgSmall'];
            } else {
                background.img = imageObjects['bgBig']
                this.canvas.width = 750;
                this.canvas.height = 500;
            };
            ctx = this.canvas.getContext("2d");
            document.getElementById('game').appendChild(this.canvas);
            for (let i = 0; i < player.lives; i++) {
                lives.push('life');
            };
            ranBoss = Math.ceil(Math.random() * (4));
            
            upDir = new Control(upC, 70, gameBoard.canvas.height - 150, 70, 70, 'up control');
            rightDir = new Control(rightC, 110, gameBoard.canvas.height - 115, 70, 70, 'right control');
            leftDir = new Control(leftC, 30, gameBoard.canvas.height - 115, 70, 70, 'left control');
            downDir = new Control(downC, 70, gameBoard.canvas.height - 75, 70, 70, 'down control');
            shootBtn = new Control(shoot, gameBoard.canvas.width - 100, gameBoard.canvas.height - 75, 50, 50, 'shoot control');

            controls = [upDir, rightDir, leftDir, downDir, shootBtn];
        },
        clear: function () {
            ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        },
        score: function () {
            if (this.frames % 60 === 0) {
                this.points += 100;
                this.gameTime++;
            }
            ctx.font = '18px monospace';
            ctx.fillStyle = 'black';
            ctx.fillText('Score: ' + this.points, this.canvas.width * 0.5 - 40, 50);
            if (localStorage.getItem('score')) {
                ctx.font = '18px monospace';
                ctx.fillStyle = 'black';
                ctx.fillText('Last Score: ' + this.lastScore, this.canvas.width * 0.1, 50);
            };
        },
        boundaries: () => {
            if (player.x >= gameBoard.canvas.width - player.width) {
                player.x = gameBoard.canvas.width - player.width - 20;
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
            roundedRect(ctx, (gameBoard.canvas.width / 2) - 150, (gameBoard.canvas.height / 2) - 100, 300, 200, 15);
            ctx.fill();
            ctx.font = '48px monospace';
            ctx.strokeStyle = 'white';
            ctx.strokeText('GAME OVER', (gameBoard.canvas.width / 2) - 120, (gameBoard.canvas.height / 2) - 20);
            ctx.fillStyle = 'white';
            ctx.font = '16px monospace';
            ctx.fillText('your final score is: ' + gameBoard.points, (gameBoard.canvas.width / 2) - 110, (gameBoard.canvas.height / 2) + 20);
        },
        gameWon: () => {
            soundStop();
            soundObjects["gamewon"].play();
            ctx.fillStyle = 'black';
            roundedRect(ctx, (gameBoard.canvas.width / 2) - 150, (gameBoard.canvas.height / 2) - 100, 300, 200, 15);
            ctx.fill();
            ctx.font = '48px monospace';
            ctx.strokeStyle = 'white';
            ctx.strokeText('YOU WON!', (gameBoard.canvas.width / 2) - 100, (gameBoard.canvas.height / 2) - 20);
            ctx.fillStyle = 'white';
            ctx.font = '16px monospace';
            ctx.fillText('your final score is: ' + gameBoard.points, (gameBoard.canvas.width / 2) - 110, (gameBoard.canvas.height / 2) + 20);
        },
        drawLives: () => {
            space = 0;
            for (let i = 0; i < lives.length; i++) {
                ctx.drawImage(imageObjects['star'], 230 + space, gameBoard.canvas.height - 50, 30, 30);
                space += 70;
            };
        }
    };

    function isIntersect(point, control, x, y) {
        if (point.x >= control.x && point.x <= (control.x + control.width)) {
            x = true;
        };
        if (point.y >= control.y && point.y <= (control.y + control.height)) {
            y = true;
        };
        if (x && y) {
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
                        if (onGoingTouch) {
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
        };


        backgroundUpdate();
        //when the player crashes with a dementor
        dementorCrash();
        //when a player crashes with a snitch
        snitchCrash();
        //when a player crashes with an owl
        owlCrash();


        if (gameBoard.over) {
            if (player.lives === 0) {
                gameBoard.gameOver();
            } else if (finalBoss == undefined) {
                gameBoard.gameWon();
            };
            localStorage.setItem('score', gameBoard.points);
            if (!localStorage.getItem('n')) {
                localStorage.setItem('n', 1);
            }
            var count = localStorage.getItem('n');
            localStorage.setItem('Games Played', count);
            count++;
            localStorage.setItem('n', count);
            return;

        }
        spellCrash();

        gameBoard.drawLives();
        drawControls();

        dementorGenerator();
        snitchGenerator();
        owlGenerator();
        if (finalBoss == undefined) {
            bossGenerator();
        }
        bossSpellGenerator();

        sprites = [dementors, snitchs, owls, bossArr];

        if (sprites != undefined) {
            for (let i = 0; i <= sprites.length; i++) {
                float(sprites[i]);
            };
            for (let i = 0; i < sprites.length; i++) {
                removeSprite(sprites[i]);
            };
        };

        //speed bg every 30 secs

        if (gameBoard.frames % 60 === 0) {
            last = now;
            current = Math.ceil(new Date().getTime() / 1000);
            let dt = current - last;
            if (Math.floor(dt) % 30 === 0) {
                console.log('30 seconds have passed: ' + dt);
                gameBoard.speed -= 0.8;
                background.speed = gameBoard.speed;
                console.log(background.speed);
            };
        };
        if (spells.length > 0) {
            for (let i = 0; i < spells.length; i++) {
                spells[i].update();
                spells[i].newPos();
            };
        };
        if (spellsBoss.length > 0) {
            for (let i = 0; i < spellsBoss.length; i++) {
                spellsBoss[i].update();
                spellsBoss[i].newPos();
            };
        };
        player.newPos();
        player.update();
        gameBoard.score();

        requestAnimationFrame(updateGameArea);
    }
// })