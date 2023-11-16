'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '/';

  // const emailHandleSubmit = async e => {
  //   e.preventDefault();
  //   try {
  //     setLoading(true);
  //     console.log(email);
  //     signIn('email', { email });
  //   } catch (err) {
  //     console.error(err);
  //     setLoading(false);
  //     toast.error('An error occured, try again.');
  //   }
  // };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      setLoading(true);
      const result = await signIn('credentials', { email, password, redirect: false });
      setLoading(false);
      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success('Login successful.');
        router.push(callbackUrl);
      }
    } catch (err) {
      console.error(err);
      setLoading(false);
      toast.error('An error occured, try again.');
    }
  };

  return (
    <main>
      <section>
        <form onSubmit={handleSubmit}>
          <h2>Login</h2>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter password" />
          <button className="btn-primary1" disabled={loading || !email || !password}>
            {loading ? 'Please wait...' : 'Submit'}
          </button>
        </form>
        {/* <form onSubmit={emailHandleSubmit}>
          <h2>Login</h2>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Enter email" />
          <button className="btn-primary1" disabled={loading || !email}>
            {loading ? 'Please wait...' : 'Submit'}
          </button>
        </form> */}
        {/* <button className="btn-primary1" onClick={() => signIn('google', { callbackUrl })}>
          Sign in with Google
        </button> */}
      </section>
    </main>
  );
}
