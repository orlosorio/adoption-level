'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import type { RoleId } from '@/lib/roles';
import TypeSelector, { type AssessmentType } from './type-selector';
import RoleSelector from './role-selector';

type Screen = 'type-selector' | 'role-selector';

export default function AssessmentEntry({ errorParam }: { errorParam?: string | null }) {
  const router = useRouter();
  const t = useTranslations('assessment.errors');
  const [screen, setScreen] = useState<Screen>('type-selector');

  const selectAssessmentType = (type: AssessmentType) => {
    if (type === 'general') {
      router.push('/assessment/general');
    } else if (type === 'company') {
      router.push('/assessment/company');
    } else {
      setScreen('role-selector');
    }
  };

  const selectRole = (roleId: RoleId) => {
    router.push(`/assessment/role-${roleId}`);
  };

  return (
    <>
      {errorParam === 'invalid-role' && (
        <div className="mb-4 rounded-lg border border-red-200 bg-red-50/80 px-4 py-3 text-center text-sm text-red-700 backdrop-blur">
          {t('invalidRole')}
        </div>
      )}

      {screen === 'type-selector' && <TypeSelector onSelect={selectAssessmentType} />}

      {screen === 'role-selector' && <RoleSelector onSelect={selectRole} />}
    </>
  );
}
