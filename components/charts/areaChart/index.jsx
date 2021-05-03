import React, { useEffect, useState } from 'react';
// import Chart from 'react-apexcharts';
import Botton from '../../../components/buttons/index';

import dynamic from 'next/dynamic';
import { customTheme } from '../../../lib/theme';
import { useSelector } from 'react-redux';
// import ApexCharts from 'apexcharts';
const Chart = dynamic(() => import('react-apexcharts'), { ssr: false });
const ApexCharts = dynamic(() => import('apexcharts'), { ssr: false });

export default function MyChart(props) {

  const [data, setData] = useState([0, 30, 60, 90, 120])


  const {
    values,
    bgColor,
    ...otherProps
  } = props;

  // console.log(values, "data is coming");

  const themeType = useSelector(state => state?.store?.theme)
  useEffect(() => {
    const theme = customTheme[themeType]
    // options.chart.background = theme.card.bgColor
    // options.chart.foreColor = theme.card.textColor

    setOptions(
      {
        chart: {
          id: 'area-chart',
          background: theme.card.bgColor,
          foreColor: theme.textColor,
          // background: theme.card.bgColor,
          //   height: 400,
          title: {
            text: "Chart",
            align: 'left',
            margin: 10,
            offsetX: 0,
            offsetY: 0,
            floating: false,
            style: {
              fontSize: '14px',
              fontWeight: 'bold',
              fontFamily: undefined,
              color: '#fff'
            },
          }
        },
        xaxis: {
          type: 'category',
          categories: [
            'Monday',
            'Tuesday',
            'Wednesday',
            'Thursday',
            'Friday',
            'Saturday',
            'Sunday',
          ],
        },
      }
    )

    setSeries([
      {
        name: 'Hours of Sleep',
        data: values,
      },
    ])
  }, [values, bgColor])

  console.log(data);
  const [options, setOptions] = useState({
    chart: {
      id: 'area-chart',
      color: '#E91E63',
      // background: theme.card.bgColor,
      //   height: 400,
      title: {
        text: "Chart",
        align: 'left',
        margin: 10,
        offsetX: 0,
        offsetY: 0,
        floating: false,
        style: {
          fontSize: '14px',
          fontWeight: 'bold',
          fontFamily: undefined,
          color: '#fff'
        },
      }
    },
    xaxis: {
      type: 'category',
      categories: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
    },
  });
  const [series, setSeries] = useState([
    {
      name: 'Hours of Sleep',
      data: [0, 30, 60, 90, 120],
    },
  ]);

  return (
    <div className='chart w-100'>
      {/* <Botton onClick={updateData} children='Score' /> */}
      <Chart options={options} series={series} type='area' height="210px" />
      <style jsx>{`
        .chart {
          width: 500px;
          margin: auto;
        }
      `}</style>
    </div>
  );
}