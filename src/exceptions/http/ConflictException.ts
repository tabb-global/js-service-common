import { TabbException } from '../TabbException';

export class ConflictException extends TabbException {
    public constructor(level = 'info', other?: any) {
        super({
            status: 409,
            message: 'Conflict',
            code: 'E000409',
        }, level, other);
    }
}