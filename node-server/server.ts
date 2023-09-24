import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType } from "./proto/random";
import { RandomHandlers } from "./proto/randomPackage/Random";
import { ProtoGrpcType as WhirlpoolProtoGrpcType } from "./proto/whirlpool";
import { GetPriceHandlers } from "./proto/whirlpool/GetPrice";

const PORT = 8082;
const PROTO_FILE = "./proto/random.proto";
const WHIRLPOOL_PROTO_FILE = "./proto/whirlpool.proto";

const packageDef = protoLoader.loadSync(path.resolve(__dirname, PROTO_FILE));
const whirlpoolPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, WHIRLPOOL_PROTO_FILE)
);
const grpcObj = grpc.loadPackageDefinition(
  packageDef
) as unknown as ProtoGrpcType;

const whirlpoolGrpcObj = grpc.loadPackageDefinition(
  whirlpoolPackageDef
) as unknown as WhirlpoolProtoGrpcType;

const randomPackage = grpcObj.randomPackage;
const whirlpoolPackage = whirlpoolGrpcObj.whirlpool;

function main() {
  const server = getServer();

  server.bindAsync(
    `0.0.0.0:${PORT}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your server as started on port ${port}`);
      server.start();
    }
  );
}

function getServer() {
  const server = new grpc.Server();
  server.addService(randomPackage.Random.service, {
    PingPong: (req, res) => {
      console.log(req.request);
      res(null, { message: "Pong" });
    },
  } as RandomHandlers);

  server.addService(whirlpoolPackage.GetPrice.service, {
    GetPrice: (req, res) => {
      console.log(req.request);
      res(null, { message: "Getting price" });
    },
  } as GetPriceHandlers);

  return server;
}

main();
