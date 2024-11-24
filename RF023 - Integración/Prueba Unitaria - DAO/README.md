### Documentación: **Seguridad - Autenticidad**

#### **Introducción**

Se evaluará el mecanismo de autenticación en el módulo de inicio de sesión para garantizar que el sistema autentique correctamente la identidad del usuario y asigne los permisos adecuados según su rol (administrador, profesor o estudiante). Las pruebas se enfocan en la integración de los métodos `searchUserByEmail` y `searchStudentByEmail` del DAO, asegurando la correcta validación de datos dinámicos y el manejo de casos de datos válidos e inválidos.

#### **Objetivo**

Validar que:

1. La función `searchUserByEmail` permita recuperar datos de usuario basándose en un correo válido.
2. La función `searchStudentByEmail` permita recuperar datos de estudiantes utilizando correos válidos.
3. Ambas funciones manejen casos de datos inválidos retornando valores esperados (`null`).

### **Caso de Prueba: Validar correo en searchUserByEmail**

#### **Descripción**

La función `searchUserByEmail` tiene como objetivo buscar usuarios registrados en la base de datos por su correo electrónico.

#### **Pruebas de Datos Inválidos**

1. **Descripción:** No se encuentra un usuario con el correo proporcionado.

   - **Escenario:** Correo no registrado en la base de datos.
   - **Resultado Esperado:** La función retorna `null`.

2. **Descripción:** El correo es una cadena vacía.

   - **Escenario:** Se pasa un correo vacío como argumento.
   - **Resultado Esperado:** La función retorna `null`.

3. **Descripción:** El correo no es válido (nulo, indefinido o formato incorrecto).
   - **Escenario:** Se pasa un valor `null`, `undefined`, o un correo con formato inválido (`student@` o `studentexample.com`).
   - **Resultado Esperado:** La función retorna `null`.

#### **Pruebas de Datos Válidos**

1. **Descripción:** Recuperar datos del usuario con un correo registrado.

   - **Escenario:** Correo válido asociado a un usuario con datos completos (`correo`, `rol`, `celular`).
   - **Resultado Esperado:** La función retorna un objeto con los datos del usuario y su `id`.

2. **Descripción:** Recuperar datos del usuario con rol modificado.

   - **Escenario:** Correo válido con un rol distinto (`Admin`).
   - **Resultado Esperado:** La función retorna un objeto con el rol actualizado.

### **Caso de Prueba: Validar correo en searchStudentByEmail**

#### **Descripción**

La función `searchStudentByEmail` busca estudiantes registrados utilizando su correo electrónico.

#### **Pruebas de Datos Inválidos**

1. **Descripción:** No se encuentra un estudiante con el correo proporcionado.

   - **Escenario:** Correo no registrado en la base de datos.
   - **Resultado Esperado:** La función retorna `null`.

2. **Descripción:** El correo es una cadena vacía.

   - **Escenario:** Se pasa un correo vacío como argumento.
   - **Resultado Esperado:** La función retorna `null`.

3. **Descripción:** El correo no es válido (nulo, indefinido o formato incorrecto).
   - **Escenario:** Se pasa un valor `null`, `undefined`, o un correo con formato inválido (`student@` o `studentexample.com`).
   - **Resultado Esperado:** La función retorna `null`.

#### **Pruebas de Datos Válidos**

1. **Descripción:** Recuperar datos del estudiante con un correo registrado.

   - **Escenario:** Correo válido asociado a un estudiante con datos completos (`nombre`, `edad`, `correo`).
   - **Resultado Esperado:** La función retorna un objeto con los datos del estudiante y su `id`.

2. **Descripción:** Recuperar datos del estudiante con nombre modificado.

   - **Escenario:** Correo válido con un nombre distinto (`Jane Doe`).
   - **Resultado Esperado:** La función retorna un objeto con el nombre actualizado.

3. **Descripción:** Recuperar datos del estudiante con edad modificada.
   - **Escenario:** Correo válido con edad actualizada.
   - **Resultado Esperado:** La función retorna un objeto con la edad actualizada.
