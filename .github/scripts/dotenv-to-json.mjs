// @ts-check

import { open } from 'node:fs/promises'

const envType = process.argv[2]

if (envType !=='local' && envType !== 'test') {
  console.error(`Wrong env type param: ${envType}`)
  process.exit(1)
}

const cfgPath = process.argv[3] ?? './config'

const startsAndEndsBy = c => s => s.startsWith(c) && s.endsWith(c)

const removeQuotes = (value) => {
  const enclosedInSingleQuotes = startsAndEndsBy(`'`)
  const enclosedInDoubleQuotes = startsAndEndsBy(`"`)
  const quoteEnclosed = enclosedInSingleQuotes(value) || enclosedInDoubleQuotes(value)
  return quoteEnclosed ? value.slice(1, -1) : value
}

async function getJsonString() {
  const file = await open(`${cfgPath}/.env.${envType}`)
  const obj = {}
  for await (const line of file.readLines()) {
    if (line.length && !line.startsWith('#')) {
      const i = line.indexOf('=')
      if (i) {
        const key = line.substring(0, i)
        const value = line.substring(i + 1)
        // remove quotes at the end/start if needed
        obj[key] = removeQuotes(value.trim())
      }
    }
  }
  return JSON.stringify(obj)
}

// print to stdout
getJsonString().then(str => console.log(str))
