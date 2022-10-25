import { useEffect, useState } from 'react';

import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';

import { BarChart, ShowChart, ScatterPlot } from '@mui/icons-material';

import './FrequencyChart.css'

const FrequencyChart = ({ data, chartType, setChartType }) => {

  const [options, setOptions] = useState({
    accessibility: { enabled: false }, // in reality i would add the accesibility module, but I am disabling it to remove an error for the time being
    chart: { type: chartType },
    title: { text: 'Letter Frequency' },
    legend: { enabled: false },
    xAxis: {
      categories: [],
      title: { text: 'Letters' }
    },
    yAxis: {
      title: { text: 'Frequency' }
    },
    series: []
  });

  useEffect(() => {
    // update the options object in state with new data/chart type
    setOptions({
      ...options,
      chart: {
        ...options.chart,
        type: chartType,
      },
      xAxis: {
        ...options.xAxis,
        categories: Object.keys(data),
      },
      series: [{
        data: Object.values(data)
      }]
    })
  }, [data, chartType]); // eslint-disable-line react-hooks/exhaustive-deps


  const handleChartTypeIconClick = (type) => () => {
    setChartType(type);
  }


  // if no input frequency data is returned, avoid rendering an empty chart
  if (!Object.keys(data).length) return null;
  return (
    <div className="chart-wrapper">
      <div className="chart-selector">
        <BarChart className={`chart-icon ${chartType !== 'column' ? 'disabled' : ''}`} onClick={handleChartTypeIconClick('column')} />
        <BarChart className={`chart-icon rotate ${chartType !== 'bar' ? 'disabled' : ''}`} onClick={handleChartTypeIconClick('bar')} />
        <ScatterPlot className={`chart-icon ${chartType !== 'scatter' ? 'disabled' : ''}`} onClick={handleChartTypeIconClick('scatter')} />
        <ShowChart className={`chart-icon ${chartType !== 'line' ? 'disabled' : ''}`} onClick={handleChartTypeIconClick('line')} />
      </div>
      <HighchartsReact highcharts={Highcharts} options={options} />
    </div>
  )
}

export default FrequencyChart;
