import type { Metadata } from 'next';
import { redirect } from 'next/navigation';
import type { Language } from '@/lib/content';
import type { RoleId } from '@/lib/roles';
import { isValidRoleId, ROLE_META, VALID_ROLE_IDS } from '@/lib/routing';
import RoleQuiz from './_components/role-quiz';

export function generateStaticParams() {
  return VALID_ROLE_IDS.map((id) => ({ roleId: id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ roleId: string }>;
}): Promise<Metadata> {
  const { roleId } = await params;
  if (!isValidRoleId(roleId)) {
    return { title: 'Invalid Role | Accionables' };
  }
  const meta = ROLE_META[roleId];
  return {
    title: meta.titleEn,
    description: meta.descEn,
    robots: { index: false, follow: false },
    openGraph: {
      title: meta.titleEn,
      description: meta.descEn,
    },
  };
}

export default async function RolePage({
  params,
  searchParams,
}: {
  params: Promise<{ roleId: string }>;
  searchParams: Promise<{ lang?: string }>;
}) {
  const { roleId } = await params;

  if (!isValidRoleId(roleId)) {
    redirect('/assessment?error=invalid-role');
  }

  const { lang } = await searchParams;
  const initialLanguage: Language | null = lang === 'en' ? 'en' : lang === 'es' ? 'es' : null;

  return <RoleQuiz roleId={roleId as RoleId} initialLanguage={initialLanguage} />;
}
