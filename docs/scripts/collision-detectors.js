function dementorCrash() {
    for (i = 0; i < dementors.length; i += 1) {
        if (player.crashWith(dementors[i])) {
            soundStop();
            soundObjects["crash"].play();
            dementors.splice(i, 1);
            gameBoard.points -= 200;
            player.lives--;
            lives.splice('', 1);
            if (player.lives <= 0) {
                gameBoard.over = true
            }
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
                lives.push('life');
            } else if (player.lives === 5) {
                gameBoard.points += 250;
            };
        };
    };
};

function spellCrash() {
    for (let i = 0; i < spells.length; i += 1) {
        if (dementors.length > 0 && spells.length > 0) {
            for (var j = 0; j < dementors.length; j++) {
                if (dementors[j] && dementors[j] != undefined && spells[i] != undefined) {
                    if (spells[i].crashWith(dementors[j])) {
                        soundStop();
                        soundObjects['kill'].play();
                        dementors.splice(j, 1);
                        spells.splice(i, 1);
                        gameBoard.points += 50;
                    };
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
                    gameBoard.points += 100;
                    if (bossArr[0].hp == 0) {
                        soundStop();
                        soundObjects['boss-kill'].play();
                        bossArr.splice(0, 1);
                        gameBoard.over = true;
                    };
                };
            };
        };
    };
    for (let i = 0; i < spellsBoss.length; i += 1) {
        if (finalBoss != undefined && spellsBoss.length > 0) {
            if (spellsBoss[i] != undefined) {
                if (spellsBoss[i].crashWith(player)) {
                    console.log('Player hit!');
                    soundStop();
                    soundObjects['kill'].play();
                    spellsBoss.splice(i, 1);
                    player.hp -= 100;
                    if (player.hp === 0) {
                        player.lives = 0;
                        gameBoard.over = true;
                    };
                };
            };
        };
    }
};