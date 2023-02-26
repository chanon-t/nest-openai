import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAIService {
  // constructor(private readonly httpService: HttpService) {}

  private openAI: OpenAIApi;

  constructor(private configService: ConfigService) {
    const configuration = new Configuration({
      apiKey: this.configService.get<string>('openai.apiKey'),
    });
    this.openAI = new OpenAIApi(configuration);
  }

  async createCompletion(
    prompt: string,
    stop: string[] = null,
    temperature: number = 0.4,
    max_tokens: number = 1000,
  ) {
    try {
      const r = await this.openAI.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature,
        max_tokens,
        stop,
        // top_p: 1.0,
        // frequency_penalty: 0.5,
        // presence_penalty: 0.0,
      });

      if (r && r.data && r.data.choices && r.data.choices[0]) {
        return r.data.choices[0].text;
      }

      return null;
    } catch (e) {
      const { data } = e.response;
      throw new HttpException(
        data.error.message,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
