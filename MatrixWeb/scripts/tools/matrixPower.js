function MatrixCalculator(size) {
    this.size = size;
    this.matrix = [];
    for (var i = 0; i < this.size; i++) {
        this.matrix[i] = [];
        for (var j = 0; j < this.size; j++) {
            this.matrix[i][j] = 0;
        }
    }
}

MatrixCalculator.prototype.InitMatrix = function (val) {
    var matrix = [];
    for (var i = 0; i < this.size; ++i) {
        matrix[i] = [];
        for (var j = 0; j < this.size; ++j) {
            matrix[i][j] = val;
        }
    }
    return matrix;
}

MatrixCalculator.prototype.SetDiag = function (matrix, val) {
    for (var j = 0; j < this.size; ++j) {
        matrix[j][j] = val;  
    }
	 return matrix;
}

MatrixCalculator.prototype.Multiply = function (matrix1, matrix2) {
    var fractionCalculator = new FractionsCalculator();
    var result = this.InitMatrix('0');

    for (var row = 0; row < matrix1.length; ++row) {
        for (var col = 0; col < matrix2[row].length; ++col) {
            for (var inner = 0; inner < matrix1[row].length; ++inner) {
                var val = fractionCalculator.Multiply(matrix1[row][inner], matrix2[inner][col]);
                result[row][col] = fractionCalculator.Sum(result[row][col], val);
            }
        }
    }
    return result;
}

MatrixCalculator.prototype.PowMatrix = function (matrix, power) {
    var result = this.InitMatrix('0');
    result = this.SetDiag(result, '1');
    while (power != 0) {
        if (power % 2 != 0) {
            result = this.Multiply(result, matrix);
            power -= 1;
        }
        matrix = this.Multiply(matrix, matrix);
        power /= 2;
    }
    return result;

}

MatrixCalculator.prototype.TransMatrix = function(A) {
    var rowCount = A.length;
    var columnCount = A[0].length;
    var AT = [];
    for (var i = 0; i < columnCount; ++i) {
        AT[i] = [];
        for (var j = 0; j < rowCount; j++) {
            AT[i][j] = A[j][i];
        }
    }
    return AT;
}

MatrixCalculator.prototype.SubstractMatrix = function(A, B) {
    var rowCount = A.length;
    var columnCount = A[0].length;
    var result = [];
	 var fractionCalculator = new FractionsCalculator();
    for (var i = 0; i < rowCount; ++i) {
        result[i] = [];
        for (var j = 0; j < columnCount; ++j) {
            result[i][j] = fractionCalculator.Substract(A[i][j], B[i][j]);
        }
    }
    return result;
}

MatrixCalculator.prototype.SolveGauss = function(A) {
    // Search for maximum in this column
    function FindMaxInColunm(A, n) {
        var calculator = new FractionsCalculator();
        var maxEl = calculator.Abs(A[i][i]);
        var maxRow = i;

        for (var k = i + 1; k < n; ++k) {
            if (calculator.Abs(A[k][i]) > maxEl) {
                maxEl = calculator.Abs(A[k][i]);
                maxRow = k;
            }
        }
        return maxRow;
    }

    // Swap maximum row with current row (column by column)
    function SwapRow(A, maxRow, i, n) {
        for (var k = i; k < n; ++k) {
            var tmp = A[maxRow][k];
            A[maxRow][k] = A[i][k];
            A[i][k] = tmp;
        }
    }

    // Make all rows below this one 0 in current column
    function SubstractColumn(A, i, n) {
        var calculator = new FractionsCalculator();
        for (k = i + 1; k < n; ++k) {
            //var c = -A[k][i] / A[i][i];
            var c = calculator.Invert(calculator.Divide(A[k][i], A[i][i]));
            for (var j = i; j < n; ++j) {
                if (i == j) {
                    A[k][j] = '0';
                } else {
                    // A[k][j] += c * A[i][j];
                    A[k][j] = calculator.Sum(A[k][j], calculator.Multiply(c, A[i][j]));
                }
            }
        }
    }

    // Solve equation Ax=b for an upper triangular matrix A
    function GetSolveTriangularMatrix(A, n) {
        var calculator = new FractionsCalculator();
        var result = [];
		result[0] = [];
        for (var i = n - 1; i > -1; --i) {
            result[0][i] = calculator.Divide(A[i][n], A[i][i]);
            for (var k = i - 1; k > -1; --k) {
                // A[k][n] -= A[k][i] * x[i];
                A[k][n] = calculator.Substract(A[k][n], calculator.Multiply(A[k][i], result[0][i]));
            }
        }

        return result;
    }

    var n = A.length;

    for (var i = 0; i < n; ++i) {
        var maxRow = FindMaxInColunm(A, n);
        SwapRow(A, maxRow, i, n);
        SubstractColumn(A, i, n)
    }

    return GetSolveTriangularMatrix(A, n - 1);
}

MatrixCalculator.prototype.AddSumOfProbability = function(A) {
    var len = A.length;
    A[len] = [];
    for (var i = 0; i < len; ++i) {
        A[i][len] = '0';
        A[len][i] = '1';
    }
    A[len][len] = '1';

    return A;
}

MatrixCalculator.prototype.FindStationaryDistribution = function(A) {
    var E = this.InitMatrix('0');
    E = this.SetDiag(E, '1');
    var result = this.SubstractMatrix(A, E);
    result = this.TransMatrix(result);
    result = this.AddSumOfProbability(result);
    result = this.SolveGauss(result,  result.length);

    return result;
}
