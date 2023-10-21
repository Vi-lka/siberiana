export default function getUserRoles( role: string ): string {
    switch (role) {
        case "administrator":
          return "Администратор";
    
        case "researcher":
          return "Исследователь";
    
        case "moderator":
          return "Модератор";
    
        default:
          return role;
      }
}