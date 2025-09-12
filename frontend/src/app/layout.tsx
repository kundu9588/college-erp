import type { Metadata } from 'next';
import { Providers } from '../store/Providers';
import './globals.css';
import PluginInit from "../helper/PluginInit";
export const metadata: Metadata = {
  title: 'Auth System',
  description: 'A Next.js authentication system',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
         <PluginInit />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}