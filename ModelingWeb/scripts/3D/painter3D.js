function pointPainter3D() {
    this.screen_canvas = document.getElementById('canvas');
    this.initCanvas();

    this.renderer = new Pre3d.Renderer(this.screen_canvas);
    this.cubes = [];
    this.renderer.camera.focal_length = 0.5;

    DemoUtils.autoCamera(this.renderer, 0, 0, -30, 0.40, -1.06, 0, this.draw.bind(this));
    this.drawCoordLines();
}

pointPainter3D.prototype.initCanvas = function () {
    function getSize() {
        var oph = document.getElementById("canvas")
        var myWidth = oph.offsetWidth;
        var iph = document.getElementById("inputPlaceHolder")
        var myHeight = iph.offsetHeight;

        return {
            height: myHeight-2,
            width: myWidth
        };

    }
    this.size = getSize();
    this.screen_canvas.width = this.size.width;
     this.screen_canvas.height = this.size.height;
}

pointPainter3D.prototype.drawCoordLines = function () {
    var pathOx = new Pre3d.Path();
    var pathOy = new Pre3d.Path();
    var pathOz = new Pre3d.Path();
    var lenght = 30;

    var p0 = { x: 0, y: 0, z: 0 };
    var px = { x: lenght, y: 0, z: 0 };
    var py = { x: 0, y: lenght, z: 0 };
    var pz = { x: 0, y: 0, z: lenght };

    pathOx = Pre3d.PathUtils.makeLine(p0, px);
    pathOy = Pre3d.PathUtils.makeLine(p0, py);
    pathOz = Pre3d.PathUtils.makeLine(p0, pz);


    var fgcolor = new Pre3d.RGBA(10, 0, 0, 1);
    this.renderer.ctx.setStrokeColor(fgcolor.r, fgcolor.g, fgcolor.b, fgcolor.a);
    this.renderer.drawPath(pathOx);
    fgcolor = new Pre3d.RGBA(0, 10, 0, 1);
    this.renderer.ctx.setStrokeColor(fgcolor.r, fgcolor.g, fgcolor.b, fgcolor.a);
    this.renderer.drawPath(pathOy);
    fgcolor = new Pre3d.RGBA(0, 0, 10, 1);
    this.renderer.ctx.setStrokeColor(fgcolor.r, fgcolor.g, fgcolor.b, fgcolor.a);
    this.renderer.drawPath(pathOz);

    px.x = -px.x;
    py.y = -py.y;
    pz.z = -pz.z;

    pathOx = Pre3d.PathUtils.makeLine(p0, px);
    pathOy = Pre3d.PathUtils.makeLine(p0, py);
    pathOz = Pre3d.PathUtils.makeLine(p0, pz);

    var fgcolor = new Pre3d.RGBA(0, 0, 0, 1);
    this.renderer.ctx.setStrokeColor(fgcolor.r, fgcolor.g, fgcolor.b, fgcolor.a);
    this.renderer.drawPath(pathOx);

    this.renderer.drawPath(pathOy);

    this.renderer.drawPath(pathOz);
}

pointPainter3D.prototype.drawNextPoint = function (point) {

    var cube = Pre3d.ShapeUtils.makeCube(0.5);
    var transform = new Pre3d.Transform();
    transform.translate(point.x, point.y, point.z);
    this.cubes.push({
        shape: cube,
        color: new Pre3d.RGBA(0, 0, 0, 1),
        trans: transform
    });

    this.draw();
}

pointPainter3D.prototype.draw = function () {
    var num_cubes = this.cubes.length;
    for (var i = 0; i < num_cubes; ++i) {
        var cube = this.cubes[i];
        this.renderer.fill_rgba = cube.color;
        this.renderer.transform = cube.trans;
        this.renderer.bufferShape(cube.shape);
    }

    this.renderer.ctx.setFillColor(1, 1, 1, 1);
    this.renderer.drawBackground();

    this.renderer.drawBuffer();
    this.renderer.emptyBuffer();

    this.renderer.transform = new Pre3d.Transform();
    this.drawCoordLines();
}

pointPainter3D.prototype.reset = function () {
    this.cubes = [];
    this.drawCoordLines();
    this.draw();
}

