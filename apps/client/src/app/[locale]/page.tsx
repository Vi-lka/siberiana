export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-beaver w-fit">@siberiana/client</h1>
      {locale}
    </main>
  );
}
