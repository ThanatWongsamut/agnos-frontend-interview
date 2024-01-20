'use client';

import { PolygonRecord } from '@/utils/types';
import { FC, useCallback, useEffect, useRef } from 'react';

interface InteractiveCanvasProps {
  boundary: number[];
  mapping: PolygonRecord;
  onChange?: (key: string) => void;
}

const InteractiveCanvas: FC<InteractiveCanvasProps> = ({
  boundary,
  mapping,
  onChange = () => {},
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const isPointInsidePolygon = (x: number, y: number, polygon: number[][]) => {
    let isInside = false;

    for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
      const xi = polygon[i][0];
      const yi = polygon[i][1];
      const xj = polygon[j][0];
      const yj = polygon[j][1];

      if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) {
        isInside = !isInside;
      }
    }

    return isInside;
  };

  const findMatchingKey = useCallback((x: number, y: number, shapes: PolygonRecord) => {
    for (const key in shapes) {
      if (shapes.hasOwnProperty(key)) {
        const polygons = shapes[key];
        for (const polygon of polygons) {
          if (isPointInsidePolygon(x, y, polygon)) {
            return key;
          }
        }
      }
    }

    return null; // Return null if no match is found
  }, []);

  const handleCanvasClick = useCallback(
    (event: MouseEvent) => {
      if (!canvasRef.current) return;

      const canvasRect = canvasRef.current.getBoundingClientRect();
      const relativeX = (event.clientX - canvasRect.left) * (boundary[0] / canvasRect.width);
      const relativeY = (event.clientY - canvasRect.top) * (boundary[1] / canvasRect.height);

      // Log pressed coordinates
      console.log('Pressed Coordinates:', { x: Math.floor(relativeX), y: Math.floor(relativeY) });

      // Find matching key
      const matchingKey = findMatchingKey(Math.floor(relativeX), Math.floor(relativeY), mapping);
      console.log('Matching Key:', matchingKey);

      onChange(matchingKey || '');
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
