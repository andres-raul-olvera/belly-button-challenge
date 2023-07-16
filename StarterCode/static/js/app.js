function info(id){
  d3.json("samples.json").then(function(data) {

    let metainfo = data.metadata;
    let test = metainfo.filter(value => value.id == id)[0];
    let display = d3.select("#sample-metadata"); 
    display.html('');
    Object.entries(test).forEach(([key, value]) => {display.append("h5").text(`${key}:${value}`);})
  })};
info(945);
function charts(id){
d3.json("samples.json").then(function(data) {
 
  // Samples
  let samples = data.samples
  let test = samples.filter(value => value.id == id)
  let flattest = test[0]
  let otu_ids = flattest.otu_ids.slice(0,10).reverse()
  let sample_values = flattest.sample_values.slice(0,10).reverse()
  let otu_labels = flattest. otu_labels.slice(0,10).reverse()


 
 
  let trace1 = {
    x: sample_values,
    y: otu_ids.map(object => 'OTU ' + object),
    text: otu_labels,
    type: "bar",
    orientation: "h"
  };
  
  // Data trace array
  let traceData = [trace1];
  // Apply the group barmode to the layout
  let layout = {
  title: "Belly Button"
  };
  // Render the plot to the div tag with id "plot"
  Plotly.newPlot("bar", traceData, layout);
  

  let trace2 = {
    x: flattest.otu_ids,
    y: flattest.sample_values,
    mode: 'markers',
    marker: {
      size: flattest.sample_values,
      color: flattest.otu_ids,
  },
    text: flattest.otu_labels
  };
  let bubbleData = [trace2];
  Plotly.newPlot('bubble', bubbleData)
  });
}

//selection change
function optionChanged(id){
  charts(id);
  info(id)};

//initalize and drop down menu
function init(){
  d3.json("samples.json").then(function(data) {
    let dropdown = d3.select("#selDataset")
    let names = data.names;
    for(let i = 0; i < names.length; i++){
      dropdown.append("option").text(names[i]).property("value", names[i]);
    }

charts(names[0]);
info(names[0])
  });


}

init();