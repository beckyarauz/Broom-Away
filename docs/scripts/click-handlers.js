griffindor.onclick = () => {
    soundStop();
    soundObjects["coinTone2"].play();
    document.body.style.backgroundImage = "url(" + imageObjects['b1'].src + ")";
    house = 'Griffindor';
    console.log(house);

};
slytherin.onclick = () => {
    soundStop();
    soundObjects["coinTone2"].play();
    document.body.style.backgroundImage = "url(" + imageObjects['b2'].src + ")";
    house = 'Slytherin';
    console.log(house);
};
ravenclaw.onclick = () => {
    soundStop();
    soundObjects["coinTone2"].play();
    document.body.style.backgroundImage = "url(" + imageObjects['b3'].src + ")";
    house = 'Ravenclaw';
    console.log(house);
};
hufflepuff.onclick = () => {
    soundStop();
    soundObjects["coinTone2"].play();
    document.body.style.backgroundImage = "url(" + imageObjects['b4'].src + ")";
    house = 'Hufflepuff';
    console.log(house);
};

//parents
inst.click(function () {
    soundStop();
    soundObjects["click1"].play();
    $(this).parent().parent().toggle();
    $(this).parentsUntil('#main').next().toggle();
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

startButton.onclick = () => {
    soundStop();
    soundObjects["tone3"].play();
    now = new Date().getTime() / 1000;
    $('#intro').toggle();
    $('#game').toggle();
    $('#clear-cache').toggle();
    player = new Player(100, 100, 60, 55, house);
    gameBoard.start();
    updateGameArea();
};