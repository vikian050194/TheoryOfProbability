function StatisticHelper2D(labels) {
    function InitLabels(self, labels) {
        self.labels = labels;

        self.labels.firstQuarter.count = 0;
        self.labels.secondQuarter.count = 0;
        self.labels.thirdQuarter.count = 0;
        self.labels.fourthQuarter.count = 0;
    }

    InitLabels(this, labels);
}

StatisticHelper2D.prototype.changeStatistic = function (point) {
    var x = point.x;
    var y = point.y;
    var z = point.z;
    if (x > 0) {
        if (y < 0) {
            this.labels.firstQuarter.count++;
            this.labels.firstQuarter.textContent = this.labels.firstQuarter.title + this.labels.firstQuarter.count;
        }
        else {
            this.labels.fourthQuarter.count++;
            this.labels.fourthQuarter.textContent = this.labels.fourthQuarter.title + this.labels.fourthQuarter.count;
        }
    }
    else {
        if (y < 0) {
            this.labels.secondQuarter.count++;
            this.labels.secondQuarter.textContent = this.labels.secondQuarter.title + this.labels.secondQuarter.count;
        }
        else {
            this.labels.thirdQuarter.count++;
            this.labels.thirdQuarter.textContent = this.labels.thirdQuarter.title + this.labels.thirdQuarter.count;
        }
    }
}


StatisticHelper2D.prototype.reset = function () {
    this.labels.firstQuarter.count = 0;
    this.labels.secondQuarter.count = 0;
    this.labels.thirdQuarter.count = 0;
    this.labels.fourthQuarter.count = 0;
    this.labels.firstQuarter.textContent = this.labels.firstQuarter.title + 0;
    this.labels.secondQuarter.textContent = this.labels.secondQuarter.title + 0;
    this.labels.thirdQuarter.textContent = this.labels.thirdQuarter.title + 0;
    this.labels.fourthQuarter.textContent = this.labels.fourthQuarter.title + 0;
}