import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

@Injectable()
export class DrizzleService implements OnModuleInit, OnModuleDestroy {
  public db: NodePgDatabase;
  private pool: Pool;

  constructor(
    private readonly configService: ConfigService,
  ) {}

  onModuleInit() {
    this.pool = new Pool({
      connectionString: this.configService.getOrThrow<string>('DATABASE_URL'),
      max: 20,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });

    this.db = drizzle(this.pool);
  }

  async onModuleDestroy() {
    if (this.pool) {
      await this.pool.end();
      console.log('Database connection pool has been closed.');
    } else {
      console.log('No database connection pool to close.');
    }
  }
}
