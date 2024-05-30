//FeatureCollection different regions of Pakistan.
var regions = ee.FeatureCollection([
  Islamabad,
  Lahore,
  Swat
]);

// Landsat 8 brightness temperature data for 3 year.
var temperature_5years = ee.ImageCollection('LANDSAT/LC08/C01/T1_32DAY_TOA')
    .filterDate('2019-12-25', '2022-12-01')
    .select('B11');
// Converting Kelvin Temperature to Celcius
var tempcelcius = temperature_5years.map(function(img) {
  return img
    .subtract(273.15)
    .copyProperties(img, ['system:time_start']);
});

// Create a time series chart.
var tempTimeSeries = ui.Chart.image.seriesByRegion(
    tempcelcius, regions, ee.Reducer.mean(), 'B11', 200, 'system:time_start', 'label')
        .setChartType('ScatterChart')
        .setOptions({
          title: 'Temperature over time in different cities of Pakistan',
          vAxis: {title: 'Temperature (Celsius)'},
          hAxis: {title: 'Year-Month'},
          lineWidth: 2,
          pointSize: 4,
          series: {
            0: {color: 'EA0D68'}, // Pink
            1: {color: '0DF3B1'}, // light green
            2: {color: '053ADE'}  // Dark blue
}});

// Display.
print(tempTimeSeries);