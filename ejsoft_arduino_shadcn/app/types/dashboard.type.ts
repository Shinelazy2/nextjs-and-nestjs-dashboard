export interface EquipmentInfo {
  equipmentId: string;
  groupId: string;
  equipmentType: string;
  modelNo: string | null;
  productNo: string | null;
  installDt: string | null;
  openDt: string | null;
  freeAsEndDt: string | null;
  closeReason: string | null;
  closeDt: string | null;
  regId: string;
  regDt: Date | string;
  modId: string | null;
  modDt: Date | null;
  equipmentName: string | null;
}

export interface CardData {
  TEMP: number;
  HUM: number;
  DOOR: number;
  RISK: number;
  REG_DT: string;
}

export interface ChartDataPoint {
  ID: string;
  TEMP: string;
  HUM: string;
  DOOR: string | null;
  RISK: string | null;
  REG_DT: string;
}
