import { Dialog, DialogContent, DialogTrigger } from "@siberiana/ui";

import ButtonComponent from "./ButtonComponent";

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
        <ButtonComponent className="rounded-3xl px-10 py-6 uppercase">
          {name}
        </ButtonComponent>
      </DialogTrigger>
      <DialogContent className="rounded-b-sm sm:max-w-[425px] sm:rounded-sm">
        {children}
      </DialogContent>
    </Dialog>
  );
}
