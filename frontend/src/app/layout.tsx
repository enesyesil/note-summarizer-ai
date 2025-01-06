import './globals.css';

export const metadata = {
  title: 'AI Summarizer Interface',
  description: 'Chat with AI or upload files to get intelligent and neurodiverse friendly summary!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
