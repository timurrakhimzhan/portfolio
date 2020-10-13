import {sign} from 'jsonwebtoken';

export const getAccessToken = (uuid: number) => sign({uuid}, "secretWord", {expiresIn: "1w"});