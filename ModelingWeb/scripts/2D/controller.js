

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
            pyslider.setValue(0.5);
            onChangePy();
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

        pyslider = new Slider("#pyRange", {
            tooltip: 'always'
        });

        pyslider.on('slideStop', function (ev) {
            onChangePy();
        });

        speedslider = new Slider("#speedRange", {
            tooltip: 'always'
        });
    }

    function getIStatisticLabels() {
        var firstQuarter = document.getElementById("firstquarter");
        var secondQuarter = document.getElementById("secondquarter");
        var thirdQuarter = document.getElementById("thirdquarter");
        var fourthQuarter = document.getElementById("fourthquarter");

        return {
            firstQuarter: firstQuarter,
            secondQuarter: secondQuarter,
            thirdQuarter: thirdQuarter,
            fourthQuarter: fourthQuarter
        };
    }

    function getPobabilityRangeValue() {
        var px = document.getElementById("pxRange").value;
        var py = document.getElementById("pyRange").value;

        return {
            px: px,
            py: py,

        };
    }

    function onChangePx() {
        var px = document.getElementById("pxRange").value;
        pointGenerator.px = px;
    }

    function onChangePy() {
        var py = document.getElementById("pyRange").value;
        pointGenerator.py = py;
    }

    var speedslider;
    var pyslider;
    var pxslider;
    var statistic;
    var ticker;

    initSliders();
    InitButtons();

    var probability = getPobabilityRangeValue();

    var pointGenerator = new ProbabilityPoint2D(probability.px, probability.py);
    var painter = new PointPainter2D();
    var statisticHelper = new StatisticHelper2D(getIStatisticLabels());
}, false);
