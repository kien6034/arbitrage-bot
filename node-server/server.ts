import * as grpc from "@grpc/grpc-js";
import { getWhirlpoolService } from "./grpc/whirlpool";
import { PORT } from "./common";

export function startGrpcServer(port: number) {
  const server = new grpc.Server();
  const whirlpoolService = getWhirlpoolService();

  server.addService(whirlpoolService.service, whirlpoolService.handlers);

  server.bindAsync(
    `0.0.0.0:${port}`,
    grpc.ServerCredentials.createInsecure(),
    (err, port) => {
      if (err) {
        console.error(err);
        return;
      }
      console.log(`Your server has started on port ${port}`);
      server.start();
    }
  );
}

startGrpcServer(PORT);
