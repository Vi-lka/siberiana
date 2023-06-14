import { Button } from "@siberiana/ui";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <h1 className="text-beaver w-fit">@siberiana/client</h1>

      <Button className="bg-beaverLight hover:bg-beaver text-graphite hover:text-beaverLight mt-6 w-fit rounded-full uppercase">
        Button
      </Button>
    </main>
  );
}
