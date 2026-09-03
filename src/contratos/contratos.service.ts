import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Contrato } from './entities/contrato.entity';
import { CreateContratoDto } from './dto/create-contrato.dto';
import { UpdateContratoDto } from './dto/update-contrato.dto';

@Injectable()
export class ContratosService {
  constructor(
    @InjectRepository(Contrato)
    private readonly contratoRepository: Repository<Contrato>,
  ) {}

  async create(createContratoDto: CreateContratoDto) {
    const contrato = this.contratoRepository.create({
      fecha_inicio: new Date(createContratoDto.fecha_inicio),
      empleado: { id: createContratoDto.empleado_id },
    });

    return this.contratoRepository.save(contrato);
  }

  async findAll() {
    return this.contratoRepository.find({
      relations: {
        empleado: true,
      },
    });
  }

  async findOne(id: number) {
    const contrato = await this.contratoRepository.findOne({
      where: { id },
      relations: {
        empleado: true,
      },
    });

    if (!contrato) {
      throw new NotFoundException('Contrato no encontrado');
    }

    return contrato;
  }

  async update(id: number, updateContratoDto: UpdateContratoDto) {
    const contrato = await this.findOne(id);

    if (updateContratoDto.fecha_inicio !== undefined) {
      contrato.fecha_inicio = new Date(updateContratoDto.fecha_inicio);
    }

    if (updateContratoDto.empleado_id !== undefined) {
      contrato.empleado = {
        id: updateContratoDto.empleado_id,
      } as any;
    }

    return this.contratoRepository.save(contrato);
  }

  async remove(id: number) {
    const contrato = await this.findOne(id);

    await this.contratoRepository.remove(contrato);

    return {
      mensaje: 'Contrato eliminado correctamente',
    };
  }
}