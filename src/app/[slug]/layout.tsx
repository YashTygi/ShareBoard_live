import { GlobalContextProvider } from "@/context/store";
import React, { ReactNode } from "react";

interface SlugProps {
  children: ReactNode; 
}

interface Params {
  slug: string;
}

const HomePageLayout = ({ children }: SlugProps) => {
  return (
    <div>
      <main>
        <GlobalContextProvider>{children}</GlobalContextProvider>
      </main>
    </div>
  );
};

export default HomePageLayout;


export function generateMetadata({params}: {params: Params}) {
  return {
    title: `${params.slug} - ShareBoard`,
  }
}
