import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { WhirlpoolClient as _whirlpool_WhirlpoolClient, WhirlpoolDefinition as _whirlpool_WhirlpoolDefinition } from './whirlpool/Whirlpool';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  whirlpool: {
    GetPairRequest: MessageTypeDefinition
    GetPairResponse: MessageTypeDefinition
    GetPoolRequest: MessageTypeDefinition
    GetPoolResponse: MessageTypeDefinition
    GetPriceRequest: MessageTypeDefinition
    GetPriceResponse: MessageTypeDefinition
    Whirlpool: SubtypeConstructor<typeof grpc.Client, _whirlpool_WhirlpoolClient> & { service: _whirlpool_WhirlpoolDefinition }
  }
}

