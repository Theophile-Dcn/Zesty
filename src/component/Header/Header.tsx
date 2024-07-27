import Link from 'next/link';
import { MdOutlineLocalGroceryStore } from 'react-icons/md';
import Nav from './Nav';

export default async function Header() {
  return (
    <header className="flex justify-between items-center p-4 absolute top-0 left-0 right-0 border-b-2 border-gray-400">
      <Link href="/" className="text-2xl font-bold flex items-center gap-2">
        Zesty
        <MdOutlineLocalGroceryStore />
      </Link>

      <Nav />
    </header>
  );
}
