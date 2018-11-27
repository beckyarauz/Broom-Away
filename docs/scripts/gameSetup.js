if (window.matchMedia("(max-height: 375px)").matches) {
    $('#bosses div').removeClass('row');
};
rules1.toggle();
rules2.toggle();
rules3.toggle();
scores.toggle();

if (!localStorage.getItem('n')) {
    localStorage.setItem('n', 1);
};

$('#clear-cache').click(function () {
    window.location.reload(true);
});

gameBoard = {
    speed: -3,
    frames: 0,
    points: 0,
    gameTime: 0,
    pause: false,
    over: false,
    // lastScore: localStorage.getItem('score-'+ plays),
    lastScore: lastScore,
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
        controls = [upDir, rightDir, leftDir, downDir, shootBtn]
    },
    clear: function () {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    },
    score: function () {
        if (this.frames % 60 === 0) {
            this.points += 100;
            this.gameTime++;
        };
        ctx.font = '18px monospace';
        ctx.fillStyle = 'black';
        ctx.fillText('Score: ' + this.points, this.canvas.width * 0.5 - 40, 50);
        if (lastScore != undefined && lastScore != null) {
            ctx.font = '18px monospace';
            ctx.fillStyle = 'black';
            ctx.fillText('Last Score: ' + this.lastScore, this.canvas.width * 0.5 - 70, 70);
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
        ctx.font = '36px monospace';
        ctx.fillText('Play Again?', (gameBoard.canvas.width / 2) - 110, (gameBoard.canvas.height / 2) + 70);
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
        ctx.font = '36px monospace';
        ctx.fillText('Play Again?' + gameBoard.points, (gameBoard.canvas.width / 2) - 110, (gameBoard.canvas.height / 2) + 70);
    },
    drawLives: () => {
        space = 0;
        for (let i = 0; i < lives.length; i++) {
            ctx.drawImage(imageObjects['star'], (gameBoard.canvas.width / 2 - (350 / 2)) + space, gameBoard.canvas.height - 50, 30, 30);
            space += 70;
        };
    }
};
background = {
    img: '',
    x: 0,
    speed: gameBoard.speed,
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
houses = {
    'Griffindor': '#84000b',
    ' Slytherin': '#3c5e52',
    'Hufflepuff': '#eba108',
    'Ravenclaw': '#3f567e',
};
reset = {
    width: 30,
    height: 30,
    x: 25,
    y: 25,
    draw: function () {
        ctx.drawImage(imageObjects["reset"], this.x, this.y, this.width, this.height);
    },
};
reload = {
    width: 30,
    height: 30,
    x: 25,
    y: 25,
};

function compareNumbers(a, b) {
    return a - b;
}

function scoreHandler() {
    for (let i = 1; i < plays; i++) {
        var pUsername = localStorage.getItem('Player-' + i);
        var pScore = localStorage.getItem('score-' + i);
        var pHouse = localStorage.getItem('House-' + i);
        scoresArray.push({
            player: (() => {
                if (pUsername != 'undefined' && pUsername.length > 1) {
                    return pUsername;
                } else {
                    return 'Visitor';
                };
            })(),
            score: pScore,
            house: (() => {
                if (pHouse != 'undefined') {
                    return pHouse;
                } else {
                    return 'No House';
                };
            })(),
        });
    };
    console.log(scoresArray);

    var sortedScores = scoresArray.sort(compareNumbers).reverse();

    if (sortedScores.length > 10) {
        var cropLength = sortedScores.length - 10;
        for (let i = 0; i < cropLength; i++) {
            sortedScores.splice(10, 1);
        }
    }

    for (let i = 0; i < sortedScores.length; i++) {
        $('#hsTable').append(
            `<tr>
                    <td class="number">${i+1}</td>
                    <td>${sortedScores[i].player}</td>
                    <td>${sortedScores[i].score}</td>
                    <td>${sortedScores[i].house}</td>
                </tr>`);
    }
}

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

function saveScore(){
    localStorage.setItem('score-' + plays, gameBoard.points);
        var count = plays;
        localStorage.setItem('Games Played', count);
        count++;
        localStorage.setItem('n', count);
        localStorage.setItem(`Player-${plays}`, userName);
        localStorage.setItem(`House-${plays}`, house);
}

function drawSpells() { 
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
 };

function isIntersect(point, btn, x, y) {
    if (point.x >= btn.x && point.x <= (btn.x + btn.width)) {
        x = true;
    };
    if (point.y >= btn.y && point.y <= (btn.y + btn.height)) {
        y = true;
    };
    if (x && y) {
        return true;
    }
};
function isIntersectPlay(point, x, y,width,height) {
    if (point.x >= x && point.x <= (x + width)) {
        x = true;
    };
    if (point.y >= y && point.y <= (y + height)) {
        y = true;
    };
    if (x && y) {
        return true;
    }
};

function resetVariables() {
    ranBoss = undefined;
    player = undefined;
    finalBoss = undefined;
    sprites = [];
    space = 0;
    now = undefined;
    last = undefined;
    gameBoard.frames = 0;
    gameBoard.speed = -1;
    gameBoard.points = 0;
    dementors = [];
    snitchs = [];
    lives = [];
    owls = [];
    bossArr = [];
    spells = [];
    spellsBoss = [];
    player = new Player(100, 100, 60, 55, house);
    gameBoard.start();
};

gameBoard.canvas.addEventListener('touchstart', process_touchstart, false);
gameBoard.canvas.addEventListener('touchmove', process_touchmove, false);

// touchstart handler

function process_touchmove(ev) {
    ev.preventDefault();
};

function process_touchend(ev) {
    onGoingTouch = false;
    player.stopMove();
    ev.preventDefault();
};

function process_touchstart(ev) {
    gameBoard.canvas.addEventListener('touchend', process_touchend, false);
    onGoingTouch = true;
    process_touchmove(ev);

    var x = false;
    var y = false;
    var xReset = false;
    var yReset = false;
    var xReload = false;
    var yReload = false;
    const mousePoint = {
        x: ev.touches[0].clientX - ((w - gameBoard.canvas.width) / 2),
        y: ev.touches[0].clientY - ((h - gameBoard.canvas.height) / 2),
    };
    //reset touch
    if (isIntersect(mousePoint,reset, xReset, yReset)) {
        resetVariables();
    };
    //reload touch
    if (isIntersectPlay(mousePoint, (gameBoard.canvas.width / 2) - 110, (gameBoard.canvas.height / 2) + 70,100,36)) {
        location.reload();
    };
    //controls touch
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
                case shootBtn:
                    spell = new Spell(player.x + player.width, player.y);
                    spells.push(spell);
                    soundStop();
                    soundObjects['shoot'].play()
                    break;
            };
        };
    });
};

gameBoard.canvas.onmousedown = (e) => {
    var xReset1 = false;
    var yReset1 = false;
    const mouseClickPoint = {
        x: e.clientX - ((w - gameBoard.canvas.width) / 2),
        y: e.clientY - ((h - gameBoard.canvas.height) / 2),
    };
    if (isIntersect(mouseClickPoint,reset, xReset1, yReset1)) {
        resetVariables();
    };

    if (isIntersectPlay(mouseClickPoint, (gameBoard.canvas.width / 2) - 110, (gameBoard.canvas.height / 2) + 70,100,36)) {
        location.reload();
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
            case 32:
                gameBoard.pause = !gameBoard.pause;
                updateGameArea();
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

function soundStop() {
    for (sound in soundObjects) {
        if (soundObjects[sound].currentTime > 0) {
            soundObjects[sound].pause();
            soundObjects[sound].currentTime = 0;
        };
    };
};