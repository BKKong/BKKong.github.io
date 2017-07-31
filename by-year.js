(function() {
	const data = [
		{'year': 1979, 'percentage': 0.6248},
		{'year': 1980, 'percentage': 0.6402},
		{'year': 1981, 'percentage': 0.6437},
		{'year': 1982, 'percentage': 0.6549},
		{'year': 1983, 'percentage': 0.6654},
		{'year': 1984, 'percentage': 0.6760},
		{'year': 1985, 'percentage': 0.6824},
		{'year': 1986, 'percentage': 0.6911},
		{'year': 1987, 'percentage': 0.6982},
		{'year': 1988, 'percentage': 0.7007},
		{'year': 1989, 'percentage': 0.7010},
		{'year': 1990, 'percentage': 0.7198},
		{'year': 1991, 'percentage': 0.7439},
		{'year': 1992, 'percentage': 0.7584},
		{'year': 1993, 'percentage': 0.7709},
		{'year': 1994, 'percentage': 0.7624},
		{'year': 1995, 'percentage': 0.7530},
		{'year': 1996, 'percentage': 0.7514},
		{'year': 1997, 'percentage': 0.7454},
		{'year': 1998, 'percentage': 0.7634},
		{'year': 1999, 'percentage': 0.7638},
		{'year': 2000, 'percentage': 0.7690},
		{'year': 2001, 'percentage': 0.7648},
		{'year': 2002, 'percentage': 0.7802},
		{'year': 2003, 'percentage': 0.7948},
		{'year': 2004, 'percentage': 0.8027},
		{'year': 2005, 'percentage': 0.8094},
		{'year': 2006, 'percentage': 0.8080},
		{'year': 2007, 'percentage': 0.8023},
		{'year': 2008, 'percentage': 0.7998},
		{'year': 2009, 'percentage': 0.8023},
		{'year': 2010, 'percentage': 0.8119},
		{'year': 2011, 'percentage': 0.8214},
		{'year': 2012, 'percentage': 0.8100},
		{'year': 2013, 'percentage': 0.8201},
		{'year': 2014, 'percentage': 0.8254},
		{'year': 2015, 'percentage': 0.8125},
		{'year': 2016, 'percentage': 0.8195}
	];

  let rect = d3.select('#by-year').node().getBoundingClientRect();
  let margin = {
    'top': rect.height * 0.02,
    'bottom': rect.height * 0.1,
    'left': rect.width * 0.07,
    'right': rect.width * 0.05
  };
  let yearToX = d3.scaleLinear()
    .domain(d3.extent(data, d => d.year))
    .nice(20)
    .range([margin.left, rect.width - margin.right]);
  let percentageToY = d3.scaleLinear()
    .domain(d3.extent(data, d => d.percentage))
    .nice()
    .range([rect.height - margin.bottom, margin.top]);

  let xAxis = d3.axisBottom(yearToX).ticks(20).tickFormat(d3.format('.0f'));
  let yAxis = d3.axisLeft(percentageToY).tickFormat(d3.format('.0%'));
  let line = d3.line()
    .x(d => yearToX(d.year))
    .y(d => percentageToY(d.percentage));

  d3.select('#by-year-x-axis')
    .attr('transform', 'translate(0, ' + (rect.height - margin.bottom) + ')')
    .call(xAxis);
  d3.select('#by-year-x-axis-caption')
    .attr('dx', (rect.width + margin.left - margin.right ) / 2)
    .attr('dy', margin.bottom * 0.75);
  d3.select('#by-year-y-axis')
    .attr('transform', 'translate(' + margin.left + ', 0)')
    .call(yAxis);
  d3.select('#by-year-y-axis-caption')
    .attr('dx', -margin.left * 0.75)
    .attr('dy', (rect.height - margin.top - margin.bottom) / 2)
    .attr('transform',
          'rotate(-90, ' + (-margin.left * 0.75) + ', ' +
              (rect.height - margin.top - margin.bottom) / 2 + ')');
  d3.select('#by-year-line').append('path').attr('d', line(data));
  d3.select('#by-year-line')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
  let hitTest = d3.select('#by-year-hit-test')
    .selectAll('g')
    .data(data)
    .enter()
    .append('g');
  hitTest.append('rect')
    .attr('x', d => yearToX(d.year - 0.5))
    .attr('y', margin.top)
    .attr('width', yearToX(1) - yearToX(0))
    .attr('height', rect.height - margin.top - margin.bottom);
  hitTest.append('circle')
    .attr('cx', d => yearToX(d.year))
    .attr('cy', d => percentageToY(d.percentage));
  hitTest.append('foreignObject')
    .attr('x', d => yearToX(d.year) - 50)
    .attr('y', d => percentageToY(d.percentage) - (d.year < 2005 ? 80 : -20))
    .attr('width', 100)
    .attr('height', 60)
    .attr('class', 'tool-tip')
    .append('xhtml:div')
    .html(d => '<span class="year">Year: ' + d.year + 
              '</span><br><span class="percentage">' +
              d3.format('.2%')(d.percentage) + '</span>');
})();
