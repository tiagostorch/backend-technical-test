import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ActivityService } from './activity.service';
import { Activity } from './activity.entity';
import { Project } from '../project/project.entity';

describe('ActivityService', () => {
  let service: ActivityService;
  let activityRepository: Repository<Activity>;
  let projectRepository: Repository<Project>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ActivityService,
        {
          provide: getRepositoryToken(Activity),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(Project),
          useClass: Repository,
        },
      ],
    }).compile();

    service = module.get<ActivityService>(ActivityService);
    activityRepository = module.get<Repository<Activity>>(
      getRepositoryToken(Activity),
    );
    projectRepository = module.get<Repository<Project>>(
      getRepositoryToken(Project),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create an activity', async () => {
    const activity = new Activity();
    activity.name = 'Test Activity';
    activity.startDate = new Date();
    activity.endDate = new Date();
    activity.isCompleted = false;

    const project = new Project();
    project.id = 1;

    jest.spyOn(projectRepository, 'findOne').mockResolvedValue(project);
    jest.spyOn(activityRepository, 'save').mockResolvedValue(activity);

    expect(await service.create(activity, project.id)).toEqual(activity);
  });

  it('should find all activities', async () => {
    const activity = new Activity();
    jest.spyOn(activityRepository, 'find').mockResolvedValue([activity]);
    expect(await service.findAll()).toEqual([activity]);
  });

  it('should find one activity by id', async () => {
    const activity = new Activity();
    jest.spyOn(activityRepository, 'findOne').mockResolvedValue(activity);
    expect(await service.findOne(1)).toEqual(activity);
  });

  it('should update an activity', async () => {
    const activity = new Activity();
    activity.name = 'Updated Activity';

    jest.spyOn(activityRepository, 'findOne').mockResolvedValue(activity);
    jest.spyOn(activityRepository, 'update').mockResolvedValue(undefined);
    jest.spyOn(activityRepository, 'save').mockResolvedValue(activity);

    expect(await service.update(1, activity)).toEqual(activity);
  });

  it('should delete an activity', async () => {
    jest.spyOn(activityRepository, 'delete').mockResolvedValue(undefined);
    expect(await service.remove(1)).toBeUndefined();
  });
});
