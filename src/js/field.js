export const field = {
    element: 0,
    width: 0,
    height: 0,
    offsetLeft: 0,
    offsetTop: 0,
    round: 1,
    roundLabel: document.getElementById('label-round'),
    init() {
        this.element = document.getElementById('playing-field');
        this.width = this.element.clientWidth;
        this.height = this.element.clientHeight;
        this.offsetLeft = this.element.getBoundingClientRect().left;
        this.offsetTop = this.element.getBoundingClientRect().top;
    },
    resetRound(impactLabel) {
        this.round = 1;
        this.roundLabel.innerHTML = `Round ${this.round}`;
        impactLabel.innerHTML = ` 0 / ${this.round}`;
    },
    nextRound(impactLabel) {
        this.round += 1;
        this.roundLabel.innerHTML = `Round ${this.round}`;
        impactLabel.innerHTML = ` 0 / ${this.round}`;
    },
};
