export function formatDate(date: Date | string): string {
    // Verificar si el argumento es una fecha válida
    const validDate = new Date(date);
    
    if (isNaN(validDate.getTime())) {
      throw new Error('Fecha inválida');
    }
  
    const day = String(validDate.getDate()).padStart(2, '0');
    const month = String(validDate.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const year = validDate.getFullYear();
  
    return `${day}/${month}/${year}`;
  }
  
  
  
  