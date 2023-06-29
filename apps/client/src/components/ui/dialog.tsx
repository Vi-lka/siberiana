import { Button, Dialog, DialogContent, DialogTrigger } from "@siberiana/ui";

// I may be will change this without a child, and there will be a component only for authorization
export function DialogComponent({
  name,
  children,
}: {
  name: string;
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-beaverLight text-graphite hover:bg-beaver hover:text-beaverLight rounded-3xl px-10 py-6 uppercase">
          {name}
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-b-sm sm:max-w-[425px] sm:rounded-sm">
        {children}
      </DialogContent>
    </Dialog>
  );
}
