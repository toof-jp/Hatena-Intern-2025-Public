use tonic::{Request, Response, Status};

use renderer::renderer_server::Renderer;
use renderer::{RenderReply, RenderRequest};

pub mod common_mark;
pub mod config;

pub mod renderer {
    tonic::include_proto!("renderer");
}

#[derive(Debug, Default)]
pub struct CommonMarkRenderer {}

#[tonic::async_trait]
impl Renderer for CommonMarkRenderer {
    async fn render(
        &self,
        request: Request<RenderRequest>,
    ) -> Result<Response<RenderReply>, Status> {
        log::debug!("Received render request: {:?}", &request);
        let response = RenderReply {
            html: common_mark::convert(&request.into_inner().src),
        };
        Ok(Response::new(response))
    }
}
