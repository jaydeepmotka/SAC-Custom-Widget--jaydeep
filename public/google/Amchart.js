var getScriptPromisify = (src) => {
	return new Promise(resolve => {
		$.getScript(src, resolve)
	})
}

(function () {

	let template = document.createElement("template");
	template.innerHTML = ` 
			<div id="chart_div" style="width: 100%; height: 100%"></div>
		`;

	class GoogleGauge extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({ mode: "open" });
			this._shadowRoot.appendChild(template.content.cloneNode(true));

			this._root = this._shadowRoot.getElementById("chart_div");
		
			this._props = {};

			
		}

		async render() {

			await getScriptPromisify("https://cdn.amcharts.com/lib/4/core.js");
			await getScriptPromisify("https://cdn.amcharts.com/lib/4/charts.js");
			await getScriptPromisify("https://cdn.amcharts.com/lib/4/themes/animated.js");


			am4core.useTheme(am4themes_animated);

			// Create chart instance
			var chart = am4core.create(this._root, am4charts.XYChart);

			// Add data
			chart.data = [
				{
					"date": new Date(2018, 0, 1),
					"category": "1",
					"value": 10
				}, {
					"date": new Date(2018, 0, 2),
					"category": "2",
					"value": 15
				}, {
					"date": new Date(2018, 0, 3),
					"category": "3",
					"value": 50
				}, {
					"date": new Date(2018, 0, 4),
					"category": "4",
					"value": 97
				}, {
					"date": new Date(2018, 0, 5),
					"category": "5",
					"value": 17
				}, {
					"date": new Date(2018, 0, 6),
					"category": "6",
					"value": 27
				}, {
					"date": new Date(2018, 0, 7),
					"category": "7",
					"value": 100
				}, {
					"date": new Date(2018, 0, 8),
					"category": "8",
					"value": 10
				}, {
					"date": new Date(2018, 0, 9),
					"category": "9",
					"value": 12
				}, {
					"date": new Date(2018, 0, 10),
					"category": "10",
					"value": 22
				}, {
					"date": new Date(2018, 0, 11),
					"category": "11",
					"value": 45
				}, {
					"date": new Date(2018, 0, 12),
					"category": "12",
					"value": 10
				}, {
					"date": new Date(2018, 0, 13),
					"category": "13",
					"value": 37
				}, {
					"date": new Date(2018, 0, 14),
					"category": "14",
					"value": 50
				}, {
					"date": new Date(2018, 0, 15),
					"category": "15",
					"value": 90
				},
				{
					"date": new Date(2018, 0, 16),
					"category": "16",
					"value": 80
				}, {
					"date": new Date(2018, 0, 17),
					"category": "17",
					"value": 75
				}, {
					"date": new Date(2018, 0, 18),
					"category": "18",
					"value": 99
				}, {
					"date": new Date(2018, 0, 19),
					"category": "19",
					"value": 10
				}, {
					"date": new Date(2018, 0, 20),
					"category": "20",
					"value": 65
				}, {
					"date": new Date(2018, 0, 21),
					"category": "21",
					"value": 45
				}, {
					"date": new Date(2018, 0, 22),
					"category": "22",
					"value": 12
				}, {
					"date": new Date(2018, 0, 23),
					"category": "23",
					"value": 70
				}, {
					"date": new Date(2018, 0, 24),
					"category": "24",
					"value": 76
				}, {
					"date": new Date(2018, 0, 25),
					"category": "25",
					"value": 67
				}, {
					"date": new Date(2018, 0, 26),
					"category": "26",
					"value": 78
				}, {
					"date": new Date(2018, 0, 27),
					"category": "27",
					"value": 11
				}, {
					"date": new Date(2018, 0, 28),
					"category": "28",
					"value": 97
				}, {
					"date": new Date(2018, 0, 29),
					"category": "29",
					"value": 47
				}, {
					"date": new Date(2018, 0, 30),
					"category": "30",
					"value": 30
				},
			];

			// Create axes
			/* var dateAxis = chart.xAxes.push(new am4charts.DateAxis());
			dateAxis.hidden = true; */

			var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
			categoryAxis.dataFields.category = "category";
			categoryAxis.renderer.minGridDistance = 0;
			categoryAxis.renderer.grid.template.disabled = true;

			var valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
			valueAxis.calculateTotals = true;
			valueAxis.renderer.labels.template.adapter.add("text", function (text) {
				return text + "%";
			});

			// Create series
			var series = chart.series.push(new am4charts.LineSeries());
			series.dataFields.valueY = "value";
			series.dataFields.categoryX = "category";
			series.tooltipText = "{date}: [b]{valueY}[/]%";
			series.strokeWidth = 2;

			// Finish up setting chart up
			chart.cursor = new am4charts.XYCursor();
			


		}
	}
	customElements.define("com-sap-sample-chart", GoogleGauge);

})();