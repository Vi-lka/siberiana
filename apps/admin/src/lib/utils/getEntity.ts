import { ArtifactsForm, BookGenresForm, BooksForm, CulturesForm, MaterialsForm, ModelsForm, MonumentsForm, PeriodicalsForm, SetsForm, TechniquesForm } from "@siberiana/schemas";
import type {EntityEnum} from "@siberiana/schemas";

export function getEntityType(entity: EntityEnum) {
    switch (entity) {
        case "artifacts": return ArtifactsForm
        case "cultures": return CulturesForm
        case "materials": return MaterialsForm
        case "techniques": return TechniquesForm
        case "sets": return SetsForm
        case "monuments": return MonumentsForm
        case "models": return ModelsForm
        case "books": return BooksForm
        case "bookGenres": return BookGenresForm
        case "periodicals": return PeriodicalsForm
        
        default:
            const exhaustiveCheck: never = entity;
            throw new Error(`Unhandled case: ${exhaustiveCheck}`);
    }
}