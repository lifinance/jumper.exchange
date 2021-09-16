import { createAndPushProcess, initStatus, setStatusDone, setStatusFailed } from './status'

import { JsonRpcSigner } from '@ethersproject/providers'
import { Execution } from '../types/server'
import BigNumber from 'bignumber.js'
import hop from './hop'
import { CoinKey } from '../types'

export const executeHopCross = async (signer: JsonRpcSigner, bridgeCoin: CoinKey, amount: string, fromChainId: number, toChainId: number, updateStatus?: Function, initialStatus?: Execution) => {
  // setup
  const { status, update } = initStatus(updateStatus, initialStatus)
  hop.init(signer)

  const allowanceAndCrossProcess = createAndPushProcess(update, status, 'Set Allowance and Cross')
  let tx
  try {
     tx = hop.setAllowanceAndCrossChains(bridgeCoin, amount, fromChainId, toChainId )
  } catch (_e) {

  }
}


// export const executeParaswap = async (chainId: number, signer: JsonRpcSigner, srcToken: string, destToken: string, srcAmount: BigNumber, srcAddress: string, destAddress: string, updateStatus?: Function, initialStatus?: Execution) => {
//   // setup
//   const { status, update } = initStatus(updateStatus, initialStatus)

//   // Ask user to set allowance
//   // -> set status
//   const allowanceProcess = createAndPushProcess(update, status, 'Set Allowance')

//   // -> check allowance
//   try {
//     await paraswap.updateAllowance(signer, chainId, srcAddress, srcToken, srcAmount.toNumber())
//   } catch (e:any) {
//     // -> set status
//     if (e.message) allowanceProcess.errorMessage = e.message
//     if (e.code) allowanceProcess.errorCode = e.code
//     setStatusFailed(update, status, allowanceProcess)
//     throw e
//   }

//   // -> set status
//   setStatusDone(update, status, allowanceProcess)


//   // Swap via Paraswap
//   // -> set status
//   const swapProcess = createAndPushProcess(update, status, 'Swap via Paraswap')

//   // -> swapping
//   let tx
//   try {
//     tx = await paraswap.transfer(signer, chainId, srcAddress, srcToken, destToken, srcAmount.toNumber(), destAddress)
//   } catch (e: any) {
//     // -> set status
//     if (e.message) allowanceProcess.errorMessage = e.message
//     if (e.code) allowanceProcess.errorCode = e.code
//     setStatusFailed(update, status, swapProcess)
//     throw e
//   }

//   // -> set status
//   setStatusDone(update, status, swapProcess)


//   // Wait for transaction
//   // -> set status
//   const waitingProcess = createAndPushProcess(update, status, 'Wait for Transaction')

//   // -> waiting
//   let receipt
//   try {
//     receipt = await tx.wait()
//   } catch (e: any) {
//     // -> set status
//     if (e.message) allowanceProcess.errorMessage = e.message
//     if (e.code) allowanceProcess.errorCode = e.code
//     setStatusFailed(update, status, waitingProcess)
//     throw e
//   }

//   // -> set status
//   const parsedReceipt = paraswap.parseReceipt(tx, receipt)
//   setStatusDone(update, status, waitingProcess, {
//     fromAmount: parsedReceipt.fromAmount,
//     toAmount: parsedReceipt.toAmount,
//     gasUsed: (status.gasUsed || 0) + parsedReceipt.gasUsed,
//   })

//   // -> set status
//   status.status = 'DONE'
//   update(status)

//   // DONE
//   return status
// }
