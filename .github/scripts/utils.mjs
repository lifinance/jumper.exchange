// @ts-check

import { execSync } from 'child_process'
import { existsSync, rmSync, openSync, writeSync, closeSync, readFileSync, writeFileSync, readdirSync } from 'fs'
// @ts-ignore
import YAML from 'yaml'

// get the list of env variable values
export const getEnvs = (...envs) => {
  if (envs?.length) {
    return envs.map(name => {
      const value = process.env[name]
      if (!value) {
        throw new Error(`Env variable ${name} is required.`)
      }
      return value
    })
  } else {
    throw new Error(`Missing env variable list.`)
  }
}

const isFeatureBranch = (name) => name.startsWith('feat-')

// get feature branch template (value file) path
export const getValueFilesPath = (name) => {
  if (!name) {
    throw new Error(`Missing app name.`)
  }
  const basePath = 'charts/jumper-exchange'
  const files = readdirSync(basePath)
  const valueFiles = files.filter(f => f.startsWith(`values-${name}`))
  if (!valueFiles.length) {
    // we do not throw an error since if a feature branch value file
    // does not exists, we want to create it instead (first deploy)
    if (isFeatureBranch(name)) {
      return [`${basePath}/values-${name}.yaml`]
    }
    throw new Error(`Cannot find value file for ${name}.`)
  }
  return valueFiles.map(v => `${basePath}/${v}`)
}

// get a deployment template (value file)
export const getDeploymentTemplates = (appName) => {
  const valueFiles = getValueFilesPath(appName)
  const templates = []
  for (const valueFile of valueFiles) {
    if (existsSync(valueFile)) {
      const file = readFileSync(valueFile, 'utf8')
      templates.push({ valueFile, template: YAML.parse(file) })
    } else {
      throw new Error(`Missing ${valueFile} file.`)
    }
  }
  return templates
}

// update a deployment template (value file)
export const updateDeploymentTemplate = ({ valueFile, template }) => {
  if (template) {
    if (template?.feature?.version) {
      template.feature.version += 1
    }
    const file = openSync(valueFile, 'w') // w: write and create if does not exist
    const yamlData = YAML.stringify(template)
    if (yamlData.length) {
      writeSync(file, yamlData)
      closeSync(file)
    } else {
      closeSync(file)
      throw new Error(`Yaml data shouldn't be empty.`)
    }
    execSync(`git add ${valueFile}`, { shell: '/bin/bash' })
  } else {
    throw new Error(`The template shouldn't be empty.`)
  }
}

// delete the feature branch template (value file)
// do not throw an error if missing (already deleted)
export const deleteFeatureTemplates = (appName) => {
  const valueFiles = getValueFilesPath(appName)
  for (const valueFile of valueFiles) {
    if (existsSync(valueFile)) {
      rmSync(valueFile, { force: true })
      execSync(`git add ${valueFile}`, { shell: '/bin/bash' })
    }
  }
}

// get the app list in the apps/value.yaml file of the deployment repo
export const getFeatureBranchList = () => {
  const file = readFileSync('apps/values.yaml', 'utf8')
  const valueFile = YAML.parse(file)
  if (valueFile?.featureBranchesJumper) {
    return valueFile.featureBranchesJumper
  } else {
    throw new Error('Missing feature branch list in apps/values.yaml')
  }
}

// replace the app list in the apps/value.yaml file of the deployment repo
const saveFeatureBranchList = (newList) => {
  if (!newList) {
    throw new Error(`App list must be an array.`)
  }
  const valueFile = YAML.parse(readFileSync('apps/values.yaml', 'utf8'))
  if (valueFile?.featureBranchesJumper) {
    valueFile.featureBranchesJumper = newList
    writeFileSync('apps/values.yaml', YAML.stringify(valueFile))
  } else {
    throw new Error(`Yaml data shouldn't be empty.`)
  }
  execSync(`git add apps/values.yaml`, { shell: '/bin/bash' })
}

// update the app list in the apps/value.yaml file of the deployment repo
export const updateFeatureBranchList = (appName, remove = false) => {
  if (!appName) {
    throw new Error(`Missing feature branch name.`)
  }
  // get the list and add or remove the new app
  const list = getFeatureBranchList()
  const index = list.findIndex(a => a === appName)
  if (remove) {
    if (index > -1) {
      list.splice(index, 1)
      saveFeatureBranchList(list)
    } else {
      console.warn(`${appName} does not exist in app list.`)
    }
  } else {
    if (list.indexOf(appName) === -1) {
      list.push(appName)
      saveFeatureBranchList(list)
    } else {
      console.warn(`${appName} is already in app list.`)
    }
  }
}
