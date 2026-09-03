import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Beneficio } from './entities/beneficio.entity';
import { CreateBeneficioDto } from './dto/create-beneficio.dto';
import { UpdateBeneficioDto } from './dto/update-beneficio.dto';

@Injectable()
export class BeneficiosService {
  constructor(
    @InjectRepository(Beneficio)
    private readonly beneficioRepository: Repository<Beneficio>,
  ) {}

  async create(createBeneficioDto: CreateBeneficioDto) {
    const beneficio = this.beneficioRepository.create({
      nombre: createBeneficioDto.nombre,
      valor: createBeneficioDto.valor,
      contrato: { id: createBeneficioDto.contrato_id },
    });

    return this.beneficioRepository.save(beneficio);
  }

  async findAll() {
    return this.beneficioRepository.find({
      relations: {
        contrato: true,
      },
    });
  }

  async findOne(id: number) {
    const beneficio = await this.beneficioRepository.findOne({
      where: { id },
      relations: {
        contrato: true,
      },
    });

    if (!beneficio) {
      throw new NotFoundException('Beneficio no encontrado');
    }

    return beneficio;
  }

  async update(id: number, updateBeneficioDto: UpdateBeneficioDto) {
    const beneficio = await this.findOne(id);

    if (updateBeneficioDto.nombre !== undefined) {
      beneficio.nombre = updateBeneficioDto.nombre;
    }

    if (updateBeneficioDto.valor !== undefined) {
      beneficio.valor = updateBeneficioDto.valor;
    }

    if (updateBeneficioDto.contrato_id !== undefined) {
      beneficio.contrato = {
        id: updateBeneficioDto.contrato_id,
      } as any;
    }

    return this.beneficioRepository.save(beneficio);
  }

  async remove(id: number) {
    const beneficio = await this.findOne(id);

    await this.beneficioRepository.remove(beneficio);

    return {
      mensaje: 'Beneficio eliminado correctamente',
    };
  }
}