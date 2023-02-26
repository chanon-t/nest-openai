import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { LineService } from './modules/line/line.service';
import { OpenAIService } from './modules/openai/openai.service';
import { translateText } from './utils/translate';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private readonly openAIService: OpenAIService,
    private readonly lineService: LineService,
  ) {}

  @Get('version')
  async getHello(@Query('text') text: string): Promise<string> {
    const result = await translateText(text);
    return this.appService.getVersion() + ', ' + result;
  }

  @Post('completions')
  async createCompletion(@Body() data: any) {
    const { events } = data;
    if (events[0]) {
      const { message, replyToken } = events[0];
      const { type } = message;
      console.log(events[0]);
      if (type === 'text') {
        // const prompt = `The following is a conversation with an AI assistant. The assistant is helpful, creative, clever, and very friendly.\n\nHuman:${message.text}\nAI:`;
        // const responseText = await this.openAIService.createCompletion(prompt, [
        //   'Human:',
        //   'AI:',
        // ]);
        const prompt = `${message.text}###`;
        const responseText = await this.openAIService.createCompletion(prompt, [
          '###',
        ]);
        await this.lineService.replyMessage(replyToken, responseText.trim());
      }
    }
  }
}
