import type { TrainingOptions } from "./types.ts"

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

async function training(options: TrainingOptions) {
  await block(`Prepare for ${options.name}`, options.prepareTime)
  for (let roundIndex = 1; roundIndex <= options.roundCount; roundIndex++) {
    for (
      let exerciseIndex = 1;
      exerciseIndex <= options.exerciseCount;
      exerciseIndex++
    ) {
      await block(`Go ${exerciseIndex}`, options.exerciseTime)
      // skip rest if it's the last exercise
      if (exerciseIndex !== options.exerciseCount) {
        await block(`Rest`, options.exerciseRestTime)
      }
    }
    if (roundIndex !== options.roundCount) {
      await block(`Rest between rounds`, options.roundRestTime)
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
    if (options.children) {
      for (let roundIndex = 1; roundIndex <= options.roundCount; roundIndex++) {
        for (const child of options.children) {
          await training(child)
        }
      }
    } else {
      await training(options)
    }
  }

  await say("done")
}
