// @ts-check

import { deleteFeatureTemplates, getEnvs, updateFeatureBranchList } from './utils.mjs'

const init = async () => {
  try {
    const [appName] = getEnvs('APP_NAME')
    // enter the deployment repo folder
    process.chdir('lifi-deployment')
    deleteFeatureTemplates(appName)
    updateFeatureBranchList(appName, true)
  } catch (e) {
    console.error(e)
    process.exitCode = 1
  }
}

export default init
