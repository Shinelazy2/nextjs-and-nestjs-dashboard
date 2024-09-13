import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EquipmentInfo } from '@/entities/equipmentInfo.entity';
import { EquipmentStatus } from '@/entities/equipmentStatus.entity';
import * as dayjs from 'dayjs';
import { LogClassMethods } from '@/common/config/func.logging';

@Injectable()
@LogClassMethods
export class EquipmentRepository {
  constructor(
    @InjectRepository(EquipmentInfo)
    private equpmentInfoRepository: Repository<EquipmentInfo>,
    @InjectRepository(EquipmentStatus)
    private equpmentStatusRepository: Repository<EquipmentStatus>,
  ) {}

  async getAllEquipmentList() {
    return await this.equpmentInfoRepository.find();
  }

  /** 실시간 */
  async getManyAverageEquipmentStatusByEachMinute(equipmentId: number, minute: number) {
    const endDate = dayjs().format('YYYY-MM-DD HH:mm');
    const startDate = dayjs().subtract(minute, 'minute').format('YYYY-MM-DD HH:mm');

    const query = await this.equpmentStatusRepository
      .createQueryBuilder()
      .select('id', 'ID')
      .addSelect('COALESCE(AVG(TEMP), 0)', 'TEMP')
      .addSelect('COALESCE(AVG(HUMIDITY), 0)', 'HUM')
      .addSelect('COALESCE(MAX(DOOR), 0)', 'DOOR')
      .addSelect('COALESCE(MAX(WARNING), 0)', 'RISK')
      .addSelect('DATE_FORMAT(REG_DT, "%H:%i")', 'REG_DT')
      .where('ID = :equipmentId', { equipmentId })
      .andWhere('REG_DT BETWEEN :startDate AND :endDate', { startDate, endDate })
      .groupBy('DATE_FORMAT(REG_DT, "%H:%i")')
      .orderBy('REG_DT', 'ASC')
      .getRawMany();

    // 모든 분에 대한 데이터 생성
    const result = [];
    for (let i = 0; i < minute; i++) {
      const currentDate = dayjs(startDate).add(i, 'minute');
      const formattedDate = currentDate.format('HH:mm');
      const existingData = query.find((item) => item.REG_DT === formattedDate);

      result.push(
        existingData || {
          ID: equipmentId,
          TEMP: 0,
          HUM: 0,
          DOOR: 0,
          RISK: 0,
          REG_DT: formattedDate,
        },
      );
    }

    return result;
  }

  /** get one average equipment status -- Title Card*/
  async getOneAverageEquipmentStatusByDay(equipmentId: number, startDate: string, endDate: string) {
    const query = await this.equpmentStatusRepository
      .createQueryBuilder()
      .select('id', 'ID')
      .addSelect('AVG(TEMP)', 'TEMP')
      .addSelect('AVG(HUMIDITY)', 'HUM')
      .addSelect('MAX(DOOR)', 'DOOR')
      .addSelect('MAX(WARNING)', 'RISK')
      .where('REG_DT >= :startDate', { startDate: `${startDate} 00:00:00` })
      .andWhere('REG_DT <= :endDate', { endDate: `${endDate} 23:59:59` })
      .andWhere('id = :equipmentId', { equipmentId })
      .getRawOne();

    return query;
  }

  async getManyAverageEquipmentStatusByEachDay(equipmentId: number, startDate: string, endDate: string) {
    const query = await this.equpmentStatusRepository
      .createQueryBuilder()
      .select('id', 'ID')
      .addSelect('AVG(TEMP)', 'TEMP')
      .addSelect('AVG(HUMIDITY)', 'HUM')
      .addSelect('MAX(DOOR)', 'DOOR')
      .addSelect('MAX(WARNING)', 'RISK')
      .addSelect('DATE_FORMAT(REG_DT, "%Y-%m-%d")', 'REG_DT')
      .where('REG_DT >= :startDate', { startDate: `${startDate} 00:00:00` })
      .andWhere('REG_DT <= :endDate', { endDate: `${endDate} 23:59:59` })
      .andWhere('id = :equipmentId', { equipmentId })
      .groupBy('DATE(REG_DT)')
      .getRawMany();

    // 시작일부터 종료일까지의 모든 날짜에 대한 데이터 생성
    const result = [];
    let currentDate = dayjs(startDate);
    const end = dayjs(endDate);

    while (currentDate.isBefore(end) || currentDate.isSame(end, 'day')) {
      const formattedDate = currentDate.format('YYYY-MM-DD');
      const existingData = query.find((item) => item.REG_DT === formattedDate);

      result.push(
        existingData || {
          ID: equipmentId,
          TEMP: 0,
          HUM: 0,
          DOOR: 0,
          RISK: 0,
          REG_DT: formattedDate,
        },
      );

      currentDate = currentDate.add(1, 'day');
    }

    return result;
  }

  async getManyAverageEquipmentStatusByEachMonth(equipmentId: number, startMonth: string, endMonth: string) {
    const query = await this.equpmentStatusRepository
      .createQueryBuilder()
      .select('id', 'ID')
      .addSelect('AVG(TEMP)', 'TEMP')
      .addSelect('AVG(HUMIDITY)', 'HUM')
      .addSelect('MAX(DOOR)', 'DOOR')
      .addSelect('MAX(WARNING)', 'RISK')
      .addSelect('DATE_FORMAT(REG_DT, "%Y-%m")', 'REG_DT')
      .where('REG_DT >= :startDate', { startDate: `${startMonth}` })
      .andWhere('REG_DT < :endDate', { endDate: endMonth })
      .andWhere('id = :equipmentId', { equipmentId })
      .groupBy('DATE_FORMAT(REG_DT, "%Y-%m")')
      .orderBy('REG_DT', 'ASC')
      .getRawMany();

    // 시작월부터 종료월까지의 모든 월에 대한 데이터 생성
    const result = [];
    let currentDate = dayjs(startMonth).startOf('month');
    const end = dayjs(endMonth).endOf('month');

    while (currentDate.isBefore(end) || currentDate.isSame(end, 'month')) {
      const formattedDate = currentDate.format('YYYY-MM');
      const existingData = query.find((item) => item.REG_DT === formattedDate);

      result.push(
        existingData || {
          ID: equipmentId,
          TEMP: 0,
          HUM: 0,
          DOOR: 0,
          RISK: 0,
          REG_DT: formattedDate,
        },
      );

      currentDate = currentDate.add(1, 'month');
    }

    return result;
  }
}
