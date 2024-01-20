'use client';

import { FC, useState } from 'react';

import Image from 'next/image';
import InteractiveCanvas from '@components/common/interactiveCanvas';

import { Mapping, ShapeDescription } from '@/utils/types';

interface QuestionProps {
  header: string;
  config: {
    boundary: number[];
    default: string;
    mapping: Mapping[];
  };
  onChange: (answer: string) => void;
}

const Question: FC<QuestionProps> = ({ header, config, onChange }) => {
  const [selected, setSelected] = useState<string>('');
  const [active, setActive] = useState<string[]>([]);
  const [highlight, setHighlight] = useState<string[]>([]);

  const canvasClickHandler = (shape: ShapeDescription | null) => {
    if (shape) {
      if (shape.name === selected) {
        // If the clicked shape is already selected, deselect it
        setSelected('');
        setActive([]);
        setHighlight([]);
        onChange('');
      } else {
        // If a different shape is clicked, update the selection
        setSelected(shape.name);
        setActive(shape.active);
        setHighlight(shape.highlight);
        onChange(shape.name);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-full">
        <span className="text-lg xs:text-2xl font-medium text-gray-600 text-center">{header}</span>
        <div className="relative w-[339px] h-[400px] sm:h-[600px] sm:w-[509px]">
          {/* Interactive Canvas */}
          <div className="absolute z-30 top-0 left-0 h-full w-full">
            <InteractiveCanvas
              boundary={config.boundary}
              mapping={config.mapping}
              onChange={canvasClickHandler}
            />
          </div>

          {/* Caption Image */}

          {active.map((path) => {
            return (
              <div
                className="absolute z-20 top-0 left-0 w-full h-full animate-fade-in transition-opacity"
                key={path}
              >
                <Image
                  src={`/image/${path}`}
                  fill={true}
                  style={{ objectFit: 'contain' }}
                  alt="caption"
                  priority={true}
                />
              </div>
            );
          })}

          {/* Highlight Image */}
          {highlight.map((path) => {
            return (
              <div
                className="absolute z-20 top-0 left-0 w-full h-full animate-fade-in transition-opacity"
                key={path}
              >
                <Image
                  src={`/image/${path}`}
                  fill={true}
                  style={{ objectFit: 'contain' }}
                  alt="active"
                  priority={true}
                />
              </div>
            );
          })}

          {/* Base Image */}
          <Image
            src={`/image/${config.default}`}
            fill={true}
            style={{ objectFit: 'contain' }}
            alt="default"
          />
        </div>
      </div>
    </>
  );
};

export default Question;
