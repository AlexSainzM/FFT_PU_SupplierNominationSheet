# Supplier Nomination Sheet · FFT México

## Propósito

Compras y el usuario técnico documentan la evaluación de un proveedor para un proyecto y un evento de ASTRAS. Cada envío reúne los datos de la oferta, las respuestas a los criterios comerciales, técnicos y legales, y sus comentarios de justificación.

## Arquitectura y alcance

El desarrollo es 100 % frontend y se publica como sitio estático. La plantilla de FFT México utiliza HTML, CSS, JavaScript y Bootstrap. Se permiten frameworks de frontend como Bootstrap. Formspree proporciona el backend que recibe y almacena los envíos. El alcance no incluye manejo de sesiones ni autenticación. 

| Etapa | Resultado |
| --- | --- |
| Spec 001 · Captura | El usuario completa la evaluación en el navegador, la envía a Formspree y llega a la página de agradecimiento tras la recepción. [Especificación del formulario](specs/001-nomination-form-creation.md) |
| Especificaciones futuras · Consulta | Los visores de envíos (*submissions viewers*) consultarán las evaluaciones mediante la API de solo lectura de Formspree. |
| Especificaciones futuras · Puntajes | Se definirán las reglas para convertir las respuestas en puntajes por sección y aplicar las ponderaciones del formato. |

## Ponderaciones para el cálculo futuro

El formato de FFT México asigna los siguientes pesos a las secciones de evaluación. La información general identifica la evaluación y la oferta. [Formato de referencia, páginas 1 y 2](utilities/Nomination_Sheet_FFT.pdf)

| Sección | Criterios | Peso en el puntaje total |
| --- | ---: | ---: |
| Validación Comercial | 16 | 40 % |
| Validación Técnica | 9 | 35 % |
| Validación Legal y Cumplimiento | 7 | 25 % |
| **Total** | **32** | **100 %** |

El PDF fija los pesos por sección. La especificación de puntajes deberá definir cómo valorar cada respuesta dentro de su sección, incluido el sentido de criterios como «Requiere anticipo». La primera captura conserva la respuesta original y su justificación con identificadores estables para que los cálculos posteriores puedan utilizar los envíos existentes.

