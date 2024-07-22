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
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

@ApiTags('projects')
@Controller('projects')
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all projects' })
  @ApiResponse({
    status: 200,
    description: 'List of projects',
    type: [ListProjectDto],
  })
  async findAll(): Promise<ListProjectDto[]> {
    const projects = await this.projectService.findAll();
    return projects.map((project) => plainToClass(ListProjectDto, project));
  }

  @Get(':id')
  @ApiOperation({ summary: 'Retrieve a specific project by ID' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The project',
    type: ListProjectDto,
  })
  async findOne(@Param('id') id: number): Promise<ListProjectDto> {
    const project = await this.projectService.findOne(id);
    return plainToClass(ListProjectDto, project);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The created project',
    type: ListProjectDto,
  })
  async create(
    @Body() createProjectDto: CreateProjectDto,
  ): Promise<ListProjectDto> {
    const project = plainToClass(Project, createProjectDto);
    const createdProject = await this.projectService.create(project);
    return plainToClass(ListProjectDto, createdProject);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update an existing project' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({
    status: 200,
    description: 'The updated project',
    type: ListProjectDto,
  })
  async update(
    @Param('id') id: number,
    @Body() updateProjectDto: UpdateProjectDto,
  ): Promise<ListProjectDto> {
    const project = await this.projectService.findOne(id);
    Object.assign(project, updateProjectDto);
    const updatedProject = await this.projectService.update(id, project);
    return plainToClass(ListProjectDto, updatedProject);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a project' })
  @ApiParam({ name: 'id', type: Number })
  @ApiResponse({ status: 200, description: 'Project deleted' })
  remove(@Param('id') id: number): Promise<void> {
    return this.projectService.remove(id);
  }
}
