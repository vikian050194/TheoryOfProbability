function PointPainter1D(sliderValues) {
    this.dx = sliderValues.dx;
    this.dt = sliderValues.dt;

    this.prevPoint = 0;
    this.prevTime = 0;

    this.initCanvas();
    this.reset();
    this.initK();
}

PointPainter1D.prototype.initCanvas = function () {

    function getSize() {
        var oph = document.getElementById("canvas")
        var myWidth = oph.offsetWidth;
        var iph = document.getElementById("inputPlaceHolder")
        var myHeight = iph.offsetHeight;

        return {
            height: myHeight,
            width: myWidth
        };
    }

    var canvas = document.getElementById("canvas");

    this.size = getSize();
    canvas.width = this.size.width;
    canvas.height = this.size.height;
    ctx = canvas.getContext("2d");

    ctx.translate(this.size.width / 2, 0);
    this.ctx = ctx;
}

PointPainter1D.prototype.initK = function () {
    this.dxK = this.size.width / (this.dx * 2);
    this.dtK = this.size.height / this.dt;
}

PointPainter1D.prototype.drawNextPoint = function (point) {

    if (this.prevTime >= this.dt) {
        var temp = this.prevPoint;
        this.reset();
        this.prevPoint = temp;
    }
    this.drawLine(this.prevPoint * this.dxK, this.prevTime * this.dtK, point * this.dxK, (this.prevTime + 1) * this.dtK);
    this.prevTime++;

    this.prevPoint = point;
}

PointPainter1D.prototype.drawLine = function (x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    //this.ctx.closePath();
}

PointPainter1D.prototype.reset = function () {
    this.ctx.clearRect(-ctx.canvas.width, 0, 2 * ctx.canvas.width, 2 * ctx.canvas.height);
    this.drawLine(0, 0, 0, this.size.height - 1);
    this.prevPoint = 0;
    this.prevTime = 0;
}