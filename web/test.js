
const barChartData = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [{
		label: 'Dataset 1',
		backgroundColor: Chart.helpers.color(window.chartColors.red).alpha(0.5).rgbString(),
		borderColor: window.chartColors.red,
		borderWidth: 1,
		data: [
			25,
			30,
			70,
			50,
			40,
			55,
			65
		]
	}, {
		label: 'Dataset 2',
		backgroundColor: Chart.helpers.color(window.chartColors.blue).alpha(0.5).rgbString(),
		borderColor: window.chartColors.blue,
		borderWidth: 1,
		data: [
			30,
			25,
			50,
			NaN,
			65,
			55,
			40
		]
	}]
};
window.onload = function() {
	var ctx = document.getElementById('canvas').getContext('2d');
	window.myBar = new Chart(ctx, );
};

