import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Project } from '../project/project.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Activity {
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

  @Column({ default: false })
  @ApiProperty()
  isCompleted: boolean;

  @ManyToOne(() => Project, (project) => project.activities)
  @ApiProperty({ type: () => Project })
  project: Project;
}
