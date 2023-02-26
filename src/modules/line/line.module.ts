import { Module } from '@nestjs/common';
import { LineService } from './line.service';

@Module({
  imports: [],
  providers: [LineService],
  exports: [LineService],
})
export class LineModule {}
