// @ts-check

import {
  getEnvs,
  getDeploymentTemplates,
  updateFeatureBranchList,
  updateDeploymentTemplate,
  getValueFilesPath
} from './utils.mjs'

const init = async () => {
  try {
    // get the required envs
    const [appName, dockerTag] = getEnvs('APP_NAME', 'DOCKER_TAG')
    // enter the deployment repo folder
    process.chdir('lifi-deployment')
    // update/create the value file
    let endpoints = ""
    try {
      // update the app template
      const list = getDeploymentTemplates(appName)
      for (const { valueFile, template } of list) {
        template.image.tag = dockerTag
        updateDeploymentTemplate({ valueFile, template })
      }
    } catch {
      // value file does not exist yet, we need to create it
      const endpoint = `${appName}.jumper.exchange`;
      const newTemplate = {
        image: { tag: dockerTag },
        ingress: {
          hosts: [
            {
              host: endpoint,
              paths: [{ path: '/', pathType: 'Prefix' }]
            },
          ],
        },
      }
      const valueFiles = getValueFilesPath(appName)
      for (const valueFile of valueFiles) {
        updateDeploymentTemplate({ valueFile, template: newTemplate })
      }
      endpoints = `https://${endpoint}`
    }
    updateFeatureBranchList(appName)
    return endpoints
  } catch (e) {
    console.error(`::error::${e}`)
    process.exitCode = 1
  }
}

export default init
