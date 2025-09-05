use renderer_rust::config::Config;
use tonic::transport::Server;

use renderer_rust::CommonMarkRenderer;
use renderer_rust::config::Mode;
use renderer_rust::renderer::renderer_server::RendererServer;

#[tokio::main]
async fn main() -> Result<(), Box<dyn std::error::Error>> {
    let config = envy::from_env::<Config>()?;

    simple_logger::init_with_level(match config.mode {
        Mode::Development => log::Level::Debug,
        Mode::Production => log::Level::Info,
    })?;

    let addr = format!("0.0.0.0:{}", config.grpc_port).parse()?;
    let renderer = CommonMarkRenderer::default();

    log::info!("listening on {}", addr);

    let (health_reporter, health_service) = tonic_health::server::health_reporter();
    health_reporter
        .set_serving::<RendererServer<CommonMarkRenderer>>()
        .await;

    Server::builder()
        .add_service(health_service)
        .add_service(RendererServer::new(renderer))
        .serve(addr)
        .await?;

    Ok(())
}
