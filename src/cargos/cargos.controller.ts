import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { CargosService } from './cargos.service';
import { CreateCargoDto } from './dto/create-cargo.dto';
import { UpdateCargoDto } from './dto/update-cargo.dto';

@Controller('cargos')
export class CargosController {
  constructor(
    private readonly cargosService: CargosService,
  ) {}

  @Post()
  create(@Body() createCargoDto: CreateCargoDto) {
    return this.cargosService.create(createCargoDto);
  }

  @Get()
  findAll() {
    return this.cargosService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.cargosService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateCargoDto: UpdateCargoDto,
  ) {
    return this.cargosService.update(id, updateCargoDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.cargosService.remove(id);
  }
}