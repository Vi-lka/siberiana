import "client-only";

export default function resetPaginationts(params: URLSearchParams) {
  const hasPage = params.has("page");
  const hasPageArtifacts = params.has("page_artifacts");
  const hasPageBooks = params.has("page_books");
  const hasPagePAP = params.has("page_pap");
  const hasPageHerbariums = params.has("page_herbariums");
  const hasPageDendro = params.has("page_dendro");


  if (hasPage) params.set("page", "1");
  if (hasPageArtifacts) params.set("page_artifacts", "1");
  if (hasPageBooks) params.set("page_books", "1");
  if (hasPagePAP) params.set("page_pap", "1");
  if (hasPageHerbariums) params.set("page_herbariums", "1");
  if (hasPageDendro) params.set("page_dendro", "1");
}
