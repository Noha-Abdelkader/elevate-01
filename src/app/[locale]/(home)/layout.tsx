import SearchBar from "./_components/search-bar";
import React from "react";
import AsideNav from "./_components/aside-nav";
import { SearchProvider } from "@/components/providers/context/search-context";

export default function HomeLayout({ children  }: { children: React.ReactNode })  {

  return (
    <main className="grid grid-cols-12 gap-4 min-h-screen p-6 max-w-7xl mx-auto ">
      <AsideNav  />
      <div className="col-span-9">
        <SearchProvider>
        {/* top */}
        <SearchBar />
        <div>{children}</div>
        </SearchProvider>
      </div>
    </main>
  );
};

