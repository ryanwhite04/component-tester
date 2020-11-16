import { Port, rough, LitElement, html, css } from './modules.bundle.js';
class IntegratedCircuit extends LitElement {
  static get properties() {
    return {
      code: { type: String },
      connected: { type: Boolean },
      width: { type: Number },
      height: { type: Number },
      rasterized: { type: Boolean },
    }
  }
  constructor() {
    super();
    this.code = localStorage.code ? JSON.parse(localStorage.code) : 4011;
    this.connected = false;
    this.width = this.height = 192;
    this.rasterized = false;
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
    this.drawComponent(this.shadowRoot.getElementById('component'), this.width, this.height);
  }
  drawComponent(component, w, h) {
    let rs = rough[this.rasterized ? 'canvas' : 'svg'](component, { options: {
      strokeWidth: 3,
      roughness: 1,
    }});
    let parts = [];
    if (this.rasterized) {
      component.getContext('2d').clearRect(0, 0, w, h);
    } else {
      [...component.children].map(child => child.remove());   
    }
    parts.push(rs.rectangle(w/4, h/8, w/2, 6*h/8, {
      fill: 'black',
      fillStyle: 'cross-hatch',
      hachureGap: 8,
      hachureAngle: 45,
    }));
    for (let i = 0; i < 7; i++) {
      let y = h/8 + (i+1)*3*w/(4*8);
      parts.push(rs.line(w/8, y, w/4, y, { stroke: '#777' })); // x1, y1, x2, y2
      parts.push(rs.line(3*h/4, y, 7*h/8, y, { stroke: '#777' })); // x1, y1, x2, y2  
    }
    this.rasterized || parts.map(part => component.appendChild(part))  
  }
  static get styles() {
    return css`
      #component {
        display: block;
        margin: auto;
      }
    `;
  }
  updateCode(event) {
    console.log('updateCode', this.code, event.detail.selected)
    this.code = event.detail.selected;
    localStorage.setItem('size', JSON.stringify(this.code));
  }
  render() {
    return html`
      <wired-button @click=${this.test} disabled=${!this.connected}>Test</wired-button>
      <wired-button @click=${this.toggle}>${this.connected ? "Disconnect" : "Connect"}</wired-button>
      <p>Component ${this.code}</p>
      <wired-combo id="code" @selected=${this.updateCode} selected=${this.code}>
        <wired-item value="4011">4011 NAND Gate</wired-item>
        <wired-item value="4013">4013 XOR Gate</wired-item>
      </wired-combo>
      ${this.rasterized ? 
        html`<canvas width=${this.width} height=${this.height} id="component"></canvas>` :
        html`<svg width=${this.width} height=${this.height} id="component"></svg>`
      }
      
    `;
  }
}
customElements.define('integrated-circuit', IntegratedCircuit);
