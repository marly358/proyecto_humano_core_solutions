import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';
import { Beneficio } from '../../beneficios/entities/beneficio.entity';

@Entity('contratos')
export class Contrato {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  fecha_inicio: Date;

  @OneToOne(() => Empleado, (empleado) => empleado.contrato)
  @JoinColumn({ name: 'empleado_id' })
  empleado: Empleado;

  @OneToMany(() => Beneficio, (beneficio) => beneficio.contrato)
  beneficios: Beneficio[];
}