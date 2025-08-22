// app/layout.tsx
import type { Metadata } from "next";
import "@/app/globals.css";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { ReactQueryProvider } from "@/components/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub — routing homework",
};

export default function RootLayout({ 
  children, 
  modal 
}: { 
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Header />
          {children}
          {modal}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
