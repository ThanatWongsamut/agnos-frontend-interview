'use client';

import { FC, useState } from 'react';

import { Mapping, ShapeDescription } from '@/utils/types';

import Image from 'next/image';
import InteractiveCanvas from '../common/interactiveCanvas';

interface QuestionProps {
  header: string;
  config: {
    boundary: number[];
    default: string;
    mapping: Mapping[];
  };
}

const Question: FC<QuestionProps> = ({ header, config }) => {
  const [selected, setSelected] = useState<string>('');
  const [active, setActive] = useState<string>('');
  const [highlight, setHighlight] = useState<string>('');

  const canvasClickHandler = (shape: ShapeDescription | null) => {
    if (shape) {
      if (shape.name === selected) {
        // If the clicked shape is already selected, deselect it
        setSelected('');
        setActive('');
        setHighlight('');
      } else {
        // If a different shape is clicked, update the selection
        setSelected(shape.name);
        setActive(shape.active);
        setHighlight(shape.highlight);
      }
    }
  };

  return (
    <>
      <div className="flex flex-col items-center h-full">
        <span className="text-2xl font-medium text-gray-600">{header}</span>
        <div className="relative w-[339px] h-[400px] sm:h-[600px] sm:w-[509px]">
          {/* Interactive Canvas */}
          <div className="absolute z-30 top-0 left-0 h-full">
            <InteractiveCanvas
              boundary={config.boundary}
              mapping={config.mapping}
              onChange={canvasClickHandler}
            />
          </div>

          {/* Caption Image */}
          {active != '' && (
            <div className="absolute z-20 top-0 left-0 w-full h-full">
              <Image
                src={`/image/${active}`}
                fill={true}
                style={{ objectFit: 'contain' }}
                alt="caption"
              />
            </div>
          )}

          {/* Highlight Image */}
          {highlight != '' && (
            <div className="absolute z-10 top-0 left-0 w-full h-full">
              <Image
                src={`/image/${highlight}`}
                fill={true}
                style={{ objectFit: 'contain' }}
                alt="active"
              />
            </div>
          )}

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
