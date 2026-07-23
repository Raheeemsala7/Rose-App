import LoginForm from '@/src/features/auth/_components/login-form'
import { Suspense } from 'react';

export  async function Page({
  searchParams,
}: {
  searchParams: Promise<{ callbackUrl?: string }>;
}) {
  const params = await searchParams;  return (
      <Suspense fallback={<p>loading...</p>}>
        <LoginForm callbackUrl={params.callbackUrl}  />
      </Suspense>
  )
}

export default Page