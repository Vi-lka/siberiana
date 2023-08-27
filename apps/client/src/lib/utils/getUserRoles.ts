import type { AccountDictType } from "@siberiana/schemas";

export default function getUserRoles(role: string, dict: AccountDictType): string {
    switch (role) {
        case "administrator":
          return dict.roles.admin;
    
        case "researcher":
          return dict.roles.research;
    
        case "moderator":
          return dict.roles.moder;
    
        default:
          return role;
      }
}