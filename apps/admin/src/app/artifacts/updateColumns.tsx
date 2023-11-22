"use client";

import type { ArtifactForTable } from "@siberiana/schemas";
import { Checkbox } from "@siberiana/ui";
import type { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { ru } from "date-fns/locale";
import { CheckSquare } from "lucide-react";
import { DataTableColumnHeader } from "~/components/tables/DataTableColumnHeader";

export const updateColumns: ColumnDef<ArtifactForTable>[] = [
    {
      id: "select",
      header: () => <CheckSquare className="h-5 w-5 rounded-[6px]" />,
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          onClick={(e) => e.stopPropagation()}
          className="h-5 w-5 rounded-[6px]"
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "id",
      header: () => <div className="text-center">ID</div>,
      cell: ({ row }) => {
        const id = row.original.id.includes("random")
          ? row.index
          : parseFloat(row.original.id);
        return (
          <div className="w-[1.5rem] break-words text-right text-[8px] font-light">
            {id}
          </div>
        );
      },
    },
    {
      accessorKey: "inventoryNumber",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="Инвентарный номер"
            className="ml-2"
          />
        );
      },
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.inventoryNumber}</p>
        );
      },
    },
    {
      accessorKey: "kpNumber",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="КП номер"
            className="ml-2"
          />
        );
      },
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.kpNumber}</p>
        );
      },
    },
    {
      accessorKey: "goskatalogNumber",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="Госкаталог номер"
            className="ml-2"
          />
        );
      },
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.goskatalogNumber}</p>
        );
      },
    },
    {
      accessorKey: "displayName",
      header: ({ column }) => {
        return (
          <DataTableColumnHeader
            column={column}
            title="Название"
            className="ml-2"
          />
        );
      },
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.displayName}</p>
        );
      },
    },
    {
      accessorKey: "primaryImage",
      header: () => <div className="min-w-[80px] text-center">Фото</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.primaryImage.url}</p>
        );
      },
    },
    {
      accessorKey: "additionalImages",
      header: () => <div className="min-w-[80px] text-center">Доп. Фото</div>,
      cell: ({ row }) => {
        return (
            <div className="flex flex-col gap-3">
                {row.original.additionalImages?.map((image, index) => (
                    <p key={index} className="text-center">{image.url}</p>
                ))}
            </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: () => <div className="text-center">Описание</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.description}</p>
        );
      },
    },
    {
      accessorKey: "culturalAffiliation",
      header: () => <div className="text-center">Культура</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.culturalAffiliation?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "set",
      header: () => <div className="text-center">Комплекс</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.set?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "monument",
      header: () => <div className="text-center">Памятник</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.monument?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "location",
      header: () => <div className="text-center">Место находки</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.location?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "datingRow",
      header: () => <div className="text-center">Датировка</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.datingRow.datingStart} - {row.original.datingRow.datingEnd}</p>
        );
      },
    },
    {
      accessorKey: "dating",
      header: () => <div className="text-center">датировка (string)</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.dating}</p>
        );
      },
    },
    {
      accessorKey: "typology",
      header: () => <div className="text-center">Типология</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.typology}</p>
        );
      },
    },
    {
      accessorKey: "chemicalComposition",
      header: () => <div className="text-center">Химический состав</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.chemicalComposition}</p>
        );
      },
    },
    {
      accessorKey: "mediums",
      header: () => <div className="text-center">Материалы</div>,
      cell: ({ row }) => {
        return (
            <div className="flex flex-col gap-3">
                {row.original.mediums.map((item) => (
                    <p key={item.id} className="text-center">{item.displayName}</p>
                ))}
            </div>
        );
      },
    },
    {
      accessorKey: "techniques",
      header: () => <div className="text-center">Техники</div>,
      cell: ({ row }) => {
        return (
            <div className="flex flex-col gap-3">
                {row.original.techniques.map((item) => (
                    <p key={item.id} className="text-center">{item.displayName}</p>
                ))}
            </div>
        );
      },
    },
    {
      accessorKey: "sizes",
      header: () => <div className="text-center">Размеры</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{JSON.stringify(row.original.sizes)}</p>
        );
      },
    },
    {
      accessorKey: "weight",
      header: () => <div className="text-center">Вес</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.weight}</p>
        );
      },
    },
    {
      accessorKey: "admissionDate",
      header: () => <div className="text-center">Дата приема в фонд</div>,
      cell: ({ row }) => {
        const admissionDate =
          row.original.admissionDate
            ? format(new Date(row.original.admissionDate), "PPpp", { locale: ru })
            : "";
        return <div className="break-words text-center">{admissionDate}</div>;
      },
    },
    {
      accessorKey: "authors",
      header: () => <div className="text-center">Авторы работ</div>,
      cell: ({ row }) => {
        return (
            <div className="flex flex-col gap-3">
                {row.original.authors.map((item) => (
                    <p key={item.id} className="text-center">{item.displayName}</p>
                ))}
            </div>
        );
      },
    },
    {
      accessorKey: "publications",
      header: () => <div className="text-center">Публикации</div>,
      cell: ({ row }) => {
        return (
            <div className="flex flex-col gap-3">
                {row.original.publications.map((item) => (
                    <p key={item.id} className="text-center">{item.displayName}</p>
                ))}
            </div>
        );
      },
    },
    {
      accessorKey: "projects",
      header: () => <div className="text-center">Проекты</div>,
      cell: ({ row }) => {
        return (
            <div className="flex flex-col gap-3">
                {row.original.projects.map((item) => (
                    <p key={item.id} className="text-center">{item.displayName}</p>
                ))}
            </div>
        );
      },
    },
    {
      accessorKey: "donor",
      header: () => <div className="text-center">Донор</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.donor?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "organization",
      header: () => <div className="text-center">Организация</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.organization?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "license",
      header: () => <div className="text-center">Лицензия</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.license?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "model",
      header: () => <div className="text-center">3D Модель</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.model?.displayName}</p>
        );
      },
    },
    {
      accessorKey: "externalLink",
      header: () => <div className="text-center">Внешняя ссылка</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.externalLink}</p>
        );
      },
      },
    {
      accessorKey: "createdBy",
      header: () => <div className="text-center">Создано by</div>,
      cell: ({ row }) => {
        return (
          <div className="break-words text-center">{row.original.createdBy}</div>
        );
      },
    },
    {
      accessorKey: "createdAt",
      header: () => <div className="min-w-[6rem] text-center">Создано at</div>,
      cell: ({ row }) => {
        const createdAt = row.original.createdAt
          ? format(new Date(row.original.createdAt), "PPpp", { locale: ru })
          : "";
        return <div className="break-words text-center">{createdAt}</div>;
      },
    },
    {
      accessorKey: "updatedBy",
      header: () => <div className="text-center">Обновлено by</div>,
      cell: ({ row }) => {
        return (
          <div className="break-words text-center">{row.original.updatedBy}</div>
        );
      },
    },
    {
      accessorKey: "updatedAt",
      header: () => <div className="min-w-[6rem] text-center">Обновлено at</div>,
      cell: ({ row }) => {
        const updatedAt =
          row.original.updatedAt && row.original.updatedBy
            ? format(new Date(row.original.updatedAt), "PPpp", { locale: ru })
            : "";
        return <div className="break-words text-center">{updatedAt}</div>;
      },
    },
];

export const moderatorsUpdateColumns: ColumnDef<ArtifactForTable>[] = [
    ...updateColumns,
    {
      accessorKey: "status",
      header: () => <div className="text-center">Статус</div>,
      cell: ({ row }) => {
        return (
            <p className="text-center">{row.original.status.displayName}</p>
        );
      },
    },
];