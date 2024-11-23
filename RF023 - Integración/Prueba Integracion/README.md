# Pruebas de integración para el Inicio de Sesión en la función handlerLogin
Este README describe las pruebas realizadas para verificar que los usuarios con roles específicos (Administrador, Coordinador, y Profesor) puedan iniciar sesión correctamente en la aplicación. Las pruebas aseguran que el sistema maneja los roles de forma adecuada, almacenando el rol correcto tras un inicio de sesión exitoso.
## Descripción General
La función handlerLogin maneja el proceso de autenticación en la página LoginPage. La prueba realiza las siguientes acciones:

1. Simula el inicio de sesión para un Administrador, Coordinador y Profesor.
2. Verifica que el rol del usuario se almacene correctamente después de un inicio de sesión exitoso.
3. Asegura que las credenciales sean procesadas adecuadamente para cada tipo de usuario.

## Pruebas Realizadas
### 1. Renderización de la Página
Objetivo: Verificar que la página de inicio de sesión se renderiza correctamente sin errores.

Resultado esperado: Los elementos "Login", "Email" y "Password" deben estar presentes en el documento.

### 2. Inicio de Sesión para Cada Rol
Objetivo: Verificar que los usuarios con diferentes roles (Administrador, Coordinador, Profesor) puedan iniciar sesión correctamente.

Pasos:

1. Mockear handlerLogin para simular un inicio de sesión exitoso y almacenar el rol en localStorage.
2. Simular las entradas del usuario para cada rol.
3. Verificar que handlerLogin se llama con las credenciales correctas.
4. Asegurar que el rol almacenado en localStorage coincide con el rol esperado.

Resultado esperado:

handlerLogin es llamado con las credenciales correctas para cada usuario.
El rol almacenado en localStorage corresponde al rol esperado (Administrador, Coordinador, Profesor).
