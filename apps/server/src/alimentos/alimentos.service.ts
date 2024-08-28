import { Injectable, NotFoundException } from '@nestjs/common';
import { Alimento } from './alimentos.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike, UpdateResult } from 'typeorm';
import { AlimentoDTO } from './DTOs/alimento.dto';

@Injectable()
export class AlimentosService {
  constructor(
    @InjectRepository(Alimento)
    private readonly repository: Repository<Alimento>,
  ) {}

  // Seleciona alimentos
  async getAlimentos(nomeAlimento?: string): Promise<Alimento[]> {
    if (nomeAlimento) {
      return this.repository.find({
        where: {
          alimento: ILike(`%${nomeAlimento}%`),
        },
      });
    }
    return this.repository.find();
  }

  // Método para inserir um novo alimento
  async insertAlimentos(alimentoInsert: AlimentoDTO): Promise<Alimento> {
    const novoAlimento = this.repository.create(alimentoInsert);
    return this.repository.save(novoAlimento);
  }

  // Méotodo para atualizar um alimento
  async updateAlimento(id: number, alimentoUpdate: AlimentoDTO): Promise<Alimento> {
    const existingAlimento = await this.repository.findOne({ where: { id } });
    if (!existingAlimento) {
      throw new NotFoundException(`Alimento with ID ${id} not found`);
    }
    
    const alimentoNovo = this.repository.create(alimentoUpdate);
    await this.repository.update(id, alimentoNovo);
    return this.repository.findOne({ where: { id } });
  }

  // Método para remover um alimento
  async removeAlimento(id: number): Promise<Alimento> {
    const existingAlimento = await this.repository.findOne({where: {id}});
    if (!existingAlimento) {
      throw new NotFoundException(`Alimento with ID ${id} not found`);
    }

    await this.repository.delete({id: id});
    return existingAlimento;
  }
}
