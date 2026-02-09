export interface Chapter {
    id: number;
    number: number;
    title: string | null;
    published_at: string;
    likes: number;
}

export interface Comic {
    id: number;
    title: string;
    alt_title: string | null;
    slug: string;
    author: string | null;
    artist: string | null;
    description: string | null;
    status: string;
    type: string;
    cover: string | null;
    
    // Stats
    total_chapters: number;
    rating: number;
    total_ratings: number;
    total_favorites: number;
    last_update: string;

    // Optional nested data (matches the 'whenLoaded' logic)
    chapters?: Chapter[];
}