import Link from 'next/link';

export default function Nav() {
  return (
    <nav>
      <ul className="flex justify-between items-center gap-4 text-sm">
        <li>
          <Link href="/recettes">Faire une liste</Link>
        </li>
        <li>
          <Link href="/cuisine">Passer en cuisine</Link>
        </li>
      </ul>
    </nav>
  );
}
