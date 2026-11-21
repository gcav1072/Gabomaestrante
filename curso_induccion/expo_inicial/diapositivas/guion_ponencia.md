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
| `4` | 4. Resultados del Artículo (Tabla 4 y Global) | **Gabriel** | `04:45 – 07:45` | 3 min |
| `5` | 5. Áreas de Uso y Limitaciones | **Gabriel** | `07:45 – 09:00` | 1 min 15 s |
| `6` | 6. Conclusión y Reflexión de Cierre | **Gabriel** | `09:00 – 09:50` | 50 s |
| `⟲` | Zoom-out final (Ronda de preguntas) | **Ambos** | `09:50 – 10:00` | 10 s + Q&A |

---

## Bloque I — Ing. Ruben Barrios (`00:00 – 04:45`)

### Paso `0` · Vista General (`00:00 – 00:25`)
> **Acción:** Iniciar en la Vista General del mapa. Al presionar **`→`** para pasar al Paso `1`, arranca automáticamente el cronómetro de 10 minutos.

**Discurso sugerido:**
> “Buenos días/tardes a todos. Mi nombre es Ruben Barrios y junto con mi compañero Gabriel Astudillo, de la Cohorte 9-A de la Maestría en Ingeniería de Gas de la UDO, les presentamos hoy el análisis técnico de un artículo reciente sobre modelado termodinámico para gas natural y gas natural licuado (LNG). En los próximos diez minutos recorreremos el problema industrial que motiva el trabajo, la formulación matemática del modelo propuesto —el **IR EOS**—, la comparación cuantitativa de los resultados reportados por los autores frente a Peng-Robinson y GERG-2008 (junto con el contraste gráfico frente a GMA), y finalmente sus áreas de aplicación y límites reales.”

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
> En resumen: toda esa derivación intermolecular decanta en un **polinomio directo en $\rho$** capaz de predecir densidades en gas y líquido en milisegundos. Ahora, para revisar cómo se desempeña este modelo en las tablas comparativas del artículo frente a GERG-2008 y Peng-Robinson, le doy el pase a **Gabriel**.”

---

## Bloque II — Ing. Gabriel Astudillo (`04:45 – 10:00`)

### Paso `4` · Resultados del Artículo — Tabla 4 y Resumen Global (`04:45 – 07:45`)
> **Acción (coreografía recomendada — 3 minutos):**
> 1. Al entrar al Paso `4`, aparece la isoterma **`307.85 K`** a **`40.03 MPa`** (Tabla 4) y la pestaña **`Regularidad (Z−1)ν³`**.
> 2. *(05:25)* Clic en **`Composición (Tabla 1)`** para mostrar la mezcla `N. gas 11` (89.57% metano) y cerrar.
> 3. *(05:45)* Cambiar brevemente a **`Contraste GMA (Fig. 1)`** para recordar el contraste visual de las Figs. 1 vs. 3 del paper.
> 4. *(06:15)* Cambiar a **`Isoterma ρ vs P`** y desplazar la presión desde **`14.92 MPa`** hasta **`40.03 MPa`** (o cambiar a **`406.25 K`**) para mostrar los datos exactos de la Tabla 4 y la deriva de PR a alta presión.
> 5. *(06:50)* Abrir **`Resumen Global (Tablas 2 y 5)`** para mostrar el desempeño completo sobre los **615 puntos** de densidad y **79 puntos** de $C_p$, y cerrar.
> 6. *(07:20)* Opcional según tiempo/audiencia: abrir brevemente **`Notas Críticas`** para comentar la auditoría metodológica.

**Discurso sugerido:**
> “Gracias, Ruben. En esta lámina integramos de forma interactiva los **30 puntos experimentales publicados en la Tabla 4 del artículo**, correspondientes a la mezcla **N. gas 11** de Barreau et al. *(abrir `Composición (Tabla 1)` y cerrar)*: casi 90% metano, 8.35% etano y trazas hasta pentanos y nitrógeno.
>
> Comencemos en el punto de mayor presión de la isoterma fría: **307.85 K y 40.03 MPa**, donde la densidad experimental medida es **14,914.1 mol/m³**. Fíjense en las tres tarjetas con los valores exactos que reporta el estudio:
> - **PR EOS** sobreestima la densidad en **+7.69%** (`16,061 mol/m³`), reflejando la pérdida de exactitud típica de las cúbicas a altas presiones.
> - **GERG-2008**, según los valores reportados en la Tabla 4, queda con **+1.39%** en este punto (`1.90%` AAD promedio en la tabla).
> - **IR EOS**, en cambio, alcanza **15,003.8 mol/m³** (`+0.60%` en este punto) y un promedio **AAD de apenas 0.15%** a lo largo de los 30 puntos de la Tabla 4.
>
> *(cambiar brevemente a `Contraste GMA (Fig. 1)`)* Noten también que el modelo **GMA original** ni siquiera entra en las tablas numéricas de resultados porque —como muestran las Figs. 1 y 2 del paper— su recta lineal no logra capturar la curvatura real de los datos experimentales en fase gas.
>
> Si cambiamos a la vista **`Isoterma ρ vs P`** *(clic en `Isoterma ρ vs P` y recorrer presiones de `14.92` a `40.03 MPa`)*, observamos exactamente el patrón que reportan los autores: a baja presión todos los modelos están más cerca, pero al subir hacia 35–40 MPa, Peng-Robinson se despega claramente por encima de la curva experimental mientras IR EOS sigue fielmente la tendencia.
>
> Y si ampliamos la mirada más allá de esta mezcla *(clic en `Resumen Global (Tablas 2 y 5)`)*: en la **Tabla 2** del artículo —que cubre **14 mezclas y 615 puntos** hasta 190 MPa incluyendo dos de LNG— IR EOS logra un **AAD global de 0.397%**, frente a **2.36%** reportado para GERG-2008 y **6.316%** de PR. En **capacidad calorífica ($C_p$)** (Tabla 3, 79 puntos), la ventaja se reduce (`1.95%` IR vs `2.02%` GERG).
>
> *(opcional: clic en `Notas Críticas` y cerrar)* Como lectura crítica para una audiencia técnica —resumida en `Notas Críticas`— vale subrayar dos puntos: primero, que IR EOS es un modelo **correlativo** que calibra 9 constantes por mezcla (publicadas en su material suplementario), mientras PR y GERG son predictivos; y segundo, que llama la atención el **1.90%–2.33%** reportado para GERG en una mezcla de 90% metano (e incluso celdas `ERROR` en la Tabla 2), cifras atípicas frente a implementaciones estándar como REFPROP, donde GERG suele rondar el `0.1%`.”

---

### Paso `5` · Áreas de Uso y Limitaciones (`07:45 – 09:00`)
> **Acción:** Avanzar a **`5`**. Apuntar primero a la columna izquierda (flujo de tubería) y luego a la derecha (gauge $C_p$ y moléculas $\text{H}_2\text{O}/\text{H}_2$).

**Discurso sugerido:**
> “Con los números sobre la mesa, ¿dónde aporta valor real el IR EOS y cuáles son sus límites?
>
> En el lado izquierdo, su gran fortaleza es la **predicción de densidad en tiempo real**: con una arquitectura algebraica liviana y un error global reportado de **0.397% hasta 190 MPa**, resulta atractivo para integrarse en sistemas SCADA, gemelos digitales o monitoreo de flujo desde la tubería —como muestra el diagrama— hacia la prevención de sólidos, control de separación de fases y optimización del efecto Joule-Thomson en plantas criogénicas de LNG.
>
> En el lado derecho están sus **compromisos y limitaciones**:
> 1. **Propiedades secundarias:** cuando pasamos de densidad a capacidad calorífica ($C_p$) o segundo coeficiente virial, el margen frente a GERG desaparece (`1.95%` vs `2.02%`), y GERG sigue siendo referencia en propiedades calóricas y de transporte.
> 2. **Composición:** el potencial Lennard-Jones (9, 6, 3) está calibrado para hidrocarburos típicos de gas natural; en corrientes con **especies polares como agua** o **mezclas ricas en hidrógeno**, requiere reformulación.
> 3. **Dependencia de datos:** al ser correlativo, necesita datos experimentales previos por mezcla para calibrar $(A_0\dots C_2)$, además de validar contra implementaciones certificadas de NIST/REFPROP antes de adoptarlo en diseño crítico.”

---

### Paso `6` · Conclusión y Cierre (`09:00 – 09:50`)
> **Acción:** Avanzar a **`6`**. Recorrer los 3 pilares, leer la reflexión de cierre y cerrar al zoom-out final **`⟲`**.

**Discurso sugerido:**
> “Para cerrar, resumimos el artículo en tres pilares:
> 1. **Innovación teórica:** rescatar la regularidad isotérmica de GMA y corregirla mediante el potencial LJ (9, 6, 3) en $(Z-1)\nu^3$ resuelve su colapso en fase gaseosa.
> 2. **Logro industrial:** ofrece precisión sobresaliente en densidad (`0.397%` global en el estudio y `0.15%` en los datos de Tabla 4 de N. gas 11) con rapidez de cálculo apta para tiempo real.
> 3. **Vector de futuro:** deja una base abierta para extenderse hacia mezclas de transición energética ($\text{H}_2, \text{CO}_2$) y recalibración automática de sus 9 parámetros asistida por *Machine Learning*.
>
> Como reflexión final: *el valor de una ecuación de estado en ingeniería no reside en su complejidad matemática, sino en equilibrar el rigor físico con la rapidez necesaria para decidir en tiempo real.*
>
> *(Avanzar un paso a **`⟲`** para abrir el mapa completo)* Muchas gracias a todos por su atención. Quedamos atentos a sus preguntas.”

---

## Guía Rápida para Preguntas del Jurado / Audiencia (Q&A)

- **“¿Por qué en la Tabla 2 la fila de `N. gas 11` dice `0.03%` para IR, `5.27%` para PR y `2.33%` para GERG, mientras el promedio de la Tabla 4 da `0.15%`, `5.19%` y `1.90%`?”**  
  Es una inconsistencia numérica interna del propio artículo (posiblemente porque la Tabla 2 resumió un subconjunto o redondeos distintos frente a las 30 filas impresas en la Tabla 4). En el modal **`Notas Críticas`** dejamos documentada esa diferencia para transparencia técnica.
- **“¿Por qué GMA EOS no tiene tarjeta ni barra numérica en la Diapositiva 4?”**  
  Porque los autores no reportaron densidades ni AAD % numéricos de GMA en las Tablas 2, 3, 4 ni 5; solo lo mostraron gráficamente en las Figs. 1 y 2 para evidenciar que su relación lineal $(2Z-1)\nu^3$ vs. $\rho$ falla en fase gas, por lo cual lo dejamos únicamente como contraste visual en la pestaña **`Contraste GMA (Fig. 1)`**.
- **“¿Qué pasa si no se tienen las 9 constantes $(A_0\dots C_2)$ de una mezcla nueva?”**  
  Al ser un modelo correlativo, el usuario necesita datos $P\rho T$ experimentales de esa familia de mezcla para ajustar las 9 constantes (los autores publicaron las de sus 14 mezclas en material suplementario); en cambio, PR o GERG-2008 pueden aplicarse sin calibración local adicional.
