import { Module } from '@nestjs/common';
import { IndexController } from './src/api/general23/index.controller';
import { SportsService23Controller } from './src/api/sports23/sports.controller';

@Module({
  imports: [],
  controllers: [IndexController, SportsService23Controller],
  providers: [],
})
export class AppModule {}