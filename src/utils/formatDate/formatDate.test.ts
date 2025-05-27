import { formatDate } from './formatDate';

describe('formatDate', () => {
  it('formatea una fecha válida a formato dd/mm/yyyy', () => {
    const result = formatDate(new Date(2025, 4, 14)); // 14 de mayo de 2025
    expect(result).toBe('14/05/2025');
  });

  it('lanza un error si la fecha es inválida', () => {
    expect(() => formatDate('fecha inválida')).toThrow('Fecha inválida');
  });

  it('lanza un error si el formato de la fecha es incorrecto', () => {
    expect(() => formatDate('2025-14-05')).toThrow('Fecha inválida');
  });
});

