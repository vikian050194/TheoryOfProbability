function Fraction(numerator, denominator) {
    if (denominator < 0) {
        numerator = -numerator;
        denominator = -denominator;
    }

    this.m = numerator;
    this.n = denominator;
}

Fraction.prototype.FromString = function (str) {
    //формат a/b
    if (!(~String(str).indexOf("/"))) //НЕТ ЧЕРТОЧКИ
    {
        this.m = +str;
        this.n = 1;
        return;
    }

    var startIndex = str[0] === '-' ? 1 : 0;
    var divIndex = str.indexOf("/");

    if (divIndex == -1) {
        this.m = +str;
        this.n = 1;
        return;
    }

    var numerator = +str.substr(startIndex, divIndex - startIndex);
    var denominator = +str.substr(divIndex + 1, str.length - divIndex);

    var gcdNum = this.GCD(numerator, denominator);
    this.m = numerator / gcdNum;
    this.n = denominator / gcdNum;

    if (str[0] == '-') {
        this.m = -this.m;
    }
};

Fraction.prototype.GCD = function (a, b) {
    if (a < 0)
        a = -a;

    if (b < 0)
        b = -b;

    while (a * b !== 0) {
        if (a >= b)
            a %= b;
        else
            b %= a;
    }

    return (a + b);
};

Fraction.prototype.Reduce = function () {
    var gcdNum = this.GCD(this.m, this.n);
    this.m /= gcdNum;
    this.n /= gcdNum;

    //TODO Не лишнее?
    if (this.n < 0) {
        this.n = -this.n;
        this.m = -this.m;
    }
};

/**
 * @return {string}
 */
Fraction.prototype.ToString = function () {
    if (this.n === 1) {
        return this.m.toString();
    }

    return (this.m + "/" + this.n);
};

function FractionsCalculator() {

}

FractionsCalculator.prototype.Power = function (x, y) {
    var result = new Fraction(1, 1);
    var fractionA = new Fraction(1, 1);
    fractionA.FromString(x);

    for (var i = 0; i < y; ++i) {
        result.m *= fractionA.m;
        result.n *= fractionA.n;
    }

    result.Reduce();

    return result.ToString();
};

FractionsCalculator.prototype.Sum = function (a, b) {
    var fractionA = new Fraction(1, 1);
    var fractionB = new Fraction(1, 1);
    var result = new Fraction(1, 1);

    fractionA.FromString(a);
    fractionB.FromString(b);

    result.m = (fractionA.m * fractionB.n + fractionA.n * fractionB.m);
    result.n = fractionA.n * fractionB.n;
    result.Reduce();

    return result.ToString();
};

FractionsCalculator.prototype.Substract = function (a, b) {
    var fractionA = new Fraction(1, 1);
    var fractionB = new Fraction(1, 1);
    var result = new Fraction(1, 1);

    fractionA.FromString(a);
    fractionB.FromString(b);

    result.m = (fractionA.m * fractionB.n - fractionA.n * fractionB.m);
    result.n = fractionA.n * fractionB.n;
    result.Reduce();

    return result.ToString();
};

FractionsCalculator.prototype.Multiply = function (a, b) {
    var fractionA = new Fraction(1, 1);
    var fractionB = new Fraction(1, 1);
    var result = new Fraction(1, 1);

    fractionA.FromString(a);
    fractionB.FromString(b);

    result.m = (fractionA.m * fractionB.m);
    result.n = fractionA.n * fractionB.n;
    result.Reduce();

    return result.ToString();
};

FractionsCalculator.prototype.Divide = function (dividend, divider) {
    var fractionA = new Fraction(1, 1);
    var fractionB = new Fraction(1, 1);
    var result = new Fraction(1, 1);

    fractionA.FromString(dividend);
    fractionB.FromString(divider);

    result.m = (fractionA.m * fractionB.n);
    result.n = fractionA.n * fractionB.m;
    result.Reduce();

    return result.ToString();
};

FractionsCalculator.prototype.FindInverse = function (fraction) {
    var fractionA = new Fraction(1, 1);
    fractionA.FromString(fraction);

    var result = new Fraction(1, 1);

    result.m = fractionA.n;
    result.n = fractionA.m;
    result.Reduce();

    return result.ToString();
};
/**
 * @return {number}
 */
FractionsCalculator.prototype.Compare = function (a, b) {
    var fractionA = new Fraction(1, 1);
    var fractionB = new Fraction(1, 1);

    fractionA.FromString(a);
    fractionB.FromString(b);

    if (fractionA.m * fractionB.n == fractionA.n * fractionB.m)
        return 0;
    else if (fractionA.m * fractionB.n > fractionA.n * fractionB.m)
        return 1;
    else
        return -1;
};

FractionsCalculator.prototype.Abs = function(fraction)
{
var fractionA = new Fraction(1, 1);

var result = new Fraction(1, 1);

fractionA.FromString(fraction);

result.m = Math.abs(fractionA.m);
result.n = Math.abs(fractionA.n);
result.Reduce();

return result.ToString();
};

FractionsCalculator.prototype.Invert = function(fraction)
{
var fractionA = new Fraction(1, 1);

var result = new Fraction(1, 1);

fractionA.FromString(fraction);

result.m = -fractionA.m;
result.n = fractionA.n;
result.Reduce();

return result.ToString();
}