import React from 'react';
import { PolarLayout } from 'plotly.js';
import Plot, { PlotParams } from 'react-plotly.js';

interface GraphCardProps {
  frequency: number;
  definitionOSS: number;
  popularity: number;
  friendly: number;
  quality: number;
  name: string;
  owner: string;
  provider: string;
  language?: string[];
}

const dimensions: string[] = [
  'Frequency',
  'Definition of OSS',
  'Friendly',
  'Popularity',
  'Quality',
];

const polar: Partial<PolarLayout> = {
  angularaxis: { angle: 20 },
  radialaxis: {
    visible: true,
    range: [0, 100],
    showticklabels: false,
    ticks: '',
    showline: false,
  },
};

const plotConfig: PlotParams = {
  data: [
    {
      type: 'scatterpolar',
      r: [],
      theta: dimensions.concat(dimensions[0]), // Adding the first position at end of array to fill the pentagon
      fill: 'toself',
    },
  ],
  layout: {
    width: 320,
    dragmode: false, // remove zoom
    polar,
    showlegend: false,
  },
  config: {
    displayModeBar: false,
  },
};

const GraphCardComponent: React.FC<GraphCardProps> = ({
  frequency,
  definitionOSS,
  popularity,
  friendly,
  quality,
  name,
  owner,
  provider,
  language,
}: GraphCardProps) => {
  plotConfig.data[0].r = [
    frequency,
    definitionOSS,
    friendly,
    popularity,
    quality,
    frequency,
  ];
  plotConfig.layout.title = `${provider} - ${owner}\\${name}`;
  return (
    <div>
      <Plot
        data={plotConfig.data}
        layout={plotConfig.layout}
        config={plotConfig.config}
      />
      {language && <div>{language.join(`, `)}</div>}
    </div>
  );
};

GraphCardComponent.defaultProps = {
  language: [],
};

export default GraphCardComponent;
