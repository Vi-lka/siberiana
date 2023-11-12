import React from "react";
import { format } from "date-fns";
import { ru } from "date-fns/locale";

export default function MetaData({
  createdBy,
  createdAt,
  updatedBy,
  updatedAt,
}: {
  createdBy?: string;
  createdAt?: Date;
  updatedBy?: string;
  updatedAt?: Date;
}) {
  return (
    <div className="font-Inter w-full text-center text-xs">
      {createdBy && createdAt ? (
        <p className="">
          Создал <span className="font-semibold">{createdBy}</span>{" "}
          <span className="italic">
            {format(createdAt, "PPP", { locale: ru })}
          </span>
        </p>
      ) : null}
      {updatedBy && updatedAt ? (
        <p className="">
          Обновил <span className="font-semibold">{updatedBy}</span>{" "}
          <span className="italic">
            {format(updatedAt, "PPP", { locale: ru })}
          </span>
        </p>
      ) : null}
    </div>
  );
}
