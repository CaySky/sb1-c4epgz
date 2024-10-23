import { atom } from 'jotai';
import { IPRecord } from '../types';

export const ipRecordsAtom = atom<IPRecord[]>([
  {
    id: '1',
    ip: '192.168.1.1',
    region: '亚洲/上海',
    functionality: 'Web服务器',
    notes: '主要web服务器',
    createdAt: '2024-03-15T00:00:00Z',
    updatedAt: '2024-03-15T00:00:00Z'
  }
]);