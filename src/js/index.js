/* eslint-disable radix */
/* eslint-disable max-len */
import 'regenerator-runtime/runtime';

const fieldElement = document.getElementById('playing-field');
const ballElement = document.getElementById('ball');
const anglePreviewElement = document.getElementById('angle-preview');
const bounceLabel = document.getElementById('bounce-label');
const angleLabel = document.getElementById('angle-label');
const trailLabel = document.getElementById('trail-label');

const field = {
    width: fieldElement.clientWidth,
    height: fieldElement.clientHeight,
};

const finish = {
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    side: null,
};

const ball = {
    width: ballElement.clientWidth,
    height: ballElement.clientHeight,
    x: ballElement.offsetLeft,
    y: ballElement.offsetTop,
    direction: 'left-bottom',
    bounces: 0,
    trails: 0,
    additionX: 0,
    additionY: 0,
    angle: 0,
    speed: 5,
};

function setBall(x, y) {
    ballElement.style.left = `${x}px`;
    ballElement.style.top = `${y}px`;
    ball.x = x;
    ball.y = y;
}

function collisionCheck() {
    return new Promise((resolve) => {
        if (finish.side === 'left' || finish.side === 'right') {
            if (ball.y >= finish.y && ball.y + ball.height <= finish.y + finish.height) {
                // Rechts || Links
                if (finish.side === 'right' && ball.x + ball.width >= finish.x) {
                    resolve(true);
                }
                if (finish.side === 'left' && (finish.x - ball.x < 2 && finish.x - ball.x > -2)) {
                    resolve(true);
                }
            }
        } else if (finish.side === 'top') {
            if (ball.y - finish.y < 1 && ball.y - finish.y > -1) {
                if (ball.x >= finish.x && ball.x < finish.x + finish.width) {
                    console.log('asdsad');
                    resolve(true);
                }
            }
        } else if (finish.side === 'bottom') {
            if ((ball.y + ball.height) - finish.y < 1 && (ball.y + ball.height) - finish.y > -1) {
                if (ball.x >= finish.x && ball.x < finish.x + finish.width) {
                    resolve(true);
                }
            }
        }
        resolve(false);
    });
}

function generateFinish() {
    const fieldSides = ['left', 'right', 'top', 'bottom'];
    const randomSide = fieldSides[Math.floor(Math.random() * fieldSides.length)];
    const finishElement = document.createElement('div');
    finishElement.classList = 'finish';
    finish.side = randomSide;

    if (randomSide === 'left' || randomSide === 'right') {
        const randomY = Math.random() * (field.height - 96) + 5;
        finishElement.style.width = '1px';
        finishElement.style.height = '128px';
        finishElement.style.top = `${randomY}px`;
        finish.width = 1;
        finish.height = 128;
        finish.y = randomY;
        finish.x = 0;
        if (randomSide === 'right') {
            finishElement.style.left = `${field.width}px`;
            finish.x = field.width;
        }
    } else {
        const randomX = Math.random() * (field.width - 96) + 5;
        finishElement.style.width = '128px';
        finishElement.style.height = '1px';
        finishElement.style.left = `${randomX}px`;
        finish.width = 128;
        finish.height = 1;
        finish.x = randomX;
        finish.y = 0;
        if (randomSide === 'bottom') {
            finishElement.style.top = `${field.height}px`;
            finish.y = field.height;
        }
    }
    fieldElement.appendChild(finishElement);
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
        additionX = ball.speed / (distanceToBorderX / distanceToBorderY);
        additionY = ball.speed;
    } else {
        additionY = ball.speed / (distanceToBorderY / distanceToBorderX);
        additionX = ball.speed;
    }
    return { additionX, additionY };
}

function createTrail() {
    const trailElement = document.createElement('div');
    trailElement.classList = 'trail trailRemove';
    trailElement.style.left = ballElement.style.left;
    trailElement.style.top = ballElement.style.top;
    fieldElement.appendChild(trailElement);
    setTimeout(() => {
        trailElement.remove();
    }, 2500);
}

async function frame() {
    if (await collisionCheck()) return;
    if (ball.trails % 2 === 0) {
        createTrail();
        trailLabel.innerHTML = fieldElement.children.length - 1;
    }
    /* Nur der Winkel verändert sich, nicht die Zunahme/Abnahme der Position in X oder Y Richtung */
    if (ball.x >= field.width - ball.width || ball.y >= field.height - ball.height || ball.y < 0 || ball.x < 0) {
        ball.bounces++;
        bounceLabel.innerHTML = ball.bounces;
        if (ball.y <= 0) {
            if (ball.direction === 'left-top') ball.direction = 'left-bottom';
            else ball.direction = 'right-bottom';
        }
        if (ball.x <= 0) {
            if (ball.direction === 'right-bottom') ball.direction = 'left-bottom';
            else ball.direction = 'left-top';
        }
        if (ball.y >= field.height - ball.height) {
            if (ball.direction === 'left-bottom') ball.direction = 'left-top';
            else ball.direction = 'right-top';
        }
        if (ball.x >= field.width - ball.width) {
            if (ball.direction === 'left-top') ball.direction = 'right-top';
            else ball.direction = 'right-bottom';
        }
    }
    if (ball.direction === 'left-bottom') {
        ball.x += ball.additionX;
        ball.y += ball.additionY;
        ball.direction = 'left-bottom';
    } else if (ball.direction === 'left-top') {
        ball.x += ball.additionX;
        ball.y -= ball.additionY;
        ball.direction = 'left-top';
    } else if (ball.direction === 'right-top') {
        ball.x -= ball.additionX;
        ball.y -= ball.additionY;
        ball.direction = 'right-top';
    } else if (ball.direction === 'right-bottom') {
        ball.x -= ball.additionX;
        ball.y += ball.additionY;
        ball.direction = 'right-bottom';
    }
    ball.trails++;
    ballElement.style.left = `${ball.x}px`;
    ballElement.style.top = `${ball.y}px`;
    setTimeout(frame, 8);
}

const rect = fieldElement.getBoundingClientRect();

const p2 = {
  x: rect.left,
  y: rect.top,
};

function mouseMove(e) {
  const p1 = {
    x: e.pageX,
    y: e.pageY,
  };
  if (p1.y < p2.y || p1.y > p2.y + field.height || p1.x < p2.x || p1.x > p2.x + field.width) return;
  const angle = (Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI));
  if (angle > 90) ball.angle = 1;
  else if (angle < 0 && angle > -90) ball.angle = 89;
  else ball.angle = parseInt((Math.atan2(p2.y - p1.y, p2.x - p1.x) * (180 / Math.PI)) + 180);
  anglePreviewElement.style.webkitTransform = `rotate(${ball.angle}deg)`;
  angleLabel.innerHTML = `${ball.angle}°`;
}

function mouseClick(e) {
    if (e.button === 0) {
        window.removeEventListener('mousemove', mouseMove);
        fieldElement.removeChild(anglePreviewElement);
        const { additionX, additionY } = getAxialAddition(ball.angle);
        ball.additionX = additionX;
        ball.additionY = additionY;
        frame(ball.angle);
    }
}

async function main() {
    setBall(0, 0);
    generateFinish();
    window.addEventListener('mouseup', mouseClick);
    window.addEventListener('mousemove', mouseMove);
}

main();
