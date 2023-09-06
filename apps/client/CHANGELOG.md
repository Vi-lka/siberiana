# @siberiana/client

## 0.3.0

### Minor Changes

- 4aa396d: Add handlers:

  - ClientHydration.tsx (fix client hydration errors in radix)
  - ErrorHandler.tsx (toast or Not Found)

  Add components:

  - NotFound.tsx
  - RowBigBlockBelowSkeleton.tsx + RowBigBlockBelowSkeleton.tsx +
    RowBlockBelowSkeleton.tsx + BreadcrumbsSkeleton.tsx
  - PaginationControls.tsx
  - ImgTextBelow.tsx
  - MapHtml.tsx

- a0ee07f: Add all for strapi cms data

### Patch Changes

- Updated dependencies [1a294e2]
- Updated dependencies [a47a13c]
- Updated dependencies [a0ee07f]
  - @siberiana/ui@0.3.0
  - @siberiana/schemas@0.2.0

## 0.2.0

### Minor Changes

- 67b8562: Add Header: Static Internationalization + ThemeProvider + Navigation
- 62cede7: Add Home search field + default button component
- ab2fc58: Fetch data from Strapi + add ReactMarkdown + add api revalidate route
- 857925a: Add Internationalization ('ru', 'en', ... any from Strapi)
- 16f986f: Add queries:

  - strapi-client (Questions)
  - strapi-server (getCustomBlock)

  Add utils:

  - getURL.ts (for storage selection)
  - ReactQueryProvider.tsx

  Add components:

  1. home:

  - CustomBlock.tsx
  - Quiz.tsx

  2. skeletons:

  - RowBlockSkeleton.tsx
  - QuizSkeleton.tsx

  3. thumbnails:

  - ImgTextOn.tsx

- f7f874a: Add pages:

  - objects
  - organizations

  Add utils:

  - getLinkDir.ts (for handle absolute urls)

  Add components:

  1. ui:

  - ErrorToast.tsx (handle errors)

- 720116d: Add Home images slider (keen-slider)

### Patch Changes

- ab2fc58: Fix TypeError: fetch failed - set runtime = 'edge'
- 720116d: Add static dictionaties instead of Strapi languages
- ab2fc58: Fix ReactMarkdown output from Strapi (add remarkPlugins +
  rehypePlugins + whitespace-pre-wrap)
- ab2fc58: Fix error "Sharp Missing In Production"
- ab2fc58: Fix Next cache error: Failed to update tags manifest. [Error: EACCES:
  permission denied]
- ab2fc58: Fix environment variables for buildtime / runtime Next.js
- 16f986f: Fix Images loading (delete ImageComponent) + Images placeholder
- Updated dependencies [62cede7]
- Updated dependencies [720116d]
- Updated dependencies [67b8562]
- Updated dependencies [ab2fc58]
- Updated dependencies [62cede7]
- Updated dependencies [857925a]
  - @siberiana/schemas@0.1.0
  - @siberiana/ui@0.2.0

## 0.1.0

### Minor Changes

- Начальная настройка
