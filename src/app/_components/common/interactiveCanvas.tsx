'use client';

import { Coordinate, Mapping, ShapeDescription } from '@/utils/types';
import { FC, useCallback, useEffect, useRef } from 'react';

interface InteractiveCanvasProps {
  boundary: number[];
  mapping: Mapping[];
  onChange?: (key: ShapeDescription | null) => void;
}

const InteractiveCanvas: FC<InteractiveCanvasProps> = ({
  boundary,
  mapping,
  onChange = () => {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isPointInsidePolygon = (x: number, y: number, polygon: Coordinate[]) => {
    let isInside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i].x;
      const yi = polygon[i].y;
      const xj = polygon[j].x;
      const yj = polygon[j].y;

      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        isInside = !isInside;
      }
    }

    return isInside;
  };

  const findMatchingKey = useCallback(
    (x: number, y: number, mapping: Mapping[]): ShapeDescription | null => {
      for (const shape of mapping) {
        for (const polygon of shape.polygons) {
          if (isPointInsidePolygon(x, y, polygon)) {
            return {
              name: shape.name,
              active: shape.active,
              highlight: shape.highlight,
            };
          }
        }
      }

      return null; // Return null if no match is found
    },
    []
  );

  const handleCanvasClick = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const relativeX = (event.clientX - canvasRect.left) * (boundary[0] / canvasRect.width);
      const relativeY = (event.clientY - canvasRect.top) * (boundary[1] / canvasRect.height);

      // Log pressed coordinates
      // console.log('Pressed Coordinates:', { x: Math.floor(relativeX), y: Math.floor(relativeY) });

      // Find matching key
      const matchingKey = findMatchingKey(Math.floor(relativeX), Math.floor(relativeY), mapping);
      // console.log('Matching Key:', matchingKey);

      onChange(matchingKey);
    },
    [boundary, findMatchingKey, mapping, onChange]
  );

  useEffect(() => {
    const canvas = canvasRef.current;

    // Check if canvas is not null before using it
    if (!canvas) return;

    // Get context from canvas
    const context = canvas.getContext('2d');

    // Check if context is not null before using it
    if (!context) return;

    // Add event listener using the memoized function
    canvas.addEventListener('click', handleCanvasClick);

    // Cleanup function to remove the event listener when the component unmounts
    return () => {
      canvas.removeEventListener('click', handleCanvasClick);
    };
  }, [handleCanvasClick]);

  return <canvas className="w-full h-full" ref={canvasRef} />;
};

export default InteractiveCanvas;
