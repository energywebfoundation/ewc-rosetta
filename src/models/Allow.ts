import { OperationStatus } from "./OperationStatus";
import { Error as Err } from "./Error";

export class Allow {
  operation_statuses: OperationStatus[]
  operation_types: string[]
  errors: Err[]
  historical_balance_lookup: boolean
}