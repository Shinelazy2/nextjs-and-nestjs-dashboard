import { Injectable, NotFoundException } from '@nestjs/common';
import { EquipmentRepository } from './equipment.repository';
@Injectable()
export class EquipmentService {
  constructor(private readonly equipmentRepository: EquipmentRepository) {}

  async getAllEquipmentList() {
    return await this.equipmentRepository.getAllEquipmentList();
  }

  async getManyAverageEquipmentStatusByEachDay(equipmentId: number, startDate: string, endDate: string) {
    await this.validateEquipmentId(equipmentId);
    return await this.equipmentRepository.getManyAverageEquipmentStatusByEachDay(equipmentId, startDate, endDate);
  }

  async getOneAverageEquipmentStatus(equipmentId: number, startDate: string, endDate: string) {
    await this.validateEquipmentId(equipmentId);
    return await this.equipmentRepository.getOneAverageEquipmentStatusByDay(equipmentId, startDate, endDate);
  }

  async getManyAverageEquipmentStatusByEachMinute(equipmentId: number, minute: number) {
    await this.validateEquipmentId(equipmentId);
    return await this.equipmentRepository.getManyAverageEquipmentStatusByEachMinute(equipmentId, minute);
  }
  async getManyAverageEquipmentStatusByEachMonth(equipmentId: number, startDate: string, endDate: string) {
    await this.validateEquipmentId(equipmentId);
    return await this.equipmentRepository.getManyAverageEquipmentStatusByEachMonth(equipmentId, startDate, endDate);
  }

  async validateEquipmentId(equipmentId: number): Promise<void> {
    const equipment = await this.equipmentRepository.validateEquipmentId(equipmentId);
    console.log('equipment', equipment);

    if (!equipment) {
      throw new NotFoundException(`Equipment with ID ${equipmentId} not found`);
    }
  }
}
