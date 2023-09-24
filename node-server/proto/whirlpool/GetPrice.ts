// Original file: proto/whirlpool.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { GetPriceRequest as _whirlpool_GetPriceRequest, GetPriceRequest__Output as _whirlpool_GetPriceRequest__Output } from '../whirlpool/GetPriceRequest';
import type { GetPriceResponse as _whirlpool_GetPriceResponse, GetPriceResponse__Output as _whirlpool_GetPriceResponse__Output } from '../whirlpool/GetPriceResponse';

export interface GetPriceClient extends grpc.Client {
  GetPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  GetPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  GetPrice(argument: _whirlpool_GetPriceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  GetPrice(argument: _whirlpool_GetPriceRequest, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  getPrice(argument: _whirlpool_GetPriceRequest, callback: grpc.requestCallback<_whirlpool_GetPriceResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface GetPriceHandlers extends grpc.UntypedServiceImplementation {
  GetPrice: grpc.handleUnaryCall<_whirlpool_GetPriceRequest__Output, _whirlpool_GetPriceResponse>;
  
}

export interface GetPriceDefinition extends grpc.ServiceDefinition {
  GetPrice: MethodDefinition<_whirlpool_GetPriceRequest, _whirlpool_GetPriceResponse, _whirlpool_GetPriceRequest__Output, _whirlpool_GetPriceResponse__Output>
}
