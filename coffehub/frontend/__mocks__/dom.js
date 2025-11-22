// __mocks__/dom.js
export function mockDOM() {
    document.body.innerHTML = `
      <form id="coffee-form">
        <input id="name" />
        <input id="origin" />
        <input id="type" />
        <input id="price" />
        <input id="rating" />
        <input id="roast" />
        <textarea id="description"></textarea>
        <button id="submit-btn"></button>
        <button id="cancel-btn"></button>
        <h2 id="form-title">Agregar Nuevo Café</h2>
      </form>
  
      <div id="add-form" style="display:none"></div>
  
      <div id="coffee-grid"></div>
  
      <span id="total-coffees"></span>
      <span id="avg-price"></span>
      <span id="popular-origin"></span>
    `;
  }
  