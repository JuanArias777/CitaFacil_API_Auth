/**
 * =====================================================================
 * PROYECTO FORMATIVO / CASO DE ESTUDIO: Servicio Web de Autenticación
 * Evidencia: GA7-220501096-AA5-EV01
 * Descripción: API REST construida con Node.js y Express para la gestión
 * de registro de usuarios e inicio de sesión (Login) con validación de credenciales.
 * =====================================================================
 */

// Importar el framework Express para la creación del servidor y manejo de rutas
const express = require('express');
const app = express();

// Definir el puerto de ejecución del servidor web
const PORT = process.env.PORT || 3000;

// Middleware para permitir que el servidor interprete solicitudes en formato JSON
app.use(express.json());

// Simulación de una Base de Datos en memoria (Array) para almacenar los usuarios registrados
const baseDeDatosUsuarios = [];

/**
 * ---------------------------------------------------------------------
 * ENDPOINT 1: REGISTRO DE USUARIO
 * Ruta: POST /api/register
 * Descripción: Recibe correo y contraseña, valida que no existan campos vacíos 
 * y almacena el registro en el sistema.
 * ---------------------------------------------------------------------
 */
app.post('/api/register', (req, res) => {
    const { correo, contrasena } = req.body;

    // Validación: Comprobar que los campos obligatorios no estén vacíos
    if (!correo || !contrasena) {
        return res.status(400).json({
            exito: false,
            mensaje: 'Error: El correo y la contraseña son obligatorios para el registro.'
        });
    }

    // Validación: Verificar si el usuario ya se encuentra registrado previamente
    const usuarioExistente = baseDeDatosUsuarios.find(user => user.correo === correo);
    if (usuarioExistente) {
        return res.status(400).json({
            exito: false,
            mensaje: 'Error: El correo electrónico ya está registrado en el sistema.'
        });
    }

    // Registrar y almacenar el nuevo usuario en la base de datos simulada
    baseDeDatosUsuarios.push({ correo, contrasena });

    // Respuesta exitosa de registro
    return res.status(201).json({
        exito: true,
        mensaje: 'Usuario registrado exitosamente.'
    });
});

/**
 * ---------------------------------------------------------------------
 * ENDPOINT 2: INICIO DE SESIÓN (LOGIN)
 * Ruta: POST /api/login
 * Descripción: Recibe las credenciales (correo y contraseña), verifica su 
 * autenticidad y devuelve éxito o error según corresponda.
 * ---------------------------------------------------------------------
 */
app.post('/api/login', (req, res) => {
    const { correo, contrasena } = req.body;

    // Validación: Comprobar que se envíen ambos datos
    if (!correo || !contrasena) {
        return res.status(400).json({
            exito: false,
            mensaje: 'Error: Debe proporcionar el correo y la contraseña para iniciar sesión.'
        });
    }

    // Buscar en la base de datos si coincide el correo y la contraseña
    const usuarioValido = baseDeDatosUsuarios.find(
        user => user.correo === correo && user.contrasena === contrasena
    );

    if (usuarioValido) {
        // Caso de éxito: Credenciales correctas
        return res.status(200).json({
            exito: true,
            mensaje: '¡Autenticación satisfactoria! Bienvenido al sistema.'
        });
    } else {
        // Caso de error: Credenciales incorrectas o usuario no encontrado
        return res.status(401).json({
            exito: false,
            mensaje: 'Error en la autenticación: Correo o contraseña incorrectos.'
        });
    }
});

/**
 * ---------------------------------------------------------------------
 * INICIALIZACIÓN DEL SERVIDOR WEB
 * ---------------------------------------------------------------------
 */
app.listen(PORT, () => {
    console.log(`Servidor web ejecutándose correctamente en el puerto ${PORT}`);
});