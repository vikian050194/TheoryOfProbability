

window.addEventListener('load', function () {

    function InitButtons() {
        function start() {
            speed = document.getElementById("speedRange").value;

            ticker = new DemoUtils.Ticker(speed, function () {
                var point = pointGenerator.getNextPosition();
                painter.drawNextPoint(point);
                statisticHelper.changeStatistic(point);

            });
            ticker.start();
        }

        function stop() {
            if (ticker != null)
                ticker.stop();

            pointGenerator.reset();
            painter.reset();
            statisticHelper.reset();
        }

        function pause() {
            if (ticker != null)
                ticker.stop();
        }

        function reset() {
            pxslider.setValue(0.5);
            onChangePx();
        }

        document.getElementById("startButton").addEventListener('click', function () { start(); });
        document.getElementById("pauseButton").addEventListener('click', function () { pause(); });
        document.getElementById("stopButton").addEventListener('click', function () { stop(); });
        document.getElementById("resetButton").addEventListener('click', function () { reset(); });

    }

    function initSliders() {
        pxslider = new Slider("#pxRange", {
            tooltip: 'always'
        });
        pxslider.on('slideStop', function (ev) {
            onChangePx();
        });

        dxslider = new Slider("#dxRange", {
            tooltip: 'always'
        });

        dxslider.on('slideStop', function (ev) {
            onChangeDx();
        });

        dtslider = new Slider("#dtRange", {
            tooltip: 'always'
        });

        dtslider.on('slideStop', function (ev) {
            onChangeDt();
        });

        var speedslider = new Slider("#speedRange", {
            tooltip: 'always'
        });
    }

    function getIStatisticLabels() {
        var left = document.getElementById("left");
        var zero = document.getElementById("zero");
        var right = document.getElementById("right");
        var min = document.getElementById("min");
        var max = document.getElementById("max");

        return {
            left: left,
            zero: zero,
            right: right,
            min: min,
            max: max,
        };
    }

    function getPobabilityRangeValue() {
        var px = document.getElementById("pxRange").value;
        var dx = document.getElementById("dxRange").value;
        var dt = document.getElementById("dtRange").value;
        return {
            px: px,
            dx: dx,
            dt: dt
        };
    }

    function onChangePx() {
        var px = document.getElementById("pxRange").value;
        pointGenerator.px = px;
    }

    function onChangeDx() {
        var dx = document.getElementById("dxRange").value;
        pointGenerator.dx = dx;
        painter.dx = dx;
        painter.initK();
    }

    function onChangeDt() {
        var dt = document.getElementById("dtRange").value;
        painter.dt = dt;
        painter.initK();
    }

    var pxslider;
    var dxslider;
    var dtslider;
    var statistic;
    var ticker;

    initSliders();
    InitButtons();

    var sliderValues = getPobabilityRangeValue();

    var pointGenerator = new ProbabilityPoint1D(sliderValues.px, sliderValues.dx);
    var painter = new PointPainter1D(sliderValues);
    var statisticHelper = new StatisticHelper1D(getIStatisticLabels());
}, false);
