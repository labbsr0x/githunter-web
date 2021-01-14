import React, { useState } from 'react';
import {
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  Legend,
  PolarAngleAxis,
  Radar,
  Tooltip,
} from 'recharts';

interface RepositoryData {
  frequency: number;
  definitionOSS: number;
  popularity: number;
  friendly: number;
  quality: number;
}

interface PlotConfig {
  width?: number | string;
  height?: number | string;
  outerRadius?: number;
  positionX?: number;
  positionY?: number;
  color?: string;
}

interface RepositoryRadarProps {
  repositoryData: RepositoryData;
  configPlot: PlotConfig;
}

const RepositoryRadar: React.FC<RepositoryRadarProps> = ({
  repositoryData,
  configPlot,
}: RepositoryRadarProps) => {
  const [state, setState] = useState({
    opacity: {
      value: 1,
    },
  });

  const handleMouseEnter = (o: any) => {
    const { dataKey } = o;
    const { opacity } = state;

    setState({
      opacity: { ...opacity, [dataKey]: 0.5 },
    });
  };

  const handleMouseLeave = (o: any) => {
    const { dataKey } = o;
    const { opacity } = state;

    setState({
      opacity: { ...opacity, [dataKey]: 1 },
    });
  };

  const data = [
    {
      name: 'Definition of OSS',
      value: repositoryData.definitionOSS,
      fullMark: 100,
    },
    {
      name: 'Quality',
      value: repositoryData.quality,
      fullMark: 100,
    },
    {
      name: 'Frequency',
      value: repositoryData.frequency,
      fullMark: 100,
    },
    {
      name: 'Popularity',
      value: repositoryData.popularity,
      fullMark: 100,
    },
    {
      name: 'Friendly',
      value: repositoryData.friendly,
      fullMark: 100,
    },
  ];

  return (
    <ResponsiveContainer width={configPlot?.width} height={configPlot?.height}>
      <RadarChart outerRadius={configPlot?.outerRadius} data={data}>
        <PolarGrid />
        <Tooltip />
        <Legend
          wrapperStyle={{ display: 'none' }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        />
        <PolarAngleAxis dataKey="name" />
        <Radar
          dataKey="value"
          stroke={configPlot?.color}
          fill={configPlot?.color}
          fillOpacity={0.6}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
};

export default RepositoryRadar;
