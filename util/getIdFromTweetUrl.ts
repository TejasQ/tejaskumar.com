export const getIdFromTweetUrl = (url: string) =>
    url.split("/")
        .slice(-1)
        .join("");
