import { TabbException } from './TabbException';

export class InternalServerErrorException extends TabbException {
    public constructor(level = 'info', other?: any) {
        super({
            status: 500,
            message: 'Internal Server Error',
            code: 'E000500',
        }, level, other);
    }
}