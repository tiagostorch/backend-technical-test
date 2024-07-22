import { ApiProperty } from '@nestjs/swagger';
import { Activity } from '../../activity/activity.entity';

export class ListProjectDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  startDate: Date;

  @ApiProperty()
  endDate: Date;

  @ApiProperty({ type: () => [Activity] })
  activities: Activity[];
}
