import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectService } from './project.service';
import { Project } from './project.entity';

describe('ProjectService', () => {
  let service: ProjectService;
  let repository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ProjectService,
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ProjectService>(ProjectService);
    repository = module.get<Repository<Project>>(getRepositoryToken(Project));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a project', async () => {
    const project = new Project();
    project.name = 'Test Project';
    project.startDate = new Date();
    project.endDate = new Date();

    jest.spyOn(repository, 'save').mockResolvedValue(project);
    expect(await service.create(project)).toEqual(project);
  });

  it('should find all projects', async () => {
    const project = new Project();
    jest.spyOn(repository, 'find').mockResolvedValue([project]);
    expect(await service.findAll()).toEqual([project]);
  });

  it('should find one project by id', async () => {
    const project = new Project();
    jest.spyOn(repository, 'findOne').mockResolvedValue(project);
    expect(await service.findOne(1)).toEqual(project);
  });

  it('should update a project', async () => {
    const project = new Project();
    project.name = 'Updated Project';

    jest.spyOn(repository, 'findOne').mockResolvedValue(project);
    jest.spyOn(repository, 'update').mockResolvedValue(undefined);
    jest.spyOn(repository, 'save').mockResolvedValue(project);

    expect(await service.update(1, project)).toEqual(project);
  });

  it('should delete a project', async () => {
    jest.spyOn(repository, 'delete').mockResolvedValue(undefined);
    expect(await service.remove(1)).toBeUndefined();
  });
});
