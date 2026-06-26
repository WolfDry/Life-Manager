import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class SubTasksService {
  constructor(private prisma: PrismaService) { }

  getSubTasks() {
    return this.prisma.subtask.findMany({
      orderBy: { id: "asc" }
    })
  }

  getSubTaskById(id: number) {
    return this.prisma.subtask.findUnique({
      where: { id }
    })
  }

  createSubTask(data: Prisma.subtaskCreateInput) {
    return this.prisma.subtask.create({
      data
    })
  }

  upadateSubTask(id: number, data: Prisma.subtaskUpdateInput) {
    return this.prisma.subtask.update({
      where: { id },
      data
    })
  }

  deleteSubTask(id: number) {
    return this.prisma.subtask.delete({
      where: { id }
    })
  }
}
