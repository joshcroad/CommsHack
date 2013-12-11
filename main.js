(function () {

	var randomMessage = function () {
		if (isChecked) {
			return console.log('hello');
		}
	};

	var submit = function () {
		randomMessage()
	};

	var checkBox,
		isChecked = false;

	var loaded = function () {
		checkBox = document.getElementById('randomMessageCheck');
		checkBox.addEventListener('click', function (e) {
			isChecked = checkBox.checked ? true : false;
		}, false);

		submitBtn = document.getElementById('submit');
		submitBtn.addEventListener('click', function (e) {
			submit();
		}, false);
	};

	window.addEventListener('load', loaded, false);

}());
