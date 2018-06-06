import { TabbException } from '../TabbException';

export class UnauthorizedException extends TabbException {
    public constructor(level = 'info', other?: any) {
        super({
            status: 401,
            message: 'Unauthorized',
            code: 'E000401',
        }, level, other);
    }
}
