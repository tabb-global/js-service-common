import { TabbException } from '../TabbException';

export class NotFoundException extends TabbException {
    public constructor(level = 'info', other?: any) {
        super({
            status: 404,
            message: 'Not Found',
            code: 'E000404',
        }, level, other);
    }
}