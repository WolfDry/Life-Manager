import { Body, Controller, Delete, Get, HttpException, Param, ParseIntPipe, Patch, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get()
  find() {
    return this.categoriesService.getCategories()
  }

  @Get(":id")
  findById(@Param('id', ParseIntPipe) id: string) {
    const data = this.categoriesService.getCategoryById(parseInt(id))

    if (!data)
      throw new HttpException('Aucune categorie trouvé', 404)

    return data
  }

  @Post()
  create(@Body() body: CreateCategoryDto) {
    return this.categoriesService.createCategory(body)
  }

  @Patch(':id')
  update(@Param('id', ParseIntPipe) id: string, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.upadateCategory(+id, body)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: string) {
    return this.categoriesService.deleteCategory(+id)
  }
}