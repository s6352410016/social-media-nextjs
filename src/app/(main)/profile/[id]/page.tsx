import Link from "next/link";

export default async function ProfilePage({ params }: { params: { id: string } }) {
  const { id } = await params;
  return (
    <div>ProfilePage for user {id} <Link href="/feed">back to feed</Link></div>
  );
}
