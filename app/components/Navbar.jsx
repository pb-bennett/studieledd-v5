import Link from 'next/link';
import Image from 'next/image';
import { useSession, signOut } from 'next-auth/react';

import Logo from './sl-logo.svg';

export default function Navbar() {
  const { data, status } = useSession();
  console.log('data:', data, 'status:', status);
  return (
    <div className="px-8">
      <nav>
        <div className="flex items-center gap-5">
          <Link href="/">
            <Image src={Logo} alt="StudieLedd logo" height={60} quality={100} />
          </Link>
          <Link href="/">
            <h1>StudieLedd</h1>
          </Link>
          <Link href="/about">About</Link>
        </div>
        {status === 'authenticated' ? (
          <div className="flex gap-5">
            <Link href="/dashboard/user">{data.user.name}</Link>
            <a className="pointer" onClick={() => signOut({ callbackUrl: '/login' })}>
              Logout
            </a>
          </div>
        ) : (
          <div className="flex gap-5">
            <Link href="/login">Login</Link>
            <Link href="/register">Register</Link>
          </div>
        )}
      </nav>
    </div>
  );
}
