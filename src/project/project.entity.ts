import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Activity } from '../activity/activity.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  @ApiProperty()
  id: number;

  @Column()
  @ApiProperty()
  name: string;

  @Column()
  @ApiProperty()
  startDate: Date;

  @Column()
  @ApiProperty()
  endDate: Date;

  @OneToMany(() => Activity, (activity) => activity.project)
  activities: Activity[];
}
