window.addEventListener('load', function () {

    function InitButtons() {
		changeFormatButton = document.getElementById("resultFormat");
		changeFormatButton.addEventListener('click', function () { changeFormat(); });
        document.getElementById("startButton").addEventListener('click', function () { powMatrix(); });
		document.getElementById("fillByZeroButton").addEventListener('click', function () { fillGaps(); });
    }

    function initSliders() {
        sizeSlider = new Slider("#sizeRange", {
            tooltip: 'always'
        });
        sizeSlider.on('slideStop', function (ev) {
            onChangeSize();
        });

        powRange = new Slider("#powRange", {
            tooltip: 'always'
        });
    }

    function getMatrixSizeValue() {
        return document.getElementById("sizeRange").value;
    }

    function getMatrixPowValue() {
        return document.getElementById("powRange").value;
    }

    function initViewer() {
        var startProp = document.getElementById("startProb");
        var input = document.getElementById("input");
        var output = document.getElementById("output");
        var size = getMatrixSizeValue();

        startViewer = new MatrixViewer(startProp);
        startViewer.SetMatrixSize(size, 1);
        inputViewer = new MatrixViewer(input);
        inputViewer.SetMatrixSize(size, size);
        outputViewer = new MatrixViewer(output);
        outputViewer.SetMatrixSize(size, 1);
    }

    function onChangeSize() {
        var size = document.getElementById("sizeRange").value;
        startViewer.SetMatrixSize(size, 1);
        inputViewer.SetMatrixSize(size, size);
        outputViewer.SetMatrixSize(size, 1);
    }

    function powMatrix() {
        var size = getMatrixSizeValue();
        var matrixCalc = new MatrixCalculator(size);
        var power = getMatrixPowValue();
        var startProb = startViewer.getInputMatrix();
        var matrix = inputViewer.getInputMatrix();
        var semiRes = matrixCalc.PowMatrix(matrix, power);
        result = matrixCalc.Multiply(startProb, semiRes);
        outputViewer.setResult(result, isNormalFormat);
    }

	function fillGaps() {
        startViewer.fillByZero();
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
    var startViewer;
    var inputViewer;
    var outputViewer;
	var changeFormatButton;
	var isNormalFormat = false;
	var result;
    initSliders();
    InitButtons();
    initViewer();

}, false);
