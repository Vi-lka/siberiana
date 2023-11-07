//.........................CATEGORY.........................//
export function createCategory() {
    const mutation = `
        mutation CreateCategory($input: CreateCategoryInput!) {
            createCategory(input: $input) {
                displayName
            }
        }
    `
    return mutation
}

export function updateCategory() {
    const mutation = `
        mutation UpdateCategory($updateCategoryId: ID!, $input: UpdateCategoryInput!) {
            updateCategory(id: $updateCategoryId, input: $input) {
                displayName
            }
        }
    `
    return mutation
}

export function deleteCategory() {
    const mutation = `
        mutation DeleteCategory($deleteCategoryId: ID!) {
            deleteCategory(id: $deleteCategoryId)
        }
    `
    return mutation
}

//.........................COLLECTION.........................//
export function createCollection() {
    const mutation = `
        mutation CreateCollection($input: CreateCollectionInput!) {
            createCollection(input: $input) {
                displayName
            }
        }
    `
    return mutation
}

export function updateCollection() {
    const mutation = `
        mutation UpdateCollection($updateCollectionId: ID!, $input: UpdateCollectionInput!) {
            updateCollection(id: $updateCollectionId, input: $input) {
                displayName
            }
        }
    `
    return mutation
}

export function deleteCollection() {
    const mutation = `
        mutation DeleteCollection($deleteCollectionId: ID!) {
            deleteCollection(id: $deleteCollectionId)
        }
    `
    return mutation
}