import { basicAlert } from '@/helpers/SweetAlert';

export function validateError(response){
    if (response) {
        if (response.status === 400) {
            basicAlert(() => { }, 'error', 'Solicitud incorrecta', 'Los datos proporcionados no son válidos');
        } else {
            basicAlert(() => { }, 'error', 'Error de conexión', 'Hubo un problema de conexión');
        }
    } else {
        basicAlert(() => { }, 'error', 'Error de conexión', 'Hubo un problema de conexión');
    }
}