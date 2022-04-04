let beeSwarm = [];

const formSection = document.getElementById('form');
const bgSection = document.getElementById('background-section');
const gameSection = document.getElementById('game');
const beeSwarmList = document.getElementById('bee-swarm');
const tryAgainButton = document.getElementById('try-again');
const resetButton = document.getElementById('reset');
const hitButton = document.getElementById('hit');

let numberOfQueens = 1;
let numberOfWorkers = 5;
let numberOfDrones = 8;
let player = '';

// set start button action
const startButton = document.getElementById('start');
startButton.onclick = function (event) {
    event.preventDefault();

    // save form values and create beeSwarm list
    numberOfQueens = document.getElementById('queen').value;
    numberOfWorkers = document.getElementById('worker').value;
    numberOfDrones = document.getElementById('drone').value;
    player = document.getElementById('player').value;


    initGame();
};

function initGame() {
    beeSwarm = [];

    // generate bee members
    generateMembers();

    // hide form section
    hideFormSection();

    // display game section
    displayGameSection();

    tryAgainButton.textContent = 'Try Again, ' + player;
}

function generateMembers() {
    const winWidth = window.innerWidth;
    const winHeight = window.innerHeight;

    let index = 0;

    for (let i = 0; i < numberOfQueens; i++) {

        // get random position for each queen
        const randomTop = getRandomPosition(100, winHeight - 100);
        const randomLeft = getRandomPosition(100, winWidth/3 - 50);

        const queen = {
            name: 'queen',
            health: 100,
            id: index,
            top: randomTop,
            left: randomLeft
        }

        // create html element
        const node = createNode(queen);
        beeSwarmList.appendChild(node);

        beeSwarm.push(queen);
        index++;
    }
    for (let i = 0; i < numberOfWorkers; i++) {

        // get random position for each queen
        const randomTop = getRandomPosition(100, winHeight - 100);
        const randomLeft = getRandomPosition(winWidth/3 + 50, 2 * winWidth/3 - 50);

        const worker = {
            name: 'worker',
            health: 75,
            id: index,
            top: randomTop,
            left: randomLeft
        }

        // create html element
        const node = createNode(worker);
        beeSwarmList.appendChild(node);

        beeSwarm.push(worker);
        index++;
    }
    for (let i = 0; i < numberOfDrones; i++) {

        // get random position for each queen
        const randomTop = getRandomPosition(100, winHeight - 100);
        const randomLeft = getRandomPosition(2 * winWidth/3 + 50, winWidth - 100);

        const drone = {
            name: 'drone',
            health: 50,
            id: index,
            top: randomTop,
            left: randomLeft
        }

        // create html element
        const node = createNode(drone);
        beeSwarmList.appendChild(node);

        beeSwarm.push(drone);
        index++;
    }
}

function getRandomPosition(min, max) {
    return Math.random() * (max - min) + min;
}

function createNode(node) {
    const description = document.createElement('div');
    description.textContent = node.name + " " + node.health + "HP";
    description.setAttribute('id', node.id + '-description')

    const layout = document.createElement('div');
    layout.textContent = '🐝';
    layout.style.transform = 'scale(1.8)';

    const el = document.createElement('div');
    el.appendChild(description);
    el.appendChild(layout);
    el.style.top = node.top + 'px';
    el.style.left = node.left + 'px';
    el.classList.add('bee');
    el.setAttribute('id', node.id);
    return el;
}

function hideFormSection() {
    formSection.classList.add('hidden');
    bgSection.classList.add('hidden');
}

function displayFormSection() {
    formSection.classList.remove('hidden');
    bgSection.classList.remove('hidden');
}

function hideGameSection() {
    gameSection.classList.add('hidden');
}

function displayGameSection() {
    gameSection.classList.remove('hidden');
}

hitButton.onclick = function (event) {
    event.preventDefault();

    hitAction();
};

function hitAction() {
    const randomBeeIndex = Math.floor(getRandomPosition(0, beeSwarm.length));
    const randomBeeEl = document.getElementById(beeSwarm[randomBeeIndex].id);
    const randomBee = beeSwarm[randomBeeIndex];

    if (randomBee) {
        randomBeeEl?.classList.add('selected');

        switch (randomBee.name) {
            case 'queen':
                if (randomBee.health - 8 <= 0) {
                    randomBeeEl.remove();
                    for (let i = 0; i < beeSwarm.length; i++) {
                        const beeEl = document.getElementById(beeSwarm[i].id);
                        beeEl.remove();
                    }
                    beeSwarm = [];
                } else if (randomBee.health - 8 > 0) {
                    randomBee.health -= 8;
                    beeSwarm[randomBeeIndex].health = randomBee.health;
                }
                break;
            case 'worker':
                if (randomBee.health - 10 <= 0) {
                    randomBeeEl.remove();
                    beeSwarm.splice(randomBeeIndex, 1);
                } else if (randomBee.health - 10 > 0) {
                    randomBee.health -= 10;
                    beeSwarm[randomBeeIndex].health = randomBee.health;
                }
                break;
            case 'drone':
                if (randomBee.health - 12 <= 0) {
                    randomBeeEl.remove();
                    beeSwarm.splice(randomBeeIndex, 1);
                } else if (randomBee.health - 12 > 0) {
                    randomBee.health -= 12;
                    beeSwarm[randomBeeIndex].health = randomBee.health;
                }
                break;
            default:
                console.log("Err");
        }

        if (beeSwarm[randomBeeIndex]) {
            const descriptionBeeEl = document.getElementById(beeSwarm[randomBeeIndex].id + '-description');
            const newDescription = document.createElement('div');
            newDescription.textContent = randomBee?.name + " " + randomBee?.health + "HP";
            newDescription.setAttribute('id', randomBee?.id + '-description')
            descriptionBeeEl?.replaceWith(newDescription);

            setTimeout(() => {
                randomBeeEl?.classList.remove('selected');
            }, 3000);
        }
    } else {
        hitAction();
    }
}

resetButton.onclick = function (event) {
    event.preventDefault();

    for (let i = 0; i < beeSwarm.length; i++) {
        const beeEl = document.getElementById(beeSwarm[i].id);
        beeEl.remove();
    }

    hideGameSection();

    displayFormSection();
}

tryAgainButton.onclick = function (event) {
    event.preventDefault();

    for (let i = 0; i < beeSwarm.length; i++) {
        const beeEl = document.getElementById(beeSwarm[i].id);
        beeEl.remove();
    }

    initGame();
}