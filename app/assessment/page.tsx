import AssessmentEntry from './_components/assessment-entry';

export default async function AssessmentPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  return <AssessmentEntry errorParam={error ?? null} />;
}
