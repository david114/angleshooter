export const time = {
    element: null,
    totalSeconds: 0,
    seconds: 0,
    minutes: 0,
    interval: null,
    init() {
        this.element = document.getElementById('time-label');
    },
    update() {
        this.totalSeconds++;
        this.minutes = Math.floor((this.totalSeconds) / 60);
        this.seconds = this.totalSeconds - (this.minutes * 60);
        if (this.minutes < 10) { this.minutes = `0${this.minutes}`; }
        if (this.seconds < 10) { this.seconds = `0${this.seconds}`; }
        this.element.innerHTML = `${this.minutes}:${this.seconds}`;
    },
    stop() {
        clearInterval(this.interval);
    },
};
