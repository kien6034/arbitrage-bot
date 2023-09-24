// Code generated by protoc-gen-go-grpc. DO NOT EDIT.
// versions:
// - protoc-gen-go-grpc v1.2.0
// - protoc             v4.24.3
// source: proto/random.proto

package random

import (
	context "context"
	grpc "google.golang.org/grpc"
	codes "google.golang.org/grpc/codes"
	status "google.golang.org/grpc/status"
)

// This is a compile-time assertion to ensure that this generated file
// is compatible with the grpc package it is being compiled against.
// Requires gRPC-Go v1.32.0 or later.
const _ = grpc.SupportPackageIsVersion7

// RandomClient is the client API for Random service.
//
// For semantics around ctx use and closing/ending streaming RPCs, please refer to https://pkg.go.dev/google.golang.org/grpc/?tab=doc#ClientConn.NewStream.
type RandomClient interface {
	PingPong(ctx context.Context, in *PingRequest, opts ...grpc.CallOption) (*PongResponse, error)
}

type randomClient struct {
	cc grpc.ClientConnInterface
}

func NewRandomClient(cc grpc.ClientConnInterface) RandomClient {
	return &randomClient{cc}
}

func (c *randomClient) PingPong(ctx context.Context, in *PingRequest, opts ...grpc.CallOption) (*PongResponse, error) {
	out := new(PongResponse)
	err := c.cc.Invoke(ctx, "/randomPackage.Random/PingPong", in, out, opts...)
	if err != nil {
		return nil, err
	}
	return out, nil
}

// RandomServer is the server API for Random service.
// All implementations must embed UnimplementedRandomServer
// for forward compatibility
type RandomServer interface {
	PingPong(context.Context, *PingRequest) (*PongResponse, error)
	mustEmbedUnimplementedRandomServer()
}

// UnimplementedRandomServer must be embedded to have forward compatible implementations.
type UnimplementedRandomServer struct {
}

func (UnimplementedRandomServer) PingPong(context.Context, *PingRequest) (*PongResponse, error) {
	return nil, status.Errorf(codes.Unimplemented, "method PingPong not implemented")
}
func (UnimplementedRandomServer) mustEmbedUnimplementedRandomServer() {}

// UnsafeRandomServer may be embedded to opt out of forward compatibility for this service.
// Use of this interface is not recommended, as added methods to RandomServer will
// result in compilation errors.
type UnsafeRandomServer interface {
	mustEmbedUnimplementedRandomServer()
}

func RegisterRandomServer(s grpc.ServiceRegistrar, srv RandomServer) {
	s.RegisterService(&Random_ServiceDesc, srv)
}

func _Random_PingPong_Handler(srv interface{}, ctx context.Context, dec func(interface{}) error, interceptor grpc.UnaryServerInterceptor) (interface{}, error) {
	in := new(PingRequest)
	if err := dec(in); err != nil {
		return nil, err
	}
	if interceptor == nil {
		return srv.(RandomServer).PingPong(ctx, in)
	}
	info := &grpc.UnaryServerInfo{
		Server:     srv,
		FullMethod: "/randomPackage.Random/PingPong",
	}
	handler := func(ctx context.Context, req interface{}) (interface{}, error) {
		return srv.(RandomServer).PingPong(ctx, req.(*PingRequest))
	}
	return interceptor(ctx, in, info, handler)
}

// Random_ServiceDesc is the grpc.ServiceDesc for Random service.
// It's only intended for direct use with grpc.RegisterService,
// and not to be introspected or modified (even as a copy)
var Random_ServiceDesc = grpc.ServiceDesc{
	ServiceName: "randomPackage.Random",
	HandlerType: (*RandomServer)(nil),
	Methods: []grpc.MethodDesc{
		{
			MethodName: "PingPong",
			Handler:    _Random_PingPong_Handler,
		},
	},
	Streams:  []grpc.StreamDesc{},
	Metadata: "proto/random.proto",
}
