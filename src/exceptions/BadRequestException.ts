import { TabbException } from './TabbException';

export class BadRequestException extends TabbException {
    public constructor(level = 'info', other?: any) {
        super({
            status: 400,
            message: 'Bad Request',
            code: 'E000400',
        }, level, other);
    }
}