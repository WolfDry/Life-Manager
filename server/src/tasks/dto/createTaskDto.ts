export class CreateTaskDto {
  readonly text: string
  readonly categoryId: number
  readonly priority: string
  readonly duration?: number
}