const processResponse = html => {
  const template = document.createElement('div');
  template.innerHTML = html;

  const links = [...template.querySelectorAll('link')];
  const scripts = [...template.querySelectorAll('script')];
  [...links, ...scripts, ...template.querySelectorAll('meta, title')].forEach(
    element => element.parentNode.removeChild(element)
  );

  return {template, links, scripts};
};

fetch('http://localhost:9977')
  .then(response => response.text())
  .then(html => {
    const {template, links, scripts} = processResponse(html);
    links.forEach(link => document.head.appendChild(link));
    const clonedScripts = document.createDocumentFragment();
    scripts.forEach(script => {
      const clonedScript = Object.assign(document.createElement('script'), {
        textContent: script.textContent,
      });
      clonedScripts.appendChild(clonedScript);
    });
    document.head.appendChild(clonedScripts);

    customElements.define(
      'my-experience',
      class extends HTMLElement {
        constructor() {
          super();
          this.template = template;

          this.addEventListener('submit', async event => {
            event.preventDefault();
            const form = event.target;
            const body = new URLSearchParams();
            for (const [key, value] of new FormData(form)) {
              body.append(key, value);
            }
            const response = await fetch(form.target, {
              method: form.method,
              mode: 'cors',
              body,
            });
            const newHtml = await response.text();
            this.template = processResponse(newHtml).template;
            this.refreshDom();
          });
        }

        connectedCallback() {
          this.refreshDom();
        }

        refreshDom() {
          [...this.childNodes].forEach(node => this.removeChild(node));
          [...this.template.childNodes].forEach(node =>
            this.appendChild(node.cloneNode(true))
          );
        }

      }
    );
  });
