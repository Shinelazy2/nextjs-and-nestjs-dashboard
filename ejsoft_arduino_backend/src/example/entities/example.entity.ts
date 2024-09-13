import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Example {
  @PrimaryGeneratedColumn('uuid')
  id?: string;

  @Column({nullable: true, type: 'text'})
  name: string
  
  @Column({nullable: true, type: 'text'})
  comment: string
}
