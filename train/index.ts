#!/usr/bin/env -S deno run --allow-read --allow-run

import { Command } from "https://deno.land/x/cliffy@v0.25.7/command/mod.ts"
import { train } from "./mod.ts"

await new Command()
  .name("interval-timer")
  .version("12023.03.14")
  .description("Interval timer for training or anything else.")
  .arguments("<path:string>")
  .action((_options, path: string) => train(path))
  .parse(Deno.args)