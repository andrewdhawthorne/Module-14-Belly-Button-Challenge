// Place url in constant variable 
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

// Fetch the JSON data and log it
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

    // Add samples to dropdown menu 
    names.forEach((id) => {

      // Log the values of each id 
      console.log(id); 

      // Append each value to each id 
      dropdownMenu.append("option")
      .text(id)
      .property("value", id); 
    }); 

    // Pull first sample from list 
    let first_sample = names[0]; 

    // Log the 
    console.log(first_sample); 

   // Build the initial plots
   buildMetadata(first_sample);
   buildhBarChart(first_sample);
   buildBubbleChart(first_sample);
   buildGaugeChart(first_sample);
  
  }); 

}; 

init(); 

