import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity } from './activity.entity';
import { ActivityService } from './activity.service';
import { ActivityController } from './activity.controller';
import { Project } from 'src/project/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Activity])],
  providers: [ActivityService],
  controllers: [ActivityController],
})
export class ActivityModule {}
