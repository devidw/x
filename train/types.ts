export type TrainingOptions = {
  name: string
  prepareTime: number
  exerciseTime: number
  exerciseRestTime: number
  exerciseCount: number
  roundCount: number
  roundRestTime: number
  children?: TrainingOptions[]
}