'use client';

import { FC, useState } from 'react';
import ReactDOM from 'react-dom';

import Card from '@components/common/card';
import Button from '@components/common/button';
import Question from '@components/question/question';

import AbsConfig from '@assets/config/abs-config.json';
import HandConfig from '@assets/config/hand-config.json';

const PreloadResources = () => {
  // Load default image
  ReactDOM.preload('/image/' + AbsConfig.default, {
    as: 'image',
    fetchPriority: 'high',
  });

  // Load others images
  for (const shape of AbsConfig.mapping) {
    for (const activePath of shape.active) {
      ReactDOM.preload('/image/' + activePath, {
        as: 'image',
        fetchPriority: 'high',
      });
    }

    for (const highlightPath of shape.active) {
      ReactDOM.preload('/image/' + highlightPath, {
        as: 'image',
        fetchPriority: 'high',
      });
    }
  }

  // Load default image
  ReactDOM.preload('/image/' + HandConfig.default, {
    as: 'image',
    fetchPriority: 'high',
  });

  // Load others images
  for (const shape of HandConfig.mapping) {
    for (const activePath of shape.active) {
      ReactDOM.preload('/image/' + activePath, {
        as: 'image',
        fetchPriority: 'high',
      });
    }

    for (const highlightPath of shape.active) {
      ReactDOM.preload('/image/' + highlightPath, {
        as: 'image',
        fetchPriority: 'high',
      });
    }
  }

  return null;
};

const Page: FC = () => {
  const [questionState, setQuestionState] = useState<string>('abs');
  const [absAnswer, setAbsAnswer] = useState<string>('');
  const [fingerAnswer, setFingerAnswer] = useState<string>('');

  PreloadResources();

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
        {/* <Head>
          <link rel="preload" href={`/image/${AbsConfig.default}`} as="image" />

          {AbsConfig.mapping.map((shape: Mapping) => {
            return (
              <link key={shape.name} rel="preload" href={`/image/${shape.name}.png`} as="image" />
            );
          })}

          <link rel="preload" href={`/image/${HandConfig.default}`} as="image" />

          {HandConfig.mapping.map((shape: Mapping) => {
            return (
              <link key={shape.name} rel="preload" href={`/image/${shape.name}.png`} as="image" />
            );
          })}
        </Head> */}

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
      </main>
    </>
  );
};

export default Page;
