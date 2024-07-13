import type { OrganizationTypeEnum } from "@siberiana/schemas";

export default function getOrganiztionTypeName(type: OrganizationTypeEnum): string {
  switch (type) {
    case "archive":
      return "Архив";

    case "library":
      return "Библиотека";
    
    case "museum":
      return "Музей";

    case "other":
      return "Другое";

    case "":
        return "__"

    default:
      return type;
  }
}
