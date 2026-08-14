export interface TocItem {
  id: string;
  title: string;
}

export function extractTocAndProcessContent(rawHtml: string): { processedHtml: string; tocItems: TocItem[] } {
  const tocItems: TocItem[] = [];
  let index = 1;

  // Regex to match <h2> tags
  const h2Regex = /<h2([^>]*)>([\s\S]*?)<\/h2>/gi;

  const processedHtml = rawHtml.replace(h2Regex, (match, attrs, innerText) => {
    const id = `section-${index}`;
    // Strip HTML tags for clean ToC item title
    const cleanTitle = innerText.replace(/<[^>]+>/g, "").trim();
    tocItems.push({ id, title: cleanTitle });
    index++;

    // Add id to h2 tag
    return `<h2 id="${id}"${attrs}>${innerText}</h2>`;
  });

  return { processedHtml, tocItems };
}
