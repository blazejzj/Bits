export interface Post {
    id: number;
    title: string;
    text: string;
    categoryId: number;
    published_at: Date;
    updated_at: Date;
    published: boolean;
}
