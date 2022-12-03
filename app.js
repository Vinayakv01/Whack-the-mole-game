//whack the mole

const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');
let lastHole;
let timeUp = false;

//it'll give us random time between min secs and max secs (Eg min = 2secs, max = 10s, => func will give us a random value/time between 2secs and 10secs)
function randomTime(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

//function that gives us any random hole from (1-6) //we'll pass a nodeList fetched from DOM as an arg in the func
function randomHole(holes) {
    const index = Math.floor(Math.random() * holes.length);       //we used 'Math.random()' which will give us random value between '0-1' multiplied by length of holes (i.e 6) => so we'll get any random value between 1-6 (i.e any hole)
    const hole = holes[index];        //we'll use randomindex obtained , to get any hole (i.e div) from DOM
    //there should'nt be any repitition of holes // so we save hole into lastHole // and if run func again and the random hole generated is same as the lastHole then (return randomHole(holes)) i.e run func again (recursion)
    if(hole === lastHole) {
        // console.log('Same hole again');
        return randomHole(holes);
    }
    lastHole = hole;        //saved the lastHole
    return hole;        //returned the Hole
}

//peep the mole for some time
function peep() {
    const time = randomTime(200,1000);      //will get us a random time bw 0.2 sec and 1sec
    const hole = randomHole(holes);         //will get as any random hole
    hole.classList.add('up');           //will add the 'up' class for that particular hole
    //set timeout for random time generated the mole will pop up for that particular time
    setTimeout(() => {
        hole.classList.remove('up');    //remove the class 'up' in hole in after the time is done 
        if(!timeUp) peep();         //initially is set to false // if timeUp is false keep running the peep func
    }, time);
}

//start the game
function startGame() {
    scoreBoard.textContent = 0;     //as the game starts, set the scoreBoard to 0
    timeUp = false;                 //timeUp = false
    score = 0;                      //score to 0
    peep();                         //run the peep function which will pop the moles
    setTimeout (() => timeUp = true, 10000)   // set a timeOut for 10sec and after 10 secs set timeUp = true //after 10 secs time will be up and peep function will stop
}

//bang the mole and score 
function bonk(e) {
    if(!e.isTrusted) return;    //we need to check if the click is real or fake //browser event has in-built property of 'isTrusted' it'll be false if click is fake//so if trusted is false then function will stop running
    score++;        //score++ when you hit/click mole
    this.classList.remove('up');        //remove 'up' class from hole after hitting //so it'll disappear after you hit
    scoreBoard.textContent = score;     //update scoreBoard on hitting
}

//for every clic/hit on mole call the bonk function
moles.forEach(mole => mole.addEventListener('click', bonk));