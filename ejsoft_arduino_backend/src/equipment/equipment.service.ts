import { Injectable } from '@nestjs/common';
import { EquipmentRepository } from './equipment.repository';
@Injectable()
export class EquipmentService {
  async getManyAverageEquipmentStatusByEachDay(equipmentId: number, startDate: string, endDate: string) {
    return await this.equipmentRepository.getManyAverageEquipmentStatusByEachDay(equipmentId, startDate, endDate);
  }
  constructor(private readonly equipmentRepository: EquipmentRepository) {}

  async getAllEquipmentList() {
    return await this.equipmentRepository.getAllEquipmentList();
  }

  async getOneAverageEquipmentStatus(equipmentId: number, startDate: string, endDate: string) {
    return await this.equipmentRepository.getOneAverageEquipmentStatusByDay(equipmentId, startDate, endDate);
  }

  async getManyAverageEquipmentStatusByEachMinute(equipmentId: number, minute: number) {
    return await this.equipmentRepository.getManyAverageEquipmentStatusByEachMinute(equipmentId, minute);
  }
  async getManyAverageEquipmentStatusByEachMonth(equipmentId: number, startDate: string, endDate: string) {
    return await this.equipmentRepository.getManyAverageEquipmentStatusByEachMonth(equipmentId, startDate, endDate);
  }
}
