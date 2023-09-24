// Original file: proto/whirlpool.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetPairRequest as _whirlpool_GetPairRequest, GetPairRequest__Output as _whirlpool_GetPairRequest__Output } from '../whirlpool/GetPairRequest';
import type { GetPairResponse as _whirlpool_GetPairResponse, GetPairResponse__Output as _whirlpool_GetPairResponse__Output } from '../whirlpool/GetPairResponse';
import type { GetPoolRequest as _whirlpool_GetPoolRequest, GetPoolRequest__Output as _whirlpool_GetPoolRequest__Output } from '../whirlpool/GetPoolRequest';
import type { GetPoolResponse as _whirlpool_GetPoolResponse, GetPoolResponse__Output as _whirlpool_GetPoolResponse__Output } from '../whirlpool/GetPoolResponse';
import type { GetPriceRequest as _whirlpool_GetPriceRequest, GetPriceRequest__Output as _whirlpool_GetPriceRequest__Output } from '../whirlpool/GetPriceRequest';
import type { GetPriceResponse as _whirlpool_GetPriceResponse, GetPriceResponse__Output as _whirlpool_GetPriceResponse__Output } from '../whirlpool/GetPriceResponse';

export interface WhirlpoolClient extends grpc.Client {
  GetPair(argument: _whirlpool_GetPairRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  GetPair(argument: _whirlpool_GetPairRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  GetPair(argument: _whirlpool_GetPairRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  GetPair(argument: _whirlpool_GetPairRequest, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  getPair(argument: _whirlpool_GetPairRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  getPair(argument: _whirlpool_GetPairRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  getPair(argument: _whirlpool_GetPairRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  getPair(argument: _whirlpool_GetPairRequest, callback: grpc.requestCallback<_whirlpool_GetPairResponse__Output>): grpc.ClientUnaryCall;
  
  GetPool(argument: _whirlpool_GetPoolRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  GetPool(argument: _whirlpool_GetPoolRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  GetPool(argument: _whirlpool_GetPoolRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  GetPool(argument: _whirlpool_GetPoolRequest, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  getPool(argument: _whirlpool_GetPoolRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  getPool(argument: _whirlpool_GetPoolRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  getPool(argument: _whirlpool_GetPoolRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  getPool(argument: _whirlpool_GetPoolRequest, callback: grpc.requestCallback<_whirlpool_GetPoolResponse__Output>): grpc.ClientUnaryCall;
  
  GetPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  GetPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  GetPrice(argument: _whirlpool_GetPriceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  GetPrice(argument: _whirlpool_GetPriceRequest, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface WhirlpoolHandlers extends grpc.UntypedServiceImplementation {
  GetPair: grpc.handleUnaryCall<_whirlpool_GetPairRequest__Output, _whirlpool_GetPairResponse>;
  
  GetPool: grpc.handleUnaryCall<_whirlpool_GetPoolRequest__Output, _whirlpool_GetPoolResponse>;
  
  GetPrice: grpc.handleUnaryCall<_whirlpool_GetPriceRequest__Output, _whirlpool_GetPriceResponse>;
  
}

export interface WhirlpoolDefinition extends grpc.ServiceDefinition {
  GetPair: MethodDefinition<_whirlpool_GetPairRequest, _whirlpool_GetPairResponse, _whirlpool_GetPairRequest__Output, _whirlpool_GetPairResponse__Output>
  GetPool: MethodDefinition<_whirlpool_GetPoolRequest, _whirlpool_GetPoolResponse, _whirlpool_GetPoolRequest__Output, _whirlpool_GetPoolResponse__Output>
  GetPrice: MethodDefinition<_whirlpool_GetPriceRequest, _whirlpool_GetPriceResponse, _whirlpool_GetPriceRequest__Output, _whirlpool_GetPriceResponse__Output>
}
