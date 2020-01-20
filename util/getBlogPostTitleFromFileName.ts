export const getBlogPostTitleFromFileName = (fileName: string) => fileName.split("__")[1].replace(".md", "");
