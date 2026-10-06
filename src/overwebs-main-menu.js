import { GluonElement, html } from 'gluonjs';
import 'overwebs-fonts';

const scopedClass = `overwebs-main-menu-${((Math.random() * 0xffffff) << 0).toString(16)}`;
const style = document.createElement('style');
style.innerText = `a.${scopedClass} {
    font-family: 'overwebs-big-noodle', sans-serif;
    display: block;
    text-decoration: none;
    padding-left: calc(var(--overwebs-menu-size, 75px) / 3 * 2);
    position: relative;
    z-index: 0;
    color: white;
    line-height: 1.05;
    font-size: calc(var(--overwebs-menu-size, 75px));
    cursor: inherit;
  }
  a.${scopedClass}::before {
    position: absolute;
    content: attr(content);
    position: absolute;
    z-index: -1;
    color: rgba(255,255,255,0);
    -webkit-text-stroke: calc(var(--overwebs-menu-size, 75px) * 0.05) rgba(0,0,0,.15);
  }
  a.${scopedClass}-submenu {
    padding-left: calc(var(--overwebs-menu-size, 75px) / 3 * 2);
    color: rgba(255,255,255,0.95);
    font-family: 'overwebs-futura', sans-serif;
    font-size: calc(var(--overwebs-menu-size, 75px) * 0.37);
    line-height: 1.3;
    text-transform: uppercase;
  }
  a.${scopedClass}-submenu::before {
    color: rgba(0,0,0,0);
    position: absolute;
    white-space: nowrap;
    content: attr(content);
    position: absolute;
    z-index: -1;
    -webkit-text-stroke: calc(var(--overwebs-menu-size, 75px) * 0.03) rgba(154,166,195,.8);
  }
  a.${scopedClass}:not(.disabled):hover {
    padding-left: calc(var(--overwebs-menu-size, 75px) * 1.14);
    transform: scale(1.05);
  }
  a.${scopedClass}-submenu:not(.disabled):hover {
    padding-left: calc(var(--overwebs-menu-size, 75px) * 1.04);
    transform: scale(1.1);
  }
  a.${scopedClass}.disabled {
    color: rgba(255,255,255,0.6);
  }`;

const overwebsWindowSize = getComputedStyle(document.body).getPropertyValue('--overwebs-window-size');
if (overwebsWindowSize && !getComputedStyle(document.body).getPropertyValue('--overwebs-menu-size')) {
  document.documentElement.style.setProperty(`--overwebs-menu-size`, `${overwebsWindowSize} / 25.6`);
}

class OverwebsMainMenu extends GluonElement {
  get template() {
    return html`
    <style>
    :host {
      width: calc(var(--overwebs-menu-size, 75px) * 20 / 3);
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    :host([submenu]) {
      margin-top: calc(var(--overwebs-menu-size, 75px) / 3);
    }
    </style>
    <slot id="slot"></slot>
    `;
  }

  connectedCallback() {
    super.connectedCallback();
    if (this.parentNode.firstChild !== style) {
      this.parentNode.prepend(style);
    }
    this.$.slot.addEventListener('slotchange', () => {
      this.$.slot
        .assignedNodes()
        .filter(node => {
          return node.tagName === 'A';
        })
        .forEach(node => {
          node.classList.add(scopedClass);
          if (this.hasAttribute('submenu')) {
            node.classList.add(`${scopedClass}-submenu`);
          }
          node.setAttribute('content', node.innerText);
        });
    });
  }
}

customElements.define(OverwebsMainMenu.is, OverwebsMainMenu);
