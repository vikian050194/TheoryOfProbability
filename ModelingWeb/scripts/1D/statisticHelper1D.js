function StatisticHelper1D(labels) {
    function InitLabels(self, labels) {
        self.labels = labels;

        self.labels.left.count = 0;
        self.labels.zero.count = 0;
        self.labels.right.count = 0;
        self.labels.min.count = 0;
        self.labels.max.count = 0;
    }

    InitLabels(this, labels);
}

StatisticHelper1D.prototype.changeStatistic = function (point) {
    var x = point;
    if (x > 0) {
        this.labels.right.count++;
        this.labels.right.textContent = this.labels.right.title + this.labels.right.count;
    }
    if (x > this.labels.max.count) {
        this.labels.max.count = x;
        this.labels.max.textContent = this.labels.max.title + this.labels.max.count;
    }
    if (x === 0) {
        this.labels.zero.count++;
        this.labels.zero.textContent = this.labels.zero.title + this.labels.zero.count;
    }
    if (x < 0) {
        this.labels.left.count++;
        this.labels.left.textContent = this.labels.left.title + this.labels.left.count;
    }
    if (x < this.labels.min.count) {
        this.labels.min.count = x;
        this.labels.min.textContent = this.labels.min.title + this.labels.min.count;
    }
}


StatisticHelper1D.prototype.reset = function () {
    this.labels.left.count = 0;
    this.labels.zero.count = 0;
    this.labels.right.count = 0;
    this.labels.min.count = 0;
    this.labels.max.count = 0;
    this.labels.left.textContent = this.labels.left.title + 0;
    this.labels.zero.textContent = this.labels.zero.title + 0;
    this.labels.right.textContent = this.labels.right.title + 0;
    this.labels.min.textContent = this.labels.min.title + 0;
    this.labels.max.textContent = this.labels.max.title + 0;
}