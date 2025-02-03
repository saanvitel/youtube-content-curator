"use client";
import { useState } from "react";

// Define types for the video item structure
type Video = {
    id: {
        videoId: string;
    };
    snippet: {
        title: string;
        thumbnails: {
            default: {
                url: string;
            };
        };
    };
};

const SearchPage: React.FC = () => {
    const [query, setQuery] = useState<string>("");
    const [videos, setVideos] = useState<Video[]>([]);

    const handleSearch = async () => {
        const response = await fetch(
            `/api/search?query=${encodeURIComponent(query)}`
        );
        console.log(response);
        const data: { items: Video[] } = await response.json();
        setVideos(data.items || []);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for videos"
            />
            <button onClick={handleSearch}>Search</button>
            <div>
                {videos.map((video) => (
                    <div key={video.id.videoId}>
                        <img
                            src={video.snippet.thumbnails.default.url}
                            alt={video.snippet.title}
                        />
                        <p>{video.snippet.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchPage;
