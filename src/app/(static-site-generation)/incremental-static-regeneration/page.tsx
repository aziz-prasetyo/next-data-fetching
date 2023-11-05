import Image from 'next/image';
import { AspectRatio } from '@/components/ui/aspect-ratio';

type TCat = {
  id: string;
  url: string;
  width: number;
  height: number;
};

// This function can be named anything
async function searchCats(): Promise<TCat[]> {
  const res = await fetch(`https://api.thecatapi.com/v1/images/search`, {
    next: {
      revalidate: 10
    }
  });
  const cats = await res.json();

  return cats;
}

export default async function IncrementalStaticRegeneration() {
  const cats = await searchCats();
  const cat = cats[0];

  return (
    <main className='flex min-h-screen flex-col items-center p-24'>
      <section className='w-full max-w-2xl'>
        <h1 className='mb-4 text-2xl font-bold'>Search Cats</h1>
        <AspectRatio ratio={16 / 9} className='bg-muted'>
          <Image
            src={cat.url}
            alt='Pussy Cat'
            fill
            className='rounded-md object-cover'
          />
        </AspectRatio>
      </section>
    </main>
  );
}
