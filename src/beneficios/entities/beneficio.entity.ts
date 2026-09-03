import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Contrato } from '../../contratos/entities/contrato.entity';

@Entity('beneficios')
export class Beneficio {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nombre: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  valor: number;

  @ManyToOne(() => Contrato, (contrato) => contrato.beneficios)
  @JoinColumn({ name: 'contrato_id' })
  contrato: Contrato;
}