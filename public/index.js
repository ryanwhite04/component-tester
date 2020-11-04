import { Port, rough, LitElement, html, css } from './modules.bundle.js';
class IntegratedCircuit extends LitElement {
  static get properties() {
    return {
      connected: { type: Boolean },
      width: { type: Number },
      height: { type: Number },
    }
  }
  constructor() {
    super();
    this.connected = false;
    this.width = this.height = 192;
  }
  async request() {
    return new Port(await navigator.usb.requestDevice({ filters: [
      { vendorId: 0x239A }, // Adafruit boards
      { vendorId: 0xcafe }, // TinyUSB example
    ] }));
  }
  connectedCallback() {
    super.connectedCallback();
    console.log('Starting');
    navigator.usb.getDevices()
      .then(devices => devices.map(device => new Port(device)))
      .then(ports => {
        if (ports.length) {
          this.port = ports[0];
        } else console.log("no ports");
      });
  }
  connect(port) {
    console.log("Connecting to Port: ", port, this);
    port.connect().then(() => {
      console.log("Connected to port: ", port)
      port.onReceive = this.receive(this);
      port.onReceiveError = console.error;
    }, console.error);
  }
  disconnect(port) {
    console.log("Disconnecting from Port: ", port);
    port.disconnect();
  }
  receive(element) {
    console.log('received', { element });
    return data => {
      let textDecoder = new TextDecoder();
      let decoded = textDecoder.decode(data);
      console.log('received data', decoded);
      let received = parseInt(decoded);
      if (!isNaN(received)) {
        if (received) {
          element.received = received;
        } else {
          this.connected = true;
        }
        element.requestUpdate();
      }
      return received
    }
  }
  test() {
    console.log('testing');
    this.requestUpdate();
    this.firstUpdated();
  }
  toggle() {
    if (this.connected) {
      this.disconnect(this.port)
      this.connected = false;
    } else {
      this.request()
      .then(selected => (this.port = selected))
      .then(() => this.connect(this.port))
      .catch(console.error);
    }
  }
  firstUpdated() {
    this.drawComponent(this.shadowRoot.getElementById('svg'), this.width, this.height);
  }
  drawComponent(svg, w, h) {
    [...svg.children].map(child => child.remove());
    let rs = rough.svg(svg);
    console.log(rs);
    svg.appendChild(rs.rectangle(w/4, h/8, w/2, 6*h/8));
    for (let i = 0; i < 7; i++) {
      let y = h/8 + (i+1)*3*w/(4*8);
      svg.appendChild(rs.line(w/8, y, w/4, y)); // x1, y1, x2, y2
      svg.appendChild(rs.line(3*h/4, y, 7*h/8, y)); // x1, y1, x2, y2  

    }
  }
  static get styles() {
    return css`
      svg {
        display: block;
        margin: auto;
      }
    `;
  }
  render() {
    return html`
      <wired-button @click=${this.test}>Test</wired-button>
      <wired-button @click=${this.toggle}>${this.connected ? "Disconnect" : "Connect"}</wired-button>
      <p>Component</p>
      <svg width=${this.width} height=${this.height} id="svg"></svg>
    `;
  }
}
customElements.define('integrated-circuit', IntegratedCircuit);
