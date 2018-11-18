function dementorCrash() {
    for (i = 0; i < dementors.length; i += 1) {
        if (player.crashWith(dementors[i])) {
            dementors.splice(i, 1);
            gameBoard.points -= 200;
            player.lives--;
            lives.splice('', 1);
        }
      }
}

function snitchCrash(){
    for (let i = 0; i < snitchs.length; i += 1) {
        if (player.crashWith(snitchs[i])) {
            snitchs.splice(i, 1);
            gameBoard.points += 150;
        }
      }
}

function owlCrash(){
    for (let i = 0; i < owls.length; i += 1) {
        if (player.crashWith(owls[i])) {
            owls.splice(i, 1);
            if(player.lives < 5){
                player.lives ++;
                var life = new Life();
                lives.push(life);
            } else if(player.lives === 5){
                gameBoard.points += 250;
            };
        }
      }
}