import { TabbException } from '../TabbException';

export class UnprocessableException extends TabbException {
    public constructor(level = 'info', other?: any) {
        super({
            status: 422,
            message: 'Unprocessable',
            code: 'E000422',
        }, level, other);
    }
}