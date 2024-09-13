import { Module } from '@nestjs/common';
import { EquipmentController } from './equipment.controller';
import { EquipmentService } from './equipment.service';
import { EquipmentRepository } from './equipment.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EquipmentInfo } from '@/entities/equipmentInfo.entity';
import { EquipmentStatus } from '@/entities/equipmentStatus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EquipmentInfo, EquipmentStatus])],
  controllers: [EquipmentController],
  providers: [EquipmentService, EquipmentRepository],
  exports: [EquipmentService, EquipmentRepository],
})
export class EquipmentModule {}
