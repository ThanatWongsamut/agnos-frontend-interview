'use client';

import { FC, useState } from 'react';
import ReactDOM from 'react-dom';

import Card from '@components/common/card';
import Button from '@components/common/button';
import Question from '@components/question/question';
import Loading from '@components/common/loading';

import useImagePreloader from '@hooks/useImagePreloader';

import AbsConfig from '@assets/config/abs-config.json';
import HandConfig from '@assets/config/hand-config.json';

const Page: FC = () => {
  const [questionState, setQuestionState] = useState<string>('abs');
  const [absAnswer, setAbsAnswer] = useState<string>('');
  const [fingerAnswer, setFingerAnswer] = useState<string>('');

  const preLoaded = useImagePreloader(
    [
      AbsConfig.default,
      HandConfig.default,
      ...AbsConfig.mapping.reduce((accumulator: string[], shape) => {
        return accumulator.concat(shape.active).concat(shape.highlight);
      }, []),
      ...HandConfig.mapping.reduce((accumulator: string[], shape) => {
        return accumulator.concat(shape.active).concat(shape.highlight);
      }, []),
    ].map((src: string) => `/image/${src}`)
  );

  const absChangeHandler = (key: string) => {
    setAbsAnswer(key);
  };

  const nextHandler = () => {
    // Make sure the answer is not empty
    if (absAnswer != '') {
      setQuestionState('finger');
    }
  };

  const fingerChangeHandler = (key: string) => {
    setFingerAnswer(key);
  };

  const submitHandler = () => {
    console.log('Submitting result');
  };

  return (
    <>
      <main className="flex h-screen flex-col items-center justify-center bg-white">
        {!preLoaded ? (
          <Loading />
        ) : (
          <div className="flex flex-col gap-4 w-full px-6 sm:w-[640px] md:w-[768px] mx-auto justify-center items-center">
            <Card className="h-full">
              {questionState == 'abs' && (
                <Question
                  header="จุดไหนที่คุณปวดท้องมากที่สุด ?"
                  config={AbsConfig}
                  onChange={absChangeHandler}
                />
              )}

              {questionState == 'finger' && (
                <Question
                  header="จุดไหนที่คุณปวดนิ้วมากที่สุด ?"
                  config={HandConfig}
                  onChange={fingerChangeHandler}
                />
              )}
            </Card>

            <>
              {questionState == 'abs' && (
                <Button full disabled={absAnswer == ''} onClick={nextHandler}>
                  ต่อไป
                </Button>
              )}

              {questionState == 'finger' && (
                <Button full disabled={fingerAnswer == ''} onClick={submitHandler}>
                  ยืนยัน
                </Button>
              )}
            </>
          </div>
        )}
      </main>
    </>
  );
};

export default Page;
