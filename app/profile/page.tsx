import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import ProfileDemographicsForm from './profile-demographics-form';

export const dynamic = 'force-dynamic';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) redirect('/');

  return <ProfileDemographicsForm />;
}
