import type { ReactNode } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import "./layout.css";

type LayoutProps = {
  children: ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="app-layout">
      <Header />
      <div className="content">
        <Sidebar />
        <main className="page">
          {children}
        </main>
      </div>
    </div>
  );
}
