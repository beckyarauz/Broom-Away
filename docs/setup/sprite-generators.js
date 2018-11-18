function dementorGenerator(){
    if (Math.random() < 1 - Math.pow(.993, gameBoard.frames / 8500)) {
        var y = Math.floor(Math.random() * (gameBoard.canvas.height));
        var dem = new Dementor(gameBoard.canvas.width, y, background.speed);
        dementors.push(dem);
    }
}
function snitchGenerator(){
    if (gameBoard.frames % 100 === 0) {
        var t = Math.floor(Math.random() * (gameBoard.canvas.height));
        var sni = new Coin(gameBoard.canvas.width, t);
        snitchs.push(sni);
    }
}
function bossGenerator(){
    if (gameBoard.points > 18000 && gameBoard.points < 18200) {
        finalBoss = new Boss(gameBoard.canvas.width - 100, 200);
        bossArr.push([finalBoss]);
    }
}
function owlGenerator(){
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
    }
}
