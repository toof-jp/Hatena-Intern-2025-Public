import React, { useEffect, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

function LivePreview() {
  //const [src, setSrc] = useState(initialSrc ?? "");
  const [src, setSrc] = useState("");
  const [html, setHtml] = useState("<p>Preview will appear here</p>");
  const timer = useRef<number | null>(null);
  const hiddenTextareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    // find a textarea in the same form if exists and keep it in sync
    const mount = document.getElementById("entry-editor");
    if (!mount) return;
    const form = mount.closest("form");
    let textarea = form?.querySelector("textarea[name=body]") as HTMLTextAreaElement | null;
    if (!textarea) return;

    // keep a ref to the hidden/form textarea so we can sync it when user types
    hiddenTextareaRef.current = textarea;

    // initialize src from the hidden textarea if it has value, else initialize the hidden textarea
    if (textarea.value) {
      setSrc(textarea.value);
    }

    // ensure the hidden textarea is visually hidden (template may have done this already)
    textarea.style.display = "none";

    return () => {
      hiddenTextareaRef.current = null;
    };
  }, []);

  useEffect(() => {
    // debounce and POST to /preview
    if (timer.current) {
      window.clearTimeout(timer.current);
    }
    if (src === "") {
      return;
    }
    timer.current = window.setTimeout(() => {
      fetch("/preview", {
        method: "POST",
        headers: { "Content-Type": "text/plain", "X-Requested-With": "XMLHttpRequest" },
        body: src,
      })
        .then((r) => {
          if (!r.ok) throw new Error(`status ${r.status}`);
          return r.text();
        })
        .then((t) => setHtml(t))
        .catch(() => setHtml("<p>Failed to render preview</p>"));
    }, 300);
    return () => {
      if (timer.current) window.clearTimeout(timer.current);
    };
  }, [src]);

  return (
    <div className="entry-editor-root">
      <div className="editor-textarea">
        <h3>Editor</h3>
        <textarea
          name="editor"
          value={src}
          onChange={(e) => {
            const v = e.target.value;
            setSrc(v);
            if (hiddenTextareaRef.current) hiddenTextareaRef.current.value = v;
          }}
          style={{ width: "100%", minHeight: 200 }}
        />
      </div>
      <div className="editor-preview">
        <h3>Preview</h3>
        {/* renderer-rustでhtmlはサニタイズしているので安全 */}
        <div
          style={{ border: "1px solid #ccc", padding: 12, borderRadius: 4, minHeight: 200, background: "#fff" }}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}

const mount = document.getElementById("entry-editor");
if (mount) {
  createRoot(mount).render(<LivePreview />);
}
