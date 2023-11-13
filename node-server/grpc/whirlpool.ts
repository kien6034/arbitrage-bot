import * as grpc from "@grpc/grpc-js";
import { ProtoService, loadProto } from "../common";
import { ProtoGrpcType as WhirlpoolProtoGrpcType } from "../proto/whirlpool";
import { WhirlpoolHandlers } from "../proto/whirlpool/Whirlpool";
import { Whirlpool } from "../services/whirlpool/whirlpool";

export const getWhirlpoolService = () => {
  const whirlpoolPackageDef = loadProto(ProtoService.Whirlpool);
  const whirlpoolGrpcObj = grpc.loadPackageDefinition(
    whirlpoolPackageDef
  ) as unknown as WhirlpoolProtoGrpcType;
  const whirlpoolPackage = whirlpoolGrpcObj.whirlpool;

  const whirlpool = new Whirlpool();

  const handlers: WhirlpoolHandlers = {
    GetPrice: async (req, res) => {
      if (!req.request.tokenA || !req.request.tokenB) {
        // Handle error, maybe by sending a gRPC error response
        res({
          code: grpc.status.INVALID_ARGUMENT,
          message: "tokenA and tokenB are required.",
        });
        return;
      }

      const getPriceRes = await whirlpool.getPrice(
        req.request.tokenA,
        req.request.tokenB
      );

      if (getPriceRes.success) {
        res(null, getPriceRes.result);
      } else {
        res(getPriceRes.error);
      }
      return;
    },
    GetPool: async (req, res) => {
      const startTime = process.hrtime();

      if (!req.request.poolAddr) {
        res(null, { fee: 0 });
        return;
      }
      let data = await whirlpool.getPoolInfo(req.request.poolAddr);
      console.log("data:", data);
      // Calculate elapsed time
      const [seconds, nanoseconds] = process.hrtime(startTime);
      res(null, { fee: data.defaultProtocolFeeRate });
    },
    GetPair: (req, res) => {
      console.log(req.request);
      res(null, { message: "Getting pair" });
    },
  };

  return { service: whirlpoolPackage.Whirlpool.service, handlers };
};
