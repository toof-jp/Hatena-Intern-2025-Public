fn main() -> Result<(), Box<dyn std::error::Error>> {
    tonic_prost_build::compile_protos("pb/renderer.proto")?;
    Ok(())
}
