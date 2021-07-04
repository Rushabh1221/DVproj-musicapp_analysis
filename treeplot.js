const svg = d3.select("svg");

const width = svg.attr("width");
const height = svg.attr("height");

const margin = { left: 40, top: 0, right: 150, bottom: 0}
const innerHeight = height - margin.top - margin.bottom;
const innerWidth = width - margin.left - margin.right;

const zoomG = svg.append('g')

const g = zoomG.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

const myTree = d3.tree()
    .size([innerHeight, innerWidth]);

svg.call(d3.zoom()
    .on("zoom", zoomed))

function zoomed({transform}) {
    zoomG.attr("transform", transform)
}

d3.json("treedata.json").then(
    (data) => {
        const root = d3.hierarchy(data);
        const links = myTree(root).links()
        
        g.selectAll("path")
            .data(links)
                .enter().append("path")
                    .attr("d", d3.linkHorizontal()
                        .x(d => d.y)
                        .y(d => d.x)
                    )
        
        g.selectAll("text")
            .data(root.descendants())
                .enter().append("text")
                    .attr("x", d => d.y)
                    .attr("y", d => d.x)
                    .attr("dy", '.32em')
                    .attr("font-size", d => 2.8 - d.depth + "em")
                    .text(d => d.data.data.id)
    }
)