// Main initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize tab functionality
    initTabs();
    
    // Initialize PSI data
    fetchPSIData();
    
    // Initialize stick figure interactivity
    initStickFigure();
    
    // Initialize model performance dashboard if it's the active tab
    if (document.querySelector('.tab[data-tab="model-performance"]').classList.contains('active')) {
        setTimeout(() => {
            initModelPerformanceDashboard();
        }, 100);
    }
});

// Tab functionality
function initTabs() {
    const tabs = document.querySelectorAll('.tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabId = tab.getAttribute('data-tab');
            
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            document.getElementById(tabId).classList.add('active');
            
            // Initialize model performance dashboard if it's the active tab
            if (tabId === 'model-performance') {
                setTimeout(() => {
                    initModelPerformanceDashboard();
                }, 100);
            }
        });
    });
}

// PSI Data Fetching Function
async function fetchPSIData() {
    try {
        // Mock data for demonstration
        const mockData = {
            items: [{
                update_timestamp: "2023-10-15T12:00:00+08:00",
                readings: {
                    "o3_sub_index": {central: 12, west: 10, east: 14, north: 11, south: 13, national: 12},
                    "pm10_twenty_four_hourly": {central: 32, west: 28, east: 35, north: 30, south: 33, national: 31},
                    "pm10_sub_index": {central: 32, west: 28, east: 35, north: 30, south: 33, national: 31},
                    "co_sub_index": {central: 6, west: 5, east: 7, north: 6, south: 6, national: 6},
                    "pm25_twenty_four_hourly": {central: 18, west: 16, east: 20, north: 17, south: 19, national: 18},
                    "so2_sub_index": {central: 4, west: 3, east: 5, north: 4, south: 4, national: 4},
                    "co_eight_hour_max": {central: 0.6, west: 0.5, east: 0.7, north: 0.6, south: 0.6, national: 0.6},
                    "no2_one_hour_max": {central: 24, west: 22, east: 26, north: 23, south: 25, national: 24},
                    "so2_twenty_four_hourly": {central: 4, west: 3, east: 5, north: 4, south: 4, national: 4},
                    "pm25_sub_index": {central: 18, west: 16, east: 20, north: 17, south: 19, national: 18},
                    "psi_twenty_four_hourly": {central: 32, west: 28, east: 35, north: 30, south: 33, national: 31}
                }
            }]
        };

        const data = mockData;
        const readings = data.items[0].readings;
        const psiTable = document.getElementById("PSItable");

        for (const metric in readings) {
            const row = document.createElement("tr");

            const cellMetric = document.createElement("td");
            cellMetric.textContent = formatMetricName(metric);
            row.appendChild(cellMetric);

            ["central", "west", "east", "north", "south", "national"].forEach(region => {
                const cell = document.createElement("td");
                cell.textContent = readings[metric][region] ?? "-";
                row.appendChild(cell);
            });

            psiTable.appendChild(row);
        }
    } catch (error) {
        console.error("Error fetching PSI data:", error);
        document.getElementById("timestring").textContent = "Failed to load PSI data.";
    }
}

// Helper function to format metric names
function formatMetricName(metric) {
    return metric
        .replace(/_/g, ' ')
        .replace(/\b\w/g, l => l.toUpperCase())
        .replace('Psi', 'PSI')
        .replace('Pm10', 'PM10')
        .replace('Pm25', 'PM2.5')
        .replace('So2', 'SO₂')
        .replace('No2', 'NO₂')
        .replace('Co', 'CO')
        .replace('O3', 'O₃');
}

// Add interactivity to stick figure
function initStickFigure() {
    const stickFigure = document.getElementById('stick-figure-container');
    if (stickFigure) {
        stickFigure.addEventListener('mouseover', function() {
            const svg = this.querySelector('svg');
            const arms = svg.querySelectorAll('line:nth-child(3), line:nth-child(4)');
            const legs = svg.querySelectorAll('line:nth-child(5), line:nth-child(6)');
            
            arms.forEach(arm => {
                arm.style.transform = 'rotate(10deg)';
                arm.style.transformOrigin = '250px 150px';
            });
            
            legs.forEach(leg => {
                leg.style.transform = 'rotate(5deg)';
                leg.style.transformOrigin = '250px 230px';
            });
        });
        
        stickFigure.addEventListener('mouseout', function() {
            const svg = this.querySelector('svg');
            const arms = svg.querySelectorAll('line:nth-child(3), line:nth-child(4)');
            const legs = svg.querySelectorAll('line:nth-child(5), line:nth-child(6)');
            
            arms.forEach(arm => {
                arm.style.transform = 'rotate(0deg)';
            });
            
            legs.forEach(leg => {
                leg.style.transform = 'rotate(0deg)';
            });
        });
    }
}

// Model Performance Dashboard
function initModelPerformanceDashboard() {
    // Data 1: Model Performance
    const data1 = [
        {Approach: "ERM", "Std Acc - CIFAR100": 81.03, "Std Acc - CIFAR10": 94.85, "Std Acc - SVHN": 94.44, "Std Acc - MNIST": 99.37, "CRR - CIFAR100": 9.28, "CRR - CIFAR10": 1.25, "CRR - SVHN": 52.72, "CRR - MNIST": 26.01, "CRA - CIFAR100": 4.52, "CRA - CIFAR10": 1.25, "CRA - SVHN": 51.04, "CRA - MNIST": 24.96},
        {Approach: "DA", "Std Acc - CIFAR100": 78.27, "Std Acc - CIFAR10": 94.21, "Std Acc - SVHN": 94.69, "Std Acc - MNIST": 99.42, "CRR - CIFAR100": 15.04, "CRR - CIFAR10": 81.08, "CRR - SVHN": 82.08, "CRR - MNIST": 85.23, "CRA - CIFAR100": 6.15, "CRA - CIFAR10": 76.07, "CRA - SVHN": 82.01, "CRA - MNIST": 84.12},
        {Approach: "PGDT", "Std Acc - CIFAR100": 64.35, "Std Acc - CIFAR10": 84.38, "Std Acc - SVHN": 91.19, "Std Acc - MNIST": 99.16, "CRR - CIFAR100": 57.07, "CRR - CIFAR10": 87.07, "CRR - SVHN": 87.89, "CRR - MNIST": 94.65, "CRA - CIFAR100": 32.93, "CRA - CIFAR10": 82.9, "CRA - SVHN": 86.68, "CRA - MNIST": 94.63},
        {Approach: "TRADES", "Std Acc - CIFAR100": 62.55, "Std Acc - CIFAR10": 80.42, "Std Acc - SVHN": 86.16, "Std Acc - MNIST": 99.1, "CRR - CIFAR100": 59.27, "CRR - CIFAR10": 88.54, "CRR - SVHN": 87.89, "CRR - MNIST": 94.76, "CRA - CIFAR100": 38.85, "CRA - CIFAR10": 78.8, "CRA - SVHN": 84.76, "CRA - MNIST": 94.61},
        {Approach: "MART", "Std Acc - CIFAR100": 63.68, "Std Acc - CIFAR10": 81.54, "Std Acc - SVHN": 90.2, "Std Acc - MNIST": 98.94, "CRR - CIFAR100": 58.79, "CRR - CIFAR10": 78.9, "CRR - SVHN": 85.23, "CRR - MNIST": 94.13, "CRA - CIFAR100": 49.37, "CRA - CIFAR10": 72.21, "CRA - SVHN": 78.82, "CRA - MNIST": 94.09},
        {Approach: "RS", "Std Acc - CIFAR100": 56.87, "Std Acc - CIFAR10": 89.45, "Std Acc - SVHN": 88.35, "Std Acc - MNIST": 97.16, "CRR - CIFAR100": 60.38, "CRR - CIFAR10": 90, "CRR - SVHN": 76.29, "CRR - MNIST": 87.15, "CRA - CIFAR100": 47.5, "CRA - CIFAR10": 87.98, "CRA - SVHN": 70.64, "CRA - MNIST": 86.29},
        {Approach: "IBP", "Std Acc - CIFAR100": 39.45, "Std Acc - CIFAR10": 48.4, "Std Acc - SVHN": 73.09, "Std Acc - MNIST": 97.78, "CRR - CIFAR100": 49.34, "CRR - CIFAR10": 54.7, "CRR - SVHN": 61.94, "CRR - MNIST": 89.18, "CRA - CIFAR100": 29.2, "CRA - CIFAR10": 40, "CRA - SVHN": 57.26, "CRA - MNIST": 88.51},
        {Approach: "PRL", "Std Acc - CIFAR100": 64.89, "Std Acc - CIFAR10": 93.82, "Std Acc - SVHN": 92, "Std Acc - MNIST": 99.32, "CRR - CIFAR100": 56.71, "CRR - CIFAR10": 90.71, "CRR - SVHN": 93.11, "CRR - MNIST": 96.03, "CRA - CIFAR100": 50.77, "CRA - CIFAR10": 90.63, "CRA - SVHN": 91.07, "CRA - MNIST": 95.01},
        {Approach: "TandT", "Std Acc - CIFAR100": 65.56, "Std Acc - CIFAR10": 94.23, "Std Acc - SVHN": 94.79, "Std Acc - MNIST": 99.32, "CRR - CIFAR100": 62.05, "CRR - CIFAR10": 95.08, "CRR - SVHN": 93.15, "CRR - MNIST": 97.8, "CRA - CIFAR100": 52.07, "CRA - CIFAR10": 91.75, "CRA - SVHN": 92.81, "CRA - MNIST": 96.8},
    ];

    // Data 2: Adversarial Robustness
    const data2 = [
        { attack: "No Attack", ERM: 94.85, DA: 94.21, PGDT: 84.38, TRADES: 80.42, MART: 81.54, RS: 89.45, IBP: 48.4, PRL: 93.82, TandT: 94.23 },
        { attack: "TIFGSM", ERM: 35.1, DA: 33, PGDT: 65.7, TRADES: 62.9, MART: 69.1, RS: 45.4, IBP: 40.2, PRL: 34, TandT: 92.8 },
        { attack: "MIFGSM", ERM: 0, DA: 0, PGDT: 50.9, TRADES: 51.9, MART: 50.5, RS: 5.8, IBP: 38.1, PRL: 0, TandT: 92.8 },
        { attack: "DIFGSM", ERM: 1, DA: 0, PGDT: 51.75, TRADES: 50.5, MART: 53.6, RS: 4.1, IBP: 38.1, PRL: 3.1, TandT: 92.8 },
        { attack: "VMIFGSM", ERM: 0, DA: 0, PGDT: 51.1, TRADES: 50.9, MART: 51.9, RS: 4.1, IBP: 38.1, PRL: 0, TandT: 93.9 },
        { attack: "TPGD", ERM: 38.1, DA: 39.2, PGDT: 69.3, TRADES: 69.1, MART: 70.1, RS: 48.5, IBP: 50, PRL: 28.9, TandT: 91.8 },
        { attack: "FGSM", ERM: 29.9, DA: 25.8, PGDT: 57.95, TRADES: 54.6, MART: 61.9, RS: 28.9, IBP: 38.1, PRL: 25.8, TandT: 93.8 },
        { attack: "RFGSM", ERM: 0, DA: 0, PGDT: 49.15, TRADES: 50.4, MART: 48.5, RS: 3.7, IBP: 38.1, PRL: 0, TandT: 90 },
        { attack: "BIM", ERM: 0, DA: 0, PGDT: 52, TRADES: 57.2, MART: 47.4, RS: 2.1, IBP: 38.1, PRL: 0, TandT: 90.7 },
        { attack: "FAB", ERM: 1, DA: 2.1, PGDT: 43, TRADES: 46.4, MART: 40.2, RS: 5.3, IBP: 38.1, PRL: 4.1, TandT: 90.1 },
        { attack: "CW", ERM: 0, DA: 0, PGDT: 32.2, TRADES: 35.1, MART: 29.9, RS: 1, IBP: 40.2, PRL: 1, TandT: 92.9 },
        { attack: "UPGD", ERM: 0, DA: 0, PGDT: 49.85, TRADES: 50.5, MART: 49.8, RS: 5.1, IBP: 38.1, PRL: 0, TandT: 93.8 },
        { attack: "FFGSM", ERM: 19.6, DA: 23.7, PGDT: 60.55, TRADES: 55.7, MART: 66, RS: 33, IBP: 42.3, PRL: 29.9, TandT: 92.8 },
        { attack: "Jitter", ERM: 11.3, DA: 12.4, PGDT: 48.15, TRADES: 47.4, MART: 49.5, RS: 34, IBP: 39.2, PRL: 24.7, TandT: 90.7 },
        { attack: "PGD", ERM: 0, DA: 0, PGDT: 57.4, TRADES: 54.6, MART: 60.8, RS: 7.2, IBP: 40.2, PRL: 0, TandT: 91.8 },
        { attack: "EOTPGD", ERM: 0, DA: 0, PGDT: 50.1, TRADES: 50.3, MART: 50.5, RS: 3, IBP: 38.1, PRL: 0, TandT: 90.7 },
        { attack: "APGD", ERM: 0, DA: 0, PGDT: 48.4, TRADES: 51, MART: 46.4, RS: 1, IBP: 38.1, PRL: 0, TandT: 90.7 },
        { attack: "NIFGSM", ERM: 0, DA: 0, PGDT: 57.95, TRADES: 56.7, MART: 59.8, RS: 7.2, IBP: 38.1, PRL: 1, TandT: 92.8 },
        { attack: "SiniFGSM", ERM: 4.1, DA: 1, PGDT: 59, TRADES: 56.7, MART: 61.9, RS: 23.7, IBP: 38.1, PRL: 12.4, TandT: 93.7 },
        { attack: "VNIFGSM", ERM: 0, DA: 0, PGDT: 50.45, TRADES: 53, MART: 48.5, RS: 5.1, IBP: 38.1, PRL: 0, TandT: 92.9 },
        { attack: "APGDT", ERM: 0, DA: 0, PGDT: 40.9, TRADES: 44.3, MART: 38.1, RS: 0, IBP: 38.1, PRL: 0, TandT: 88.7 },
        { attack: "Square", ERM: 0, DA: 1, PGDT: 50.4, TRADES: 54, MART: 47.4, RS: 3.1, IBP: 38.1, PRL: 2.1, TandT: 88.08 },
        { attack: "Add Gaussian Noise", ERM: 25.8, DA: 43.3, PGDT: 79.1, TRADES: 78.4, MART: 80.4, RS: 74.2, IBP: 42.3, PRL: 45.4, TandT: 87.6 },
        { attack: "OnePixel", ERM: 79.4, DA: 83.5, PGDT: 78.05, TRADES: 74.2, MART: 82.5, RS: 83.5, IBP: 42.5, PRL: 80.4, TandT: 89.7 },
        { attack: "Pixle", ERM: 0, DA: 0, PGDT: 12.55, TRADES: 11.3, MART: 14.4, RS: 1, IBP: 10.3, PRL: 0, TandT: 17.5 },
        { attack: "PGDL2", ERM: 1, DA: 0, PGDT: 35.8, TRADES: 36.1, MART: 36.1, RS: 5.2, IBP: 36.1, PRL: 0, TandT: 92.9 }
    ];

    // Define metrics for Data 1
    const metrics = {
        "Standard": ["Std Acc - CIFAR100", "Std Acc - CIFAR10", "Std Acc - SVHN", "Std Acc - MNIST"],
        "Robustness": ["CRR - CIFAR100", "CRR - CIFAR10", "CRR - SVHN", "CRR - MNIST"],
        "Certified": ["CRA - CIFAR100", "CRA - CIFAR10", "CRA - SVHN", "CRA - MNIST"]
    };

    // Color scale for Data 1
    const colorScale1 = d3.scaleSequential(d3.interpolatePlasma).domain([0, 100]);

    // Initialize SVG elements for Data 1
    const radarSvg = d3.select("#radarChart"),
          heatmapSvg = d3.select("#heatmap"),
          tooltip = d3.select("#dashboard-tooltip");

    const radarWidth = +radarSvg.attr("width"),
          radarHeight = +radarSvg.attr("height"),
          radarRadius = Math.min(radarWidth, radarHeight) / 2 - 60;

    const heatmapWidth = +heatmapSvg.attr("width"),
          heatmapHeight = +heatmapSvg.attr("height");

    // Create radar chart group for Data 1
    const radarG = radarSvg.append("g")
        .attr("transform", `translate(${radarWidth/2},${radarHeight/2})`);

    // Create heatmap group for Data 1
    const heatmapG = heatmapSvg.append("g")
        .attr("transform", "translate(80, 50)");

    // Draw radar chart function for Data 1
    function drawRadar(metric) {
        const allAxis = metrics[metric];
        const angleSlice = Math.PI * 2 / allAxis.length;
        const rScale = d3.scaleLinear().range([0, radarRadius]).domain([0, 100]);
        
        // Clear existing content
        radarG.selectAll("*").remove();
        
        // Add loading animation
        const loading = radarG.append("text")
            .attr("x", 0)
            .attr("y", 0)
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .text("Loading...")
            .style("font-size", "16px")
            .style("fill", "#6c757d");
        
        // Delay drawing for loading effect
        setTimeout(() => {
            loading.remove();
            
            // Draw grid lines
            for (let level = 1; level <= 5; level++) {
                const r = radarRadius / 5 * level;
                
                // Circular grid lines
                radarG.append("circle")
                    .attr("r", 0) // Initial radius is 0
                    .style("fill", "none")
                    .style("stroke", "#e0e0e0")
                    .style("stroke-dasharray", "2,2")
                    .transition()
                    .duration(800)
                    .delay(level * 100)
                    .ease(d3.easeCubicOut)
                    .attr("r", r)
                    .style("stroke", "#CDCDCD");
                
                // Grid labels
                radarG.append("text")
                    .attr("x", 0)
                    .attr("y", -r)
                    .attr("dy", "0.35em")
                    .text(`${level * 20}%`)
                    .style("font-size", "10px")
                    .style("fill", "#999")
                    .style("text-anchor", "middle")
                    .style("opacity", 0)
                    .transition()
                    .duration(500)
                    .delay(level * 100 + 300)
                    .style("opacity", 1);
            }
            
            // Draw axes
            allAxis.forEach((axis, i) => {
                const angle = angleSlice * i - Math.PI / 2;
                
                // Axis line
                radarG.append("line")
                    .attr("x1", 0)
                    .attr("y1", 0)
                    .attr("x2", 0)
                    .attr("y2", 0)
                    .attr("stroke", "#CDCDCD")
                    .transition()
                    .duration(800)
                    .delay(i * 100 + 200)
                    .ease(d3.easeCubicOut)
                    .attr("x2", rScale(100) * Math.cos(angle))
                    .attr("y2", rScale(100) * Math.sin(angle));
                
                // Axis label
                radarG.append("text")
                    .attr("x", rScale(105) * Math.cos(angle))
                    .attr("y", rScale(105) * Math.sin(angle))
                    .text(axis.replace("Std Acc - ", "").replace("CRR - ", "").replace("CRA - ", ""))
                    .attr("class", "axisLabel")
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .style("opacity", 0)
                    .transition()
                    .duration(500)
                    .delay(i * 100 + 400)
                    .style("opacity", 1);
            });
            
            // Draw data paths
            const paths = radarG.selectAll(".lineGroup")
                .data(data1)
                .enter()
                .append("g")
                .attr("class", "lineGroup");
            
            // Path animation
            paths.append("path")
                .attr("d", d => {
                    const lineGenerator = d3.lineRadial()
                        .radius(a => 0) // Initial radius is 0
                        .angle((a, i) => i * angleSlice)
                        .curve(d3.curveCardinalClosed);
                    return lineGenerator(allAxis);
                })
                .attr("stroke", (d, i) => colorScale1(i * 10))
                .attr("class", "line")
                .style("opacity", 0.8)
                .transition()
                .duration(1200)
                .delay((d, i) => i * 100 + 500)
                .ease(d3.easeCubicOut)
                .attrTween("d", function(d) {
                    const interpolate = d3.interpolate(0, 1);
                    return function(t) {
                        const lineGenerator = d3.lineRadial()
                            .radius(a => rScale(d[a]) * interpolate(t))
                            .angle((a, i) => i * angleSlice)
                            .curve(d3.curveCardinalClosed);
                        return lineGenerator(allAxis);
                    };
                })
                .on("mouseover", function(event, d) {
                    d3.selectAll(".line").classed("faded", true);
                    d3.select(this).classed("faded", false).classed("highlight", true);
                    
                    // Add pulse animation
                    d3.select(this)
                        .transition()
                        .duration(500)
                        .ease(d3.easeElasticOut)
                        .attr("stroke-width", 4);
                })
                .on("mouseout", function() {
                    d3.selectAll(".line").classed("faded", false).classed("highlight", false);
                    
                    // Restore original width
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("stroke-width", 2);
                });
            
            // Data point animation
            paths.selectAll(".dot")
                .data(d => allAxis.map(a => ({axis: a, value: d[a], Approach: d.Approach})))
                .enter()
                .append("circle")
                .attr("cx", d => 0)
                .attr("cy", d => 0)
                .attr("r", 0)
                .attr("fill", d => colorScale1(data1.findIndex(e => e.Approach === d.Approach) * 10))
                .attr("class", "dot")
                .transition()
                .duration(800)
                .delay((d, i) => i * 50 + 800)
                .ease(d3.easeElasticOut)
                .attr("cx", d => rScale(d.value) * Math.cos(allAxis.indexOf(d.axis) * angleSlice - Math.PI / 2))
                .attr("cy", d => rScale(d.value) * Math.sin(allAxis.indexOf(d.axis) * angleSlice - Math.PI / 2))
                .attr("r", 5)
                .on("mouseover", function(event, d) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("r", 8)
                        .style("fill-opacity", 1);
                    
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("transform", "translateY(0)");
                    tooltip.html(`<h3>${d.Approach}</h3><p>${d.axis}: ${d.value}%</p>`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mousemove", function(event, d) {
                    tooltip.style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mouseout", function() {
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("r", 5)
                        .style("fill-opacity", 0.8);
                    
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0)
                        .style("transform", "translateY(10px)");
                });
            
            // Update legend
            updateRadarLegend();
        }, 300);
    }

    // Draw heatmap function for Data 1
    function drawHeatmap(metric) {
        const allAxis = metrics[metric];
        
        // Clear existing content
        heatmapG.selectAll("*").remove();
        
        // Add loading animation
        const loading = heatmapG.append("text")
            .attr("x", heatmapWidth / 2 - 80)
            .attr("y", heatmapHeight / 2)
            .attr("text-anchor", "middle")
            .attr("dy", "0.35em")
            .text("Loading...")
            .style("font-size", "16px")
            .style("fill", "#6c757d");
        
        // Delay drawing for loading effect
        setTimeout(() => {
            loading.remove();
            
            // Calculate heatmap dimensions
            const cellWidth = (heatmapWidth - 100) / allAxis.length;
            const cellHeight = (heatmapHeight - 100) / data1.length;
            
            // Add X-axis labels
            allAxis.forEach((axis, i) => {
                heatmapG.append("text")
                    .attr("x", i * cellWidth + cellWidth / 2)
                    .attr("y", -10)
                    .attr("text-anchor", "middle")
                    .text(axis.replace("Std Acc - ", "").replace("CRR - ", "").replace("CRA - ", ""))
                    .style("font-size", "12px")
                    .style("fill", "#555")
                    .style("opacity", 0)
                    .transition()
                    .duration(500)
                    .delay(i * 100)
                    .style("opacity", 1);
            });
            
            // Add Y-axis labels
            data1.forEach((d, i) => {
                heatmapG.append("text")
                    .attr("x", -10)
                    .attr("y", i * cellHeight + cellHeight / 2)
                    .attr("text-anchor", "end")
                    .attr("dy", "0.35em")
                    .text(d.Approach)
                    .style("font-size", "12px")
                    .style("fill", "#555")
                    .style("opacity", 0)
                    .transition()
                    .duration(500)
                    .delay(i * 100)
                    .style("opacity", 1);
            });
            
            // Draw heatmap cells
            const cells = heatmapG.selectAll(".heatmap-cell")
                .data(data1.flatMap((d, i) => 
                    allAxis.map(axis => ({
                        Approach: d.Approach,
                        axis: axis,
                        value: d[axis],
                        x: allAxis.indexOf(axis),
                        y: i
                    }))
                ))
                .enter()
                .append("rect")
                .attr("class", "heatmap-cell")
                .attr("x", d => d.x * cellWidth)
                .attr("y", d => d.y * cellHeight)
                .attr("width", cellWidth)
                .attr("height", cellHeight)
                .attr("fill", "#f0f0f0") // Initial color
                .style("opacity", 0)
                .on("mouseover", function(event, d) {
                    d3.select(this)
                        .transition()
                        .duration(200)
                        .attr("stroke", "#333")
                        .attr("stroke-width", 2);
                    
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 1)
                        .style("transform", "translateY(0)");
                    tooltip.html(`<h3>${d.Approach}</h3><p>${d.axis}: ${d.value}%</p>`)
                        .style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mousemove", function(event, d) {
                    tooltip.style("left", (event.pageX + 10) + "px")
                        .style("top", (event.pageY - 20) + "px");
                })
                .on("mouseout", function() {
                    d3.select(this)
                        .transition()
                        .duration(300)
                        .attr("stroke", "none");
                    
                    tooltip.transition()
                        .duration(200)
                        .style("opacity", 0)
                        .style("transform", "translateY(10px)");
                });
            
            // Cell color animation
            cells.transition()
                .duration(800)
                .delay((d, i) => i * 30)
                .ease(d3.easeCubicOut)
                .style("opacity", 1)
                .attr("fill", d => colorScale1(d.value));
            
            // Add value labels
            heatmapG.selectAll(".cell-value")
                .data(data1.flatMap((d, i) => 
                    allAxis.map(axis => ({
                        Approach: d.Approach,
                        axis: axis,
                        value: d[axis],
                        x: allAxis.indexOf(axis),
                        y: i
                    }))
                ))
                .enter()
                .append("text")
                .attr("class", "cell-value")
                .attr("x", d => d.x * cellWidth + cellWidth / 2)
                .attr("y", d => d.y * cellHeight + cellHeight / 2)
                .attr("text-anchor", "middle")
                .attr("dy", "0.35em")
                .text(d => d.value + "%")
                .style("font-size", "10px")
                .style("fill", d => d.value > 50 ? "white" : "black")
                .style("font-weight", "bold")
                .style("opacity", 0)
                .transition()
                .duration(500)
                .delay((d, i) => i * 30 + 400)
                .style("opacity", 1);
            
            // Update heatmap legend
            updateHeatmapLegend();
        }, 300);
    }

    // Update radar chart legend for Data 1
    function updateRadarLegend() {
        const legend = d3.select("#radarLegend");
        legend.selectAll("*").remove();
        
        const legendItems = legend.selectAll(".dashboard-legend-item")
            .data(data1)
            .enter()
            .append("div")
            .attr("class", "dashboard-legend-item")
            .on("click", function(event, d) {
                const isActive = d3.select(this).classed("active");
                d3.selectAll(".dashboard-legend-item").classed("active", false);
                
                if (!isActive) {
                    d3.select(this).classed("active", true);
                    // Highlight selected approach
                    const index = data1.findIndex(item => item.Approach === d.Approach);
                    d3.selectAll(".line").classed("faded", true);
                    d3.selectAll(".lineGroup").filter((item, i) => i === index)
                        .select(".line").classed("faded", false).classed("highlight", true);
                } else {
                    // Restore all
                    d3.selectAll(".line").classed("faded", false).classed("highlight", false);
                }
            });
            
        legendItems.append("div")
            .attr("class", "dashboard-legend-color")
            .style("background-color", (d, i) => colorScale1(i * 10));
            
        legendItems.append("span")
            .text(d => d.Approach);
    }

    // Update heatmap legend for Data 1
    function updateHeatmapLegend() {
        const legend = d3.select("#heatmapLegend");
        legend.selectAll("*").remove();
        
        // Create color legend
        const legendWidth = 300;
        const legendHeight = 20;
        
        const legendSvg = legend.append("svg")
            .attr("width", legendWidth)
            .attr("height", legendHeight + 30);
        
        const defs = legendSvg.append("defs");
        const gradient = defs.append("linearGradient")
            .attr("id", "heatmap-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
        
        gradient.selectAll("stop")
            .data(d3.range(0, 1.01, 0.1))
            .enter().append("stop")
            .attr("offset", d => `${d * 100}%`)
            .attr("stop-color", d => colorScale1(d * 100));
        
        legendSvg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#heatmap-gradient)")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .style("opacity", 1);
        
        // Add legend labels
        const legendScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, legendWidth]);
        
        const legendAxis = d3.axisBottom(legendScale)
            .ticks(5)
            .tickFormat(d => d + "%");
        
        legendSvg.append("g")
            .attr("transform", `translate(0, ${legendHeight})`)
            .call(legendAxis)
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(500)
            .style("opacity", 1);
    }

    // ------------------ Data 2: Adversarial Robustness Heatmap ------------------
    function drawAdversarialRobustnessHeatmap() {
        // Clear existing content
        d3.select("#robustnessHeatmap").selectAll("*").remove();
        d3.select("#robustnessLegend").selectAll("*").remove();
        
        // Set dimensions and margins for Data 2
        const margin = { top: 80, right: 150, bottom: 100, left: 150 };
        const width = 1000 - margin.left - margin.right;
        const height = 800 - margin.top - margin.bottom;

        // Create SVG for Data 2
        const robustnessSvg = d3.select("#robustnessHeatmap")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        // Extract defense model names (all columns except "attack")
        const defenseModels = Object.keys(data2[0]).filter(key => key !== "attack");
        const attackMethods = data2.map(d => d.attack);

        // Create scales for Data 2
        const xScale = d3.scaleBand()
            .domain(defenseModels)
            .range([0, width])
            .padding(0.05);

        const yScale = d3.scaleBand()
            .domain(attackMethods)
            .range([0, height])
            .padding(0.05);

        const colorScale2 = d3.scaleSequential(d3.interpolateRdYlGn)
            .domain([0, 100]);

        // Add X axis with transition for Data 2
        robustnessSvg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(xScale))
            .selectAll("text")
            .attr("transform", "rotate(-45)")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .style("opacity", 1);

        // Add Y axis with transition for Data 2
        robustnessSvg.append("g")
            .call(d3.axisLeft(yScale))
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(100)
            .style("opacity", 1);

        // Add X axis label for Data 2
        robustnessSvg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("x", width / 2)
            .attr("y", height + 50)
            .text("Defense Models")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(400)
            .style("opacity", 1);

        // Add Y axis label for Data 2
        robustnessSvg.append("text")
            .attr("class", "axis-label")
            .attr("text-anchor", "middle")
            .attr("transform", "rotate(-90)")
            .attr("x", -height / 2)
            .attr("y", -100)
            .text("Attack Methods")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(400)
            .style("opacity", 1);

        // Create heatmap cells with transitions for Data 2
        data2.forEach(d => {
            const attack = d.attack;
            defenseModels.forEach(model => {
                const value = d[model];
                
                // Create rectangle with initial state
                const rect = robustnessSvg.append("rect")
                    .attr("x", xScale(model))
                    .attr("y", yScale(attack))
                    .attr("width", xScale.bandwidth())
                    .attr("height", yScale.bandwidth())
                    .attr("fill", colorScale2(value))
                    .style("stroke", "#fff")
                    .style("stroke-width", 1)
                    .style("opacity", 0)
                    .attr("class", "cell")
                    .on("mouseover", function(event) {
                        tooltip
                            .style("opacity", 1)
                            .html(`<strong>${attack} vs ${model}</strong><br>Accuracy: ${value}%`)
                            .style("left", (event.pageX + 10) + "px")
                            .style("top", (event.pageY - 28) + "px");
                        
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .style("stroke", "#333")
                            .style("stroke-width", 2);
                    })
                    .on("mouseout", function() {
                        tooltip.style("opacity", 0);
                        d3.select(this)
                            .transition()
                            .duration(200)
                            .style("stroke", "#fff")
                            .style("stroke-width", 1);
                    });
                
                // Animate rectangles
                rect.transition()
                    .duration(600)
                    .delay((yScale(attack) / height) * 1000) // Stagger based on position
                    .style("opacity", 1);
                
                // Add text label with initial state
                const text = robustnessSvg.append("text")
                    .attr("x", xScale(model) + xScale.bandwidth() / 2)
                    .attr("y", yScale(attack) + yScale.bandwidth() / 2)
                    .attr("text-anchor", "middle")
                    .attr("dy", "0.35em")
                    .attr("font-size", "10px")
                    .attr("font-weight", value < 50 ? "bold" : "normal")
                    .attr("fill", value < 50 ? "white" : "black")
                    .text(value)
                    .style("opacity", 0);
                
                // Animate text
                text.transition()
                    .duration(400)
                    .delay((yScale(attack) / height) * 1000 + 300) // Slightly after rectangles
                    .style("opacity", 1);
            });
        });

        // Add title with transition for Data 2
        robustnessSvg.append("text")
            .attr("x", width / 2)
            .attr("y", -40)
            .attr("text-anchor", "middle")
            .style("font-size", "20px")
            .style("font-weight", "bold")
            .text("Adversarial Robustness Heatmap")
            .style("opacity", 0)
            .transition()
            .duration(1000)
            .style("opacity", 1);

        // Create legend for Data 2
        const legendWidth = 300;
        const legendHeight = 20;
        
        const legendSvg = d3.select("#robustnessLegend")
            .append("svg")
            .attr("width", legendWidth)
            .attr("height", 50);
        
        const legendScale = d3.scaleLinear()
            .domain([0, 100])
            .range([0, legendWidth]);
        
        const legendAxis = d3.axisBottom(legendScale)
            .ticks(5);
        
        const defs = legendSvg.append("defs");
        
        const linearGradient = defs.append("linearGradient")
            .attr("id", "linear-gradient")
            .attr("x1", "0%")
            .attr("y1", "0%")
            .attr("x2", "100%")
            .attr("y2", "0%");
        
        // Add gradient stops
        const stops = [0, 0.2, 0.4, 0.6, 0.8, 1];
        stops.forEach((stop, i) => {
            linearGradient.append("stop")
                .attr("offset", `${stop * 100}%`)
                .attr("stop-color", d3.interpolateRdYlGn(stop));
        });
        
        // Add gradient rectangle with transition
        legendSvg.append("rect")
            .attr("x", 0)
            .attr("y", 0)
            .attr("width", legendWidth)
            .attr("height", legendHeight)
            .style("fill", "url(#linear-gradient)")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(800)
            .style("opacity", 1);
        
        // Add legend axis with transition
        legendSvg.append("g")
            .attr("transform", `translate(0,${legendHeight})`)
            .call(legendAxis)
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(1000)
            .style("opacity", 1);
        
        // Add legend label with transition
        legendSvg.append("text")
            .attr("x", legendWidth / 2)
            .attr("y", legendHeight + 30)
            .attr("text-anchor", "middle")
            .text("Accuracy (%)")
            .style("opacity", 0)
            .transition()
            .duration(800)
            .delay(1200)
            .style("opacity", 1);
    }

    // ------------------ Initialization for Data 1 ------------------
    drawRadar("Standard");
    drawHeatmap("Standard");
    drawAdversarialRobustnessHeatmap();

    // Metric dropdown for Data 1
    d3.select("#metricSelect").on("change", function(){
        const metric = this.value;
        
        // Add transition animation
        d3.selectAll(".model-chart")
            .transition()
            .duration(300)
            .style("opacity", 0.5)
            .on("end", function() {
                drawRadar(metric);
                drawHeatmap(metric);
                
                d3.selectAll(".model-chart")
                    .transition()
                    .duration(300)
                    .style("opacity", 1);
            });
    });

    // Model dropdown for Data 1
    const modelSelect = d3.select("#modelFilter");

    modelSelect.on("change", function(){
        const selected = this.value;
        
        radarG.selectAll(".lineGroup")
            .transition()
            .duration(500)
            .style("opacity", d => (selected === "All" || d.Approach === selected) ? 1 : 0.1);
    });
}
