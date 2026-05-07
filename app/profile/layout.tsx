import BackgroundScene from '@/components/layout/background-scene';

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="quiz-grid-bg flex min-h-dvh flex-col px-4 py-[clamp(0.5rem,1.5vh,2rem)] sm:px-6">
      <BackgroundScene />
      <div className="relative z-10 mx-auto flex w-full max-w-[860px] flex-1 flex-col">
        {children}
      </div>
    </div>
  );
}
