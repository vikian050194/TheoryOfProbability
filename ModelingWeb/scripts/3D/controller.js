

window.addEventListener('load', function () {

    function InitButtons() {
        function start() {


            ticker = new DemoUtils.Ticker(50, function () {
                if (count < currentCount)
                    return;
                var point = pointGenerator.getNextPosition();
                painter.drawNextPoint(point);
                statisticHelper.changeStatistic(point);
                currentCount++;
            });
            ticker.start();

            //  countslider.disable();
        }

        function stop() {
            if (ticker != null)
                ticker.stop();
            //	countslider.enable();

            pointGenerator.reset();
            painter.reset();
            statisticHelper.reset();
            currentCount = 1;
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
            pzslider.setValue(0.5);
            onChangePz();
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

        pzslider = new Slider("#pzRange", {
            tooltip: 'always'
        });

        pzslider.on('slideStop', function (ev) {
            onChangePz();
        });

        countslider = new Slider("#countRange", {
            tooltip: 'always'
        });

        countslider.on('slideStop', function (ev) {
            onChangeCount();
        });
    }

    function getIStatisticLabels() {
        var octantFirst = document.getElementById("octantFirst");
        var octantSecond = document.getElementById("octantSecond");
        var octantThird = document.getElementById("octantThird");
        var octantFourth = document.getElementById("octantFourth");
        var octantFifth = document.getElementById("octantFifth");
        var octantSixth = document.getElementById("octantSixth");
        var octantSeventh = document.getElementById("octantSeventh");
        var octantEighth = document.getElementById("octantEighth");

        return {
            octantFirst: octantFirst,
            octantSecond: octantSecond,
            octantThird: octantThird,
            octantFourth: octantFourth,
            octantFifth: octantFifth,
            octantSixth: octantSixth,
            octantSeventh: octantSeventh,
            octantEighth: octantEighth
        };
    }

    function getPobabilityRangeValue() {
        var px = document.getElementById("pxRange").value;
        var py = document.getElementById("pyRange").value;
        var pz = document.getElementById("pzRange").value;
        count = document.getElementById("countRange").value;
        return {
            px: px,
            py: py,
            pz: pz
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

    function onChangePz() {
        var pz = document.getElementById("pzRange").value;
        pointGenerator.pz = pz;
    }

    function onChangeCount() {
        count = document.getElementById("countRange").value;
    }

    var count;
    var currentCount = 1;

    var pxslider;
    var pyslider;
    var pzslider;
    var countslider;
    var ticker;

    initSliders();
    InitButtons();

    var probability = getPobabilityRangeValue();
    var pointGenerator = new ProbabilityPoint3D(probability.px, probability.py, probability.pz);
    var painter = new pointPainter3D();
    var statisticHelper = new StatisticHelper3D(getIStatisticLabels());

}, false);
