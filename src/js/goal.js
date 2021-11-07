export const goal = {
    element: document.getElementById('goal'),
    width: 0,
    height: 0,
    x: 0,
    y: 0,
    side: null,
    generate(field) {
        const fieldSides = ['left', 'right', 'top', 'bottom'];
        const randomSide = fieldSides[Math.floor(Math.random() * fieldSides.length)];
        this.element.classList = 'goal';
        this.side = randomSide;
        if (randomSide === 'left' || randomSide === 'right') {
            const randomY = Math.random() * (field.height - 128) + 5;
            this.element.style.width = '4px';
            this.element.style.height = '128px';
            this.element.style.top = `${randomY}px`;
            this.element.style.left = '0px';
            this.width = 4;
            this.height = 128;
            this.y = randomY;
            this.x = 0;
            if (randomSide === 'right') {
                this.element.style.left = `${field.width - this.width}px`;
                this.x = field.width;
            }
        } else {
            const randomX = Math.random() * (field.width - 128) + 5;
            this.element.style.width = '128px';
            this.element.style.height = '4px';
            this.element.style.left = `${randomX}px`;
            this.element.style.top = '0px';
            this.width = 128;
            this.height = 4;
            this.x = randomX;
            this.y = 0;
            if (randomSide === 'bottom') {
                this.element.style.top = `${field.height - this.height}px`;
                this.y = field.height;
            }
        }
        field.element.appendChild(this.element);
    },
};
