(function() {
  const data = [
    {state: 'Alabama', percentage: 0.755},
    {state: 'Alaska', percentage: 0.761},
    {state: 'Arizona', percentage: 0.826},
    {state: 'Arkansas', percentage: 0.798},
    {state: 'California', percentage: 0.848},
    {state: 'Colorado', percentage: 0.828},
    {state: 'Connecticut', percentage: 0.767},
    {state: 'Delaware', percentage: 0.873},
    {state: 'District of Columbia', percentage: 0.874},
    {state: 'Florida', percentage: 0.874},
    {state: 'Georgia', percentage: 0.848},
    {state: 'Hawaii', percentage: 0.879},
    {state: 'Idaho', percentage: 0.811},
    {state: 'Illinois', percentage: 0.834},
    {state: 'Indiana', percentage: 0.798},
    {state: 'Iowa', percentage: 0.786},
    {state: 'Kansas', percentage: 0.767},
    {state: 'Kentucky', percentage: 0.807},
    {state: 'Louisiana', percentage: 0.761},
    {state: 'Maine', percentage: 0.80},
    {state: 'Maryland', percentage: 0.838},
    {state: 'Massachusetts', percentage: 0.816},
    {state: 'Michigan', percentage: 0.768},
    {state: 'Minnesota', percentage: 0.824},
    {state: 'Mississippi', percentage: 0.766},
    {state: 'Missouri', percentage: 0.773},
    {state: 'Montana', percentage: 0.831},
    {state: 'Nebraska', percentage: 0.762},
    {state: 'Nevada', percentage: 0.816},
    {state: 'New Hampshire', percentage: 0.773},
    {state: 'New Jersey', percentage: 0.832},
    {state: 'New Mexico', percentage: 0.786},
    {state: 'New York', percentage: 0.869},
    {state: 'North Carolina', percentage: 0.858},
    {state: 'North Dakota', percentage: 0.748},
    {state: 'Ohio', percentage: 0.812},
    {state: 'Oklahoma', percentage: 0.77},
    {state: 'Oregon', percentage: 0.83},
    {state: 'Pennsylvania', percentage: 0.784},
    {state: 'Rhode Island', percentage: 0.796},
    {state: 'South Carolina', percentage: 0.843},
    {state: 'South Dakota', percentage: 0.792},
    {state: 'Tennessee', percentage: 0.856},
    {state: 'Texas', percentage: 0.791},
    {state: 'Utah', percentage: 0.752},
    {state: 'Vermont', percentage: 0.834},
    {state: 'Virginia', percentage: 0.80},
    {state: 'Washington', percentage: 0.778},
    {state: 'West Virginia', percentage: 0.797},
    {state: 'Wisconsin', percentage: 0.768},
    {state: 'Wyoming', percentage: 0.69},
  ];
  const extent = d3.extent(data, d => d.percentage);
  const domain = [0.72, 0.88];

  let color = d3.scaleSequential(d3.interpolateRdBu).domain(domain);
  d3.select('#by-state-map-gradient')
    .selectAll('stop')
    .data(d3.range(101))
    .enter()
    .append('stop')
    .attr('offset', d => d / 100)
    .attr('stop-color', d => color(d3.interpolate(...extent)(d / 100)));
  d3.select('#by-state-map-lower-bound').text(d3.format('.0%')(extent[0]));
  d3.select('#by-state-map-upper-bound').text(d3.format('.0%')(extent[1]));

  d3.json('https://unpkg.com/us-atlas@1/us/10m.json', function(error, us) {
    if (error) {
      throw error;
    }

    let boundaries = topojson.feature(us, us.objects.states).features;
    boundaries.sort((x, y) => d3.ascending(x.id, y.id));
    let path = d3.geoPath();

    d3.select('#by-state-map')
      .selectAll('path')
      .data(boundaries)
      .enter()
      .append('path')
      .attr('fill', (d, i) => color(data[i].percentage))
      .attr('d', path);
  });
})();
