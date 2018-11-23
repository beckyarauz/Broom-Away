$('#main').toggle(); 

var queue = new createjs.LoadQueue(true);
let soundObjects = {};
let imageObjects = {};
let bossImageObjects = {};

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
}

queue.loadManifest('manifest.json');

queue.on("fileload", handleFilesLoad, this);
queue.on("complete", handleFilesComplete, this);
queue.on("progress", handleFilesProgress, this);