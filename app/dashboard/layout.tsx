import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className='flex flex-col h-screen w-screen overflow-hidden'>
      <Navbar />
      <div className='flex flex-row h-full w-full'>
        <Sidebar />
        <div className='h-screen pb-10 w-full '>{children}</div>
      </div>
    </div>
  );
}
