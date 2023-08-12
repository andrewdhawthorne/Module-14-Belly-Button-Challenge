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
   hBarChart(first_sample);
   BubbleChart(first_sample);
   Metadata(first_sample);
   GaugeChart(first_sample);
  
  }); 

}; 

// Create the bar chart 
function hBarChart(selectedValue) { 

  // Use D3 to pull all data 
  d3.json(url).then((data) => {

    // Pull an array of samples 
    var samples = data.samples; 

    // Filter the samples based on the selected value 
    var filteredData = samples.filter((sample) => sample.id == selectedValue); 

    // Pull sample to plot 
    var individual = filteredData[0]; 

    // Slice the first 10 objects of the sample for plotting 
    slicedIndividual = individual.slice(0, 10);

    // Reverse the array to accomodate Plotly's defaults 
    reversedIndividual = slicedIndividual.reverse(); 

    // Trace for the data to be plotted 
    var trace = {
      x: slicedIndividual.sample_values,
      y: slicedIndividual.otu_ids, 
      text: slicedIndividual.otu_labels,
      type: "bar",
      orientation: "h"
    };

    // Create data array 
    var traceData = [trace]; 

    // Add title to layout 
    var layout = {title: "Top 10 OTUs"}; 

    // Render the plot 
    Plotly.newplot("bar", traceData, layout); 
})}; 

// Create the demographic information display using the sample metadata 
//function Metadata(selectedValue) {

  // Use D3 to pull all data 
  //d3.json(url).then((data) => {

    // Pull metadata which contains the demographic information
    //let metadata = data.metadata; 

    // Filter the metadata based on the selected value 
    //let filteredData = metadata.filter(result => result.id == selectedValue); 


 // })
//}

init(); 