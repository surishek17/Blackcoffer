import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const Chart = ({ data }) => {
  const ref = useRef();

  useEffect(() => {
    const svg = d3.select(ref.current)
      .attr('width', 800)
      .attr('height', 400);

    const margin = { top: 20, right: 30, bottom: 40, left: 40 };
    const width = +svg.attr('width') - margin.left - margin.right;
    const height = +svg.attr('height') - margin.top - margin.bottom;

    const x = d3.scaleBand()
      .domain(data.map(d => d.topic))
      .range([margin.left, width - margin.right])
      .padding(0.1);

    const y = d3.scaleLinear()
      .domain([0, d3.max(data, d => d.intensity)]).nice()
      .range([height - margin.bottom, margin.top]);

    const xAxis = g => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(d3.axisBottom(x).tickSizeOuter(0));

    const yAxis = g => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(d3.axisLeft(y))
      .call(g => g.select(".domain").remove());

    svg.selectAll('*').remove();

    svg.append("g")
      .selectAll("rect")
      .data(data)
      .enter().append("rect")
      .attr("x", d => x(d.topic))
      .attr("y", d => y(d.intensity))
      .attr("height", d => y(0) - y(d.intensity))
      .attr("width", x.bandwidth())
      .attr("fill", "steelblue");

    svg.append("g")
      .call(xAxis);

    svg.append("g")
      .call(yAxis);

  }, [data]);

  return <svg ref={ref}></svg>;
};

export default Chart;
