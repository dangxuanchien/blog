import * as jwt from 'jsonwebtoken';
import { UserMaster } from '@/databases/postgresql/entities/UserMaster';
import { RequestLoginDto, ResponseLoginDto } from './AuthDto';
import config from '@/common/configs/ConfigEnv';
import { MessagesConstants } from '../../common/constants/MessagesConstants';
class AuthService {
  /**
   * It takes a loginId and password from the request, checks if the user exists in the database, and
   * if so, returns a token
   * @param {RequestLoginDto} data - RequestLoginDto
   * @returns ResponseLoginDto
   */
  async login(data: RequestLoginDto): Promise<ResponseLoginDto> {
    const userInfo = await UserMaster.findOne({
      where: {
        loginId: data.loginId,
      },
    });

    if (!userInfo) {
      throw new Error(MessagesConstants.LOGIN_PASSWORD_INCORRECT);
    }

    if (userInfo.password !== data.password) {
      throw new Error(MessagesConstants.LOGIN_PASSWORD_INCORRECT);
    }

    const accessToken = jwt.sign(
      {
        loginId: userInfo.loginId,
        userId: userInfo.userId
      },
      config.getEnv('JWT_SECRET_KEY')
    );

    return new ResponseLoginDto(userInfo, accessToken);
  }
}

export default new AuthService();
