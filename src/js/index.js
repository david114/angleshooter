import sounds from '../sound/*.mp3';
import { game } from './game';

const mainMenu = document.getElementById('main-menu');
const mainContainer = document.getElementById('main-container');
const wrapperMainMenu = document.getElementById('wrapper-main-menu');
const wrapperOptions = document.getElementById('wrapper-options');
const startButton = document.getElementById('start-button');
const optionButton = document.getElementById('option-button');

const menuButtons = document.getElementsByClassName('option-button');
const buttonSound = new Audio(sounds.buttonHover);

for (let i = 0; i < menuButtons.length; ++i) {
    menuButtons[i].onmouseover = () => {
        buttonSound.cloneNode(true).play();
    };
}

startButton.onclick = () => {
    mainMenu.style.display = 'none';
    mainContainer.style.display = 'block';
    game();
};

optionButton.onclick = () => {
    wrapperMainMenu.style.display = 'none';
    wrapperOptions.style.display = 'block';
};
