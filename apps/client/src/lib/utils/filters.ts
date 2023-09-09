import "server-only";

import type { ArtiFilters, BooksFilters, LocationsArtiNode, LocationsBooksNode, LocationsPAPNode, PAPFilters } from "@siberiana/schemas";
import { BooksNode, PAPCategorysNode } from "@siberiana/schemas";
import { ArtiNode, PAPNode } from "@siberiana/schemas";

export function isParamInString(param: string | undefined, str: string | undefined): boolean {
  if (!!str) {

    if (!!param) {
      return param.split("_").includes(str)
    } else return true
  
  } else return true
}

export function isParamInArray(param: string | undefined, array: { id: string }[]) {
    if (!!param) {
      const paramArray = param.split("_")
      const isInParam = paramArray.some(id => 
        array.some(el => el.id === id)
      )
      return isInParam
    }
    else return true
}

// Oh my God... What I did, this this needs to be wrapped in abstractions

export function filterArtifacts(result: ArtiFilters, searchParams: { [key: string]: string | string[] | undefined }) {
  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const countryIds = searchParams['countryArtifacts'] as string | undefined
  const regionIds = searchParams['regionArtifacts'] as string | undefined
  const districtIds = searchParams['districtArtifacts'] as string | undefined
  const settlementIds = searchParams['settlementArtifacts'] as string | undefined
  const licenseIds = searchParams['licenseArtifacts'] as string | undefined
  const cultureIds = searchParams['culture'] as string | undefined
  const setIds = searchParams['set'] as string | undefined
  const monumentIds = searchParams['monument'] as string | undefined
  const techniqueIds = searchParams['technique'] as string | undefined

  const filtered = result.edges.map(elem => {
    if (ArtiNode.safeParse(elem.node).success) {
      const artifactsNode = elem.node as ArtiNode;
  
      // GLOBAL
      const byName = artifactsNode.artifacts.filter(artifact => artifact.displayName.toLowerCase().includes(search ?? ""))
      const byCategories_Collections = byName.filter(artifact => isParamInString(categories, artifact.collection.category.slug) && isParamInString(collections, artifact.collection.slug))
  
      //LOCATIONS
      const byCountry = byCategories_Collections.filter(artifact => isParamInString(countryIds, artifact.location?.country?.id))
      const byRegion = byCountry.filter(artifact => isParamInString(regionIds, artifact.location?.region?.id))
      const byDistrict = byRegion.filter(artifact => isParamInString(districtIds, artifact.location?.district?.id))
      const bySettlement = byDistrict.filter(artifact => isParamInString(settlementIds, artifact.location?.settlement?.id))

      //LICENSE
      const byLicense = artifactsNode.__typename === "License"
        ? bySettlement
        : bySettlement.filter(artifact => isParamInString(licenseIds, artifact.license?.id))
  
      // ARTIFACTS FIELDS
      const byCultures = artifactsNode.__typename === "Culture"
        ? byLicense
        : byLicense.filter(artifact => isParamInString(cultureIds, artifact.culturalAffiliation?.id))
      const bySets = artifactsNode.__typename === "Set"
        ? byCultures
        : byCultures.filter(artifact => isParamInString(setIds, artifact.set?.id))
      const byMonuments = artifactsNode.__typename === "Monument"
        ? bySets
        : bySets.filter(artifact => isParamInString(monumentIds, artifact.monument?.id))
      const byTechniques = artifactsNode.__typename === "Technique"
        ? byMonuments
        : byMonuments.filter(artifact => isParamInArray(techniqueIds, artifact.techniques))
  
      // END
      const filteredEnd = byTechniques

      return {
        value: artifactsNode.id,
        label: artifactsNode.displayName,
        count: filteredEnd.length
      }

    } else {
      const locationsArtiNode = elem.node as LocationsArtiNode;
        
      // GLOBAL
      const byName = locationsArtiNode.locations.map(location => {
        return location.artifacts.filter(artifact => artifact.displayName.toLowerCase().includes(search ?? ""))
      })
      const byCategories_Collections = byName.map(artifacts => {
        return artifacts.filter(artifact => isParamInString(categories, artifact.collection.category.slug) && isParamInString(collections, artifact.collection.slug))
      })
  
      //LOCATIONS
      const byCountry = locationsArtiNode.__typename === 'Country'
        ? byCategories_Collections
        : byCategories_Collections.map(artifacts => {
          return artifacts.filter(artifact => isParamInString(countryIds, artifact.location?.country?.id))
        })
      const byRegion = locationsArtiNode.__typename === 'Region'
        ? byCountry
        : byCountry.map(artifacts => {
          return artifacts.filter(artifact => isParamInString(regionIds, artifact.location?.region?.id))
        })
      const byDistrict = locationsArtiNode.__typename === 'District'
        ? byRegion
        : byRegion.map(artifacts => {
          return artifacts.filter(artifact => isParamInString(districtIds, artifact.location?.district?.id))
        })
      const bySettlement = locationsArtiNode.__typename === 'Settlement'
        ? byDistrict
        : byDistrict.map(artifacts => {
          return artifacts.filter(artifact => isParamInString(settlementIds, artifact.location?.settlement?.id))
        })

      //LICENSE
      const byLicense = bySettlement.map(artifacts => {
        return artifacts.filter(artifact => isParamInString(licenseIds, artifact.license?.id))
      })
  
      // ARTIFACTS FIELDS
      const byCultures = byLicense.map(artifacts => {
        return artifacts.filter(artifact => isParamInString(cultureIds, artifact.culturalAffiliation?.id))
      })
      const bySets = byCultures.map(artifacts => {
        return artifacts.filter(artifact => isParamInString(setIds, artifact.set?.id))
      })
      const byMonuments = bySets.map(artifacts => {
        return artifacts.filter(artifact => isParamInString(monumentIds, artifact.monument?.id))
      })
      const byTechniques = byMonuments.map(artifacts => {
        return artifacts.filter(artifact => isParamInArray(techniqueIds, artifact.techniques))
      })

      // END
      const filteredEnd = byTechniques.map(artifacts => artifacts.length)
  
      const filteredCount = filteredEnd.reduce((a, b) => {
        return a + b;
      })
  
      return {
        value: locationsArtiNode.id,
        label: locationsArtiNode.displayName,
        count: filteredCount
      } 
    }
  })
  return filtered
}

export function filterBooks(result: BooksFilters, searchParams: { [key: string]: string | string[] | undefined }) {
  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const countryIds = searchParams['countryBooks'] as string | undefined
  const regionIds = searchParams['regionBooks'] as string | undefined
  const districtIds = searchParams['districtBooks'] as string | undefined
  const settlementIds = searchParams['settlementBooks'] as string | undefined
  const licenseIds = searchParams['licenseBooks'] as string | undefined
  const bookGenreIds = searchParams['bookGenre'] as string | undefined
  
  const filtered = result.edges.map(elem => {
    if (BooksNode.safeParse(elem.node).success) {
      const booksNode = elem.node as BooksNode;
  
      // GLOBAL
      const byName = booksNode.books.filter(book => book.displayName.toLowerCase().includes(search ?? ""))
      const byCategories_Collections = byName.filter(book => isParamInString(categories, book.collection.category.slug) && isParamInString(collections, book.collection.slug))
  
      //LOCATIONS
      const byCountry = byCategories_Collections.filter(book => isParamInString(countryIds, book.location?.country?.id))
      const byRegion = byCountry.filter(book => isParamInString(regionIds, book.location?.region?.id))
      const byDistrict = byRegion.filter(book => isParamInString(districtIds, book.location?.district?.id))
      const bySettlement = byDistrict.filter(book => isParamInString(settlementIds, book.location?.settlement?.id))

      //LICENSE
      const byLicense = booksNode.__typename === "License"
        ? bySettlement
        : bySettlement.filter(book => isParamInString(licenseIds, book.license?.id))
  
      // BOOKS FIELDS
      const byBookGenre = booksNode.__typename === "BookGenre"
        ? byLicense
        : byLicense.filter(book => isParamInArray(bookGenreIds, book.bookGenres))

      // END
      const filteredEnd = byBookGenre

      return {
        value: booksNode.id,
        label: booksNode.displayName,
        count: filteredEnd.length
      }

    } else {
      const locationsBooksNode = elem.node as LocationsBooksNode;
        
      // GLOBAL
      const byName = locationsBooksNode.locations.map(location => {
        return location.books.filter(book => book.displayName.toLowerCase().includes(search ?? ""))
      })
      const byCategories_Collections = byName.map(books => {
        return books.filter(book => isParamInString(categories, book.collection.category.slug) && isParamInString(collections, book.collection.slug))
      })
  
      //LOCATIONS
      const byCountry = locationsBooksNode.__typename === 'Country'
        ? byCategories_Collections
        : byCategories_Collections.map(books => {
          return books.filter(book => isParamInString(countryIds, book.location?.country?.id))
        })
      const byRegion = locationsBooksNode.__typename === 'Region'
        ? byCountry
        : byCountry.map(books => {
          return books.filter(book => isParamInString(regionIds, book.location?.region?.id))
        })
      const byDistrict = locationsBooksNode.__typename === 'District'
        ? byRegion
        : byRegion.map(books => {
          return books.filter(book => isParamInString(districtIds, book.location?.district?.id))
        })
      const bySettlement = locationsBooksNode.__typename === 'Settlement'
        ? byDistrict
        : byDistrict.map(books => {
          return books.filter(book => isParamInString(settlementIds, book.location?.settlement?.id))
        })

        
      //LICENSE
      const byLicense = bySettlement.map(books => {
        return books.filter(book => isParamInString(licenseIds, book.license?.id))
      })
  
      // PAP FIELDS
      const byBookGenre = byLicense.map(books => {
        return books.filter(book => isParamInArray(bookGenreIds, book.bookGenres))
      })

      // END
      const filteredEnd = byBookGenre.map(books => books.length)
  
      const filteredCount = filteredEnd.reduce((a, b) => {
        return a + b;
      })
  
      return {
        value: locationsBooksNode.id,
        label: locationsBooksNode.displayName,
        count: filteredCount
      } 
    }
  })
  return filtered
}

export function filterProtectedAreaPictures(result: PAPFilters, searchParams: { [key: string]: string | string[] | undefined }) {
  const search = searchParams['search'] as string | undefined
  const categories = searchParams['category'] as string | undefined
  const collections = searchParams['collection'] as string | undefined
  const countryIds = searchParams['countryPAP'] as string | undefined
  const regionIds = searchParams['regionPAP'] as string | undefined
  const districtIds = searchParams['districtPAP'] as string | undefined
  const settlementIds = searchParams['settlementPAP'] as string | undefined
  const licenseIds = searchParams['licensePAP'] as string | undefined
  const protectedAreaIds = searchParams['protectedArea'] as string | undefined
  const protectedAreaCategoryIds = searchParams['protectedAreaCategory'] as string | undefined

  const filtered = result.edges.map(elem => {
    if (PAPNode.safeParse(elem.node).success) {
      const protectedAreaPictureNode = elem.node as PAPNode;
  
      // GLOBAL
      const byName = protectedAreaPictureNode.protectedAreaPictures.filter(pap => pap.displayName.toLowerCase().includes(search ?? ""))
      const byCategories_Collections = byName.filter(pap => isParamInString(categories, pap.collection.category.slug) && isParamInString(collections, pap.collection.slug))
  
      //LOCATIONS
      const byCountry = byCategories_Collections.filter(pap => isParamInString(countryIds, pap.location?.country?.id))
      const byRegion = byCountry.filter(pap => isParamInString(regionIds, pap.location?.region?.id))
      const byDistrict = byRegion.filter(pap => isParamInString(districtIds, pap.location?.district?.id))
      const bySettlement = byDistrict.filter(pap => isParamInString(settlementIds, pap.location?.settlement?.id))

      //LICENSE
      const byLicense = protectedAreaPictureNode.__typename === "License"
        ? bySettlement
        : bySettlement.filter(pap => isParamInString(licenseIds, pap.license?.id))
  
      // PAP FIELDS
      const byProtectedArea = protectedAreaPictureNode.__typename === "ProtectedArea"
        ? byLicense
        : byLicense.filter(pap => isParamInString(protectedAreaIds, pap.protectedArea?.id))
      const byProtectedAreaCategory = byProtectedArea.filter(pap => {
        if (!!protectedAreaCategoryIds && pap.protectedArea?.protectedAreaCategory === null) {
          return false
        } else {
          const str = pap.protectedArea?.protectedAreaCategory?.id
          if (!!str) {

            if (!!protectedAreaCategoryIds) {
              return protectedAreaCategoryIds.split("_").includes(str)
            } else return true
          
          } else return true
        }
      })

      // END
      const filteredEnd = byProtectedAreaCategory

      if (protectedAreaPictureNode.__typename === "License") console.log(filteredEnd.map(item => item.protectedArea))

      return {
        value: protectedAreaPictureNode.id,
        label: protectedAreaPictureNode.displayName,
        count: filteredEnd.length
      }

    } else if (PAPCategorysNode.safeParse(elem.node).success) {
      const categorysPAPNode = elem.node as PAPCategorysNode;

      // GLOBAL
      const byName = categorysPAPNode.protectedAreas.map(paps => {
        return paps.protectedAreaPictures.filter(pap => pap.displayName.toLowerCase().includes(search ?? ""))
      })
      const byCategories_Collections = byName.map(paps => {
        return paps.filter(pap => isParamInString(categories, pap.collection.category.slug) && isParamInString(collections, pap.collection.slug))
      })

      //LOCATIONS
      const byCountry = byCategories_Collections.map(paps => {
        return paps.filter(pap => isParamInString(licenseIds, pap.license?.id))
      })
      const byRegion = byCountry.map(paps => {
        return paps.filter(pap => isParamInString(licenseIds, pap.license?.id))
      })
      const byDistrict = byRegion.map(paps => {
        return paps.filter(pap => isParamInString(licenseIds, pap.license?.id))
      })
      const bySettlement = byDistrict.map(paps => {
        return paps.filter(pap => isParamInString(licenseIds, pap.license?.id))
      })

      //LICENSE
      const byLicense = bySettlement.map(paps => {
        return paps.filter(pap => isParamInString(licenseIds, pap.license?.id))
      })

      // PAP FIELDS
      const byProtectedArea = byLicense.map(paps => {
        return paps.filter(pap => isParamInString(protectedAreaIds, pap.protectedArea?.id))
      })

      // END
      const filteredEnd = byProtectedArea.map(paps => paps.length)
  
      const filteredCount = filteredEnd.reduce((a, b) => {
        return a + b;
      })
  
      return {
        value: categorysPAPNode.id,
        label: categorysPAPNode.displayName,
        count: filteredCount
      } 

    } else {
      const locationsPAPNode = elem.node as LocationsPAPNode;
        
      // GLOBAL
      const byName = locationsPAPNode.locations.map(location => {
        return location.protectedAreaPictures.filter(pap => pap.displayName.toLowerCase().includes(search ?? ""))
      })
      const byCategories_Collections = byName.map(paps => {
        return paps.filter(pap => isParamInString(categories, pap.collection.category.slug) && isParamInString(collections, pap.collection.slug))
      })
  
      //LOCATIONS
      const byCountry = locationsPAPNode.__typename === 'Country'
        ? byCategories_Collections
        : byCategories_Collections.map(paps => {
          return paps.filter(pap => isParamInString(countryIds, pap.location?.country?.id))
        })
      const byRegion = locationsPAPNode.__typename === 'Region'
        ? byCountry
        : byCountry.map(paps => {
          return paps.filter(pap => isParamInString(regionIds, pap.location?.region?.id))
        })
      const byDistrict = locationsPAPNode.__typename === 'District'
        ? byRegion
        : byRegion.map(paps => {
          return paps.filter(pap => isParamInString(districtIds, pap.location?.district?.id))
        })
      const bySettlement = locationsPAPNode.__typename === 'Settlement'
        ? byDistrict
        : byDistrict.map(paps => {
          return paps.filter(pap => isParamInString(settlementIds, pap.location?.settlement?.id))
        })

        
      //LICENSE
      const byLicense = bySettlement.map(paps => {
        return paps.filter(pap => isParamInString(licenseIds, pap.license?.id))
      })
  
      // PAP FIELDS
      const byProtectedArea = byLicense.map(paps => {
        return paps.filter(pap => isParamInString(protectedAreaIds, pap.protectedArea?.id))
      })
      const byProtectedAreaCategory = byProtectedArea.map(paps => {
        return paps.filter(pap => {
          if (!!protectedAreaCategoryIds && pap.protectedArea?.protectedAreaCategory === null) {
            return false
          } else {
            const str = pap.protectedArea?.protectedAreaCategory?.id
            if (!!str) {
  
              if (!!protectedAreaCategoryIds) {
                return protectedAreaCategoryIds.split("_").includes(str)
              } else return true
            
            } else return true
          }
        })
      })

      // END
      const filteredEnd = byProtectedAreaCategory.map(paps => paps.length)
  
      const filteredCount = filteredEnd.reduce((a, b) => {
        return a + b;
      })
  
      return {
        value: locationsPAPNode.id,
        label: locationsPAPNode.displayName,
        count: filteredCount
      } 
    }
  })
  return filtered
}