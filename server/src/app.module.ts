import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { TasksModule } from './tasks/tasks.module';
import { SubTasksModule } from './sub-tasks/sub-tasks.module';

@Module({
  imports: [ConfigModule.forRoot(), CategoriesModule, TasksModule, SubTasksModule]
})
export class AppModule { }
