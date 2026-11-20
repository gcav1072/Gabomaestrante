# Guion de Ponencia — Modelo IR EOS para Gas Natural y LNG

- **Programa:** M.Sc. Ingeniería de Gas · Universidad de Oriente (UDO) · Cohorte 9-A
- **Ponentes:** Ing. Ruben Barrios (Bloque I: Pasos `0` a `3B`) · Ing. Gabriel Astudillo (Bloque II: Pasos `4` a `⟲`)
- **Duración objetivo:** 10 minutos (~4:45 min Ruben · ~5:15 min Gabriel)
- **Archivo a abrir:** `curso_induccion/expo_inicial/web/index.html` (tecla **`F`** para pantalla completa, **`→`** o **`Espacio`** para avanzar, **`N`** para ver notas rápidas en pantalla).

---

## Mapa de Tiempos y Relevo

| Paso | Pantalla / Enfoque | Ponente | Tiempo | Duración |
|---|---|---|---|---|
| `0` | Vista General (Mapa completo) | **Ruben** | `00:00 – 00:25` | 25 s |
| `1` | 1. Presentación del Artículo | **Ruben** | `00:25 – 01:15` | 50 s |
| `2A` | 2. Contexto y Problemática | **Ruben** | `01:15 – 02:05` | 50 s |
| `2B` | 2. Anatomía de la Solución | **Ruben** | `02:05 – 02:50` | 45 s |
| `3A` | 3. Derivación Matemática | **Ruben** | `02:50 – 03:50` | 60 s |
| `3B` | 3. Ec. Operativa y Cierre Bloque I | **Ruben → Relevo** | `03:50 – 04:45` | 55 s |
| `4` | 4. Laboratorio Numérico en Vivo (JS) | **Gabriel** | `04:45 – 07:45` | 3 min |
| `5` | 5. Áreas de Uso y Limitaciones | **Gabriel** | `07:45 – 09:00` | 1 min 15 s |
| `6` | 6. Conclusión y Reflexión de Cierre | **Gabriel** | `09:00 – 09:50` | 50 s |
| `⟲` | Zoom-out final (Ronda de preguntas) | **Ambos** | `09:50 – 10:00` | 10 s + Q&A |

---

## Bloque I — Ing. Ruben Barrios (`00:00 – 04:45`)

### Paso `0` · Vista General (`00:00 – 00:25`)
> **Acción:** Iniciar en la Vista General del mapa. Al presionar **`→`** para pasar al Paso `1`, arranca automáticamente el cronómetro de 10 minutos.

**Discurso sugerido:**
> “Buenos días/tardes a todos. Mi nombre es Ruben Barrios y junto con mi compañero Gabriel Astudillo, de la Cohorte 9-A de la Maestría en Ingeniería de Gas de la UDO, les presentamos hoy el análisis técnico de un artículo reciente sobre modelado termodinámico para gas natural y gas natural licuado (LNG). En los próximos diez minutos recorreremos el problema industrial que motiva el trabajo, la formulación matemática del modelo propuesto —el **IR EOS**—, una demostración numérica calculada en vivo en esta misma presentación con los datos del estudio, y finalmente sus áreas de aplicación y límites reales.”

---

### Paso `1` · Presentación del Artículo (`00:25 – 01:15`)
> **Acción:** Avanzar a **`1`**. Señalar brevemente la ficha técnica y la curva $P\text{–}v$.

**Discurso sugerido:**
> “El artículo que evaluamos se titula *Enhanced GMA-Based IR EOS for Natural Gas and LNG Thermophysical Properties*, publicado en junio de **2024** en la revista *Chemical Process Design* (Volumen 3, Número 1). Sus autores son Mojtaba Moradian, Sattar Ghader y Abbas Ghareghashi, investigadores de la Universidad Shahid Bahonar de Kerman y la Universidad de Velayat, en **Irán**.
>
> El foco del trabajo es claro: evaluar si una modificación de la ecuación de estado GMA permite predecir propiedades termofísicas —especialmente la densidad— desde bajas presiones hasta regímenes extremos de **150 a 190 MPa**, validando contra **615 puntos experimentales** de 14 mezclas reales de gas natural y LNG.”

---

### Paso `2A` · Contexto y Problemática (`01:15 – 02:05`)
> **Acción:** Avanzar a **`2a`**. Recorrer visualmente los dos bloques superiores y luego los tres cuadrantes del gráfico.

**Discurso sugerido:**
> “¿Por qué importa esto en la industria del gas? A medida que el gas natural y el LNG ganan peso en la matriz energética, los errores al estimar densidad o equilibrio de fases en plantas criogénicas o gasoductos de alta presión dejan de ser un detalle académico: pueden traducirse en formación de sólidos, separación imprevista de fases o fallos operacionales en equipos rotativos y compresores.
>
> Sin embargo, hoy enfrentamos un dilema clásico, que ilustramos en este cuadrante de **precisión frente a velocidad computacional**:
> - En el extremo superior izquierdo tenemos modelos de referencia como **GERG-2008** o **PC-SAFT**: ofrecen excelente precisión, pero su formulación es matemáticamente pesada y costosa para simulaciones de control en tiempo real.
> - En el extremo inferior derecho están las **ecuaciones cúbicas** tradicionales como Peng-Robinson (PR) o SRK: son muy rápidas y livianas, pero pierden exactitud a altas presiones, en condiciones criogénicas de LNG o frente a impurezas como $\text{N}_2$, $\text{CO}_2$ e hidrógeno.
>
> El objetivo del artículo apunta justo a llenar ese **hueco en el cuadrante superior derecho**: combinar exactitud casi metrológica con ligereza algebraica.”

---

### Paso `2B` · Anatomía de la Solución (`02:05 – 02:50`)
> **Acción:** Avanzar a **`2b`**. Seguir la secuencia de izquierda a derecha (`GMA` + `LJ 9-6-3` = `IR EOS`).

**Discurso sugerido:**
> “¿Cómo proponen resolver ese dilema? Parten de la ecuación de estado **GMA original**, que funciona muy bien para densidades líquidas pero fracasa en fase gaseosa porque supone que la función $(2Z-1)\nu^3$ varía linealmente con la densidad $\rho$, algo que —como se ve en la mini gráfica— deja de cumplirse cuando la densidad baja y aparecen desviaciones no ideales.
>
> Para corregir eso, introducen un potencial intermolecular de **Lennard-Jones (9, 6, 3)** con parámetros dependientes de la temperatura $A(T), B(T)$ y $C(T)$. Además de los términos clásicos de repulsión ($r^{-9}$) y dispersión ($r^{-6}$), añaden un tercer término efectivo en $r^{-3}$ pensado para capturar interacciones reales en gases.
>
> De esa combinación nace la **IR EOS** (*Isotherm Regularity Equation of State*), que transforma la variable de regularidad a $(Z-1)\nu^3$ y permite ajustar tanto gas natural como LNG con un cálculo puramente algebraico.”

---

### Paso `3A` · Presentación Matemática: Derivación (`02:50 – 03:50`)
> **Acción:** Avanzar a **`3a`**. Apuntar a cada una de las 3 ecuaciones y a la leyenda de variables inferior.

**Discurso sugerido:**
> “Veamos la matemática detrás de esa idea en tres pasos:
> 1. **Punto de partida (Ec. 1):** el modelo GMA asume linealidad entre $(2Z-1)\nu^3$ y la densidad $\rho$, donde $Z$ es el factor de compresibilidad y $\nu = 1/\rho$ el volumen molar.
> 2. **Potencial modificado (Ec. 3):** al definir la energía potencial $U$ con potencias $r^{-9}$, $r^{-6}$ y $r^{-3}$ (con $r = \nu^{1/3}$) y derivar la presión interna mediante relaciones termodinámicas exactas, la integración introduce términos inversos en la densidad.
> 3. **Regularidad IR EOS (Ecs. 5 y 10):** llegamos así a $(Z-1)\nu^3 = C(T) + B(T)/\rho + A(T)/\rho^2$. Fíjense en un detalle práctico clave: los autores **eliminan el factor 2** que multiplicaba a $Z$ en GMA porque comprobaron numéricamente que degradaba las predicciones en gas natural y LNG. De este modo, las isotermas que antes eran curvas imposibles para una recta ahora quedan descritas con suavidad.”

---

### Paso `3B` · Ecuación Operativa y Relevo a Gabriel (`03:50 – 04:45`)
> **Acción:** Avanzar a **`3b`**. Señalar la Ec. (11), el bloque de las 9 constantes y la barra de conclusión antes de dar el pase a Gabriel.

**Discurso sugerido:**
> “Para llevar esta regularidad a un algoritmo de cálculo directo, basta reordenar la Ec. (10) para obtener la **Ec. (11)**: un polinomio de cuarto grado en $\rho$ igualado a cero. Dado $T$ y $P$, la densidad se resuelve en microsegundos mediante un Newton-Raphson que parte de la densidad de gas ideal $P/(RT)$.
>
> ¿De dónde salen $A(T), B(T)$ y $C(T)$? De las **Ecs. (12) a (14)**, donde cada parámetro varía con la temperatura mediante tres constantes globales —**nueve constantes en total** $(A_0\dots C_2)$ calibradas por mezcla—.
>
> En resumen: toda esa derivación intermolecular decanta en un **polinomio directo en $\rho$** capaz de predecir densidades en gas y líquido en milisegundos. Ahora, para comprobar si esto funciona de verdad frente a Peng-Robinson, GMA y GERG-2008, le doy el pase a **Gabriel**, quien nos mostrará los cálculos ejecutándose en vivo con los datos del propio artículo.”

---

## Bloque II — Ing. Gabriel Astudillo (`04:45 – 10:00`)

### Paso `4` · Laboratorio Numérico en Vivo (`04:45 – 07:45`)
> **Acción (coreografía recomendada en vivo — 3 minutos):**
> 1. Al entrar al Paso `4`, ya está seleccionada la isoterma **`307.85 K`** a **`40.03 MPa`** y la pestaña **`Regularidad (Z−1)ν³`**.
> 2. *(05:25)* Clic en **`Composición`** para mostrar brevemente la mezcla `N. gas 11` (Tabla 1, 89.57% metano) y cerrar.
> 3. *(05:45)* Cambiar a la pestaña **`Falla GMA (2Z−1)ν³`** para mostrar la recta roja fallando sobre los puntos curvos.
> 4. *(06:10)* Cambiar a **`Isoterma ρ vs P`** y mover el slider/botones de presión (ej. bajar a **`14.92 MPa`** o subir a **`40.03 MPa`**) para ver PR desviándose arriba y GMA sin raíz.
> 5. *(06:40)* Activar **`Isoterma Oculta: ON`** (y probar cambiar entre **`307.85 K`** y **`356.95 K`**) para demostrar predicción fuera de muestra.
> 6. *(07:15)* Opcional según tiempo/audiencia: abrir **`Notas Críticas`** o **`</> Código JS`** brevemente y cerrar antes de pasar al Paso `5`.

**Discurso sugerido:**
> “Gracias, Ruben. Lo que tienen en pantalla no es una tabla estática: es un módulo escrito en JavaScript que resuelve las ecuaciones en tiempo real en el navegador sobre los **30 puntos experimentales de la Tabla 4**, correspondientes a la mezcla **N. gas 11** de Barreau et al. *(abrir brevemente `Composición` y cerrar)*: casi 90% metano, 8.35% etano y trazas hasta pentanos y nitrógeno.
>
> Arrancamos en el punto más exigente de la isoterma fría: **307.85 K y 40.03 MPa**, donde la densidad experimental es **14,914.1 mol/m³**. Fíjense en las cuatro tarjetas calculadas en vivo:
> - **PR EOS**, calculada analíticamente con reglas de mezcla estándar, se desvía **+7.3%** por encima del dato real —un error típico de las cúbicas a alta presión—.
> - **GMA EOS**, ajustada linealmente sobre esta isoterma, ni siquiera aparece con valor: dice **‘Sin solución real’**. ¿Por qué? *(cambiar a la pestaña `Falla GMA (2Z−1)ν³`)* Aquí se ve exactamente la razón: la recta roja de GMA no logra capturar la curvatura real de los puntos experimentales, y en **7 de los 30 puntos** directamente no corta la curva $P\text{–}\rho$.
> - **GERG-2008**, tomando el valor reportado por los autores en la Tabla 4, queda con **+1.39%** en este punto (`1.90%` global en la tabla).
> - Y el **IR EOS**, ajustando las 9 constantes mediante factorización QR y resolviendo el polinomio cuártico, cae a **0.27%** aquí y **0.19% de error medio (AAD)** en los 30 puntos. *(cambiar a `Isoterma ρ vs P`)* En esta curva $\rho\text{–}P$ se aprecia de un vistazo: mientras PR se despega hacia arriba conforme sube la presión y GMA pierde raíces, el IR EOS abraza los puntos experimentales.
>
> Ahora bien, un ingeniero crítico diría con razón: *‘claro, IR EOS tiene ventaja aquí porque es un modelo correlativo que ajustó sus 9 constantes sobre la mezcla, mientras PR predice sin ver los datos’*. Para poner eso a prueba en vivo, activamos **`Isoterma Oculta: ON`**.
> *(hacer clic en `Isoterma Oculta: ON`)*
> Al activarlo, excluimos por completo esta temperatura del ajuste —el algoritmo solo calibra con las otras 4 isotermas— y predice los 6 puntos de **307.85 K** por extrapolación térmica. Aun en el borde frío sin haber visto la isoterma, el error medio es **0.80%**; y si pasamos a una isoterma intermedia como **356.95 K** *(clic en `356.95 K`)*, cae a **0.17%**, muy por debajo de PR (`5%`) e incluso menor que el GERG reportado en el artículo.
>
> *(opcional: clic en `Notas Críticas`)* Como detalle de auditoría técnica —que dejamos en `Notas Críticas`—, vale notar que el `1.90%` reportado por los autores para GERG-2008 en esta mezcla de 90% metano (y algunas celdas `ERROR` en su Tabla 2) es inusualmente alto frente a lo que GERG suele lograr en implementaciones estándar como NIST REFPROP. Eso nos invita a evaluar las ventajas del IR con rigor.”

---

### Paso `5` · Áreas de Uso y Limitaciones (`07:45 – 09:00`)
> **Acción:** Avanzar a **`5`**. Apuntar primero a la columna izquierda (flujo de tubería) y luego a la derecha (gauge $C_p$ y moléculas $\text{H}_2\text{O}/\text{H}_2$).

**Discurso sugerido:**
> “Con la evidencia numérica sobre la mesa, ¿dónde aporta valor real el IR EOS y cuáles son sus límites?
>
> En el lado izquierdo, su gran fortaleza es la **predicción de densidad en tiempo real**: con una arquitectura algebraica liviana y un error global reportado de **0.397% hasta 190 MPa**, es ideal para integrarse en sistemas SCADA, gemelos digitales o monitoreo de flujo desde la tubería —como muestra el diagrama— hacia la prevención de sólidos, control de separación de fases y optimización del efecto Joule-Thomson en plantas criogénicas de LNG.
>
> En el lado derecho están sus **compromisos y limitaciones**, que debemos tener muy claros:
> 1. **Propiedades secundarias:** cuando pasamos de densidad a capacidad calorífica ($C_p$) o segundo coeficiente virial, el margen se estrecha (`1.95%` frente a `2.02%` reportado para GERG), y GERG sigue siendo la referencia consolidada en propiedades calóricas y de transporte.
> 2. **Composición:** el potencial Lennard-Jones (9, 6, 3) está calibrado para hidrocarburos típicos de gas natural; en corrientes con **especies polares como agua** o **mezclas ricas en hidrógeno**, requiere reformulación.
> 3. **Dependencia de datos:** al ser correlativo, necesita datos previos por mezcla para calibrar $(A_0\dots C_2)$, y conviene validarlo frente a implementaciones verificadas de REFPROP/GERG antes de desplegarlo en diseño crítico.”

---

### Paso `6` · Conclusión y Cierre (`09:00 – 09:50`)
> **Acción:** Avanzar a **`6`**. Recorrer los 3 pilares, leer la reflexión de cierre y cerrar al zoom-out final **`⟲`**.

**Discurso sugerido:**
> “Para cerrar, resumimos el artículo en tres pilares:
> 1. **Innovación teórica:** rescatar la idea de regularidad isotérmica de GMA y corregirla mediante el potencial LJ (9, 6, 3) en $(Z-1)\nu^3$ resuelve su colapso en fase gaseosa.
> 2. **Logro industrial:** ofrece precisión sobresaliente en densidad (`0.397%` global en el estudio y `0.19%` en nuestra verificación en vivo) con velocidad de ejecución apta para tiempo real.
> 3. **Vector de futuro:** deja una base abierta para extenderse hacia mezclas de transición energética ($\text{H}_2, \text{CO}_2$) y recalibración automática de sus 9 parámetros asistida por técnicas de *Machine Learning*.
>
> Como reflexión final: *el valor de una ecuación de estado en ingeniería no reside en su complejidad matemática, sino en equilibrar el rigor físico con la rapidez necesaria para decidir en tiempo real.*
>
> *(Avanzar un paso a **`⟲`** para abrir el mapa completo)* Muchas gracias a todos por su atención. Quedamos abiertos a sus preguntas o a volver sobre cualquier punto del laboratorio.”

---

## Guía Rápida para Preguntas del Jurado / Audiencia (Q&A)

- **“¿Por qué su cálculo en vivo da `0.19%` de AAD y la Tabla 4 del artículo da `0.15%`?”**  
  Los 9 coeficientes exactos $(A_0\dots C_2)$ del artículo están en material suplementario no incluido en el PDF. Nuestro solver los recupera directamente de los 30 puntos experimentales mediante mínimos cuadrados lineales (QR) sobre $Z-1 = A(T)\rho + B(T)\rho^2 + C(T)\rho^3$, reproduciendo el mismo comportamiento físico con una diferencia de apenas 4 centésimas porcentuales.
- **“¿Por qué Peng-Robinson dio `5.06%` en vivo y `5.19%` en el artículo?”**  
  La diferencia máxima punto a punto es menor a `0.34%` y obedece a parámetros críticos ligeramente distintos de componente puro o coeficientes de interacción binaria $k_{ij}$ utilizados por los autores (en nuestro cálculo usamos $k_{ij}=0$).
- **“¿Qué hace exactamente el botón `</> Código JS`?”**  
  Muestra la implementación real que está corriendo en la diapositiva: unas 15 líneas con las Ecs. (12)–(14) y el ciclo Newton-Raphson de la Ec. (11), junto con los 9 valores numéricos de $A_0\dots C_2$ calculados al instante.
