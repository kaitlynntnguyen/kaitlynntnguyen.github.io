const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

//promise pending
const dataPromise = d3.json(url);
console.log("Data Promise", dataPromise);

d3.json(url).then(funtion(data) {
    console.log(data);
}
);

//initialize dashboard
function innit() {
    let dropdown = d3.select("#selDataset");
    d3.json(url).then(function(data) {
        let sampleData = data;
        let names = sampleData.names;
        names.forEach((function(name) {
                dropdownMenu.append("option").text(name).property("value");
        });

        let sample1 = names[0];
        console.log(sample1);
    
        buildMetadata(sample1);
        buildMetachart(sample1);
        buildbubblechart(sample1);
    })
}

//populate metadata
function buildMetadata(value) {
    d3.json(url).then(function(data) {
        let sampleData = data;
        let metaData = sampleData.metaData;
        let valueData = metaData.filter(sample => sample.id.toString() === id)[0];
        d3.select ("#sample-metadata").html("");
        Object.entries(valueData).forEach(([key,value])=> {
            console.log (key,value);
            d3.select("#sample-metadata").append("h5").text('${key}': ${value}');
        });
    });
};

//build bar chart
function buildbarchart(value) {
    d3.json(url).then(function(data) {
        let sampleData = data.samples
        let valueData = sampleData.filter(sample => sample.id === id)[0];
        let otu_ids = valueData.otu_ids;
        let otu_labels = valueData.otu_lables;
        let sample_values = valueData.sample_values;

        var barData = {
            x: sample_values.slice(0, 10).reverse(),,
            y: yticks,
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar"
            orientation: "h"
        };

        var barlayout = {
            title = 'Top 10 OTUs Present in Each Individual',
            x: ['Sample Values']
            y: ['OTU ID']
            type: 'bar'
        };
        
    });
    Plotly.newPlot("bar", barData, bubblelayout)
}

//build bubble chart
function buildbubblechart(value) {
    d3.json(url).then(function(data) {
        let sampleData = data.samples;
        let samples = sampleData = data.samples;
        let valueData = samples.filter(sample => sample.id === id)[0];

        let otu_ids = valueData.otu_ids
        let otu_labels = valueData.otu_lables
        let sample_values = valueData.sample_values

        var bubbleData = {
            x: otu_ids,
            y: sample_values,
            text: otu_labels,
            mode: "markers",
            marker: {
                size: sample_values,
                color: otu_ids,
            }
        };
        var bubblelayout = {
            title: "Bacteria Per Sample",
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
            yaxis: {title: "Sample Values"}
        };
    
        Plotly.newPlot("bubble", bubbleData ,bubblelayout);
    })

//update when changed
function optionchanged(value) {
    console.log(value);

    buildMetadata(value);
    buildbubblechart(value);
    buildbubblechart(value);
};

innit();
