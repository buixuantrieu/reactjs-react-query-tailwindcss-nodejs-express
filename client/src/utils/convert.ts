const convertEmbedToNormalUrl = (embedUrl: string | undefined) => {
  if (embedUrl) {
    const urlParts = embedUrl.split("/embed/");
    if (urlParts.length > 1) {
      const videoId = urlParts[1];
      return `https://www.youtube.com/watch?v=${videoId}`;
    }
    return "";
  } else {
    return "";
  }
};

const convertToEmbedLink = (url: string | undefined) => {
  if (url) {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:watch\?v=|embed\/|v\/|.+\?v=)|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      const trailerUrl = `https://www.youtube.com/embed/${match[1]}`;
      return trailerUrl;
    } else {
      return "";
    }
  }
  return "";
};
export { convertEmbedToNormalUrl, convertToEmbedLink };
