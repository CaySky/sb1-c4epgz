export interface IPRecord {
  id: string;
  ip: string;
  region: string;
  functionality: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
  apiKey?: string;
}