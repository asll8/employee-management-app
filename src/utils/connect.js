export const connect = (store) => (BaseElement) =>
  class extends BaseElement {
    constructor() {
      super();
      this.state = store.getState();
    }

    connectedCallback() {
      if (!this.unsubscribe) {
          this.unsubscribe = store.subscribe(() => {
              const newState = store.getState();
              if (newState !== this.state) {
                  this.state = newState;
                  this.requestUpdate();
              }
          });
      }
      super.connectedCallback();
  }

    disconnectedCallback() {
      if (this.unsubscribe) {
        this.unsubscribe();
      }
      super.disconnectedCallback();
    }
  };
