// import 'babel-polyfill/dist/polyfill.js';
import CompostMixin from '../../build/libs/compost/compost-mixin.js';
import './router.js';
import './nav.js';
import './view.js';

class App extends CompostMixin(HTMLElement) {
  static get properties() {
    return {
      nav: {
        type: Array,
        value: [{
          id: 'top',
          name: 'top',
        }, {
          id: 'new',
          name: 'new',
        }, {
          id: 'show',
          name: 'show',
        }, {
          id: 'ask',
          name: 'ask',
        }, {
          id: 'job',
          name: 'jobs',
        }, {
          id: 'about',
          name: 'about',
        }],
        observer: 'observeNav',
      },

      currentPage: {
        type: Object,
        value: {
          id: null,
          subId: null,
          params: {},
        },
        observer: 'observeCurrentPage',
      }
    }
  }

  constructor() {
    super();

    this.on(this, 'x-update-path', this.updatePath);
  }

  render() {
    return `
      <style>
        :host {
          display: flex;
          flex-direction: column;
          max-width: 1280px;
          margin: 0 auto;
        }
      </style>

      <x-router
        id="router"
        default-page="top"
      ></x-router>

      <x-nav></x-nav>
      <x-view id="view"></x-view>
    `;
  }

  observeNav(oldValue, newValue) {
    this.$('x-nav').items = newValue;
  }

  observeCurrentPage(oldValue, newValue) {
    this.$('x-nav').current = newValue.id;
    this.$('x-view').current = newValue;
  }

  updatePath(event) {
    const { page, subPage } = event.detail;
    this.$id.router.path = `/${page}/${subPage || ''}`;

    this.currentPage = {
      id: page,
      subId: subPage || 0,
      params: event.detail.params || {},
    };
  }
}

customElements.define('x-app', App);
