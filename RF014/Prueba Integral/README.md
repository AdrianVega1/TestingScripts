# Prueba de Integración para la función handleSubmit en la Página de Nueva Actividad
Este README describe las pruebas de integración realizadas para la función handleSubmit en la página de creación de actividades (Page). Estas pruebas están diseñadas para garantizar que el flujo de creación de actividades se ejecute correctamente, manejando tanto los casos exitosos como los errores.
## Descripción General
Se evalúa la interacción del usuario con la página de nueva actividad (Page). Se enfoca en el proceso de envío del formulario y verifica el comportamiento esperado cuando se proporcionan datos válidos e inválidos.
## Pruebas Realizadas
### 1. Renderización Inicial
Objetivo: Verificar que la página de creación de actividades se renderiza correctamente sin errores.
Resultado esperado: El texto "Crear actividad" debe estar presente en el documento.
### 2. Agregar Actividad con Datos Válidos
Objetivo: Verificar que se puede agregar una actividad cuando se proporcionan datos válidos.
Pasos:
Simular el ingreso de datos válidos para la actividad.
Simular la acción de enviar el formulario.
Confirmar que handlerAddActivity se llama con los datos esperados.
Resultado esperado: El controlador handlerAddActivity debe ser llamado.
### 3. Rechazar Actividad con Datos Inválidos
Objetivo: Verificar que no se agrega una actividad cuando se proporciona información inválida (por ejemplo, un nombre vacío).
Pasos:
Simular el ingreso de datos inválidos (nombre vacío).
Simular la acción de enviar el formulario.
Confirmar que handlerAddActivity no se llama debido a la validación fallida.
Resultado esperado: El controlador handlerAddActivity no debe ser llamado.
