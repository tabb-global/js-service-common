import * as Joi from 'joi';
import { PipeTransform, Injectable } from '@nestjs/common';
import { JoiRequestValidationException } from '../exceptions/JoiRequestValidationException';

@Injectable()
export class JoiValidationPipe implements PipeTransform {
    constructor(private readonly schema) {
    }

    transform(value: any) {
        return value;
        // const { error } = Joi.validate(value, this.schema);
        // if (error) {
        //     throw new JoiRequestValidationException(error);
        // }
        // return value;
    }
}