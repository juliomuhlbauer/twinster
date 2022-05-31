import { FC, ReactNode } from "react";
import { BottomNav } from "./bottom-nav";
import { Footer } from "./footer";
import { Header } from "./header";

export const Layout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <>
      <Header />
      {children}
      <Footer />
      <BottomNav />
    </>
  );
};
