import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class CategoriesService {

  constructor(private prisma: PrismaService) { }

  getCategories() {
    return this.prisma.category.findMany({
      include: {
        task: {
          include: {
            subtask: true
          }
        }
      },
      orderBy: { id: "asc" }
    })
  }

  getCategoryById(id: number) {
    return this.prisma.category.findUnique({
      where: { id },
      include: {
        task: {
          include: {
            subtask: true
          }
        }
      }
    })
  }

  createCategory(data: Prisma.categoryCreateInput) {
    return this.prisma.category.create({
      data,
      include: {
        task: {
          include: {
            subtask: true
          }
        }
      }
    })
  }

  upadateCategory(id: number, data: Prisma.categoryUpdateInput) {
    return this.prisma.category.update({
      where: { id },
      data,
      include: {
        task: {
          include: {
            subtask: true
          }
        }
      }
    })
  }

  deleteCategory(id: number) {
    return this.prisma.category.delete({
      where: { id }
    })
  }
}
