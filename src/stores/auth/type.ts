import { EActionStatus } from "../type";

export interface IAuthState {
    status: EActionStatus;
    nonce: any;
}