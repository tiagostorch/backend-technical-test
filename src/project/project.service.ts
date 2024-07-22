import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project)
    private projectRepository: Repository<Project>,
  ) {}

  findAll(): Promise<Project[]> {
    return this.projectRepository.find({ relations: ['activities'] });
  }

  findOne(id: number): Promise<Project> {
    return this.projectRepository.findOne({
      where: { id },
      relations: ['activities'],
    });
  }

  async create(project: Project): Promise<Project> {
    return this.projectRepository.save(project);
  }

  async update(id: number, project: Project): Promise<Project> {
    await this.projectRepository.update(id, project);
    return this.projectRepository.findOne({
      where: { id },
      relations: ['activities'],
    });
  }

  async remove(id: number): Promise<void> {
    await this.projectRepository.delete(id);
  }
}
