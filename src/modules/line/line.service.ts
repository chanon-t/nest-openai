import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios, { AxiosInstance } from 'axios';

@Injectable()
export class LineService {
  private axiosInstance: AxiosInstance;

  constructor(configService: ConfigService) {
    this.axiosInstance = axios.create({
      baseURL: 'https://api.line.me/v2',
      headers: {
        Authorization: `Bearer ${configService.get('line.channelAccessToken')}`,
      },
    });
  }

  async pushMessage(to: string, message: string): Promise<boolean> {
    try {
      await this.axiosInstance.post('/bot/message/push', {
        to,
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
      });
    } catch (e) {
      const { data } = e.response;
      throw new HttpException(data.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return true;
  }

  async replyMessage(replyToken: string, message: string): Promise<boolean> {
    try {
      await this.axiosInstance.post('/bot/message/reply', {
        replyToken,
        messages: [
          {
            type: 'text',
            text: message,
          },
        ],
      });
    } catch (e) {
      const { data } = e.response;
      throw new HttpException(data.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    return true;
  }
}
