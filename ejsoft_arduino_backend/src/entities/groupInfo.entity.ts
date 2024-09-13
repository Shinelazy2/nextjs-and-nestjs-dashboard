import { Entity, PrimaryColumn, Column } from 'typeorm';

@Entity('GROUP_INFO')
export class GroupInfo {
  @PrimaryColumn({ name: 'GROUP_ID', length: 12 })
  groupId: string;

  @Column({ name: 'GROUP_NAME', length: 100 })
  groupName: string;

  @Column({ name: 'GROUP_GB', length: 10 })
  groupGb: string;

  @Column({ name: 'COPREGNB', length: 10, nullable: true })
  copregnb: string | null;

  @Column({ name: 'CEO_NAME', length: 50, nullable: true })
  ceoName: string | null;

  @Column({ name: 'MOBILE_TELNO', length: 30, nullable: true })
  mobileTelno: string | null;

  @Column({ name: 'OFFICE_TELNO', length: 30, nullable: true })
  officeTelno: string | null;

  @Column({ name: 'FAXNO', length: 30, nullable: true })
  faxno: string | null;

  @Column({ name: 'BIS_TYPE', length: 100, nullable: true })
  bisType: string | null;

  @Column({ name: 'BIS_CONDITION', length: 100, nullable: true })
  bisCondition: string | null;

  @Column({ name: 'ADDR', length: 255, nullable: true })
  addr: string | null;

  @Column({ name: 'DETAIL_ADDR', length: 255, nullable: true })
  detailAddr: string | null;

  @Column({ name: 'NOTE', length: 2000, nullable: true })
  note: string | null;

  @Column({ name: 'CLOSE_DT', length: 8, nullable: true })
  closeDt: string | null;

  @Column({ name: 'CLOSE_REASON', length: 100, nullable: true })
  closeReason: string | null;

  @Column({ name: 'REG_ID', length: 100 })
  regId: string;

  @Column({
    name: 'REG_DT',
    type: 'datetime',
    default: () => 'CURRENT_TIMESTAMP',
  })
  regDt: Date;

  @Column({ name: 'MOD_ID', length: 100, nullable: true })
  modId: string | null;

  @Column({ name: 'MOD_DT', type: 'datetime', nullable: true })
  modDt: Date | null;
}
