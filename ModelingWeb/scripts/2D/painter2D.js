function PointPainter2D() {
    this.initCanvas();
    this.reset();
}

PointPainter2D.prototype.initCanvas = function () {

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
  
    ctx.translate(this.size.width / 2, this.size.height / 2);
    this.ctx = ctx;
}

PointPainter2D.prototype.drawNextPoint = function (point) {

    this.ctx.strokeRect(point.x, point.y, 2, 2);
}

PointPainter2D.prototype.drawLine = function (x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    //this.ctx.closePath();
}

PointPainter2D.prototype.reset = function () {
    this.ctx.clearRect(-ctx.canvas.width, -ctx.canvas.height, 2 * ctx.canvas.width, 2 * ctx.canvas.height);
    this.drawLine(0, -this.size.height / 2 + 1, 0, this.size.height / 2 - 1);
    this.drawLine(-this.size.width / 2 + 1, 0, this.size.width / 2 - 1, 0);
}