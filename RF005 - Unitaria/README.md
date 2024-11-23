### Documentación: **Prueba de Usabilidad - Protección contra Errores del Usuario**

#### **Introducción**

Se evaluará la capacidad del sistema para garantizar la validez de los datos ingresados al actualizar información de un usuario. Esta prueba está diseñada para asegurar que los datos como el correo electrónico, el carnet y el número de teléfono cumplan con los formatos esperados. Se prioriza la protección contra errores comunes de los usuarios y la validación de datos dinámicos.

#### **Objetivo**

Validar que:

1. La función `handlerUpdateUserController` rechace datos inválidos y asegure que no se intenten actualizar en la base de datos.
2. La función acepte y actualice datos válidos correctamente en la base de datos a través de `daoEstudiante.updateUser`.

### **Caso de Prueba: Validar Datos del Usuario**

#### **Descripción**

La función `handlerUpdateUserController` se encarga de procesar y validar los datos de un usuario antes de enviarlos al sistema de persistencia. Se prueban dos escenarios principales: datos inválidos y datos válidos.

#### **Pruebas de Datos Inválidos**

1. **Descripción:** El correo electrónico no contiene el carácter `@`.

   - **Escenario:** Se envía un correo con formato incorrecto (`johndoeexample.com`).
   - **Resultado Esperado:** La función retorna `false` y `daoEstudiante.updateUser` no es llamado.

2. **Descripción:** El dominio del correo electrónico es inválido.

   - **Escenario:** Se envía un correo con dominio no válido (`john.doe@invalid`).
   - **Resultado Esperado:** La función retorna `false` y `daoEstudiante.updateUser` no es llamado.

3. **Descripción:** El carnet (ID del estudiante) no es numérico.

   - **Escenario:** Se envía un carnet con caracteres alfanuméricos (`ABC123`).
   - **Resultado Esperado:** La función retorna `false` y `daoEstudiante.updateUser` no es llamado.

4. **Descripción:** El número de celular contiene caracteres no numéricos.

   - **Escenario:** Se envía un celular con letras mezcladas (`98765abcd`).
   - **Resultado Esperado:** La función retorna `false` y `daoEstudiante.updateUser` no es llamado.

#### **Pruebas de Datos Válidos**

1. **Descripción:** Actualización exitosa con datos válidos.

   - **Escenario:** Todos los campos requeridos están presentes y contienen valores válidos, como un correo válido (`valid.email@example.com`) y un número de celular numérico (`987654321`).
   - **Resultado Esperado:** La función retorna `true` y `daoEstudiante.updateUser` es llamado exactamente una vez con los datos actualizados.
