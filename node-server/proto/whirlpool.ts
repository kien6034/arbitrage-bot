import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { GetPriceClient as _whirlpool_GetPriceClient, GetPriceDefinition as _whirlpool_GetPriceDefinition } from './whirlpool/GetPrice';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  whirlpool: {
    GetPrice: SubtypeConstructor<typeof grpc.Client, _whirlpool_GetPriceClient> & { service: _whirlpool_GetPriceDefinition }
    GetPriceRequest: MessageTypeDefinition
    GetPriceResponse: MessageTypeDefinition
  }
}

