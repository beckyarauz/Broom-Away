// $(window).on('load', function () {

scoreHandler();

function updateGameArea() {
    keyHandlers();
    gameBoard.boundaries();
    gameBoard.frames++;

    if (gameBoard.pause) {
        return;
    };

    backgroundUpdate();
    reset.draw();
    if (gameBoard.over) {
        if (player.hp === 0 || player.lives === 0) {
            finalBoss = undefined;
            gameBoard.gameOver();
        } else if (finalBoss.hp <= 0 && player.lives > 0) {
            finalBoss = undefined;
            gameBoard.gameWon();
        };
        saveScore();
        return;
    };
    //when the player crashes with a dementor
    dementorCrash();
    //when a player crashes with a snitch
    snitchCrash();
    //when a player crashes with an owl
    owlCrash();

    spellCrash();

    gameBoard.drawLives();
    drawControls();

    dementorGenerator();
    snitchGenerator();
    owlGenerator();
    bossGenerator();
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
    
    drawSpells();
    player.newPos();
    player.update();
    gameBoard.score();

    requestAnimationFrame(updateGameArea);
}
// })