import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { Project } from './project.entity';
import { CreateProjectDto } from './dtos/create-project.dto';
import { UpdateProjectDto } from './dtos/update-project.dto';
import { ListProjectDto } from './dtos/list-project.dto';
import { ApiTags, ApiOperation, ApiParam } from '@nestjs/swagger';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all projects' })
  async findAll(): Promise<ListProjectDto[]> {
    const projects = await this.projectService.findAll();
    return projects.map((project) => ({
      id: project.id,
      name: project.name,
      startDate: project.startDate,
      endDate: project.endDate,
      activities: project.activities,
    }));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific project by ID' })
  @ApiParam({ name: 'id', type: Number })
  async findOne(@Param('id') id: number): Promise<ListProjectDto> {
    const project = await this.projectService.findOne(id);
    return {
      id: project.id,
      name: project.name,
      startDate: project.startDate,
      endDate: project.endDate,
      activities: project.activities,
    };
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  create(@Body() createProjectDto: CreateProjectDto): Promise<Project> {
    const project = new Project();
    project.name = createProjectDto.name;
    project.startDate = createProjectDto.startDate;
    project.endDate = createProjectDto.endDate;
    return this.projectService.create(project);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing project' })
  @ApiParam({ name: 'id', type: Number })
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<Project> {
    const project = await this.projectService.findOne(id);
    project.name = updateProjectDto.name;
    project.startDate = updateProjectDto.startDate;
    project.endDate = updateProjectDto.endDate;
    return this.projectService.update(id, project);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', type: Number })
  remove(@Param('id') id: number): Promise<void> {
    return this.projectService.remove(id);
  }
}
