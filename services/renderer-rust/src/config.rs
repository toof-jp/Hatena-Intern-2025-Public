use serde::Deserialize;

#[derive(Debug, Deserialize)]
pub struct Config {
    pub grpc_port: u64,
    pub mode: Mode,
}

#[derive(Debug, Deserialize)]
#[serde(rename_all = "lowercase")]
pub enum Mode {
    Development,
    Production,
}
