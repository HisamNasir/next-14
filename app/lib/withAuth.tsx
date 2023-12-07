'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from './firebase';

const withAuth = (WrappedComponent: React.FC) => {
  return () => {
    const router = useRouter();

    useEffect(() => {
      const unsubscribe = onAuthStateChanged((user) => {
        if (!user) {
          // If not authenticated, redirect to login page
          router.replace('/loginpage');
        }
      });

      return () => unsubscribe();
    }, []);

    return <WrappedComponent />;
  };
};

export default withAuth;
