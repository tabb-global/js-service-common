import { Module } from '@nestjs/common';
import { ConfigService } from './ConfigService';

@Module({
    providers: [
        {
            provide: ConfigService,
            useValue: new ConfigService(`.env`),
        },
    ],
    exports: [ConfigService],
})
export class ConfigModule {
}