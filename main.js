var input = function () {

	var values = {
    	message: input.getElement('message'),
    	randomMessageCheck: input.getElement('randomMessageCheck'),
    	date: input.getElement('date'),
    	time: input.getElement('time')
    };

    var getElement = function (elementId) {
        return document.getElementById(elementId);
    };

};
