import health from "grpc-js-health-check";
import winston from "winston";
import renderer_pb from "../pb/renderer/renderer_pb.js";
import { IRendererServer } from "../pb/renderer/renderer_grpc_pb.js";
import { UnaryHandler, unaryHandler, createLoggingMiddleware } from "./server-utils.mjs";
import { render } from "./renderer.mjs";

export interface Server {
  renderer: IRendererServer;
  health: health.IHealthServer;
}

/**
 * サーバー (IRendererServer) を作成する
 */
export function createServer(logger: winston.Logger): Server {
  const healthImpl = new health.Implementation({
    "": health.servingStatus.SERVING,
    "renderer.Renderer": health.servingStatus.SERVING,
  });
  const loggingMiddleware = createLoggingMiddleware(logger);
  return {
    health: {
      check: healthImpl.check.bind(healthImpl),
    },
    renderer: {
      render: unaryHandler(handleRender, loggingMiddleware("renderer.Renderer/render")),
    },
  };
}

/**
 * renderer.Renderer/Render に対するハンドラ
 */
export const handleRender: UnaryHandler<
  renderer_pb.RenderRequest,
  renderer_pb.RenderReply
> = async (req) => {
  const src = req.getSrc();
  const html = await render(src);
  const reply = new renderer_pb.RenderReply();
  reply.setHtml(html);
  return reply;
};
