import type { Book } from '../types';

const books: Book[] = [
    {
        id: '1',
        title: 'To Kill a Mockingbird',
        author: 'Harper Lee',
        description: 'A novel about the serious issues of rape and racial inequality.',
        coverImage: 'https://covers.openlibrary.org/b/id/8225261-L.jpg',
        publishedDate: 1960,
        genre: 'Fiction',
        comments: [],
    },
    {
        id: '2',
        title: '1984',
        author: 'George Orwell',
        description: 'A dystopian novel set in a totalitarian society ruled by Big Brother.',
        coverImage: 'https://covers.openlibrary.org/b/id/7222246-L.jpg',
        publishedDate: 1949,
        genre: 'Dystopian',
        comments: [],
    },
    {
        id: '3',
        title: 'Pride and Prejudice',
        author: 'Jane Austen',
        description: 'A romantic novel that also critiques the British landed gentry at the end of the 18th century.',
        coverImage: 'https://covers.openlibrary.org/b/id/8091016-L.jpg',
        publishedDate: 1813,
        genre: 'Romance',
        comments: [],
    },
    {
        id: '4',
        title: 'The Great Gatsby',
        author: 'F. Scott Fitzgerald',
        description: 'A novel about the American dream and the roaring twenties.',
        coverImage: 'https://covers.openlibrary.org/b/id/7352162-L.jpg',
        publishedDate: 1925,
        genre: 'Classic',
        comments: [],
    },
    {
        id: '5',
        title: 'The Hobbit',
        author: 'J.R.R. Tolkien',
        description: 'A fantasy novel and prelude to The Lord of the Rings.',
        coverImage: 'https://covers.openlibrary.org/b/id/6979861-L.jpg',
        publishedDate: 1937,
        genre: 'Fantasy',
        comments: [],
    },
];

export default books;
