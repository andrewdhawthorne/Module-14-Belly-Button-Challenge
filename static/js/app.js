// Place url in constant variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
    console.log(data);
  });

// Initialize dashboard 
function init() {

  // Use D3 to select dropdown menu
  let dropdownMenu = d3.select("#selDataset"); 

  // Use D3 to get sample names for dropdown menu
  d3.json(url).then((data) => {

    // Assign the value of the dropdown menu option to a variable
    let names = data.names; 

    // Iterate through the names array 
    names.forEach((id) => {

      // Console log the values of the ids  
      console.log(id); 

      // Append each value to each id and add as an option to the dropdown menu 
      dropdownMenu.append("option").text(id).property("value", id); 
    }); 

    // Pull first sample from list 
    let first_sample = names[0]; 

    // Console log the first sample 
    console.log(first_sample); 

   // Call the functions to create the demographic panel, the bar chart, the bubble chart, and the washing gauge 
   Metadata(first_sample);
   hBarChart(first_sample);
   BubbleChart(first_sample);
   GaugeChart(first_sample);
  
  }); 

}; 

// Create the demographic information display using the sample metadata 
function Metadata(selectedValue) {

  // Use D3 to pull all data 
  d3.json(url).then((data) => {

    // Pull metadata which contains the demographic information
    let metadata = data.metadata; 

    // Filter the metadata based on the selected value 
    let filteredData = metadata.filter(result => result.id == selectedValue); 

    
  })
}








init(); 

