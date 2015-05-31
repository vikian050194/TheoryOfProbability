window.addEventListener('load', function () {

    function InitButtons() {
		changeFormatButton = document.getElementById("resultFormat");
		changeFormatButton.addEventListener('click', function () { changeFormat(); });
        document.getElementById("startButton").addEventListener('click', function () { powIt(); });
        document.getElementById("fillByZeroButton").addEventListener('click', function () { fillGaps(); });
    }

    function initSliders() {
        sizeSlider = new Slider("#sizeRange", {
            tooltip: 'always'
        });
		  powSlider = new Slider("#powRange", {
            tooltip: 'always'
        });
        sizeSlider.on('slideStop', function (ev) {
            onChangeSize();
        });
    }

    function getMatrixSizeValue() {
        return document.getElementById("sizeRange").value;
    }
	
    function getMatrixPowValue() {
        return document.getElementById("powRange").value;
    }

    function initViewer() {
        var input = document.getElementById("input");
        var output = document.getElementById("output");
		var size = getMatrixSizeValue();
        inputViewer = new MatrixViewer(input);
        inputViewer.SetMatrixSize(size, size);
		outputViewer = new MatrixViewer(output);
		outputViewer.SetMatrixSize(size, size);
    }

    function onChangeSize() {
        var size = getMatrixSizeValue();
        inputViewer.SetMatrixSize(size, size);
		outputViewer.SetMatrixSize(size, size);
    }

    function powIt() {
        var size = getMatrixSizeValue();
        var matrixCalc = new MatrixCalculator(size);
         var power = getMatrixPowValue();
        var matrix = inputViewer.getInputMatrix();
        result = matrixCalc.PowMatrix(matrix, power);
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
    var powSlider;
    var inputViewer;
	var outputViewer;
	var changeFormatButton;
	var isNormalFormat = false;
	var result;
    initSliders();
    InitButtons();
    initViewer();

}, false);
