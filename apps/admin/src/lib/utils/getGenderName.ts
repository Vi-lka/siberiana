import type { GenderEnum } from "@siberiana/schemas";

export default function getGenderName(gender: GenderEnum): string {
  switch (gender) {
    case "male":
      return "Муж.";

    case "female":
      return "Жен.";

    case "":
        return "__"

    default:
      return gender;
  }
}
