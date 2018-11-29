function Player(x, y, width, height,house) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.lives = 5;
    this.hp = 1000;
    this.house = house;
    this.update = function () {
        ctx.drawImage(imageObjects['icon'], this.x, this.y, this.width, this.height);
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

function Dementor(x, y,speed) {
    this.speedX = speed ;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 60;
    this.width = 60;
    this.update = function () {
        ctx.drawImage(imageObjects['dementor'], this.x, this.y, this.width, this.height);
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

function Boss(x, y) {
    this.speedX = 0;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 60;
    this.hp = 1000;
    this.update = function () {
        ctx.drawImage(imageObjects['boss' + ranBoss], this.x, this.y, this.width, this.height);
        //draw hp 
        ctx.font = '18px monospace';
        ctx.fillStyle = 'black';
        ctx.fillText('Boss HP', gameBoard.canvas.width - 170, 35);
        ctx.fillStyle = bossImageObjects['boss' + ranBoss].color;
        roundedRect(ctx, gameBoard.canvas.width - 200, 40, this.hp * 0.15, 20, 5);
        ctx.fill();
        ctx.strokeStyle = 'black';
        roundedRect(ctx, gameBoard.canvas.width - 200, 40, 1000 * 0.15, 20, 5);
        ctx.stroke();
        //player hp
        ctx.font = '18px monospace';
        ctx.fillStyle = 'black';
        ctx.fillText('Player HP', 90, 35);
        ctx.fillStyle = houses[player.house];
        roundedRect(ctx, 70, 40, player.hp * 0.15, 20, 5);
        ctx.fill();
        ctx.strokeStyle = 'black';
        roundedRect(ctx, 70, 40, 1000 * 0.15, 20, 5);
        ctx.stroke();
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
    this.speedX = gameBoard.speed * 1.5;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 20;
    this.width = 35;
    this.update = function () {
        ctx.drawImage(imageObjects['snitch'], this.x, this.y, this.width, this.height);
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

function Spell(x, y) {
    this.speedX = 5;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 15;
    this.width = 25;
    this.update = function () {
        ctx.drawImage(imageObjects['spell'], this.x, this.y, this.width, this.height);
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
        if(obstacle){
            if(obstacle != undefined){
            return !((this.bottom() < obstacle.top()) ||
            (this.top() > obstacle.bottom()) ||
            (this.right() < obstacle.left()) ||
            (this.left() > obstacle.right()))
            }
        }
    };
};

function BossSpell(x, y) {
    this.speedX = -5;
    this.speedY = 0;
    this.x = x;
    this.y = y;
    this.height = 15;
    this.width = 25;
    this.update = function () {
        ctx.drawImage(imageObjects['boss-spell'], this.x, this.y, this.width, this.height);
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

function Control(direction, x, y, height, width, name) {
    this.id = name;
    this.x = x;
    this.y = y;
    this.height = height;
    this.width = width;
    this.direction = direction;
    this.update = () => {
        ctx.drawImage(direction, this.x, this.y, this.height, this.width);
    };
};