interface User {
    id: string;
    userName: string;
    email: string;
    password: string;
    followers: string[];
    following: string[];
}

interface Book {
    id: string;
    title: string;
    author: string;
    description: string;
    coverImage: string;
    publishedDate: number;
    genre: string;
    comments: Comment[];
}

interface Comment {
    id: string;
    userId: string;
    rating?: number;
    comment: string;
}

export type { User, Book, Comment };