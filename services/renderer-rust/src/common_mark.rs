pub fn convert(src: &str) -> String {
    let parser = pulldown_cmark::Parser::new(src);
    let mut html_output = String::new();
    pulldown_cmark::html::push_html(&mut html_output, parser);
    ammonia::clean(&html_output)
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_convert() {
        let src = r#"# Heading

This is *italic* and **bold**.

- item1
- item2

[Google](https://google.com/)"#;

        let want = r#"<h1>Heading</h1>
<p>This is <em>italic</em> and <strong>bold</strong>.</p>
<ul>
<li>item1</li>
<li>item2</li>
</ul>
<p><a href="https://google.com/" rel="noopener noreferrer">Google</a></p>
"#;

        assert_eq!(convert(src), want);
    }

    #[test]
    fn test_convert_xss() {
        let src = r#"<script>alert('XSS')</script>"#;
        let want = r#""#;
        assert_eq!(convert(src), want);
    }
}
