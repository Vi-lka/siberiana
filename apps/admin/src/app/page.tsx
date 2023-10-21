import * as React from 'react';
import { SignOutButton } from '~/components/auth/NextAuthButtons';

export default function Home() {

  return (
    <div className="font-Inter flex flex-col items-center">
      Welcome to Admin!
      <SignOutButton className='text-base uppercase font-Inter font-normal px-10 py-6 mt-6' />
    </div>
  );
}
