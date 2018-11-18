    griffindor.onclick = () => {
        b1.onload = document.body.style.backgroundImage = "url('./images/hp-bg1.png')"
    };
    slytherin.onclick = () => {
        b2.onload = document.body.style.backgroundImage = "url('./images/hp-bg2.png')"
    };
    ravenclaw.onclick = () => {
        b3.onload = document.body.style.backgroundImage = "url('./images/hp-bg3.png')"
    };
    hufflepuff.onclick = () => {
        b4.onload = document.body.style.backgroundImage = "url('./images/hp-bg4.png')"
    };

    instButton.onclick = () =>{
        intro.classList.add('hide');
        rules1.classList.remove('hide');
        if(name == undefined){
            name = this.prompt("What's your name?");
            username.innerHTML = name;
        }
    };

    nextBtn1.onclick = () =>{
        rules1.classList.add('hide');
        rules2.classList.remove('hide');
    };
    backBtn1.onclick = () =>{
        rules1.classList.add('hide');
        intro.classList.remove('hide');
    };
    nextBtn2.onclick = () =>{
        rules2.classList.add('hide');
        rules3.classList.remove('hide');
    };
    backBtn2.onclick = () =>{
        rules2.classList.add('hide');
        rules1.classList.remove('hide');
    };
    backBtn3.onclick = () =>{
        rules3.classList.add('hide');
        rules2.classList.remove('hide');
    };
    toStart.onclick = () =>{
        rules3.classList.add('hide');
        intro.classList.remove('hide');
    };