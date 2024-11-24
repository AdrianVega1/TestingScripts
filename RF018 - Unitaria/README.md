# Prueba Unitaria para la función getNextActivity
Este README detalla las pruebas realizadas para la función getNextActivity, que interactúa con Firestore para recuperar actividades de múltiples itinerarios. Las pruebas aseguran que la función maneja correctamente casos con actividades disponibles y escenarios en los que no hay actividades.

## Descripción General
La función getNextActivity consulta Firestore para recuperar actividades almacenadas en múltiples itinerarios. La prueba verifica:

1. La correcta recuperación de actividades cuando existen datos.

2. El comportamiento cuando no hay actividades disponibles.

## Pruebas Realizadas
### 1. Recuperar Actividades de Múltiples Itinerarios
Objetivo: Verificar que la función devuelve todas las actividades disponibles en múltiples itinerarios.

Pasos:

1. Mockear la respuesta de Firestore para itinerarios y actividades.
2. Simular múltiples consultas a Firestore para recuperar actividades.
3. Validar que las actividades recuperadas coincidan con las esperadas.

Resultado esperado:

La función devuelve un arreglo con todas las actividades disponibles.

### 2. No Existen Actividades

Objetivo: 

Verificar que la función devuelve un arreglo vacío cuando no hay actividades disponibles.

Pasos:

1. Mockear una respuesta vacía para los itinerarios.
2. Validar que la función devuelve un arreglo vacío.

Resultado esperado:

La función devuelve un arreglo vacío.
Se realiza una única llamada a Firestore para consultar los itinerarios.
