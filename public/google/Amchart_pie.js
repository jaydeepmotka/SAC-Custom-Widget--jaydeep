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

		async render(rs) {

			await getScriptPromisify("https://cdn.amcharts.com/lib/4/core.js");
			await getScriptPromisify("https://cdn.amcharts.com/lib/4/charts.js");
			await getScriptPromisify("https://cdn.amcharts.com/lib/4/themes/animated.js");
			await getScriptPromisify("https://cdn.amcharts.com/lib/4/themes/kelly.js");

      console.log(rs);




// Apply chart themes
am4core.useTheme(am4themes_animated);
am4core.useTheme(am4themes_kelly);

// Create chart instance
var chart = am4core.create(this._root, am4charts.XYChart);

// Add data
chart.data = [{
  "country": "Lithuania",
  "research": 501.9,
  "marketing": 250,
  "sales": 199
}, {
  "country": "Czech Republic",
  "research": 301.9,
  "marketing": 222,
  "sales": 251
}, {
  "country": "Ireland",
  "research": 201.1,
  "marketing": 170,
  "sales": 199
}, {
  "country": "Germany",
  "research": 165.8,
  "marketing": 122,
  "sales": 90
}, {
  "country": "Australia",
  "research": 139.9,
  "marketing": 99,
  "sales": 252
}, {
  "country": "Austria",
  "research": 128.3,
  "marketing": 85,
  "sales": 84
}, {
  "country": "UK",
  "research": 99,
  "marketing": 93,
  "sales": 142
}, {
  "country": "Belgium",
  "research": 60,
  "marketing": 50,
  "sales": 55
}, {
  "country": "The Netherlands",
  "research": 50,
  "marketing": 42,
  "sales": 25
}];

// Create axes
var categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
categoryAxis.dataFields.category = "country";
categoryAxis.title.text = "Local country offices";
categoryAxis.renderer.grid.template.location = 0;
categoryAxis.renderer.minGridDistance = 20;


var  valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
valueAxis.title.text = "Expenditure (%)";
valueAxis.calculateTotals = true;
valueAxis.min = 0;
valueAxis.max = 100;
valueAxis.strictMinMax = true;
valueAxis.renderer.labels.template.adapter.add("text", function(text) {
  return text + "%";
});

// Create series
var series = chart.series.push(new am4charts.ColumnSeries());
series.dataFields.valueY = "research";
series.dataFields.valueYShow = "totalPercent";
series.dataFields.categoryX = "country";
series.name = "Research";
series.tooltipText = "{name}: [bold]{valueY}[/]";
series.stacked = true;

var series2 = chart.series.push(new am4charts.ColumnSeries());
series2.dataFields.valueY = "marketing";
series2.dataFields.valueYShow = "totalPercent";
series2.dataFields.categoryX = "country";
series2.name = "Marketing";
series2.tooltipText = "{name}: [bold]{valueY}[/]";
series2.stacked = true;

var series3 = chart.series.push(new am4charts.ColumnSeries());
series3.dataFields.valueY = "sales";
series3.dataFields.valueYShow = "totalPercent";
series3.dataFields.categoryX = "country";
series3.name = "Sales";
series3.tooltipText = "{name}: [bold]{valueY}[/]";
series3.stacked = true;

// Add cursor
chart.cursor = new am4charts.XYCursor();

		}
	}
	customElements.define("com-sap-sample-chart", GoogleGauge);

})();