export default function MainLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <div className="flex min-h-screen">  
        {/* 主内容区 */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    );
  }