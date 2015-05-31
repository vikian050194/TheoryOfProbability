function ProbabilityPoint1D(px, dx) {

    this.px = px;
    this.dx = dx;
    this.reset();
}

ProbabilityPoint1D.prototype.reset = function () {
    this.curX = 0;
}

ProbabilityPoint1D.prototype.getNextPosition = function (e) {
    var n = Math.random();

    if (n < this.px) {
        if (this.curX < this.dx)
            ++this.curX;
    }
    else {
        if (this.curX > -1 * this.dx)
            --this.curX;
    }
    return this.curX;
}

