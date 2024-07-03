import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1>Welcome ✋🏻</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
    </main>
  );
}
