const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;

export const fetchYouTubeMetadata = async (videoUrl) => {
  try {
    const url = new URL(videoUrl);
    const videoId = url.searchParams.get("v");
    if (!videoId) throw new Error("Invalid YouTube URL");

    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&part=snippet,contentDetails&key=${YOUTUBE_API_KEY}`;
    const res = await fetch(apiUrl);
    const data = await res.json();

    if (!res.ok || !data.items || data.items.length === 0) {
      throw new Error("Video not found");
    }

    const video = data.items[0];
    const title = video.snippet.title;
    const thumbnail = video.snippet.thumbnails.high.url;
    const duration = parseISODuration(video.contentDetails.duration);

    return { title, thumbnail, duration };
  } catch (err) {
    console.error("Error fetching YouTube metadata:", err.message);
    return null;
  }
};

function parseISODuration(iso) {
  const match = iso.match(/PT(?:(\d+)M)?(?:(\d+)S)?/);
  if (!match) return "0:00";
  const minutes = parseInt(match[1] || "0", 10);
  const seconds = parseInt(match[2] || "0", 10);
  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
};