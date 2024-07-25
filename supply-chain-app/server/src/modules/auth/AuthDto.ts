import { WeightMaster } from '../../databases/postgresql/entities/WeightMaster';
import { Session } from '@/common/interfaces/express';
import { UserMaster } from '@/databases/postgresql/entities/UserMaster';
export class RequestLoginDto {
  loginId: string;
  password: string;
}

export class ResponseLoginDto implements Session {
  loginId: string;
  weightMaster: WeightMaster;
  userId: string;

  constructor(data: UserMaster, private accessToken?: string) {
    this.loginId = data.loginId;
    this.userId = data.userId;
    this.weightMaster = data.weightMaster;
    this.accessToken = accessToken;
  }
}
