export const metadata = {
  title: "Strategy Dashboard",
  description: "HQ Strategy Playbook",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ja">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}
