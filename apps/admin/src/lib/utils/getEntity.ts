import {
  ArtifactsForm,
  BookGenresForm,
  BooksForm,
  CountriesForm,
  CulturesForm,
  DistrictsForm,
  EthnosForm,
  LocationsForm,
  MaterialsForm,
  ModelsForm,
  MonumentsForm,
  PeriodicalsForm,
  PersonsForm,
  RegionsForm,
  SetsForm,
  SettlementsForm,
  TechniquesForm,
} from "@siberiana/schemas";
import type { EntityEnum } from "@siberiana/schemas";

export function getEntityType(entity: EntityEnum) {
  switch (entity) {
    case "artifacts":
      return ArtifactsForm;
    case "cultures":
      return CulturesForm;
    case "ethnosSlice":
      return EthnosForm;
    case "materials":
      return MaterialsForm;
    case "techniques":
      return TechniquesForm;
    case "sets":
      return SetsForm;
    case "monuments":
      return MonumentsForm;
    case "models":
      return ModelsForm;
    case "books":
      return BooksForm;
    case "bookGenres":
      return BookGenresForm;
    case "periodicals":
      return PeriodicalsForm;
    case "locations":
      return LocationsForm;
    case "countries":
      return CountriesForm;
    case "regions":
      return RegionsForm;
    case "districts":
      return DistrictsForm;
    case "settlements":
      return SettlementsForm;
    case "persons":
      return PersonsForm;

    default:
      const exhaustiveCheck: never = entity;
      throw new Error(`Unhandled case: ${exhaustiveCheck}`);
  }
}
