import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('EQUIPMENT_INFO')
export class EquipmentInfo {
  @PrimaryColumn({ name: 'EQUIPMENT_ID', length: 12 })
  equipmentId: string;

  @Column({ name: 'GROUP_ID', length: 12 })
  groupId: string;

  @Column({ name: 'EQUIPMENT_TYPE', length: 10, default: 'CMPT' })
  equipmentType: string;

  @Column({ name: 'MODEL_NO', length: 10, nullable: true })
  modelNo: string | null;

  @Column({ name: 'PRODUCT_NO', length: 100, nullable: true })
  productNo: string | null;

  @Column({ name: 'INSTALL_DT', length: 8, nullable: true })
  installDt: string | null;

  @Column({ name: 'OPEN_DT', length: 14, nullable: true })
  openDt: string | null;

  @Column({ name: 'FREE_AS_END_DT', length: 8, nullable: true })
  freeAsEndDt: string | null;

  @Column({ name: 'CLOSE_REASON', length: 100, nullable: true })
  closeReason: string | null;

  @Column({ name: 'CLOSE_DT', length: 8, nullable: true })
  closeDt: string | null;

  @Column({ name: 'REG_ID', length: 100 })
  regId: string;

  @Column({
    name: 'REG_DT',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
    transformer: {
      to: (value: Date) => value,
      from: (value: Date) => {
        if (value instanceof Date) {
          return value.toISOString().slice(0, 19).replace('T', ' ');
        }
        return value;
      },
    },
  })
  regDt: string;

  @Column({ name: 'MOD_ID', length: 100, nullable: true })
  modId: string | null;

  @Column({ name: 'MOD_DT', type: 'datetime', nullable: true })
  modDt: Date | null;

  @Column({ name: 'EQUIPMENT_NAME', length: 50, nullable: true })
  equipmentName: string | null;
}
