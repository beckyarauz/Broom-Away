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
    };
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
    };
    this.newPos = function () {
        this.x += this.speedX;
        this.y += this.speedY;
    };
    this.borderTop = false;

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