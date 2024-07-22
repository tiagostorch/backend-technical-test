import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDate, IsBoolean } from 'class-validator';

export class UpdateActivityDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsDate()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsBoolean()
  isCompleted: boolean;
}
