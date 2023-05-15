#!/usr/bin/env -S deno run --allow-read --allow-write --allow-run
import { walk } from "https://deno.land/std@0.187.0/fs/walk.ts"

const arg = Deno.args[0]

for await (const entry of walk(arg, {
  includeFiles: true,
  exts: ["ts"],
})) {
  // console.log(entry)
  // we want to fix normal node resolution imports/exports to esm compatible full path imports/exports
  // import { A } from "./a" => import { A } from "./a.js"
  // import { A } from "./a-dir" => import { A } from "./a-dir/index.js"
  // also support export statements and multi-line scenarios
  // TODO: implement match/replace

  let contents = Deno.readTextFileSync(entry.path)

  contents = contents.replaceAll(
    /(from\s+)(["'])(?!.*\.js)(\.?\.\/.*)(["'])/g,
    "$1$2$3.js$4"
  )

  Deno.writeTextFileSync(entry.path, contents)
}
