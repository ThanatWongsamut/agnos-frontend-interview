'use client';

import { FC, useState } from 'react';

import Image from 'next/image';

import Card from '@components/common/card';
import Button from '@components/common/button';
import Question from '@components/question/question';

import HandConfig from '@assets/config/hand-config.json';

const Page: FC = () => {
  return (
    <main className="flex h-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-4 w-full px-6 sm:w-[640px] md:w-[768px] mx-auto justify-center items-center">
        <Card className="h-full">
          <Question header="จุดไหนที่คุณปวดนิ้วมากที่สุด ?" config={HandConfig} />
        </Card>

        <Button full> ต่อไป </Button>
      </div>
    </main>
  );
};

export default Page;
