import LeftSidebar from '@/components/left-sidebar'
import Image from "next/image"

import MobileNav from "@/components/mobile-nav"
import RightSidebar from '@/components/right-sidebar'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
  <main className="flex bg-black-3">
<LeftSidebar/>
    <section className=" min-h-screen  flex flex-col flex-1 px-4 sm:px-14">
      <div className="mx-auto flex flex-col w-full max-w-5xl max-sm:px-4">
      <div className="flex h-16 items-center justify-between md:hidden">
      <Image src='/icons/logo.svg' alt= "podcaster logo" width={30} height={30} />
        <MobileNav />
      </div>
      <div className="flex flex-col md:pb-14">
        {/* The reason to keep this toaster and the children together is becuase each toaster belong to a specfic children.For eg profile page has lage related toaster and createlodcast has create podcast realted poster so it makes sense */}
        {/* toaster */}
            {children}
      </div>
      </div>
    </section>
<RightSidebar/>
    
  </main>
  );
}
