(function() {
  const data = [
		{'age': '16 to 24 years', 'women': 450, 'men': 510},
		{'age': '25 to 34 years', 'women': 690, 'men': 770},
		{'age': '35 to 44 years', 'women': 804, 'men': 983},
		{'age': '45 to 54 years', 'women': 799, 'men': 1040},
		{'age': '55 to 64 years', 'women': 784, 'men': 1064},
		{'age': '65 years and older', 'women': 740, 'men': 1003}
	];

  let rect = d3.select('#by-age').node().getBoundingClientRect();
  let margin = {
    'top': rect.height * 0.02,
    'bottom': rect.height * 0.1,
    'left': rect.width * 0.07,
    'right': rect.width * 0.02
  };
  let ageIndexToX = d3.scaleLinear()
    .domain([-0.25, data.length - 0.75])
    .range([margin.left, rect.width - margin.right]);
  let valueToY = d3.scaleLinear()
    .domain([0, d3.max(data, d => d.men) * 1.1])
    .nice()
    .range([rect.height - margin.bottom, margin.top]);

  let xAxis = d3.axisBottom(ageIndexToX)
    .tickValues(d3.range(data.length))
    .tickFormat(i => data[i].age);
  let yAxis = d3.axisLeft(valueToY).tickFormat(d3.format('$,.0f'));
  let menArea = d3.area()
    .x((d, i) => ageIndexToX(i))
    .y0(d => valueToY(0))
    .y1(d => valueToY(d.men));
  let womenArea = d3.area()
    .x((d, i) => ageIndexToX(i))
    .y0(d => valueToY(0))
    .y1(d => valueToY(d.women));

  d3.select('#by-age-x-axis')
    .attr('transform', 'translate(0, ' + (rect.height - margin.bottom) + ')')
    .call(xAxis);
  d3.select('#by-age-y-axis')
    .attr('transform', 'translate(' + margin.left + ', 0)')
    .call(yAxis);
  d3.select('#by-age-area-men').append('path').attr('d', menArea(data));
  d3.select('#by-age-area-men')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => ageIndexToX(i))
    .attr('cy', d => valueToY(d.men));
  d3.select('#by-age-area-women').append('path').attr('d', womenArea(data));
  d3.select('#by-age-area-women')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => ageIndexToX(i))
    .attr('cy', d => valueToY(d.women));
  d3.select('#by-age-area-men')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('dx', (d, i) => ageIndexToX(i))
    .attr('dy', d => valueToY(d.men) - 15)
    .text(d => d3.format('$,.0f')(d.men));
  d3.select('#by-age-area-women')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('dx', (d, i) => ageIndexToX(i))
    .attr('dy', d => valueToY(d.women) + 35)
    .text(d => d3.format('$,.0f')(d.women));
  d3.select('#by-age-area-annotation')
    .selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('cx', (d, i) => ageIndexToX(i))
    .attr('cy', d => valueToY(d.women));
  d3.select('#by-age-area-annotation')
    .selectAll('text')
    .data(data)
    .enter()
    .append('text')
    .attr('dx', (d, i) => ageIndexToX(i))
    .attr('dy', d => valueToY(d.women) + 5)
    .text(d => d3.format('.0%')(d.women / d.men));
})();
