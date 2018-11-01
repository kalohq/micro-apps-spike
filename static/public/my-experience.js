fetch('http://localhost:9977/index.html')
  .then(response => response.text())
  .then(html => {
    const template = document.createElement('div');
    template.innerHTML = html;

    [...template.querySelectorAll('link')].forEach(link =>
      document.head.appendChild(link)
    );

    const clonedScripts = document.createDocumentFragment();
    [...template.querySelectorAll('script')].forEach(script => {
      script.parentNode.removeChild(script);
      clonedScripts.appendChild(
        Object.assign(document.createElement('script'), {
          textContent: script.textContent,
        })
      );
    });
    document.head.appendChild(clonedScripts);

    customElements.define(
      'my-experience',
      class extends HTMLElement {
        connectedCallback() {
          [...template.childNodes].forEach(node => {
            this.appendChild(node.cloneNode(true));
          });
        }
      }
    );
  });
