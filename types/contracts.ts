import { ethers } from "ethers"

export type ContractsType = {
    coinbetSlotGame: ethers.Contract,
    coinbetHousePool: ethers.Contract,
}
export type ContractsContextType = {
  contracts: ContractsType | undefined
}
