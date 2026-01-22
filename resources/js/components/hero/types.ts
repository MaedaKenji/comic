// resources/js/Components/hero/types.ts
export type HeroItem = {
    id: number;
    title: string;
    cover: string | null;        // from backend
    badge?: string | null;
    chips?: string[];
    watermark?: string;
    link?: string;               // optional route link
};
