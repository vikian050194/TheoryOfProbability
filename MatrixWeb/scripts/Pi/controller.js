window.addEventListener('load', function () {

    function InitButtons() {
		changeFormatButton = document.getElementById("resultFormat");
		changeFormatButton.addEventListener('click', function () { changeFormat(); });	
        document.getElementById("startButton").addEventListener('click', function () { findPi(); });
		document.getElementById("fillByZeroButton").addEventListener('click', function () { fillGaps(); });
    }

    function initSliders() {
        sizeSlider = new Slider("#sizeRange", {
            tooltip: 'always'
        });
        sizeSlider.on('slideStop', function (ev) {
            onChangeSize();
        });
    }

    function getMatrixSizeValue() {
        return document.getElementById("sizeRange").value;
    }

    function initViewer() {
        var input = document.getElementById("input");
        var output = document.getElementById("output");
        var size = getMatrixSizeValue();

        inputViewer = new MatrixViewer(input);
        inputViewer.SetMatrixSize(size, size);
        outputViewer = new MatrixViewer(output);
        outputViewer.SetMatrixSize(size, 1);
    }

    function onChangeSize() {
        var size = document.getElementById("sizeRange").value;
        inputViewer.SetMatrixSize(size, size);
        outputViewer.SetMatrixSize(size, 1);
    }

    function findPi() {
        var size = getMatrixSizeValue();
        var matrixCalc = new MatrixCalculator(size);
        var matrix = inputViewer.getInputMatrix();
        result = matrixCalc.FindStationaryDistribution(matrix);
        outputViewer.setResult(result, isNormalFormat);
    }
	
	function fillGaps() {
        inputViewer.fillByZero();
    }
	
		function changeFormat() {
		if(isNormalFormat)
		{
			changeFormatButton.value = 'Изменить на "a.bc"';
		}
		else
		{
			changeFormatButton.value = 'Изменить на "a/b"';
		}
		isNormalFormat = !isNormalFormat;
	
	if(result)
			outputViewer.setResult(result, isNormalFormat);
		
    }

    var sizeSlider;
    var powRange;
    var inputViewer;
    var outputViewer;
	var changeFormatButton;
	var isNormalFormat = false;
	var result;
    initSliders();
    InitButtons();
    initViewer();

}, false);
