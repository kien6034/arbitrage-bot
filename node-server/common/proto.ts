import path from "path";
import * as protoLoader from "@grpc/proto-loader";
import { PROTO_DIR_NAME } from "./config";

export function loadProto(service: ProtoService) {
  return protoLoader.loadSync(path.resolve(PROTO_DIR_NAME, `${service}.proto`));
}

export enum ProtoService {
  Whirlpool = "whirlpool",
}
