import 'regenerator-runtime/runtime';

const fieldElement = document.getElementById('main-container');
const ballElement = document.getElementById('ball');

const field = {
    width: fieldElement.clientWidth,
    height: fieldElement.clientHeight,
};

const ball = {
    width: ballElement.clientWidth,
    height: ballElement.clientHeight,
    x: ballElement.offsetLeft,
    y: ballElement.offsetTop,
};

function setBall(x, y) {
    ballElement.style.left = `${x}px`;
    ballElement.style.top = `${y}px`;
    ball.x = x;
    ball.y = y;
}

function sinDegrees(angleDegrees) {
    return Math.sin(angleDegrees * (Math.PI / 180));
}

function getAxialAddition(angle) {
    const distanceToBorderY = field.width - ball.y;
    const beta = 180 - 90 - angle;
    const hypothenuse = distanceToBorderY / sinDegrees(beta);
    const distanceToBorderX = Math.sqrt(((distanceToBorderY ** 2) * -1) + hypothenuse ** 2);
    let additionX;
    let additionY;

    if (distanceToBorderX / distanceToBorderY >= distanceToBorderY / distanceToBorderX) {
        additionX = distanceToBorderX / distanceToBorderY;
        additionY = 1;
    } else {
        additionY = distanceToBorderY / distanceToBorderX;
        additionX = 1;
    }
    return { additionX, additionY };
}

function createTrail() {
    const trailElement = document.createElement('div');
    trailElement.classList = 'trail';
    trailElement.style.transform = `rotate(${50}deg)`;
    trailElement.style.left = ballElement.style.left;
    trailElement.style.top = ballElement.style.top;
    fieldElement.appendChild(trailElement);
}

function moveBall(angle) {
    let currentPosX = ball.x;
    let currentPosY = ball.y;
    let direction = 'left-bottom';
    const { additionX, additionY } = getAxialAddition(angle);
    let ctr = 0;
    setInterval(frame, 5);
    function frame() {
        if (ctr % 8 === 0) createTrail();
        ctr++;
        if (currentPosX >= field.width - ball.width || currentPosY >= field.height - ball.height || currentPosY < 0 || currentPosX < 0) {
            // const newColor = colors[Math.floor(Math.random() * colors.length)];
            // ballElement.setAttribute('style', `-webkit-filter: drop-shadow(0px 0px 9px ${newColor});`);
            // ballElement.style.backgroundColor = newColor;
            if (currentPosY <= 0) {
                if (direction === 'left-top') direction = 'left-bottom';
                else direction = 'right-bottom';
            }
            if (currentPosX <= 0) {
                if (direction === 'right-bottom') direction = 'left-bottom';
                else direction = 'left-top';
            }
            if (currentPosY >= field.height - ball.height) {
                if (direction === 'left-bottom') direction = 'left-top';
                else direction = 'right-top';
            }
            if (currentPosX >= field.width - ball.width) {
                if (direction === 'left-top') direction = 'right-top';
                else direction = 'right-bottom';
            }
        }
        if (direction === 'left-bottom') {
            currentPosX += additionX;
            currentPosY += additionY;
        } else if (direction === 'left-top') {
            currentPosX += additionX;
            currentPosY -= additionY;
        } else if (direction === 'right-top') {
            currentPosX -= additionX;
            currentPosY -= additionY;
        } else if (direction === 'right-bottom') {
            currentPosX -= additionX;
            currentPosY += additionY;
        } else if (direction === 'left-bottom') {
            currentPosX += additionX;
            currentPosY += additionY;
        }
        ballElement.style.left = `${currentPosX}px`;
        ballElement.style.top = `${currentPosY}px`;
    }
}

async function main() {
    setBall(0, 0);
    await moveBall(50);
}

main();
