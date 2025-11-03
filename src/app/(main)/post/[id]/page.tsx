export default async function PostByIdPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return (
    <div>post by id page</div>
  );
}