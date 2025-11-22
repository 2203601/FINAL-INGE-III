/**
 * @jest-environment jsdom
 */

import { jest } from '@jest/globals';
import * as appModule from '../app.js';

import { mockDOM } from '../__mocks__/dom.js';
import { mockFetchSuccess, mockFetchFail, mockFetchNetworkError } from '../__mocks__/fetch.js';
import { setHostname } from '../__mocks__/globals.js';

// Limpia mocks después de cada test
afterEach(() => {
  jest.clearAllMocks();
});

// ======================================================
// 🌐 SETUP PARA CADA TEST
// ======================================================
beforeEach(() => {
  mockDOM();
  mockFetchSuccess([]);
});

// ======================================================
// 🔹 TESTS
// ======================================================
describe('CoffeeHub Frontend', () => {

  // ----------------------------------------------------
  // 1️⃣ Tests getBackendURL()
  // ----------------------------------------------------
  describe('getBackendURL()', () => {

    test('localhost → usa URL de desarrollo', () => {
      setHostname('localhost');
      expect(appModule.getBackendURL()).toBe('http://localhost:4000');
    });

    test('qa → URL QA', () => {
      setHostname('coffehub-frontend-qa.onrender.com');
      expect(appModule.getBackendURL()).toBe('https://coffehub-backend-qa.onrender.com');
    });

    test('prod → URL PROD', () => {
      setHostname('coffehub-frontend-prod.onrender.com');
      expect(appModule.getBackendURL()).toBe('https://coffehub-backend-prod.onrender.com');
    });

    test('otro hostname → fallback QA', () => {
      setHostname('google.com');
      expect(appModule.getBackendURL()).toBe('https://coffehub-backend-qa.onrender.com');
    });

  });

  // ----------------------------------------------------
  // 2️⃣ Tests deleteCoffee()
  // ----------------------------------------------------
  describe('deleteCoffee()', () => {
    test('si confirm() devuelve false → no elimina', async () => {
      global.confirm = jest.fn(() => false);
      const mockAlert = jest.fn();

      await appModule.deleteCoffee('1', 'Cafe Test', mockAlert);

      expect(fetch).not.toHaveBeenCalled();
      expect(mockAlert).not.toHaveBeenCalled();
    });

    test('elimina si confirm() devuelve true', async () => {
      global.confirm = jest.fn(() => true);
      const mockAlert = jest.fn();

      mockFetchSuccess([]);

      await appModule.deleteCoffee('1', 'Cafe Test', mockAlert);

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products/1'),
        { method: 'DELETE' }
      );

      expect(mockAlert).toHaveBeenCalledWith(expect.stringContaining('eliminado'));
    });

    test('maneja error de red', async () => {
      global.confirm = jest.fn(() => true);
      mockFetchNetworkError();

      const mockAlert = jest.fn();
      const errSpy = jest.spyOn(console, 'error').mockImplementation();

      await appModule.deleteCoffee('1', 'Cafe Test', mockAlert);

      expect(mockAlert).toHaveBeenCalled();
      expect(errSpy).toHaveBeenCalled();

      errSpy.mockRestore();
    });

    test('maneja HTTP error', async () => {
      global.confirm = jest.fn(() => true);

      mockFetchFail(404);

      const mockAlert = jest.fn();
      const errSpy = jest.spyOn(console, 'error').mockImplementation();

      await appModule.deleteCoffee('1', 'Cafe Test', mockAlert);

      expect(mockAlert).toHaveBeenCalled();
      expect(errSpy).toHaveBeenCalled();

      errSpy.mockRestore();
    });
  });

  // ----------------------------------------------------
  // 3️⃣ Tests handleFormSubmit()
  // ----------------------------------------------------
  describe('handleFormSubmit()', () => {

    beforeEach(() => {
      document.getElementById('name').value = 'Café Nuevo';
      document.getElementById('origin').value = 'Colombia';
      document.getElementById('type').value = 'Arábica';
      document.getElementById('price').value = '15';
      document.getElementById('rating').value = '4';
      document.getElementById('roast').value = 'Medium';
      document.getElementById('description').value = 'Excelente café';
    });

    test('envía POST con datos correctos', async () => {
      mockFetchSuccess([]);

      await appModule.handleFormSubmit();

      expect(fetch).toHaveBeenCalledWith(
        expect.stringContaining('/api/products'),
        expect.objectContaining({
          method: 'POST',
          headers: { 'Content-Type': 'application/json' }
        })
      );
      expect(alert).toHaveBeenCalled();
    });

    test('maneja error de red', async () => {
      mockFetchNetworkError();

      const errSpy = jest.spyOn(console, 'error').mockImplementation();

      await appModule.handleFormSubmit();

      expect(alert).toHaveBeenCalled();
      expect(errSpy).toHaveBeenCalled();

      errSpy.mockRestore();
    });

    test('maneja HTTP error', async () => {
      mockFetchFail(500);

      const errSpy = jest.spyOn(console, 'error').mockImplementation();

      await appModule.handleFormSubmit();

      expect(alert).toHaveBeenCalled();
      expect(errSpy).toHaveBeenCalled();

      errSpy.mockRestore();
    });
  });

  // ----------------------------------------------------
  // 4️⃣ Tests updateStats()
  // ----------------------------------------------------
  describe('updateStats()', () => {
    test('maneja falta de elementos sin tirar error', async () => {
      document.body.innerHTML = `<div></div>`;
      await expect(appModule.updateStats()).resolves.not.toThrow();
    });

    test('usa valores por defecto si fetch falla', async () => {
      mockFetchFail(500);
      await appModule.updateStats();

      expect(document.getElementById('total-coffees').textContent).toBe('0');
      expect(document.getElementById('avg-price').textContent).toBe('$0.00');
      expect(document.getElementById('popular-origin').textContent).toBe('N/A');
    });

    test('muestra stats reales', async () => {
      mockFetchSuccess({
        total: 5,
        avgPrice: '14.99',
        popularOrigin: 'Brasil'
      });

      await appModule.updateStats();

      expect(document.getElementById('total-coffees').textContent).toBe('5');
      expect(document.getElementById('avg-price').textContent).toBe('$14.99');
      expect(document.getElementById('popular-origin').textContent).toBe('Brasil');
    });
  });

  // ----------------------------------------------------
  // 5️⃣ Tests init()
  // ----------------------------------------------------
  describe('init()', () => {
    test('corre sin errores', async () => {
      mockFetchSuccess([]);

      expect(() => appModule.init()).not.toThrow();
    });
  });

  // ----------------------------------------------------
  // 6️⃣ Tests toggleForm()
  // ----------------------------------------------------
  describe('toggleForm()', () => {
    test('muestra el formulario si está oculto', () => {
      document.getElementById('add-form').style.display = 'none';

      appModule.toggleForm();

      expect(document.getElementById('add-form').style.display).toBe('block');
    });
  });

  // ----------------------------------------------------
  // 7️⃣ Tests cancelEdit()
  // ----------------------------------------------------
  describe('cancelEdit()', () => {
    test('limpia ID de edición', () => {
      appModule.setEditingCoffeeId('123');
      appModule.cancelEdit();

      expect(appModule.getEditingCoffeeId()).toBeNull();
    });
  });

  // ----------------------------------------------------
  // 8️⃣ Tests editCoffee()
  // ----------------------------------------------------
  describe('editCoffee()', () => {
    test('maneja campos null sin romper', () => {
      appModule.editCoffee({
        _id: '1',
        name: null,
        origin: null,
        type: null,
        price: null,
        rating: null,
        roast: null,
        description: null
      });

      expect(document.getElementById('name').value).toBe('');
    });
  });

  // ----------------------------------------------------
  // 9️⃣ Tests renderCoffees()
  // ----------------------------------------------------
  describe('renderCoffees()', () => {
    test('renderiza múltiples cafés', () => {
      appModule.renderCoffees([
        { _id: '1', name: 'A' },
        { _id: '2', name: 'B' },
        { _id: '3', name: 'C' }
      ]);

      const grid = document.getElementById('coffee-grid');
      expect(grid.children.length).toBe(3);
    });
  });

  // ----------------------------------------------------
  // 🔟 Tests set/getEditingCoffeeId()
  // ----------------------------------------------------
  describe('set/getEditingCoffeeId()', () => {
    test('funciona correctamente', () => {
      appModule.setEditingCoffeeId('999');
      expect(appModule.getEditingCoffeeId()).toBe('999');
    });
  });

});
