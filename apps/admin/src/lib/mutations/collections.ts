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

export function deleteCategory() {
    const mutation = `
        mutation DeleteCategory($deleteCategoryId: ID!) {
            deleteCategory(id: $deleteCategoryId)
        }
    `
    return mutation
}