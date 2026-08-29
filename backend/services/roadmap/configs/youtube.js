import dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

const searchVideo = async (topic) => {
  try {
    let query = ` freecodecamp ${topic}`;
    let { data } = await axios.get(BASE_URL, {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        q: query,
        maxResults: 1,
        type: 'video',
      },
    });

    if (data.items.length > 0) {
      const video = data.items[0];

      if (video.snippet.channelTitle.toLowerCase().includes('freecodecamp.org')) {
        return {
          title: video.snippet.title,
          channel: video.snippet.channelTitle,
          url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
        };
      }
    }

    query = `${topic} tutorial`;

    ({ data } = await axios.get(BASE_URL, {
      params: {
        key: process.env.YOUTUBE_API_KEY,
        part: 'snippet',
        q: query,
        maxResults: 1,
        type: 'video',
      },
    }));

    if (data.items.length > 0) {
      const video = data.items[0];

      return {
        title: video.snippet.title,
        channel: video.snippet.channelTitle,
        url: `https://www.youtube.com/watch?v=${video.id.videoId}`,
      };
    }

    return null;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export default searchVideo;
