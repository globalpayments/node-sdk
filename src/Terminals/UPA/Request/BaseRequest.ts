import { GroupRequest } from ".";

export class BaseRequest {
  command: string;
  EcrId: string;
  requestId: number;
  data: GroupRequest;
}
