window.addEventListener("load", function (event) {
    startButton.onclick = () => {
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
        }
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

        if (gameBoard.frames % (60 * 20) === 0) {
            background.speed -= 0.8;
            for (let i = 0; i < dementors.length; i++) {
                dementors[i].speedX = background.speed;
                dementors[i].newPos();
                dementors[i].update();
            }
        }
        player.newPos();
        player.update();
        gameBoard.score();

        requestAnimationFrame(updateGameArea);
    }
});