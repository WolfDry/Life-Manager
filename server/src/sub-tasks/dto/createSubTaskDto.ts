export class CreateSubTaskDto {
  readonly text: string
  readonly taskId: number
  readonly priority: string
  readonly duration?: number
}