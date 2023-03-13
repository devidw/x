async function say(message: string) {
  console.log(message)
  const status = Deno.run({
    cmd: `say -v karen ${message}`.split(" "),
  })
  return await status.status()
}

async function block(name: string, timeout: number) {
  if (timeout === 0) return
  say(name)
  await new Promise((resolve) => setTimeout(resolve, timeout * 1000))
}

type TrainingOptions = {
  name: string
  prepareTime: number
  exerciseTime: number
  exerciseRestTime: number
  exerciseCount: number
  roundCount: number
  roundRestTime: number
}

async function training(config: TrainingOptions) {
  await block(`Prepare for ${config.name}`, config.prepareTime)
  for (let roundIndex = 1; roundIndex <= config.roundCount; roundIndex++) {
    for (
      let exerciseIndex = 1;
      exerciseIndex <= config.exerciseCount;
      exerciseIndex++
    ) {
      await block(`Go ${exerciseIndex}`, config.exerciseTime)
      // skip rest if it's the last exercise
      if (exerciseIndex !== config.exerciseCount) {
        await block(`Rest`, config.exerciseRestTime)
      }
    }
    if (roundIndex !== config.roundCount) {
      await block(`Rest between rounds`, config.roundRestTime)
    }
  }
}

export async function train(queueOrPath: TrainingOptions[] | string) {
  let queue: TrainingOptions[] = []

  if (typeof queueOrPath === "string") {
    const file = await Deno.readTextFile(queueOrPath)
    queue = JSON.parse(file)
  }

  for (const options of queue) {
    await training(options)
  }

  await say("done")
}
