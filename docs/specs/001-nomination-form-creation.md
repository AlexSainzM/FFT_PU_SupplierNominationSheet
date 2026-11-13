# Spec 001 · Formulario de nominación de proveedores

**Estado de la especificación** · Implementada el 13 de noviembre de 2026. Flujo verificado en navegador con respuestas simuladas de Formspree.

## Objetivo y ubicación

Una persona que evalúa una oferta debe poder completar una evaluación por proveedor y enviarla a Formspree desde el navegador. La implementación se realizará en `forms/supplierNominationSheet/`, sobre la copia de la plantilla que ya contiene esa carpeta. Se utilizarán sus componentes Bootstrap, validación y estilos de FFT México, y su página de agradecimiento. [Plantilla del formulario](../../forms/supplierNominationSheet/index.html) · [Página Thanks](../../forms/supplierNominationSheet/thanks/index.html)

El alcance termina con la confirmación del envío. La consulta de registros mediante la API de solo lectura, los visores y el cálculo de puntajes corresponden a especificaciones futuras. [Contexto del proyecto](../PROJECT_OVERVIEW.md)

## Recorrido de quien evalúa

1. **Abrir el formulario.** La página identifica la evaluación técnica y comercial de proveedores y explica qué información se necesita. Los criterios aparecen sin respuesta preseleccionada.
2. **Identificar el proyecto y la oferta.** Capturar los ocho datos del formato en el orden de lectura de la primera página.

   | Proyecto | Oferta y evaluación |
   | --- | --- |
   | Proyecto | ASTRAS Evento No. |
   | Proveedor Evaluado | Fecha Evaluación |
   | Comprador Responsable | Usuario Técnico Responsable |
   | Presupuesto Estimado | Oferta Recibida |

3. **Contestar los criterios.** Recorrer las tres secciones en el orden siguiente. Cada fila del PDF corresponde a una pregunta con su número dentro de la sección, su texto completo, una selección excluyente «Sí» o «No» y un campo independiente de «Comentarios de justificación». Una respuesta negativa es válida y se registra literalmente, incluso en «Requiere anticipo». [Preguntas y orden del formato original](../utilities/Nomination_Sheet_FFT.pdf)

   | Sección | Preguntas | Referencia |
   | --- | ---: | --- |
   | Validación Comercial | 1 a 16 | Página 1 |
   | Validación Técnica | 1 a 9 | Página 2 |
   | Validación Legal y Cumplimiento | 1 a 7 | Página 2 |

4. **Revisar y corregir.** Antes de enviar, el usuario puede volver a cualquier sección y editar sus datos. Son obligatorios los ocho datos generales y las 32 selecciones, con comentarios opcionales en cada criterio. Si falta un dato obligatorio o su formato es inválido, el formulario señala el campo, facilita su corrección y conserva lo ya capturado.
5. **Enviar.** Con los datos válidos, el botón de envío realiza un POST HTML al endpoint de Formspree configurado en el formulario. Cada campo debe tener un nombre estable según la convención de la plantilla. Las respuestas y los comentarios deben distinguirse por sección y criterio, aun cuando la numeración visible vuelva a empezar en 1. [Convención de campos y envío](../../forms/supplierNominationSheet/README.md)
6. **Confirmar la recepción.** Configurar el destino de éxito de Formspree con la URL pública de `forms/supplierNominationSheet/thanks/`, prevista en el campo `_next` de la plantilla. Tras un envío aceptado, la página Thanks confirma la recepción de la evaluación. Si la red o el servicio informa un fallo, el usuario debe poder volver al formulario y reintentar el envío sin recibir una confirmación de éxito.

## Criterios de aceptación para la implementación

| Caso de prueba | Resultado verificable |
| --- | --- |
| Completar una evaluación en móvil y con teclado en escritorio | Se pueden leer las instrucciones, identificar los campos, contestar las 32 preguntas y recorrer las tres secciones en el orden del PDF. |
| Omitir un dato obligatorio o una respuesta e intentar enviar | La validación identifica la omisión antes del POST y conserva las demás respuestas. Un comentario vacío permite continuar. |
| Cambiar una selección y escribir comentarios distintos en el primer criterio de cada sección | El POST contiene los ocho datos, las 32 respuestas finales y cada comentario asociado a su pregunta. Los tres criterios número 1 se distinguen en el envío. |
| Aceptar un envío válido | El destino de éxito abre la página Thanks de esta carpeta y el usuario ve la confirmación. |
| Simular un rechazo de Formspree o un fallo de red | El flujo comunica el fallo, permite regresar y reintentar, y muestra Thanks únicamente tras una recepción confirmada. |

La implementación envía los campos por POST a `https://formspree.io/f/xgakozbj`. El navegador solicita una respuesta JSON para poder comunicar errores sin perder las respuestas. La URL de Thanks se resuelve desde la ubicación del formulario, se incluye en `_next` y se abre tras la confirmación del servicio.

La prueba en navegador verificó la validación obligatoria, el contenido del POST, un fallo de red, un rechazo, el reintento y la navegación a Thanks con un envío aceptado simulado. La recepción en la cuenta de Formspree queda pendiente de un envío real.
