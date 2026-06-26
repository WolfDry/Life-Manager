import { Module } from '@nestjs/common';
import { SubTasksController } from './sub-tasks.controller';
import { SubTasksService } from './sub-tasks.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [SubTasksController],
  providers: [SubTasksService, PrismaService]
})
export class SubTasksModule { }
