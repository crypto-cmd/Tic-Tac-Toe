// [snowpack] add styles to the page (skip if no document exists)
if (typeof document !== 'undefined') {
  const code = "#app {\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  width: 100vw;\n  height: 100vh;\n  flex-direction: column;\n  background-color: var(--bg-color);\n}\n#app .screen {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n}\n#app .screen .intro {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  margin-bottom: 30px;\n}\n#app .screen h3 {\n  font-size: 3rem;\n}\n#app .screen p {\n  font-size: 1.2rem;\n  margin-top: 10px;\n}\n#app .screen .instructions :nth-child(2) {\n  margin-left: auto;\n}\n#app .screen code {\n  width: fit-content;\n  padding: 5px 20px;\n  background-color: rgba(0, 0, 0, 0.404);\n  color: white;\n  font-family: inherit;\n  border-radius: 0.2rem;\n}\n#app .screen input {\n  --input-color: #99a3ba;\n  --input-border: #cdd9ed;\n  --input-background: #fff;\n  --input-border-focus: #275efe;\n  display: inline-block;\n  padding: 8px 16px;\n  line-height: 25px;\n  font-size: 14px;\n  font-weight: 500;\n  font-family: inherit;\n  border-radius: 6px;\n  color: var(--input-color);\n  border: 1px solid var(--input-border);\n  background: var(--input-background);\n  transition: border 0.3s ease;\n}\n#app .screen input:focus {\n  outline: none;\n  border-color: var(--input-border-focus);\n}";

  const styleEl = document.createElement("style");
  const codeEl = document.createTextNode(code);
  styleEl.type = 'text/css';
  styleEl.appendChild(codeEl);
  document.head.appendChild(styleEl);
}