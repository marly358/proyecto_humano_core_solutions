import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Empleado } from '../../empleados/entities/empleado.entity';

@Entity('cargos')
export class Cargo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100, unique: true })
  nombre: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  salario_base: number;

  @OneToMany(() => Empleado, (empleado) => empleado.cargo)
  empleados: Empleado[];
}