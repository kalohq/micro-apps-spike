(() => {
  class MyExperience extends HTMLElement {
    constructor() {
      super();

      this.openModal = this.openModal.bind(this);
      this.closeModal = this.closeModal.bind(this);

      this.overlay = Object.assign(document.createElement('div'), {
        className: 'my-experience-overlay',
      });
      this.overlay.addEventListener('click', this.closeModal);
      const modal = Object.assign(document.createElement('div'), {
        className: 'my-experience-modal',
      });
      this.overlay.appendChild(modal);
      const button = Object.assign(document.createElement('button'), {
        innerText: 'close me',
      });
      modal.appendChild(button);
    }

    connectedCallback() {
      const root = Object.assign(document.createElement('div'), {
        className: 'portfolio-card__root',
      });
      this.appendChild(root);

      const header = Object.assign(document.createElement('header'), {
        className: 'card-header__root card-header__spaced-large',
        style: 'justify-content: center;',
        innerHTML: `
          <div class="e1q9f2xp0 css-cnyj4r">
            <h3 class="e1akqa2n0 em7k1990 css-1xbt97c" color="navy700">
              My experience
            </h3>
          </div>
        `,
      });
      root.appendChild(header);

      const headerContent = Object.assign(document.createElement('div'), {
        className: 'card-header__content',
      });
      header.appendChild(headerContent);

      const button = Object.assign(document.createElement('button'), {
        className:
          'button-core__ui-btn button-core__ui-btn--small button-core__ui-btn--tertiary button-core__ui-btn--lone-icon e1q9f2xp6 css-l4muhg',
        innerHTML: `
          <div class="button-react__ui-btn__react-placeholder-message" style="opacity: 1; visibility: visible">
            <i class="e2anemp0 css-1eaehdb" size="14" color="currentColor">
              <svg width="14" height="14" aria-hidden="true"><use xlink:href="#add"></use></svg>
            </i>
          </div>
        `,
      });
      button.addEventListener('click', this.openModal);
      headerContent.appendChild(button);

      const content = document.createElement('ul');
      root.appendChild(content);

      fetch('http://localhost:9966/experiences.json')
        .then(response => response.json())
        .then(experiences => {
          experiences.forEach(({client, title}) => {
            const experience = Object.assign(document.createElement('li'), {
              innerText: `${title} for ${client}`,
            });
            content.appendChild(experience);
          });
        });
    }

    openModal() {
      document.body.appendChild(this.overlay);
    }

    closeModal() {
      document.body.removeChild(this.overlay);
    }
  }

  const style = Object.assign(document.createElement('link'), {
    rel: 'stylesheet',
    href: 'http://localhost:9966/my-experience.css',
  });
  style.addEventListener('load', () => {
    customElements.define('my-experience', MyExperience);
  });
  document.head.appendChild(style);
})();
