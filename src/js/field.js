export const field = {
    element: 0,
    width: 0,
    height: 0,
    offsetLeft: 0,
    offsetTop: 0,
    init() {
        this.element = document.getElementById('playing-field');
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.offsetLeft = this.element.getBoundingClientRect().left;
        this.offsetTop = this.element.getBoundingClientRect().top;
    },
};
