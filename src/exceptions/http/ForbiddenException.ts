import { TabbException } from '../TabbException';

export class ForbiddenException extends TabbException {
    public constructor(level = 'error', other?: any) {
        super({
            status: 403,
            message: 'Forbidden',
            code: 'E000403',
        }, level, other);
    }
}
