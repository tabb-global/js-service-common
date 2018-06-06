import { PipeTransform } from '@nestjs/common';
export declare class JoiValidationPipe implements PipeTransform {
    private readonly schema;
    constructor(schema: any);
    transform(value: any): any;
}
