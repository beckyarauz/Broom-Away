$(function () {
    $("#svg-html").load("./svg/svgs.html");
});

let queue = new createjs.LoadQueue(true);
soundObjects = {};
imageObjects = {};
bossImageObjects = {};

function handleFilesLoad(event) {
    var item = event.item;
    if (item.type == "sound") {
        soundObjects[item.id] = new Audio(item.src);
    } else if (item.type == "image") {
        imageObjects[item.id] = new Image();
        imageObjects[item.id].src = item.src;
        if (item.id.includes('boss')) {
            bossImageObjects[item.id] = item;
        }
    }
}

function handleFilesProgress(event) {
}

function handleFilesComplete(event) {
    document.body.style.backgroundImage = "url(" + imageObjects['hw-bg1'].src + ")";
    $('.bricks').css('background-image', 'url(' + imageObjects['bricks'].src + ')');
    $('#loading').toggle();
    $('#main').toggle();  
    if (userName == undefined || userName.length == 0) {
        var name = prompt("What's your name?");
        userName = name;
        username.innerHTML = name;
    }  
}

queue.loadManifest('manifest.json');

queue.on("fileload", handleFilesLoad, this);
queue.on("complete", handleFilesComplete, this);
queue.on("progress", handleFilesProgress, this);