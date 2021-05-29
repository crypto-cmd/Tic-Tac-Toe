// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = ".btn {\n  display: flex;\n  background-color: rgba(255, 255, 255, 0.295);\n  color: black;\n  font-weight: 400;\n  font-size: 1.2rem;\n  margin-top: 3rem;\n  padding: 1rem 2.8rem;\n  text-decoration: none;\n  text-transform: uppercase;\n  cursor: pointer;\n  border-radius: 0.3rem;\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}