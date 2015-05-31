function StatisticHelper3D(labels) {
    function InitLabels(self, labels) {
        self.labels = labels;
        self.labels.octantFirst.count = 0;
        self.labels.octantSecond.count = 0;
        self.labels.octantThird.count = 0;
        self.labels.octantFourth.count = 0;

        self.labels.octantFifth.count = 0;
        self.labels.octantSixth.count = 0;
        self.labels.octantSeventh.count = 0;
        self.labels.octantEighth.count = 0;
    }

    InitLabels(this, labels);
}

StatisticHelper3D.prototype.changeStatistic = function (point) {
    var x = point.x;
    var y = point.y;
    var z = point.z;
    if (x >= 0) {
        if (y >= 0 && z >= 0) {
            this.labels.octantFirst.count++;
            this.labels.octantFirst.textContent = this.labels.octantFirst.title + this.labels.octantFirst.count;
        }
        else if (y >= 0 && z < 0) {
            this.labels.octantFifth.count++;
            this.labels.octantFifth.textContent = this.labels.octantFifth.title + this.labels.octantFifth.count;
        }
        else if (y < 0 && z >= 0) {
            this.labels.octantFourth.count++;
            this.labels.octantFourth.textContent = this.labels.octantFourth.title + this.labels.octantFourth.count;
        }
        else if (y < 0 && z < 0) {
            this.labels.octantEighth.count++;
            this.labels.octantEighth.textContent = this.labels.octantEighth.title + this.labels.octantEighth.count;
        }
    }
    else {
        if (y >= 0 && z >= 0) {
            this.labels.octantSecond.count++;
            this.labels.octantSecond.textContent = this.labels.octantSecond.title + this.labels.octantSecond.count;
        }
        else if (y >= 0 && z < 0) {
            this.labels.octantSixth.count++;
            this.labels.octantSixth.textContent = this.labels.octantSixth.title + this.labels.octantSixth.count;
        }
        else if (y < 0 && z >= 0) {
            this.labels.octantThird.count++;
            this.labels.octantThird.textContent = this.labels.octantThird.title + this.labels.octantThird.count;
        }
        else if (y < 0 && z < 0) {
            this.labels.octantSeventh.count++;
            this.labels.octantSeventh.textContent = this.labels.octantSeventh.title + this.labels.octantSeventh.count;
        }
    }
}


StatisticHelper3D.prototype.reset = function () {
    this.labels.octantFirst.count = 0;
    this.labels.octantFirst.textContent = this.labels.octantFirst.title + 0;
    this.labels.octantFifth.count = 0;
    this.labels.octantFifth.textContent = this.labels.octantFifth.title + 0;
    this.labels.octantFourth.count = 0;
    this.labels.octantFourth.textContent = this.labels.octantFourth.title + 0;
    this.labels.octantEighth.count = 0;
    this.labels.octantEighth.textContent = this.labels.octantEighth.title + 0;
    this.labels.octantSecond.count = 0;
    this.labels.octantSecond.textContent = this.labels.octantSecond.title + 0;
    this.labels.octantSixth.count = 0;
    this.labels.octantSixth.textContent = this.labels.octantSixth.title + 0;
    this.labels.octantThird.count = 0;
    this.labels.octantThird.textContent = this.labels.octantThird.title + 0;
    this.labels.octantSeventh.count = 0;
    this.labels.octantSeventh.textContent = this.labels.octantSeventh.title + 0;
}