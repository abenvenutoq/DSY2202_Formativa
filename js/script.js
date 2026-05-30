// validaciones.js

document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del DOM
    const form = document.getElementById('formRegistro');
    const btnLimpiar = document.getElementById('btnLimpiar');
    const mensajeExito = document.getElementById('mensajeExito');
    const mensajeError = document.getElementById('mensajeError');

    // Función para agregar clases CSS dinámicas según la validez del campo (Bootstrap 5)
    function validarCampo(input, esValido) {
        if (esValido) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
        return esValido;
    }

    // Evento principal: Al enviar el formulario
    form.addEventListener('submit', function(event) {
        event.preventDefault(); // Evita que se recargue la página automáticamente
        let formularioValido = true;

        // 1. Validar Nombre (No vacío)
        const nombre = document.getElementById('nombre');
        formularioValido &= validarCampo(nombre, nombre.value.trim() !== '');

        // 2. Validar Usuario (No vacío)
        const usuario = document.getElementById('usuario');
        formularioValido &= validarCampo(usuario, usuario.value.trim() !== '');

        // 3. Validar Correo Electrónico (Formato correcto)
        const email = document.getElementById('email');
        const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        formularioValido &= validarCampo(email, regexEmail.test(email.value.trim()));

        // 4. Validar Contraseña (6-18 caracteres, al menos 1 mayúscula y 1 número)
        const password = document.getElementById('password');
        const passRegex = /^(?=.*[A-Z])(?=.*\d).{6,18}$/;
        const passEsValido = passRegex.test(password.value);
        formularioValido &= validarCampo(password, passEsValido);

        // 5. Validar Repetir Contraseña (Debe coincidir con la primera y no estar vacía)
        const confirmPassword = document.getElementById('confirmPassword');
        const coincidePass = (confirmPassword.value === password.value) && (confirmPassword.value !== '');
        formularioValido &= validarCampo(confirmPassword, coincidePass);

        // 6. Validar Fecha de Nacimiento (Mínimo 13 años y no vacío)
        const fechaNac = document.getElementById('fechaNacimiento');
        let esMayorDe13 = false;
        
        if (fechaNac.value !== '') {
            const fechaIngresada = new Date(fechaNac.value);
            const hoy = new Date();
            let edad = hoy.getFullYear() - fechaIngresada.getFullYear();
            const mes = hoy.getMonth() - fechaIngresada.getMonth();
            
            // Ajuste si aún no ha pasado su mes/día de cumpleaños este año
            if (mes < 0 || (mes === 0 && hoy.getDate() < fechaIngresada.getDate())) {
                edad--; 
            }
            esMayorDe13 = edad >= 13;
        }
        formularioValido &= validarCampo(fechaNac, fechaNac.value !== '' && esMayorDe13);

        // 7. Validar Dirección (Es Opcional - Si escribe algo, se marca como correcto)
        const direccion = document.getElementById('direccion');
        if (direccion.value.trim() !== '') {
            validarCampo(direccion, true);
        } else {
            // Si está vacío, le quitamos las clases por si antes había escrito algo
            direccion.classList.remove('is-valid', 'is-invalid');
        }

        // --- Resultado Final ---
        if (formularioValido) {
            mensajeExito.classList.remove('d-none'); // Muestra la alerta verde de éxito
            mensajeError.classList.add('d-none');
        } else {
            mensajeExito.classList.add('d-none'); // La oculta si hay errores
            mensajeError.classList.remove('d-none');
        }
    });

    // Evento: Al hacer clic en el botón "Limpiar Formulario"
    btnLimpiar.addEventListener('click', () => {
        const inputs = form.querySelectorAll('.form-control');
        inputs.forEach(input => {
            input.classList.remove('is-valid', 'is-invalid'); // Borra los bordes rojos/verdes
        });
        mensajeExito.classList.add('d-none'); // Oculta el mensaje de éxito
        mensajeError.classList.add('d-none'); // Oculta mensaje error
    });
});