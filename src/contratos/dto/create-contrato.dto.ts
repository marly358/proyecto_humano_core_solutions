import { IsDateString, IsInt, IsNotEmpty, Min } from 'class-validator';

export class CreateContratoDto {
  @IsDateString()
  @IsNotEmpty()
  fecha_inicio: string;

  @IsInt()
  @Min(1)
  empleado_id: number;
}