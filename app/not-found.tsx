import notFound from '../public/error.svg';
import { Home } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function NotFound() {
  return (
    <main
      className="flex items-center justify-center"
      style={{ height: 'calc(100vh - 64px)' }}
    >
      <div className="flex flex-col items-center justify-center">
        <Image src={notFound.src} alt="404 image" width={350} height={350} />
        <p className="mt-2 text-muted-foreground">
          Oops! This page is not found...
        </p>

        <Link className="mt-4" href="/">
          <Home size={24} />
        </Link>
      </div>
    </main>
  );
}
