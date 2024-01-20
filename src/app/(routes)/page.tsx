'use client';

import { FC, useState } from 'react';

import Image from 'next/image';

import Card from '@components/common/card';
import Button from '@components/common/button';
import InteractiveCanvas from '@components/common/interactiveCanvas';

import HandPosition from '@assets/config/hand-position.json';

const Page: FC = () => {
  const [showCaption, setShowCaption] = useState<boolean>(false);
  const [showActive, setShowActive] = useState<boolean>(false);
  const [selected, setSelected] = useState<string>('');

  const canvasClickHandler = (key: string) => {
    if (key) {
      if (key === selected) {
        // If the clicked shape is already selected, deselect it
        setShowCaption(false);
        setShowActive(false);
        setSelected('');
      } else {
        // If a different shape is clicked, update the selection
        setShowCaption(true);
        setShowActive(true);
        setSelected(key);
      }
    }
  };

  return (
    <main className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-4 w-full px-6 sm:w-[640px] md:w-[768px] mx-auto justify-center items-center">
        <Card className="h-full">
          <div className="flex flex-col items-center h-full">
            <span className="text-2xl font-medium text-gray-600">
              จุดไหนที่คุณปวดนิ้วมากที่สุด ?
            </span>
            <div className="relative w-[339px] h-[400px] sm:h-[600px] sm:w-[509px]">
              {/* Interactive Canvas */}
              <div className="absolute z-30 top-0 left-0 h-full">
                <InteractiveCanvas
                  boundary={HandPosition.boundary}
                  mapping={HandPosition.mapping}
                  onChange={canvasClickHandler}
                />
              </div>

              {/* Caption Image */}
              {showCaption && (
                <div className="absolute z-20 top-0 left-0 w-full h-full">
                  <Image
                    src={`/image/${selected}-active.png`}
                    fill={true}
                    style={{ objectFit: 'contain' }}
                    alt="caption"
                  />
                </div>
              )}

              {/* Highlight Image */}
              {showActive && (
                <div className="absolute z-10 top-0 left-0 w-full h-full">
                  <Image
                    src={`/image/${selected}-highlight.png`}
                    fill={true}
                    style={{ objectFit: 'contain' }}
                    alt="active"
                  />
                </div>
              )}

              {/* Base Image */}
              <Image
                src="/image/default-finger.png"
                fill={true}
                style={{ objectFit: 'contain' }}
                alt="default"
              />
            </div>
            {showCaption.toString()} {showActive.toString()} {selected}
          </div>
        </Card>

        <Button full> ต่อไป </Button>
      </div>
    </main>
  );
};

export default Page;
