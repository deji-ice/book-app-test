import { create } from 'zustand';
import { Book } from '@/types';

interface BookStoreState {
    books: Book[];
    addBook: (book: Book) => void;
    removeBook: (id: string) => void;
}

const useBookStore = create<BookStoreState>((set) => ({
    books: [],
    addBook: (book: Book) => set((state) => ({ books: [...state.books, book] })),
    removeBook: (id: string) => set((state) => ({ books: state.books.filter((book) => book.id !== id) })),
}));


export default useBookStore;