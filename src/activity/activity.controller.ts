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
    type: Activity,
  })
  create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = plainToClass(Activity, createActivityDto);
    return this.activityService.create(activity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing activity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The updated activity',
    type: Activity,
  })
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    const activity = await this.activityService.findOne(id);
    Object.assign(activity, updateActivityDto);
    return this.activityService.update(id, activity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Activity deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.activityService.remove(id);
  }
}
