import Image from 'next/image';
import Card from '@components/common/card';
import Button from '@components/common/button';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-white">
      <div className="flex flex-col gap-4 w-full px-6 sm:w-[640px] md:w-[768px] mx-auto justify-center items-center">
        <Card>
          <div className="flex flex-col items-center">
            <span className="text-lg md:text-2xl font-medium text-gray-600">
              จุดไหนที่คุณปวดนิ้วมากที่สุด ?
            </span>
          </div>
        </Card>

        <Button full> ต่อไป </Button>
      </div>
    </main>
  );
}
