import { ApiProperty } from '@nestjs/swagger';
import { Project } from '../../project/project.entity';

export class ListActivityDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty()
  isCompleted: boolean;

  @ApiProperty({ type: () => Project })
  project: Project;
}
