import { Controller, Get, Query } from '@nestjs/common';
import { EquipmentService } from './equipment.service';
import { ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';

@Controller('equipment')
export class EquipmentController {
  constructor(private readonly equipmentService: EquipmentService) {}

  @Get('list')
  @ApiOperation({ summary: 'Get all equipment list' })
  @ApiResponse({ status: 200, description: 'Return all equipment list.' })
  async getAllEquipmentList() {
    return await this.equipmentService.getAllEquipmentList();
  }

  @Get('status')
  @ApiOperation({ summary: 'Get average equipment status' })
  @ApiResponse({ status: 200, description: 'Return average equipment status.' })
  @ApiQuery({ name: 'equipmentId', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'startDate', type: String, required: true, example: '2023-01-01' })
  @ApiQuery({ name: 'endDate', type: String, required: true, example: '2023-12-31' })
  async getAverageEquipmentStatus(
    @Query('equipmentId') equipmentId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.equipmentService.getOneAverageEquipmentStatus(equipmentId, startDate, endDate);
  }

  // TODO: getManyAverageEquipmentStatusByEachDay
  @Get('day')
  @ApiOperation({ summary: 'Get average equipment status' })
  @ApiResponse({ status: 200, description: 'Return average equipment status.' })
  @ApiQuery({ name: 'equipmentId', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'startDate', type: String, required: true, example: '2023-01-01' })
  @ApiQuery({ name: 'endDate', type: String, required: true, example: '2023-12-31' })
  async getManyAverageEquipmentStatusByEachDay(
    @Query('equipmentId') equipmentId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.equipmentService.getManyAverageEquipmentStatusByEachDay(equipmentId, startDate, endDate);
  }

  @Get('realtime')
  @ApiOperation({ summary: 'Get average equipment status by minute' })
  @ApiResponse({ status: 200, description: 'Return average equipment status by minute.' })
  @ApiQuery({ name: 'equipmentId', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'minute', type: Number, required: true, example: 5 })
  async getManyAverageEquipmentStatusByEachMinute(
    @Query('equipmentId') equipmentId: number,
    @Query('minute') minute: number,
  ) {
    return await this.equipmentService.getManyAverageEquipmentStatusByEachMinute(equipmentId, minute);
  }

  @Get('month')
  @ApiOperation({ summary: 'Get average equipment status' })
  @ApiResponse({ status: 200, description: 'Return average equipment status.' })
  @ApiQuery({ name: 'equipmentId', type: Number, required: true, example: 1 })
  @ApiQuery({ name: 'startDate', type: String, required: true, example: '2023-01-01' })
  @ApiQuery({ name: 'endDate', type: String, required: true, example: '2023-12-31' })
  async getManyAverageEquipmentStatusByEachMonth(
    @Query('equipmentId') equipmentId: number,
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
  ) {
    return await this.equipmentService.getManyAverageEquipmentStatusByEachMonth(equipmentId, startDate, endDate);
  }
}
