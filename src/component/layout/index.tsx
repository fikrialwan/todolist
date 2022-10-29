import { ReactNode } from "react";
import Navbar from "./navbar";

interface Props {
  children: ReactNode;
}

export default function Layout({ children }: Props) {
  return (
    <div className="min-h-screen flex flex-col bg-custom-grey-primary">
      <Navbar />
      <main className="flex-1 px-5 flex justify-center">
        <div className="max-w-5xl w-full py-10">{children}</div>
      </main>
    </div>
  );
}
