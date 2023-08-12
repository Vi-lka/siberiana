import type { DictionaryType } from "@siberiana/schemas";

export default function getUserRole(role: string, dict: DictionaryType): string {
    switch (role) {
        case "administrator":
          return dict.account.roles.admin;
    
        case "researcher":
          return dict.account.roles.research;
    
        case "moderator":
          return dict.account.roles.moder;
    
        default:
          return role;
      }
}