import { api } from './api';
import type { Client } from '../types/client';

export type CreateClientPayload = Omit<Client, 'id' | 'createdAt' | 'updatedAt'>;
export type UpdateClientPayload = Partial<CreateClientPayload>;

export const ClientsService = {
  findAll: async (): Promise<Client[]> => {
    const { data } = await api.get<Client[]>('/clients');
    return data;
  },

  findOne: async (id: number): Promise<Client> => {
    const { data } = await api.get<Client>(`/clients/${id}`);
    return data;
  },

  create: async (payload: CreateClientPayload): Promise<Client> => {
    const { data } = await api.post<Client>('/clients', payload);
    return data;
  },

  update: async (id: number, payload: UpdateClientPayload): Promise<Client> => {
    const { data } = await api.patch<Client>(`/clients/${id}`, payload);
    return data;
  },

  remove: async (id: number): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },
};