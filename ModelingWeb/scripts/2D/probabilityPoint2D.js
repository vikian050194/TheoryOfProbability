function ProbabilityPoint2D(px, py) {

    this.px = px;
    this.py = py;
    this.reset();
}

ProbabilityPoint2D.prototype.reset = function () {
    this.curX = 0;
    this.curY = 0;
}

ProbabilityPoint2D.prototype.getNextPosition = function (e) {
    var n = Math.random();

    if (n < this.px)
        ++this.curX;
    else
        --this.curX;

    n = Math.random();
    if (n < this.py)
        --this.curY;
    else
        ++this.curY;

    return {
        x: this.curX,
        y: this.curY
    };
}

