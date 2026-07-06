import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from '../../common/prisma/prisma.service.js';
import { CreateClientDto } from './dto/create-client.dto.js';
import { UpdateClientDto } from './dto/update-client.dto.js';

@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: CreateClientDto) {
    const clientExists = await this.prisma.client.findUnique({
      where: { email: data.email },
    });

    if (clientExists) {
      throw new ConflictException('Já existe um cliente cadastrado com este e-mail.');
    }

    return this.prisma.client.create({ data });
  }

  async findAll() {
    return this.prisma.client.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: number) {
    const client = await this.prisma.client.findUnique({ where: { id } });
    if (!client) {
      throw new NotFoundException(`Cliente com ID ${id} não encontrado.`);
    }
    return client;
  }

  async update(id: number, data: UpdateClientDto) {
    await this.findOne(id);

    if (data.email) {
      const emailExists = await this.prisma.client.findFirst({
        where: { email: data.email, NOT: { id } },
      });
      
      if (emailExists) {
        throw new ConflictException('E-mail indisponível');
      }
    }
    
    return this.prisma.client.update({
      where: { id },
      data,
    });
  }

  async remove(id: number) {
    await this.findOne(id);
    return this.prisma.client.delete({ where: { id } });
  }
}