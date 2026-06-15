import { Module } from '@nestjs/common';
import { IndexController } from './src/api/general23/index.controller';
import { SportsService23Controller } from './src/api/sports23/sports.controller';
import { Streaming23Controller } from './src/api/stream23/stream23.controller';

@Module({
  imports: [],
  controllers: [IndexController, SportsService23Controller, Streaming23Controller],
  providers: [],
})
export class AppModule {}