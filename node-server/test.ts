import path from "path";
import * as grpc from "@grpc/grpc-js";
import * as protoLoader from "@grpc/proto-loader";
import { ProtoGrpcType as WhirlpoolProtoGrpcType } from "./proto/whirlpool";
import { WhirlpoolHandlers } from "./proto/whirlpool/Whirlpool";
import { Whirlpool } from "./services/whirlpool/whirlpool";

const PORT = 8082;
const WHIRLPOOL_PROTO_FILE = "./proto/whirlpool.proto";

const whirlpoolPackageDef = protoLoader.loadSync(
  path.resolve(__dirname, WHIRLPOOL_PROTO_FILE)
);

const whirlpoolGrpcObj = grpc.loadPackageDefinition(
  whirlpoolPackageDef
) as unknown as WhirlpoolProtoGrpcType;
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

  server.addService(whirlpoolPackage.Whirlpool.service, {
    GetPrice: (req, res) => {
      console.log(req.request);
      res(null, { message: "Getting price" });
    },
    GetPool: async (req, res) => {
      let wp = new Whirlpool();
      if (!req.request.poolAddr) {
        res(null, { fee: 0 });
        return;
      }
      let data = await wp.getPoolInfo(req.request.poolAddr);
      console.log("data:", data);
      res(null, { fee: data.defaultProtocolFeeRate });
    },
    GetPair: (req, res) => {
      console.log(req.request);
      res(null, { message: "Getting pair" });
    },
  } as WhirlpoolHandlers);

  return server;
}

main();