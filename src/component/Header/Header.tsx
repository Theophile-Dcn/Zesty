import Link from 'next/link';
import Nav from './Nav';

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4">
      <Link href="/" className="text-2xl font-bold">
        Zesty
      </Link>
      <Nav />
    </header>
  );
}
