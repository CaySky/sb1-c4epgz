import { atom } from 'jotai';
import { User } from '../types';

export const userAtom = atom<User | null>(null);

// Mock users for demo
export const MOCK_USERS: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin',
    apiKey: 'admin-api-key-123'
  },
  {
    id: '2',
    username: 'user',
    role: 'user',
    apiKey: 'user-api-key-456'
  }
];