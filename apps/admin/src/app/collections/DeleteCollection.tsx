"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@tanstack/react-query";
import request from "graphql-request";
import { AlertCircle, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

import {
  Alert,
  AlertDescription,
  AlertTitle,
  Button,
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Separator,
  useToast,
} from "@siberiana/ui";
import { cn } from "@siberiana/ui/src/lib/utils";

import { deleteCollection } from "~/lib/mutations/collections";
import getShortDescription from "~/lib/utils/getShortDescription";

export default function DeleteCollection({
  id,
  name,
  className,
}: {
  id: string;
  name: string;
  className?: string;
}) {
  const [loading, setLoading] = React.useState(false);
  const [sureQuestion, setSureQuestion] = React.useState(false);
  const [openDialog, setOpenDialog] = React.useState(false);
  const { toast } = useToast();
  const router = useRouter();
  const session = useSession();

  React.useEffect(() => {
    if (!openDialog) setSureQuestion(false);
  }, [openDialog]);

  const requestHeaders = {
    Authorization: `Bearer ${session.data?.access_token}`,
    "Content-Type": "application/json",
  };

  const mutation = useMutation({
    mutationKey: ["deleteCollection", requestHeaders],
    mutationFn: (id: string) =>
      request(
        `${process.env.NEXT_PUBLIC_SIBERIANA_API_URL}/graphql`,
        deleteCollection(),
        { deleteCollectionId: id },
        requestHeaders,
      ),
    onMutate: () => setLoading(true),
    onError: (err) => {
      setLoading(false);
      setOpenDialog(false);
      toast({
        variant: "destructive",
        title: "Oшибка!",
        description: <p>{getShortDescription(err.message)}</p>,
        className: "font-Inter",
      });
      console.log(err);
    },
    onSuccess: () => {
      setLoading(false);
      setOpenDialog(false);
      toast({
        title: "Успешно!",
        description: "Коллекция удалена",
        className: "font-Inter",
      });
      router.refresh();
    },
  });

  const handleDelete = () => {
    mutation.mutate(id);
    setSureQuestion(false);
  };

  return (
    <Dialog open={openDialog} onOpenChange={setOpenDialog}>
      <DialogTrigger asChild>
        <Button
          disabled={loading}
          variant={"destructive"}
          className={cn("flex h-fit w-fit items-center gap-1 p-2", className)}
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </DialogTrigger>
      <DialogContent className="font-Inter">
        <DialogHeader>
          <DialogTitle>Удалить</DialogTitle>
          <DialogDescription>
            Коллекцию:{" "}
            <span className="break-all text-xs font-semibold lg:text-base">
              {name}
            </span>
          </DialogDescription>
        </DialogHeader>
        {loading ? (
          <Loader2 className="mx-auto mt-3 h-12 w-12 animate-spin" />
        ) : (
          <>
            <Separator />
            {sureQuestion ? (
              <div className="pt-3">
                <h1 className="mb-6 text-center text-2xl font-bold">
                  Вы <span>точно</span> уверены?
                </h1>
                <div className="flex w-full items-center justify-center gap-6">
                  <DialogClose asChild>
                    <Button variant={"destructive"} onClick={handleDelete}>
                      Да, Удалить!
                    </Button>
                  </DialogClose>
                  <DialogClose asChild>
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={() => setSureQuestion(false)}
                    >
                      Нет, Отмена
                    </Button>
                  </DialogClose>
                </div>
              </div>
            ) : (
              <div className="pt-3">
                <h1 className="mb-3 text-center text-2xl font-bold">
                  Вы уверены?
                </h1>
                <Alert variant="destructive" className="mb-6">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Внимание!</AlertTitle>
                  <AlertDescription>
                    <p>
                      Это действие{" "}
                      <span className="text-lg font-semibold">
                        удалит все объекты коллекции!!!
                      </span>
                    </p>
                    <h1 className="text-lg font-semibold">
                      Восстановить их нельзя!
                    </h1>
                  </AlertDescription>
                </Alert>
                <div className="flex w-full items-center justify-center gap-6">
                  <Button
                    variant={"destructive"}
                    onClick={() => setSureQuestion(true)}
                  >
                    Удалить
                  </Button>
                  <DialogClose asChild>
                    <Button type="button" variant="secondary">
                      Отмена
                    </Button>
                  </DialogClose>
                </div>
              </div>
            )}
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
