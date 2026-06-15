import 'dotenv/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigKey } from './enum/config-key.enum';

class ConfigManager {
  getValue(key: ConfigKey): string {
    const value = process.env[key];
    if (value === undefined) {
      throw new Error(`Config key ${key} is not defined`);
    }
    return value;
  }

  getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue(ConfigKey.DB_HOST),
      port: parseInt(this.getValue(ConfigKey.DB_PORT), 10),
      username: this.getValue(ConfigKey.DB_USER),
      password: this.getValue(ConfigKey.DB_PASSWORD),
      database: this.getValue(ConfigKey.DB_DATABASE),
      autoLoadEntities: true,
      synchronize: this.getValue(ConfigKey.DB_SYNC) === 'true',
      dropSchema: process.env[ConfigKey.DB_DROP] === 'true',
    };
  }
}

export const configManager = new ConfigManager();
