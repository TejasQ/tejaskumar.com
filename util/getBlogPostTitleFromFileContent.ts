export const getBlogPostTitleFromFileContent = (content: string) =>
  content
    .split("\n")[0]
    .replace(/#/gim, "")
    .trim();
