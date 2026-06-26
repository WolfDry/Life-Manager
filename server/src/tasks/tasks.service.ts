import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) { }

  getTasks() {
    return this.prisma.task.findMany({
      include: {
        subtask: true
      },
      orderBy: { id: "asc" }
    })
  }

  getTaskById(id: number) {
    return this.prisma.task.findUnique({
      where: { id },
      include: {
        subtask: true
      }
    })
  }

  createTask(data: Prisma.taskCreateInput) {
    return this.prisma.task.create({
      data,
      include: {
        subtask: true
      }
    })
  }

  upadateTask(id: number, data: Prisma.taskUpdateInput) {
    return this.prisma.task.update({
      where: { id },
      data,
      include: {
        subtask: true
      }
    })
  }

  deleteTask(id: number) {
    return this.prisma.task.delete({
      where: { id }
    })
  }
}
