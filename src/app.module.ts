import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { generalConfig } from './config/general.config';
import { LineModule } from './modules/line/line.module';
import { OpenAIModule } from './modules/openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      ignoreEnvFile: false,
      load: [generalConfig],
      isGlobal: true,
    }),
    OpenAIModule,
    LineModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
