import { Version } from "./Version";
import { Allow } from "./Allow";

export class NetworkOptionsResponse {
  constructor(public version: Version, public allow: Allow) {
  }
}