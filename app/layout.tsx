// app/layout.tsx
import type { Metadata } from "next";
import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import { ReactQueryProvider } from "../components/providers/ReactQueryProvider";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "NoteHub — routing homework",
};

export default function RootLayout({ 
  children
}: { 
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ReactQueryProvider>
          <Header />
          {children}
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
