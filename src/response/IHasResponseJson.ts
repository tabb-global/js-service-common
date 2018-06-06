import { IResponseJson } from "./IResponseJson";

export interface IHasResponseJson {
    toResponseJson(): IResponseJson
}