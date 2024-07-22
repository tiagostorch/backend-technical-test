import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Activity } from './activity.entity';

@Injectable()
export class ActivityService {
  constructor(
    @InjectRepository(Activity)
    private activityRepository: Repository<Activity>,
  ) {}

  findAll(): Promise<Activity[]> {
    return this.activityRepository.find({ relations: ['project'] });
  }

  findOne(id: number): Promise<Activity> {
    return this.activityRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  async create(activity: Activity): Promise<Activity> {
    return this.activityRepository.save(activity);
  }

  async update(id: number, activity: Activity): Promise<Activity> {
    await this.activityRepository.update(id, activity);
    return this.activityRepository.findOne({
      where: { id },
      relations: ['project'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.activityRepository.delete(id);
  }
}
