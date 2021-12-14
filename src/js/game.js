/* eslint-disable radix */
/* eslint-disable max-len */
import 'regenerator-runtime/runtime';
import sounds from '../sound/*.mp3';
import { time } from './time';
import { goal } from './goal';
import { ball } from './ball';
import { field } from './field';

export async function game() {
    const impactLabel = document.getElementById('bounce-label');
    const angleLabel = document.getElementById('angle-label');
    const trailLabel = document.getElementById('trail-label');
    const impactSound = new Audio(sounds.impact);

    function createTrail() {
        const trailElement = document.createElement('div');
        trailElement.classList = 'trail';
        trailElement.style.left = ball.element.style.left;
        trailElement.style.top = ball.element.style.top;
        field.element.appendChild(trailElement);
        setTimeout(() => {
            trailElement.remove();
        }, 2500);
    }

    function resetGame() {
        time.stop();
        ball.reset();
        ball.removeTrails();
        ball.showAnglePreview();
        goal.generate(field);
        window.addEventListener('mousemove', mouseMove);
    }

    function lost() {
        resetGame();
        field.resetRound(impactLabel);
    }

    function nextRound() {
        resetGame();
        field.nextRound(impactLabel);
    }

    async function mainRoutine() {
        if (await ball.reachedGoal(goal)) {
            if (ball.bounces < field.round) lost();
            else nextRound();
            return;
        }
        if (ball.trails % 4 === 0) {
            createTrail();
            trailLabel.innerHTML = document.getElementsByClassName('trail').length;
        }
        /* Nur der Winkel verändert sich, nicht die Zunahme/Abnahme der Position in X oder Y Richtung */
        if (ball.x >= field.width - ball.width || ball.y + ball.height >= field.height || ball.y <= 0 || ball.x <= 0) {
            const soundCopy = impactSound.cloneNode(true);
            soundCopy.volume = 0.1;
            soundCopy.play();
            ball.sparkles(field.element);
            ball.bounces++;
            impactLabel.innerHTML = `${ball.bounces} / ${field.round}`;
            if (ball.bounces > field.round) {
                lost();
                return;
            }
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
        ball.element.style.left = `${ball.x}px`;
        ball.element.style.top = `${ball.y}px`;
        setTimeout(mainRoutine, 2);
    }

    function getAxialAddition(angle) {
        const distanceToBorderY = field.width - ball.y;
        const beta = 180 - 90 - angle;
        const hypothenuse = distanceToBorderY / Math.sin(beta * (Math.PI / 180));
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

    function mouseMove(e) {
        const mouse = { x: e.pageX, y: e.pageY };
        // if (mouse.y < field.offsetTop || mouse.y > field.offsetTop + field.height || mouse.x < field.offsetLeft || mouse.x > field.offsetLeft + field.width) return;
        ball.angle = (Math.atan2(ball.offsetTop - mouse.y, ball.offsetLeft - mouse.x) * (180 / Math.PI)) + 180;
        angleLabel.innerHTML = `${Math.round(ball.angle)}°`;

        const previewLength = Math.sqrt((mouse.x - ball.offsetLeft) ** 2 + (mouse.y - ball.offsetTop) ** 2);
        ball.anglePreview.style.webkitTransform = `rotate(${ball.angle}deg)`;
        ball.anglePreview.style.width = `${previewLength}px`;
        ball.anglePreview.style.left = `${ball.x + (ball.width / 2)}px`;
        ball.anglePreview.style.top = `${ball.y + (ball.height / 2)}px`;

        if (ball.angle < 90) ball.direction = 'left-bottom';
        else if (ball.angle > 90 && ball.angle < 180) ball.direction = 'right-bottom';
        else if (ball.angle > 180 && ball.angle < 270) ball.direction = 'right-top';
        else if (ball.angle > 270) ball.direction = 'left-top';
    }

    function mouseClick(e) {
        if (e.button === 0) {
            window.removeEventListener('mousemove', mouseMove);
            ball.hideAnglePreview();
            const { additionX, additionY } = getAxialAddition(ball.angle);
            ball.additionX = additionX;
            ball.additionY = additionY;
            mainRoutine(ball.angle);
            time.init();
            time.interval = setInterval(() => {
                time.update();
            }, 1000);
        }
    }

    function main() {
        field.init();
        ball.init();
        ball.setPosition(200, 150);
        goal.generate(field);
        window.addEventListener('mouseup', mouseClick);
        window.addEventListener('mousemove', mouseMove);
    }
    main();
}
