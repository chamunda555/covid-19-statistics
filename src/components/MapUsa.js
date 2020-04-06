import React, { useState, useEffect } from 'react'
import ReactEcharts from 'echarts-for-react';
import echarts from 'echarts/lib/echarts';

import pinyin from 'chinese-to-pinyin';
import titleize from 'titleize';
import axios from 'axios';

export default function MapUSA() {
  const [loaded, setReady] = useState(false);
  const [cases, setCases] = useState({dates:[], data:[]});

  useEffect(() => {
    let isCanceled = false;
    axios.get(`./assets/UsaGEO.json`).then( ({data}) => {
      echarts.registerMap('USA', data, {
        // Move Alaska to the bottom left of United States
        Alaska: {      
            left: -129,   // Upper left longitude            
            top: 25,      // Upper left latitude            
            width: 15     // Range of longitude
        },
        // Hawaii
        Hawaii: { left: -110, top: 28, width: 5 },
        // Puerto Rico
        'Puerto Rico': { left: -76, top: 26, width: 2 }
      });

      if(!isCanceled) setReady(true);
    });

    return () => {isCanceled = true;}

  }, []);

  useEffect(() => {
    let isCanceled = false;
    axios.get(`./assets/UsaStatesCases.json`).then( ({data}) => {
      if(!isCanceled) {
        setCases(data.cases.map( ({name, confirmed, death, increased, deathRate}) => {
          return {
            name: name,
            value: confirmed.replace(/,/g,''),
            death: death,  
            lethality: deathRate 
          }
        }));
      }
      // setReady(loaded);
    });
    return () => {isCanceled = true;}
  }, []);

  const getLoadingOption = () => {
    return {
      text: 'Data Loading ...',
    };
  };

  const onChartReady = (chart) => {
    if(Array.isArray(cases) && cases.length > 0) {
      setTimeout(() => { chart.hideLoading(); }, 1000);
    }
  };

  const getOption = () => {
    return {
      title:  {
          x: 'center',
          text: 'Cases by State in USA',
          subtext: 'Data from https://www.worldometers.info/coronavirus/country/us/',
          textStyle: {fontSize: 18},
      },
      visualMap: {
        show: true,
        type: 'piecewise',
        min: 0,
        max: 100000,
        align: 'left',
        top: '5%',
        // bottom: '25%',
        left: 'center',
        inRange: { color: [ '#ffc0b1', '#ff8c71', '#ef1717', '#9c0505' ] },
        // cases number ranges: greater number indicates more severe epidemic area
        pieces: [ 
          {min: 1000},
          {min: 500, max: 999},
          {min: 200, max: 499},
          {min: 50, max: 199},
          {min: 10, max: 49},
          {min: 1, max: 9},
        ],
        padding: 30,
        orient: 'horizontal',
        showLabel: true,
        text: ['Outbreak', 'Minor'],
        itemWidth: 10,
        itemHeight: 10,
        textStyle: { fontSize: 12, fontWeight: 'bold' }
      },
      toolbox: { feature: { saveAsImage: {} } },
      tooltip: {
        formatter: (params) => {
          let name = params.name;
          let death = 0, lethality = 0;
          if(params.data) {
            lethality = params.data.lethality;
            death = params.data.death;
          }
          let tipString = '';
          let value = ((params.value || "No Case") + '').split('.');
          if(!params.value) {
            tipString = `<b>${name}</b><br />Confirmed: ${value}`;
          } else {
            value = value[0].replace(/(\d{1,3})(?=(?:\d{3})+(?!\d))/g, '$1,');
            name = titleize(pinyin(name, {removeTone: true}));
            tipString = `<b>${name}</b><br />Confirmed: ${value}<br />Death:\t${death}<br />Lethality:\t${lethality}`;
          }
          return tipString
        }
      },
      // bottom: '4%',
      series: [{
        left: '3%', right: '8%', top: '16%', bottom: '3%', // similar to grid property
        type: 'map',
        name: '',
        geoIndex: 0,
        data: cases, // area(provinces) data
        map: 'USA',
        silent: false, // province area is clickable
        // layoutCenter: ['30%', '30%'],
        label: { normal: { show: true, fontSize:'8', color: 'rgba(0,0,0,0.7)' }}, 
        itemStyle: {
          normal:{ 
            borderColor: 'rgba(0, 0, 0, 0.7)',
            areaColor: '#B2E5BC'  // default area color 
          },
          emphasis:{
              areaColor: '#53adf3', // change color when click
              shadowOffsetX: 0,
              shadowOffsetY: 0,
              shadowBlur: 20,           
              borderWidth: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        mapType: 'USA',        
        zoom: 1.0,
        roam: false,
        showLegendSymbol: false,
        rippleEffect: { show: true, brushType: 'stroke', scale: 2.5, period: 4 },
      }]
    }
  }

  const getModerateHeight = () => {
    let mediaQuery = window.matchMedia("(orientation: portrait)");
    // console.log('sss', mediaQuery);
    if(mediaQuery.matches) {
      if(document.body.clientWidth < 1024) {
        return "40vh";
      }        
    }
    return "55vh";
  }

  return (
    <ReactEcharts 
      style={{height: '55vh'}}
      echarts={echarts}
      option={getOption()}
      loadingOption={getLoadingOption()}
      onChartReady={onChartReady}
      showLoading={!loaded}
      notMerge={true}
      lazyUpdate={true}
      theme={"theme_name"}
      // onEvents={EventsDict}
      // opts={} 
    />
  )
}