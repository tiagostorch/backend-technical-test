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
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('activities')
@Controller('activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all activities' })
  async findAll(): Promise<ListActivityDto[]> {
    const activities = await this.activityService.findAll();
    return activities.map((activity) => ({
      id: activity.id,
      name: activity.name,
      startDate: activity.startDate,
      endDate: activity.endDate,
      isCompleted: activity.isCompleted,
      project: activity.project,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific activity by ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: number): Promise<ListActivityDto> {
    const activity = await this.activityService.findOne(id);
    return {
      id: activity.id,
      name: activity.name,
      startDate: activity.startDate,
      endDate: activity.endDate,
      isCompleted: activity.isCompleted,
      project: activity.project,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new activity' })
  create(@Body() createActivityDto: CreateActivityDto): Promise<Activity> {
    const activity = new Activity();
    activity.name = createActivityDto.name;
    activity.startDate = createActivityDto.startDate;
    activity.endDate = createActivityDto.endDate;
    activity.isCompleted = createActivityDto.isCompleted;
    activity.project = { id: createActivityDto.projectId } as any;
    return this.activityService.create(activity);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing activity' })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() updateActivityDto: UpdateActivityDto,
  ): Promise<Activity> {
    const activity = await this.activityService.findOne(id);
    activity.name = updateActivityDto.name;
    activity.startDate = updateActivityDto.startDate;
    activity.endDate = updateActivityDto.endDate;
    activity.isCompleted = updateActivityDto.isCompleted;
    return this.activityService.update(id, activity);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete an activity' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: number): Promise<void> {
    return this.activityService.remove(id);
  }
}
