### Documentación: **Adecuación Funcional - Apropiación Funcional**

#### **Introducción**

Se evaluará si el sistema cumple con los requisitos funcionales asignados específicamente diseñados para los administradores. El enfoque principal será la funcionalidad de creación de itinerarios para estudiantes, asegurando que el proceso sea confiable y eficaz. Además, se validará la capacidad del sistema para manejar la carga de archivos relacionados con las actividades, utilizando Firebase como backend.

#### **Objetivo**

Validar que:

1. La función `addActivity` maneje correctamente los datos válidos e inválidos, asegurando que los administradores puedan agregar actividades sin errores.
2. La función `uploadFilePoster` gestione la subida de archivos cumpliendo los requisitos de formato y tamaño.

### **Caso de Prueba: Crear Actividades**

#### **Descripción**

La función `addActivity` tiene como objetivo agregar actividades a un itinerario en la base de datos. Los casos de prueba se dividen en dos categorías principales: datos inválidos y datos válidos.

#### **Pruebas de Datos Inválidos**

1. **Descripción:** Los datos de la actividad están incompletos.
   - **Escenario:** Falta el campo `nombre` en los datos proporcionados.
   - **Resultado Esperado:** La función retorna `false`.

#### **Pruebas de Datos Válidos**

1. **Descripción:** Agregar una actividad con datos válidos.

   - **Escenario:** Todos los campos requeridos (`nombre`, `descripcion`, `hora`) están presentes y son válidos.
   - **Resultado Esperado:** La función retorna `true`.

2. **Descripción:** Agregar una actividad con datos modificados válidos.
   - **Escenario:** Modificar el campo `hora` a un valor distinto pero válido.
   - **Resultado Esperado:** La función retorna `true`.

### **Caso de Prueba: Subida de Archivos**

#### **Descripción**

La función `uploadFilePoster` gestiona la carga de archivos a Firebase Storage. Los casos de prueba se dividen en dos categorías principales: datos inválidos y datos válidos.

#### **Pruebas de Datos Inválidos**

1. **Descripción:** Fallo general al intentar subir un archivo.

   - **Escenario:** Simular un error al llamar a Firebase (`uploadBytes`).
   - **Resultado Esperado:** La función retorna `false`.

2. **Descripción:** El archivo excede el tamaño permitido.
   - **Escenario:** Simular un archivo con un tamaño superior al límite permitido.
   - **Resultado Esperado:** La función retorna `false`.

#### **Pruebas de Datos Válidos**

1. **Descripción:** Subida exitosa de un archivo válido.

   - **Escenario:** Archivo con formato permitido (`image/png`) y tamaño dentro del límite.
   - **Resultado Esperado:** La función retorna `true`.

2. **Descripción:** Subida exitosa de un archivo con atributos modificados válidos.
   - **Escenario:** Archivo de tipo `image/jpeg` pero dentro del formato permitido.
   - **Resultado Esperado:** La función retorna `true`.
