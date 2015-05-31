function ProbabilityPoint3D(px, py, pz) {

    this.px = px;
    this.py = py;
    this.pz = pz;
    this.reset();
}

ProbabilityPoint3D.prototype.reset = function () {
    this.curX = 0;
    this.curY = 0;
    this.curZ = 0;
}

ProbabilityPoint3D.prototype.getNextPosition = function (e) {
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

    n = Math.random();
    if (n < this.pz)
        --this.curZ;
    else
        ++this.curZ;

    return {
        x: this.curX,
        y: this.curY,
        z: this.curZ
    };
}

