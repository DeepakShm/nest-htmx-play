import { neon } from '@neondatabase/serverless';
import { NeonHttpDatabase, drizzle } from 'drizzle-orm/neon-http';
import { ConfigService } from '@nestjs/config';
import * as schema from './schema/schema';

export const DrizzleAsyncProvider = 'DrizzleProvider';

export const DrizzleProvider = [
  {
    provide: DrizzleAsyncProvider,
    useFactory: async (configService: ConfigService) => {
      const sql = neon(configService.getOrThrow<string>('DATABASE_URL'));
      const db = drizzle(sql, { schema });
      return db;
    },
    exports: [DrizzleAsyncProvider],
    inject: [ConfigService],
  },
];
export type DbType = NeonHttpDatabase<typeof schema>;
