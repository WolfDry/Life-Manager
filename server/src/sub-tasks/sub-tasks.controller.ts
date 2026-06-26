import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { SubTasksService } from './sub-tasks.service';
import { CreateSubTaskDto } from './dto/createSubTaskDto';
import { UpdateSubTaskDto } from './dto/updateSubTaskDto';

@Controller('sub-tasks')
export class SubTasksController {
  constructor(private readonly subtasksService: SubTasksService) { }

  @Get()
  find() {
    return this.subtasksService.getSubTasks()
  }

  @Get(":id")
  findById(@Param('id', ParseIntPipe) id: string) {
    const data = this.subtasksService.getSubTaskById(parseInt(id))

    if (!data)
      throw new HttpException('Aucune tache trouvée', 404)

    return data
  }

  @Post()
  create(@Body() body: CreateSubTaskDto) {
    const { taskId } = body

    if (!taskId)
      throw new HttpException('Aucune catégorie selectionnée', 404)

    return this.subtasksService.createSubTask(body)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() body: UpdateSubTaskDto) {
    return this.subtasksService.upadateSubTask(+id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.subtasksService.deleteSubTask(+id)
  }
}
