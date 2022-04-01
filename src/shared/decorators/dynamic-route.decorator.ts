import { applyDecorators } from "@nestjs/common"
import { inOfflineMode } from "../../utils/client"

require("dotenv").config();

export const DynamicRoute = (...decorators: (ClassDecorator | MethodDecorator | PropertyDecorator)[]) => {
  if (!inOfflineMode()) {
    return applyDecorators(...decorators)
  }
  return applyDecorators()
}
