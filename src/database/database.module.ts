import { Module } from '@nestjs/common';
import { DrizzleService } from './database.service';

@Module({
  providers: [DrizzleService],
  exports: [DrizzleService],
})
export class DatabaseModule {}
