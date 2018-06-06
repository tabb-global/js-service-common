import { TabbException } from '../TabbException';

export class NotImplementedException extends TabbException {
    public constructor(level = 'info', other?: any) {
        super({
            status: 501,
            message: 'Not Implemented',
            code: 'E000501',
        }, level, other);
    }
}