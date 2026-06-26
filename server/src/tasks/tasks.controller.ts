import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTaskDto';
import { UpdateTaskDto } from './dto/updateTaskDto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly categoriesService: TasksService) { }

  @Get()
  find() {
    return this.categoriesService.getTasks()
  }

  @Get(":id")
  findById(@Param('id', ParseIntPipe) id: string) {
    const data = this.categoriesService.getTaskById(parseInt(id))

    if (!data)
      throw new HttpException('Aucune tache trouvée', 404)

    return data
  }

  @Post()
  create(@Body() body: CreateTaskDto) {
    const { categoryId } = body

    if (!categoryId)
      throw new HttpException('Aucune catégorie selectionnée', 404)

    return this.categoriesService.createTask(body)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() body: UpdateTaskDto) {
    return this.categoriesService.upadateTask(+id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.deleteTask(+id)
  }
}
