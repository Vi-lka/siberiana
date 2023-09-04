import type { AccountDict } from "@siberiana/schemas";

export default function getUserRoles(role: string, dict: AccountDict): string {
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