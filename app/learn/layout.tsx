import LearnerSidebar from '@/components/ui/LearnerSidebar';

export default function LearnLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-brand-bg">
      <LearnerSidebar />
      <main className="ml-64 min-h-screen">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
