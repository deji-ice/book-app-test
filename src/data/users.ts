import type { User } from '../types';

const users: User[] = [
    {
        id: '1',
        userName: 'alice',
        email: 'alice@example.com',
        password: 'password123',
        followers: [2],
        following: [2, 3],
    },
    {
        id: '2',
        userName: 'bob',
        email: 'bob@example.com',
        password: 'password456',
        followers: [1, 3],
        following: [1],
    },
    {
        id: '3',
        userName: 'charlie',
        email: 'charlie@example.com',
        password: 'password789',
        followers: [],
        following: [1, 2],
    },
    {
        id: '4',
        userName: 'diana',
        email: 'diana@example.com',
        password: 'passwordabc',
        followers: [1, 2],
        following: [3],
    },
    {
        id: '5',
        userName: 'edward',
        email: 'edward@example.com',
        password: 'passwordxyz',
        followers: [2, 3, 4],
        following: [],
    },
];

export default users;
