# collabtext

Para comenzar, se necesitan varios módulos de nodejs:
- express@4.17.1
- express-fileupload@1.2.1
- quill@1.3.7
- rich-text@3.1.0
- sharedb@1.5.2
- sharedb@1.5.2
- socket.io@3.1.0
- websocket-json-stream@0.0.1
- ws@1.1.5


Con esos debería de ser suficiente.

Una vez copiado todos los archivos, para iniciar el servidor hay que abrir una terminal dentro de la carpeta y teclear lo siguiente:

node index.js

Saltará un console.log diciendo: Editor now live on http://localhost:8080
Si no salta eso, quizá haya algún módulo que no esté instalado.

Todo el proyecto gira en torno a la carpeta 'files', donde también la he subido con el texto de prueba 'pruebas.txt'
Al abrir el browser y teclear la dirección, veremos la primera funcionalidad del programa arriba a la izquierda, que es el botón para subir archivos.
Cualquier archivo que ingreses ahí, se subirá directamente a la carpeta 'files'
(Dato interesante, tendría que dar hacia atrás en el browser para poder volver al proyecto, ya que se queda en /upload, me gustaría cambiarlo pero
no es prioritario)

Una vez lo tengas en files, podrás leer el archivo (sólo funciona dentro de la carpeta 'files' de ese mismo directorio)
(Otra cosa que me gustaría cambiar sin ser prioritaria, es que NO puedas salir de la carpeta files a la hora de asignar cualquier archivo, ya que es
un fallo de seguridad, al menos a mi entender, aunque solo está preparado para funcionar en red local)

Cuando tengas el archivo seleccionado, le das a leer y verás cómo todo el contenido del archivo se ha plasmado en la hoja en blanco.
Ahora abre otra pestaña, con la misma dirección, localhost:8080, verás a lo que me refiero cuando digo texto collaborativo, cualquier
cosa que escribas o borres se hará en tiempo real y podrán verlo los demás conectados al proyecto.

El botón de guardar, como es lógico, guarda los cambios realizados en el proyecto.
(Otro cambio no prioritario es que se guarda con etiquetas <p>, al menos en archivos txt, en otros no)
Y el botón de lock, hace que tu texto sea ineditable en forma local, mientras que los demás si podrán editarlo, y así no hay ningún tipo de fallo cuando otra
persona escriba. Aun así, seguirá pudiendo ver todo lo editado aun estando bloqueado.

Ahora, el problema que planteo es el siguiente, quiero hacer, que en la columna derecha, el textarea desaparezca (y si, ya se que le di hasta estilos,
pero era para hacer una pequeña prueba), y sólo quede la columna derecha completa con el ace.js activo.
Lo óptimo, sería que no hiciera falta dicha columna para poder hacer un autocompletador de código, ya que con el ace activo, la escritura/lectura en tiempo
real tiene que ser bidireccional en ambas columnas, y eso sería un caos. Con lo cual, acepto sugerencias, cambios, ediciones y demás.

Muchas gracias.
