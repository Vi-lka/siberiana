import type { StatusEnum } from "@siberiana/schemas";

export default function getStatusName( status: StatusEnum ): string {
    switch (status) {
        case "listed":
          return "Опубликованно";
    
        case "unlisted":
          return "Скрыто";
    
        case "draft":
          return "Не одобрено";
    
        default:
          return status;
      }
}