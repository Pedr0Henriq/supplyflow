import { api } from './api';
import type { Financial } from '../types/financial';

export type CreateFinancialPayload = Omit<Financial, 'id' | 'createdAt'>;
export type UpdateFinancialPayload = Partial<CreateFinancialPayload>;

export const FinancialService = {
  findAll: async (): Promise<Financial[]> => {
    const { data } = await api.get<Financial[]>('/financial');
    return data;
  },

  findOne: async (id: number): Promise<Financial> => {
    const { data } = await api.get<Financial>(`/financial/${id}`);
    return data;
  },

  create: async (payload: CreateFinancialPayload): Promise<Financial> => {
    const { data } = await api.post<Financial>('/financial', payload);
    return data;
  },

  update: async (id: number, payload: UpdateFinancialPayload): Promise<Financial> => {
    const { data } = await api.patch<Financial>(`/financial/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/financial/${id}`);
  },
};