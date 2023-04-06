import { Injectable, Logger } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CacheTodoService } from '../../../modules/cache/cache-todo.service';
import * as _ from 'lodash';

@Injectable()
export class InsertLogTask {
    constructor(
        private readonly cacheService: CacheTodoService,
        private readonly commandBus: CommandBus,
    ) { }

    private readonly logger = new Logger(InsertLogTask.name);

    // every 10s
    @Cron(CronExpression.EVERY_10_SECONDS)
    async handleCron() {
        try {
        } catch (error) {
            console.log(error)
            return;
        }
    }
}
