import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean, IsInt, IsDateString } from 'class-validator';

export class CreateActivityDto {
  @ApiProperty()
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  startDate: Date;

  @ApiProperty()
  @IsDateString()
  @IsNotEmpty()
  endDate: Date;

  @ApiProperty()
  @IsBoolean()
  isCompleted: boolean;

  @ApiProperty()
  @IsInt()
  @IsNotEmpty()
  projectId: number;
}
