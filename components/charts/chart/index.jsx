// import FusionCharts from "fusioncharts";
// import charts from "fusioncharts/fusioncharts.charts";
// import ReactFusioncharts from "react-fusioncharts";

import dynamic from 'next/dynamic';
const FusionCharts = dynamic(() => import("fusioncharts"), { ssr: false });
const charts = dynamic(() => import("fusioncharts/fusioncharts.charts"), { ssr: false });
const ReactFusioncharts = dynamic(() => import("react-fusioncharts"), { ssr: false });

// Resolves charts dependancy
charts(FusionCharts);

const dataSource = {
  chart: {
    caption: "Yearly sales of iPhone",
    yaxisname: "Number of units sold",
    subcaption: "2007-2016",
    legendposition: "Right",
    drawanchors: "0",
    showvalues: "0",
    plottooltext: "<b>$dataValue</b> iPhones sold in $label",
    theme: "fusion"
  },
  data: [
    {
      label: "2007",
      value: "1380000"
    },
    {
      label: "2008",
      value: "1450000"
    },
    {
      label: "2009",
      value: "1610000"
    },
    {
      label: "2010",
      value: "1540000"
    },
    {
      label: "2011",
      value: "1480000"
    },
    {
      label: "2012",
      value: "1573000"
    },
    {
      label: "2013",
      value: "2232000"
    },
    {
      label: "2014",
      value: "2476000"
    },
    {
      label: "2015",
      value: "2832000"
    },
    {
      label: "2016",
      value: "3808000"
    }
  ]
};

export default function SimpleChart () {

    return (
      <ReactFusioncharts
        type="area2d"
        width="100%"
        height="100%"
        dataFormat="JSON"
        dataSource={dataSource}
      />
    );
  }
