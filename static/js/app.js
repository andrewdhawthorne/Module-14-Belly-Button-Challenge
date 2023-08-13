// Place url in constant variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

// Initialize dashboard 
function init() {

  // Use D3 to select dropdown menu
  var dropdownMenu = d3.select("#selDataset"); 

  // Use D3 to get sample names for dropdown menu
  d3.json(url).then((data) => {

    // Pull array of id names 
    var names = data.names; 

    // Iterate through the names array 
    names.forEach((id) => {

      // Console log the values of the ids  
      console.log(id); 

      // Append each value to each id and add as an option to the dropdown menu 
      dropdownMenu.append("option").text(id).property("value", id); 
    }); 

    // Pull first sample from list 
    var first_sample = names[0]; 

    // Console log the first sample 
    console.log(first_sample); 

   // Call the functions to create the bar chart, the bubble chart, the demographics panel, and the washing gauge 
   Metadata(first_sample);
   hBarChart(first_sample);
   BubbleChart(first_sample);
   //GaugeChart(first_sample);
  
  }); 

}; 

// Create the demographic information display using the sample metadata 
function Metadata(selectedValue) {

  // Use D3 to pull all data 
  d3.json(url).then((data) => {

    // Pull array of metadata containing demographic information
    var metadata = data.metadata; 

    // Filter the metadata based on the selected value 
    var filteredData = metadata.filter(result => result.id == selectedValue); 

    // Pull first object from array and assign to variable 
    var meta = filteredData[0];

    // Console log the first object of metadata 
    console.log(meta)

    // Clear child elements (erase innerHTML to an empty string) from DOM node when user resets selection 
    d3.select("#sample-metadata").html("");

    // Use Javascript method Object.entries to return array consisting of enumberable propery, 
    // aka key/value pairs = same function as looping over the property values of the object 
    Object.entries(meta).forEach(([key,value]) => {

      // Console log the individual key/value pairs
      console.log(key, value); 

      // Append the key/value pairs to the metadata array 
      d3.select("#sample-metadata").append("h5").text(`${key}: ${value}`);
    });
  });  
};

// Create the bar chart 
function hBarChart(selectedValue) { 

  // Use D3 to pull all data 
  d3.json(url).then((data) => {

    // Pull array of samples 
    var samples = data.samples; 

    // Filter the samples based on the selected value 
    var filteredSamples = samples.filter((sample) => sample.id == selectedValue); 

    // Pull sample to plot 
    var individual = filteredSamples[0]; 

    // Slice the first 10 objects of the sample for plotting 
    //slicedIndividual = individual.slice(0, 10).reverse();

    // Reverse the array to accomodate Plotly's defaults 
    //reversedIndividual = slicedIndividual.reverse(); 

    // Trace for the data for the horizontal bar chart
    //let trace = {
      //x: reversedIndividual.sample_values,
      //y: reversedIndividual.otu_ids,//.map((otu_id) => `OTU ${otu_id}`),
      //text: reversedIndividual.otu_labels,
      //type: "bar",
      //marker: {
          //color: "rgb(166,172,237)"
      //},
      //orientation: "h"
    //};
  
    // Trace for the data for the horizontal bar chart
    let trace = [{
      // Slice the first 10 objects of the sample for plotting and reverse the array to accomodate Plotly's defaults 
      x: individual.sample_values.slice(0,10).reverse(),
      y: individual.otu_ids.slice(0,10).map((otu_id) => `OTU ${otu_id}`).reverse(),
      text: individual.otu_labels.slice(0,10).reverse(),
      type: "bar",
      //marker: {
          //color: "rgb(166,172,237)"
      //},
      orientation: "h"
    }];

    // Create data array 
    //var traceData = [trace];

    // Add title to layout 
    var layout = {title: "Top 10 OTUs (Operational Taxonomic Units)"}; 

    // Use Plotly to plot the data in a bar chart
    Plotly.newPlot("bar", trace, layout);
    });
};

// Slice the first 10 objects of the sample for plotting 
    //slicedIndividual = individual.slice(0, 10);

    // Reverse the array to accomodate Plotly's defaults 
   //reversedIndividual = slicedIndividual.reverse(); 

    // Trace for the data to be plotted 
    //var trace = [{
      //x: individual.sample_values,
      //y: individual.otu_ids,
      //text: obj.otu_labels,
      //type: "bar",
      //orientation: "h"
    //}];

    // Create data array 
    //var traceData = [trace]; 

    // Add title to layout 
    //var layout = {title: "Top 10 OTUs"}; 

    // Render the plot 
    //Plotly.newplot("bar", traceData, layout); 
//})}; 

// Creat the bubble chart 
function BubbleChart(selectedValue) {

  // Use D3 to pull all data 
  d3.json(url).then((data) => {

    // Pull array of samples 
    var samples = data.samples; 

    // Filter the samples based on the selected value 
    var filteredSamples = samples.filter((sample) => sample.id == selectedValue); 

    // Pull sample to chart  
    var individual = filteredSamples[0]; 

    // Trace for the data for the bubble chart
    let trace = [{
      x: individual.otu_ids,
      y: individual.sample_values,
      text: individual.otu_labels,
      mode: "markers", 
      marker: {
          size: individual.sample_values,
          color: individual.otu_ids//,
          //colorscale: "prgn"
      }
    }];

    // Add title to x axis 
    var layout = {
      xaxis: {title: "OTU ID"}
    }; 

  // Use Plotly to plot the data in a bubble chart
  Plotly.newPlot("bubble", trace, layout);
});
};

init();