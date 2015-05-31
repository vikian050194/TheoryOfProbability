function onload() {
    var target = document.getElementById("mainPlaceHolder");
	var template = new EJS({url: 'main.ejs'})
var html = new EJS({url: 'main.ejs'}).render(null);
	target.html(html);
}