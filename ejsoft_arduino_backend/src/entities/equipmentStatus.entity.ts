import { Entity, Column, ViewEntity } from 'typeorm';

@ViewEntity({
  name: 'EQUIPMENT_STATUS',
  synchronize: false,
})
export class EquipmentStatus {
  @Column({ name: 'ID', length: 50, nullable: true })
  id: string | null;

  @Column({ name: 'TEMP', length: 50, nullable: true })
  temp: string | null;

  @Column({ name: 'HUMIDITY', length: 50, nullable: true })
  humidity: string | null;

  @Column({ name: 'PM1', length: 50, nullable: true })
  pm1: string | null;

  @Column({ name: 'PM25', length: 50, nullable: true })
  pm25: string | null;

  @Column({ name: 'PM100', length: 50, nullable: true })
  pm100: string | null;

  @Column({ name: 'DOOR', length: 50, nullable: true })
  door: string | null;

  @Column({ name: 'WARNING', length: 50, nullable: true })
  warning: string | null;

  @Column({ name: 'LED1', length: 50, nullable: true })
  led1: string | null;

  @Column({ name: 'LED2', length: 50, nullable: true })
  led2: string | null;

  @Column({ name: 'LED3', length: 50, nullable: true })
  led3: string | null;

  @Column({ name: 'BUZZER', length: 50, nullable: true })
  buzzer: string | null;

  @Column({ name: 'REG_DT', length: 50, nullable: true })
  regDt: string | null;
}
