//Bar Chart
const svg = d3.select("svg");

// Height and Width of the svg
const width = svg.attr("width");
const height = svg.attr("height");

// Render funtion(function that makes rectangle for each row)
const render = data => {
    const xValue = d => d.MusicApp;
    const yValue = d => d.Users;
    const margin  = {top: 40, left: 110, bottom: 60, right: 30};
    const innerwidth = width - margin.left - margin.right;
    const innerheight = height - margin.top - margin.bottom; 

    const xScale = d3.scaleLinear()
        .domain([0, d3.max(data, yValue)])
        .range([0, innerwidth]);

    const yScale = d3.scaleBand()
        .domain(data.map(xValue))
        .range([0, innerheight])
        .padding(0.1);
    
    const g = svg  
        .append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)

    const xAxis = d3.axisBottom(xScale).tickFormat(number => d3.format(".3s")(number).replace("G", "B")).tickSize(-innerheight + 4)

    g.append("g")
        .call(d3.axisLeft(yScale))
        .selectAll(".domain, .tick line")
            .remove()

    const xAxisG = g.append("g").call(xAxis)
        .attr("transform", `translate(0, ${innerheight})`);
        
    xAxisG.select(".domain").remove()
        
    xAxisG.append("text")
            .attr("class", "txt")
            .attr("x", innerwidth/2)
            .attr("y", 45)
            .attr("fill", "black")
            .text("Users in millions(M)")

    const newG = g.append("g")
        
    newG.append("text")
        .text("Top 5 music app with users.")
        .attr("transform", "translate(250, 0)")
    
    g.selectAll("rect").data(data)
        .enter().append("rect")
            .attr("y", d => yScale(xValue(d)))
            .attr("width", d => xScale(yValue(d)))
            .attr("height", yScale.bandwidth())
};

// csv is a method used to load csv files it returns promise so you can use then
d3.csv("data4bar.csv")
    .then(data => { data.forEach(element => {
        element.Users = parseInt(element.Users);
    });
        render(data)
    });

// d3 has a nice number formatting module known as foramt.js
