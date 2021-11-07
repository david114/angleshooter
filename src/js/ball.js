export const ball = {
    element: document.getElementById('ball'),
    anglePreview: document.getElementById('angle-preview'),
    // trails: document.getElementsByClassName('trail'),
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    offsetLeft: 0,
    offsetTop: 0,
    direction: null,
    bounces: 0,
    trails: 0,
    angle: 0,
    speed: 4,
    additionX: 0,
    additionY: 0,
    init() {
        this.element = document.getElementById('ball');
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
    },
    reset() {
        this.x = 200;
        this.y = 150;
        this.element.style.left = `${this.x}px`;
        this.element.style.top = `${this.y}px`;
        this.offsetLeft = this.element.getBoundingClientRect().left;
        this.offsetTop = this.element.getBoundingClientRect().top;
        this.direction = null;
        this.bounces = 0;
        this.trails = 0;
        this.angle = 0;
        this.additionX = 0;
        this.additionY = 0;
    },
    removeTrails() {
        document.querySelectorAll('.trail').forEach((e) => e.remove());
    },
    setPosition(x, y) {
        this.x = x;
        this.y = y;
        this.element.style.left = `${x}px`;
        this.element.style.top = `${y}px`;
        this.offsetLeft = this.element.getBoundingClientRect().left;
        this.offsetTop = this.element.getBoundingClientRect().top;
    },
    sparkles(field) {
        // for (let i = 0; i < 32; ++i) {
        //     const sparkle = document.createElement('div');
        //     sparkle.classList = 'sparkle';
        //     sparkle.style.left = `${this.x}px`;
        //     sparkle.style.top = `${this.y}px`;
        //     field.appendChild(sparkle);

        //     const sparkleDirectionsX = ['left', 'right'];
        //     const sparkleDirectionsY = ['top', 'bottom'];
        //     const sparkeDirectionX = sparkleDirectionsX[Math.floor(Math.random() * sparkleDirectionsX.length)];
        //     const sparkeDirectionY = sparkleDirectionsY[Math.floor(Math.random() * sparkleDirectionsY.length)];

        //     setInterval(() => {
        //         if (sparkeDirectionX === 'left') sparkle.style.left = `${parseInt(sparkle.style.left) - Math.random()}px`;
        //         else sparkle.style.left = `${parseInt(sparkle.style.left) + Math.random()}px`;

        //         if (sparkeDirectionY === 'top') sparkle.style.top = `${parseInt(sparkle.style.top) - Math.random()}px`;
        //         else sparkle.style.top = `${parseInt(sparkle.style.top) + Math.random()}px`;
        //     }, 20);
        // }
    },
    showAnglePreview() {
        this.anglePreview.style.display = 'block';
    },
    hideAnglePreview() {
        this.anglePreview.style.display = 'none';
    },
    reachedGoal(goal) {
        return new Promise((resolve) => {
            const ballCenterY = this.y + (this.height / 2);
            const ballCenterX = this.x + (this.width / 2);
            if (goal.side === 'right') {
                if (this.x + this.width >= goal.x) {
                    if (ballCenterY >= goal.y && ballCenterY <= (goal.y + goal.height)) {
                        resolve(true);
                    }
                }
            } else if (goal.side === 'bottom') {
                if (ballCenterX >= goal.x && ballCenterX <= (goal.x + goal.width)) {
                    if (this.y + this.height >= goal.y) {
                        resolve(true);
                    }
                }
            } else if (goal.side === 'top') {
                if (ballCenterX >= goal.x && ballCenterX <= (goal.x + goal.width)) {
                    if (this.y <= goal.y + goal.height) {
                        resolve(true);
                    }
                }
            } else if (goal.side === 'left') {
                if (this.x <= goal.x + goal.width) {
                    if (ballCenterY >= goal.y && ballCenterY <= (goal.y + goal.height)) {
                        resolve(true);
                    }
                }
            }
            resolve(false);
        });
    },
};
