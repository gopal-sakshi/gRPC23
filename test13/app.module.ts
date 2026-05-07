import { Module } from '@nestjs/common';
import { IndexController } from './src/api/general23/index.controller';

@Module({
  imports: [],
  controllers: [IndexController],
  providers: [],
})
export class AppModule {}