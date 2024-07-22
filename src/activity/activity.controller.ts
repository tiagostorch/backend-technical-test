import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { Activity } from './activity.entity';
import { CreateActivityDto } from './dtos/create-activity.dto';
import { UpdateActivityDto } from './dtos/update-activity.dto';
import { ListActivityDto } from './dtos/list-activity.dto';
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all activities' })
  @ApiResponse({
    status: 200,
    description: 'List of activities',
    type: [ListActivityDto],
  })
  async findAll(): Promise<ListActivityDto[]> {
    const activities = await this.activityService.findAll();
    return activities.map((activity) =>
      plainToClass(ListActivityDto, activity),
    );
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific activity by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The activity',
    type: ListActivityDto,
  })
  async findOne(@Param('id') id: number): Promise<ListActivityDto> {
    const activity = await this.activityService.findOne(id);
    return plainToClass(ListActivityDto, activity);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new activity' })
  @ApiResponse({
    status: 201,
    description: 'The created activity',
    type: ListActivityDto,
  })
  async create(
    @Body() createActivityDto: CreateActivityDto,
  ): Promise<ListActivityDto> {
    const activity = plainToClass(Activity, createActivityDto);
    const createdActivity = await this.activityService.create(
      activity,
      createActivityDto.projectId,
    );
    return plainToClass(ListActivityDto, createdActivity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing activity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The updated activity',
    type: ListActivityDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<ListActivityDto> {
    const activity = await this.activityService.findOne(id);
    Object.assign(activity, updateActivityDto);
    const updatedActivity = await this.activityService.update(id, activity);
    return plainToClass(ListActivityDto, updatedActivity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Activity deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.activityService.remove(id);
  }
}
