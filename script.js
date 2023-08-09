// ***
// Combination Lock
// ***
var lifeCounter = document.querySelector('#life-counter');
var timeCounter = document.querySelector('#time-counter');
var audio = new Audio("./mixkit-epic-impact-afar-explosion-2782.wav");
var ticksAudio = new Audio("./Clock-Ticking-D-www.fesliyanstudios.com.mp3");

var combinationLock = {
    life: 5,
    combination: 356709,
    locked: true,
    wheels: [0, 0, 0, 0, 0, 0],
    increment: function(wheel) {
        if (this.wheels[wheel] === 9) {
            this.wheels[wheel] = 0;
        } else {
            this.wheels[wheel]++;
        }
    },
    decrement: function(wheel) {
        if (this.wheels[wheel] === 0) {
            this.wheels[wheel] = 9;
        } else {
            this.wheels[wheel]--;
        }
    },
    check: function() {
        if (this.combination === parseInt(this.wheels.join(''))) {
            this.locked = false;
        } else {
            this.life -= 1;
            this.locked = true;
            if (this.life <= 0) {
                ticksAudio.pause();
                audio.play();
            }
        }

        if (this.life === 4 && this.locked) {
            setInterval(() => {
                if (timeCounter.innerHTML <= 0) {
                    ticksAudio.pause();
                    audio.play();
                    return clearInterval;
                }
                timeCounter.innerHTML = parseInt(timeCounter.innerHTML - 1);
                ticksAudio.play();
            }, 1000);
        }
    },
    spin: function() {
        // randomize the wheels
        for (i = 0; i < 4; i++) {
            this.wheels[i] = getRandomInt(10, -1);
        }
    }
}

// ***
// Reusable Functions
// ***

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


// ***
// Presentation
// ***

// Increment buttons
var increments = document.getElementsByClassName('increment');

for (var i = 0; i < increments.length; i++) {
    increments[i].addEventListener('click', function() {
        let wheelIndex = parseInt(this.getAttribute('index'));
        combinationLock.increment(wheelIndex);
        document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
    });
}

// Decrement buttons
var decrements = document.getElementsByClassName('decrement');

for (var i = 0; i < decrements.length; i++) {
    decrements[i].addEventListener('click', function() {
        let wheelIndex = parseInt(this.getAttribute('index'));
        combinationLock.decrement(wheelIndex);
        document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
    });
}

// Keypress
var wheels = document.getElementsByClassName('digit');

for (var i = 0; i < wheels.length; i++) {
    wheels[i].addEventListener('keyup', function(e) {

        // arrow key up
        if (e.which === 38) {
            let wheelIndex = parseInt(this.getAttribute('index'));
            combinationLock.increment(wheelIndex);
            document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
        }

        // arrow key down
        if (e.which === 40) {
            let wheelIndex = parseInt(this.getAttribute('index'));
            combinationLock.decrement(wheelIndex);
            document.querySelectorAll('.digit')[wheelIndex].value = combinationLock.wheels[wheelIndex];
        }

        // number key (0 - 9)
        if (e.which > 47 && e.which < 58) {
            let wheelIndex = parseInt(this.getAttribute('index'));
            combinationLock.wheels[wheelIndex] = parseInt(document.querySelectorAll('.digit')[wheelIndex].value);
        }

        // if number is longer than 1 digit
        if (this.value.length > 1) {
            this.value = 0;
        }

        // if number is less that 1 digit
        if (this.value.length < 1) {
            this.value = 0;
        }
    });
}

var checkButton = document.querySelector('.locked');
checkButton.addEventListener('click', () => checkLock())

// Check lock
function checkLock() {
    combinationLock.check();
    lifeCounter.innerHTML = combinationLock.life;
    if (combinationLock.locked === false) {
        document.querySelector('#indicator').classList.remove('locked');
        document.querySelector('#indicator').classList.add('unlocked');
    } else {
        document.querySelector('#indicator').classList.add('locked');
        document.querySelector('#indicator').classList.remove('unlocked');
    }
}