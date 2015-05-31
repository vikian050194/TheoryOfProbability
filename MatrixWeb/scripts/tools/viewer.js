function MatrixViewer(input) {
    this.input = input;
    this.columnCount = 3;
	this.rowCount = 3;
    this.matrix = null;
    this.table = null;
}

MatrixViewer.prototype.CreateMatrix = function (input) {
    this.matrix = [];
    this.table = document.createElement("table");
    this.table.setAttribute('align', 'center');
    for (var i = 0; i < this.rowCount; ++i) {
        var row = this.table.insertRow(i);
        this.matrix[i] = [];
        for (var j = 0; j < this.columnCount; ++j) {
            var cell = row.insertCell(j);
            var elem = document.createElement('input');
            elem.setAttribute('type', 'text');
            elem.setAttribute('class', 'form-control');
            this.matrix[i][j] = elem;

            cell.appendChild(this.matrix[i][j]);
        }
    }
    input.appendChild(this.table);
}

MatrixViewer.prototype.ClearInput = function () {
    if (this.table === null)
        return;
    this.table.innerHTML = "";
}

MatrixViewer.prototype.SetMatrixSize = function (columnCount, rowCount) {

    this.columnCount = columnCount;
	this.rowCount = rowCount
    this.ClearInput();
    this.CreateMatrix(this.input);
}

MatrixViewer.prototype.getInputMatrix = function () {

    var result = [];
    for (var i = 0; i <  this.rowCount; ++i) {
        result[i] = [];
        for (var j = 0; j < this.columnCount; ++j) {
            result[i][j] = this.matrix[i][j].value;
        }
    }

    return result;
}

MatrixViewer.prototype.setResult = function (matrix, isNormalFormat) {

    for (var i = 0; i < this.rowCount; ++i) {
        for (var j = 0; j < this.columnCount; ++j) {
			if(!isNormalFormat){
				this.matrix[i][j].value = matrix[i][j];
				this.matrix[i][j].title = matrix[i][j];
			}
			else{
				var temp = new Fraction();
				temp.FromString(matrix[i][j]);
				var val = temp.m / temp.n;
				this.matrix[i][j].value =val.toFixed(3);
				this.matrix[i][j].title = val.toFixed(3);
			}
		
        }
    }
}

MatrixViewer.prototype.fillByZero = function () {

    for (var i = 0; i < this.rowCount; ++i) {
        for (var j = 0; j < this.columnCount; ++j) {
			if(!this.matrix[i][j].value)	{
				this.matrix[i][j].value = '0';
				this.matrix[i][j].title = '0';
			}
			// this.matrix[i][j].setAttribute('disabled', 'disabled');
        }
    }
}
