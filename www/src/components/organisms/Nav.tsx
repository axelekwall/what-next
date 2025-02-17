import Link from 'next/link';
import { FC } from 'react';

const Nav: FC = () => (
  <nav className="flex flex-col lg:flex-row space-x-6 h-full items-end justify-end">
    <p className="md:text-3xl text-2xl hover:text-what-brick">
      <Link href="/" className="cursor-pointer">
        projekt
      </Link>
    </p>
    <p className="md:text-3xl text-2xl hover:text-what-brick">
      <Link href="/studio" className="cursor-pointer">
        studio
      </Link>
    </p>
  </nav>
);

export default Nav;
