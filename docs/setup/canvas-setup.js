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
        }
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
            }
        }
    };
};

function float(sp) {
        if (sp != undefined) {
            for (let i = 0; i < sp.length; i++) {
                sprite = sp[i];
                if (sprite instanceof Boss) {                    
                    if(sprite.borderTop == false){
                        if(sprite.y > 0){
                            sprite.y--;
                        } 
                        if(sprite.y == 0){
                            sprite.borderTop = true;
                        }
                    }
                    if(sprite.borderTop == true) {
                        if(sprite.y < gameBoard.canvas.height - sprite.height){
                            sprite.y++;
                        }
                        if(sprite.y == gameBoard.canvas.height - sprite.height){
                            sprite.borderTop = false;
                        }
                    }
                    sprite.update();
                    return;
                }
                sprite.x--;

                if (sprite.x < gameBoard.canvas.width && sprite.x >= gameBoard.canvas.width - 100 ||
                    sprite.x < gameBoard.canvas.width - 299 && sprite.x >= gameBoard.canvas.width - 400 ||
                    sprite.x < gameBoard.canvas.width - 599 && sprite.x >= gameBoard.canvas.width - 700) {
                    sprite.y--;
                }
                if (sprite.x < gameBoard.canvas.width - 99 && sprite.x >= gameBoard.canvas.width - 300 ||
                    sprite.x < gameBoard.canvas.width - 399 && sprite.x >= gameBoard.canvas.width - 600 ||
                    sprite.x < gameBoard.canvas.width - 699 && sprite.x >= gameBoard.canvas.width - 800) {
                    sprite.y++;
                }
                sprite.update();
            }
        };
}

function backgroundUpdate() {
    background.move();
    background.draw();
}

function drawLives() {
    space = 0;
    for (let i = 0; i < lives.length; i++) {
        lives[i].update(space);
        space += 70;
    }
}