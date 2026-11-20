(function () {
  "use strict";

  const { meta, components, paperBenchmarks, R } = window.IR_DATA;
  const { buildScenario, IR_SOLVER_SNIPPET } = window.IR_CALC;

  /* ==================== 1. PREZI CAMERA & STEPS ==================== */
  const STEPS = [
    {
      id: "overview",
      badge: "0",
      label: "Vista General",
      target: "overview",
      cue: "00:00 – 00:25",
      notes: "Bienvenida y propósito: presentaremos el modelo IR EOS (Moradian et al., 2024), su fundamento matemático, una demostración interactiva sobre la Tabla 4 y su viabilidad en gas natural y LNG.",
    },
    {
      id: "art",
      badge: "1",
      label: "1. Artículo",
      target: "#frame-1",
      pad: 0.90,
      cue: "00:25 – 01:15",
      notes: "Ficha del artículo: publicado en junio de 2024 en Chemical Process Design por Moradian, Ghader y Ghareghashi (Kerman e Iranshahr, Irán). Evalúa gas natural y LNG a altas presiones.",
    },
    {
      id: "intro-prob",
      badge: "2a",
      label: "2A. Problema",
      target: "#subzone-2a",
      pad: 0.88,
      cue: "01:15 – 02:05",
      notes: "Contexto y dilema industrial: las cúbicas (PR/SRK) son rápidas pero pierden exactitud a alta presión o con GNL; GERG-2008 y PC-SAFT son muy precisos pero pesados para tiempo real.",
    },
    {
      id: "intro-sol",
      badge: "2b",
      label: "2B. Solución",
      target: "#subzone-2b",
      pad: 0.88,
      cue: "02:05 – 02:50",
      notes: "La propuesta combina el modelo GMA (muy bueno en líquidos, pero inválido en gases) con un potencial Lennard-Jones (9, 6, 3) dependiente de T, dando origen al IR EOS basado en la regularidad (Z − 1)ν³.",
    },
    {
      id: "math-deriv",
      badge: "3a",
      label: "3A. Derivación",
      target: "#subzone-3a",
      pad: 0.88,
      cue: "02:50 – 03:50",
      notes: "Derivación paso a paso: GMA parte de una recta en ρ; el potencial LJ (9,6,3) añade r⁻³ para capturar interacciones en gas y, al retirar el factor 2, surge la regularidad (Z − 1)ν³.",
    },
    {
      id: "math-op",
      badge: "3b",
      label: "3B. Ec. Operativa",
      target: "#subzone-3b",
      pad: 0.88,
      cue: "03:50 – 04:45",
      notes: "Ec. (11) es un polinomio cuártico en ρ resoluble en milisegundos con 9 constantes globales térmicas. Conclusión sencilla: un polinomio directo capaz de predecir densidades en gas y líquido.",
    },
    {
      id: "lab",
      badge: "4",
      label: "4. Lab en Vivo",
      target: "#frame-4",
      pad: 0.92,
      cue: "04:45 – 07:45",
      notes: "Ejercicio en vivo sobre los 30 puntos de la Tabla 4 (N. gas 11). Si necesitas explicar el detalle metodológico o la anomalía de GERG (1.90%), abre el botón discreto 'Notas Críticas'. Activa 'Isoterma Oculta' para demostrar predicción fuera de muestra.",
    },
    {
      id: "uses",
      badge: "5",
      label: "5. Usos y Límites",
      target: "#frame-5",
      pad: 0.91,
      cue: "07:45 – 09:00",
      notes: "Balance industrial: a la izquierda el flujo desde la tubería hasta control criogénico y efecto Joule-Thomson; a la derecha los compromisos en Cp y mezclas polares (H₂O) o con H₂.",
    },
    {
      id: "close",
      badge: "6",
      label: "6. Conclusión",
      target: "#frame-6",
      pad: 0.91,
      cue: "09:00 – 09:50",
      notes: "Cierre con los 3 pilares (innovación teórica, logro en densidad con rapidez cuasi-cúbica y futuro hacia H₂/ML) y reflexión final.",
    },
    {
      id: "overview-end",
      badge: "⟲",
      label: "Cierre / Mapa",
      target: "overview",
      cue: "09:50 – 10:00",
      notes: "Mapa completo para preguntas finales.",
    },
  ];

  const viewport = document.getElementById("viewport");
  const world = document.getElementById("world");
  const frames = [...document.querySelectorAll(".frame")];
  const subzones = [...document.querySelectorAll(".subzone, .f3-zone")];

  let currentStep = 0;
  let camState = { cx: 3625, cy: 1870, scale: 0.2, rot: 0 };

  function parseRotate(el) {
    const t = el.style.transform || "";
    const m = t.match(/rotate\(([-+]?\d*\.?\d+)deg\)/);
    return m ? parseFloat(m[1]) : 0;
  }

  function getTargetGeometry(target) {
    if (target === "overview") {
      return { cx: 3625, cy: 1870, w: 6350, h: 3580, rot: 0, pad: 0.94 };
    }
    const el = document.querySelector(target);
    const parentFrame = el.closest(".frame");
    const frameW = parseFloat(parentFrame.style.width);
    const frameH = parseFloat(parentFrame.style.height);
    const frameCx = parseFloat(parentFrame.style.left) + frameW / 2;
    const frameCy = parseFloat(parentFrame.style.top) + frameH / 2;
    const rot = parseRotate(parentFrame);

    if (el === parentFrame) {
      return { cx: frameCx, cy: frameCy, w: frameW, h: frameH, rot };
    }

    // Subzona dentro de un frame (posiblemente rotado)
    let ox = 0;
    let oy = 0;
    let cur = el;
    while (cur && cur !== parentFrame) {
      ox += cur.offsetLeft;
      oy += cur.offsetTop;
      cur = cur.offsetParent;
    }
    const localCx = ox + el.offsetWidth / 2 - frameW / 2;
    const localCy = oy + el.offsetHeight / 2 - frameH / 2;
    const rad = (rot * Math.PI) / 180;
    const cx = frameCx + localCx * Math.cos(rad) - localCy * Math.sin(rad);
    const cy = frameCy + localCx * Math.sin(rad) + localCy * Math.cos(rad);
    return { cx, cy, w: el.offsetWidth, h: el.offsetHeight, rot };
  }

  function applyCamera(cx, cy, scale, rot, animate = true) {
    camState = { cx, cy, scale, rot };
    if (animate) world.classList.add("animate-cam");
    else world.classList.remove("animate-cam");

    const vw = window.innerWidth;
    const vh = window.innerHeight;
    // Centrar en la zona segura entre el HUD superior (56px) y el dock inferior (68px)
    const safeCenterY = 56 + (vh - 124) / 2;
    world.style.transform = `translate(${vw / 2}px, ${safeCenterY}px) scale(${scale}) rotate(${-rot}deg) translate(${-cx}px, ${-cy}px)`;
  }

  function goToStep(idx, animate = true) {
    currentStep = Math.max(0, Math.min(STEPS.length - 1, idx));
    const step = STEPS[currentStep];

    // Auto-iniciar cronómetro al avanzar del mapa inicial
    if (currentStep > 0 && !timerStarted) startTimer();

    const geom = getTargetGeometry(step.target);
    const pad = step.pad || geom.pad || 0.90;
    const vw = window.innerWidth;
    const safeH = window.innerHeight - 124;
    const scale = Math.min((vw * pad) / geom.w, (safeH * pad) / geom.h);
    applyCamera(geom.cx, geom.cy, scale, geom.rot, animate);

    // Highlight active frame & subzone
    frames.forEach((f) => f.classList.remove("is-active"));
    subzones.forEach((z) => z.classList.remove("is-focus"));
    if (step.target !== "overview") {
      const targetEl = document.querySelector(step.target);
      const pf = targetEl.closest(".frame");
      if (pf) pf.classList.add("is-active");
      if (targetEl !== pf) targetEl.classList.add("is-focus");
    }

    updateHUD();
  }

  /* ==================== 2. HUD, TIMER & NOTES ==================== */
  const dockSteps = document.getElementById("dock-steps");
  const dockLabel = document.getElementById("dock-label");
  const progressFill = document.getElementById("progress-fill");
  const notesDrawer = document.getElementById("notes-drawer");
  const notesTitle = document.getElementById("notes-step-title");
  const notesCue = document.getElementById("notes-time-cue");
  const notesBody = document.getElementById("notes-body");
  const timerBtn = document.getElementById("btn-timer");

  STEPS.forEach((s, i) => {
    const btn = document.createElement("button");
    btn.className = "step-dot";
    btn.textContent = s.badge;
    btn.title = s.label;
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      goToStep(i);
    });
    dockSteps.appendChild(btn);
  });

  function updateHUD() {
    const step = STEPS[currentStep];
    [...dockSteps.children].forEach((b, i) => b.classList.toggle("active", i === currentStep));
    dockLabel.textContent = step.label;
    const pct = (currentStep / (STEPS.length - 1)) * 100;
    progressFill.style.width = `${pct}%`;

    notesTitle.textContent = `GUÍA · ${step.label.toUpperCase()}`;
    notesCue.textContent = `Tiempo sugerido: ${step.cue}`;
    notesBody.textContent = step.notes;
  }

  // Timer (10 min briefing)
  let elapsedSec = 0;
  let timerId = null;
  let timerStarted = false;

  function renderTimer() {
    const mm = String(Math.floor(elapsedSec / 60)).padStart(2, "0");
    const ss = String(elapsedSec % 60).padStart(2, "0");
    timerBtn.textContent = `⏱ ${mm}:${ss} / 10:00`;
    timerBtn.classList.toggle("overtime", elapsedSec > 600);
  }

  function startTimer() {
    timerStarted = true;
    if (timerId) return;
    timerId = setInterval(() => {
      elapsedSec += 1;
      renderTimer();
    }, 1000);
  }

  function toggleTimer() {
    if (timerId) {
      clearInterval(timerId);
      timerId = null;
    } else {
      startTimer();
    }
  }

  function resetTimer() {
    clearInterval(timerId);
    timerId = null;
    timerStarted = false;
    elapsedSec = 0;
    renderTimer();
  }

  timerBtn.addEventListener("click", toggleTimer);
  timerBtn.addEventListener("dblclick", resetTimer);

  document.getElementById("btn-prev").addEventListener("click", () => goToStep(currentStep - 1));
  document.getElementById("btn-next").addEventListener("click", () => goToStep(currentStep + 1));
  document.getElementById("btn-home").addEventListener("click", () => goToStep(0));
  document.getElementById("btn-overview").addEventListener("click", () => goToStep(currentStep === 0 ? 1 : 0));
  document.getElementById("btn-notes").addEventListener("click", () => notesDrawer.classList.toggle("open"));
  document.getElementById("btn-fullscreen").addEventListener("click", () => {
    if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
    else document.exitFullscreen?.();
  });

  // Clic directo en cualquier frame para enfocarlo (estilo Prezi)
  frames.forEach((f) => {
    f.addEventListener("click", (e) => {
      if (e.target.closest(".interactive-zone, button, input, a")) return;
      const stepIdx = parseInt(f.dataset.step, 10);
      if (Number.isFinite(stepIdx) && stepIdx !== currentStep) goToStep(stepIdx);
    });
  });

  // Subzonas clicables cuando estás en overview o en su frame padre
  document.getElementById("subzone-2a").addEventListener("click", (e) => { e.stopPropagation(); goToStep(2); });
  document.getElementById("subzone-2b").addEventListener("click", (e) => { e.stopPropagation(); goToStep(3); });
  document.getElementById("subzone-3a").addEventListener("click", (e) => { e.stopPropagation(); goToStep(4); });
  document.getElementById("subzone-3b").addEventListener("click", (e) => { e.stopPropagation(); goToStep(5); });

  // Panning libre con arrastre en el fondo + zoom suave con rueda fuera de la zona interactiva
  let dragging = false;
  let dragStart = { x: 0, y: 0, cx: 0, cy: 0 };

  viewport.addEventListener("mousedown", (e) => {
    if (e.target.closest(".interactive-zone, button, input, .hud-top-left, .hud-top-right, .hud-dock, .notes-drawer")) return;
    dragging = true;
    viewport.classList.add("is-dragging");
    dragStart = { x: e.clientX, y: e.clientY, cx: camState.cx, cy: camState.cy };
  });

  window.addEventListener("mousemove", (e) => {
    if (!dragging) return;
    const dx = (e.clientX - dragStart.x) / camState.scale;
    const dy = (e.clientY - dragStart.y) / camState.scale;
    const rad = (camState.rot * Math.PI) / 180;
    const wdx = dx * Math.cos(rad) - dy * Math.sin(rad);
    const wdy = dx * Math.sin(rad) + dy * Math.cos(rad);
    applyCamera(dragStart.cx - wdx, dragStart.cy - wdy, camState.scale, camState.rot, false);
  });

  window.addEventListener("mouseup", () => {
    dragging = false;
    viewport.classList.remove("is-dragging");
  });

  viewport.addEventListener("wheel", (e) => {
    if (e.target.closest(".lab-modal")) return;
    e.preventDefault();
    const factor = e.deltaY < 0 ? 1.12 : 0.89;
    const nextScale = Math.max(0.10, Math.min(2.2, camState.scale * factor));
    applyCamera(camState.cx, camState.cy, nextScale, camState.rot, false);
  }, { passive: false });

  // Atajos de teclado
  window.addEventListener("keydown", (e) => {
    if (e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA") return;
    if (e.key === "ArrowRight" || e.key === " " || e.key === "PageDown") {
      e.preventDefault();
      goToStep(currentStep + 1);
    } else if (e.key === "ArrowLeft" || e.key === "PageUp") {
      e.preventDefault();
      goToStep(currentStep - 1);
    } else if (e.key.toLowerCase() === "o" || e.key === "Escape") {
      const openModal = document.querySelector(".lab-modal.open");
      if (openModal) {
        openModal.classList.remove("open");
      } else {
        goToStep(0);
      }
    } else if (e.key.toLowerCase() === "n") {
      notesDrawer.classList.toggle("open");
    } else if (e.key.toLowerCase() === "f") {
      if (!document.fullscreenElement) document.documentElement.requestFullscreen?.();
      else document.exitFullscreen?.();
    } else if (e.key.toLowerCase() === "r") {
      resetTimer();
    } else if (["1", "2", "3", "4", "5", "6"].includes(e.key)) {
      const map = { "1": 1, "2": 2, "3": 4, "4": 6, "5": 7, "6": 8 };
      goToStep(map[e.key]);
    }
  });

  window.addEventListener("resize", () => goToStep(currentStep, false));

  /* ==================== 3. LABORATORIO JS (FRAME 4) ==================== */
  const TEMPS = [307.85, 332.45, 356.95, 381.55, 406.25];
  const PRESSURES = [14.92, 19.95, 24.95, 29.97, 35.00, 40.03]; // ascendente para slider

  let selectedTemp = 307.85;
  let selectedPressIdx = 5; // 40.03 MPa por defecto (donde más diverge PR)
  let hiddenMode = false;
  let activeChart = "reg-ir";
  let scenario = buildScenario(null);

  const isoButtonsEl = document.getElementById("iso-buttons");
  const pressButtonsEl = document.getElementById("press-buttons");
  const pressSlider = document.getElementById("press-slider");
  const btnHiddenIso = document.getElementById("btn-hidden-iso");

  // Render buttons
  TEMPS.forEach((T) => {
    const b = document.createElement("button");
    b.className = "pill-btn orange-active";
    b.textContent = `${T} K`;
    b.dataset.temp = String(T);
    b.addEventListener("click", () => {
      selectedTemp = T;
      if (hiddenMode) scenario = buildScenario(selectedTemp);
      renderLab();
    });
    isoButtonsEl.appendChild(b);
  });

  PRESSURES.forEach((P, idx) => {
    const b = document.createElement("button");
    b.className = "pill-btn";
    b.textContent = P.toFixed(2);
    b.dataset.pidx = String(idx);
    b.addEventListener("click", () => {
      selectedPressIdx = idx;
      pressSlider.value = String(idx);
      renderLab();
    });
    pressButtonsEl.appendChild(b);
  });

  pressSlider.addEventListener("input", () => {
    selectedPressIdx = parseInt(pressSlider.value, 10);
    renderLab();
  });

  btnHiddenIso.addEventListener("click", () => {
    hiddenMode = !hiddenMode;
    btnHiddenIso.classList.toggle("toggle-on", hiddenMode);
    btnHiddenIso.textContent = `Isoterma Oculta: ${hiddenMode ? "ON" : "OFF"}`;
    scenario = buildScenario(hiddenMode ? selectedTemp : null);
    renderLab();
  });

  document.querySelectorAll(".tab-btn").forEach((tab) => {
    tab.addEventListener("click", () => {
      activeChart = tab.dataset.chart;
      document.querySelectorAll(".tab-btn").forEach((t) => t.classList.toggle("active", t === tab));
      renderLabChart();
    });
  });

  // Modales Código, Composición y Notas Críticas
  const modalCode = document.getElementById("modal-code");
  const modalComp = document.getElementById("modal-comp");
  const modalCritique = document.getElementById("modal-critique");
  document.getElementById("code-snippet-box").textContent = IR_SOLVER_SNIPPET;

  // Poblar tabla de composición Tabla 1
  const compTable = document.getElementById("comp-table-body");
  compTable.innerHTML = `
    <thead>
      <tr>
        <th>Componente</th><th>% Molar (Tabla 1)</th><th>Tc [K]</th><th>Pc [MPa]</th><th>Factor acéntrico ω</th>
      </tr>
    </thead>
    <tbody>
      ${components
        .map(
          (c) => `<tr style="${c.molePct === 0 ? "opacity:0.45;" : ""}">
            <td><strong>${c.name}</strong></td>
            <td>${c.molePct.toFixed(2)}%</td>
            <td>${c.Tc.toFixed(3)}</td>
            <td>${c.Pc.toFixed(4)}</td>
            <td>${c.omega.toFixed(5)}</td>
          </tr>`
        )
        .join("")}
    </tbody>
  `;

  function toggleLabModal(targetModal) {
    [modalCode, modalComp, modalCritique].forEach((m) => {
      if (m === targetModal) m.classList.toggle("open");
      else m.classList.remove("open");
    });
  }

  document.getElementById("btn-code").addEventListener("click", () => toggleLabModal(modalCode));
  document.getElementById("btn-comp").addEventListener("click", () => toggleLabModal(modalComp));
  document.getElementById("btn-critique").addEventListener("click", () => toggleLabModal(modalCritique));
  document.querySelectorAll("[data-close-modal]").forEach((b) => {
    b.addEventListener("click", () => {
      document.getElementById(b.dataset.closeModal).classList.remove("open");
    });
  });

  function formatErr(err) {
    if (err === null || !Number.isFinite(err)) return { text: "Sin raíz física en fase gas", cls: "high" };
    const abs = Math.abs(err);
    const sign = err >= 0 ? "+" : "−";
    const cls = abs < 0.6 ? "low" : abs < 2.5 ? "mid" : "high";
    return { text: `Error vs Exp: ${sign}${abs.toFixed(2)}%`, cls };
  }

  function renderLab() {
    // Active pills
    [...isoButtonsEl.children].forEach((b) => b.classList.toggle("active", parseFloat(b.dataset.temp) === selectedTemp));
    [...pressButtonsEl.children].forEach((b) => b.classList.toggle("active", parseInt(b.dataset.pidx, 10) === selectedPressIdx));

    const P = PRESSURES[selectedPressIdx];
    const pt = scenario.points.find((d) => Math.abs(d.T - selectedTemp) < 1e-3 && Math.abs(d.P - P) < 1e-2);
    if (!pt) return;

    document.getElementById("lab-state-tag").textContent = `T = ${pt.T.toFixed(2)} K · P = ${pt.P.toFixed(2)} MPa`;
    document.getElementById("val-rho-exp").textContent = pt.rhoExp.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    document.getElementById("val-z-exp").textContent = pt.Zexp.toFixed(4);

    // IR Card
    document.getElementById("tag-ir-mode").textContent = hiddenMode ? "Oculta (24 pts)" : "En vivo";
    document.getElementById("val-ir").textContent = `${pt.rhoIR.toFixed(1)} mol/m³`;
    const eIR = formatErr(pt.errIR);
    const errIrEl = document.getElementById("err-ir");
    errIrEl.textContent = eIR.text;
    errIrEl.className = `mc-err ${eIR.cls}`;
    document.getElementById("sub-ir").textContent = `Paper: ${pt.rhoIR_paper.toFixed(1)}`;

    // GERG Card
    document.getElementById("val-gerg").textContent = `${pt.rhoGERG_paper.toFixed(1)} mol/m³`;
    const eGerg = formatErr(pt.errGERG);
    const errGergEl = document.getElementById("err-gerg");
    errGergEl.textContent = eGerg.text;
    errGergEl.className = `mc-err ${eGerg.cls}`;

    // PR Card
    document.getElementById("val-pr").textContent = `${pt.rhoPR.toFixed(1)} mol/m³`;
    const ePR = formatErr(pt.errPR);
    const errPrEl = document.getElementById("err-pr");
    errPrEl.textContent = ePR.text;
    errPrEl.className = `mc-err ${ePR.cls}`;
    document.getElementById("sub-pr").textContent = `Paper: ${pt.rhoPR_paper.toFixed(1)}`;

    // GMA Card
    const valGmaEl = document.getElementById("val-gma");
    const errGmaEl = document.getElementById("err-gma");
    const subGmaEl = document.getElementById("sub-gma");
    if (pt.rhoGMA === null) {
      valGmaEl.textContent = "Sin solución real";
      valGmaEl.classList.add("no-root");
      errGmaEl.textContent = "Recta GMA no corta P–ρ";
      errGmaEl.className = "mc-err high";
      subGmaEl.textContent = "Colapso en fase gas";
    } else {
      valGmaEl.textContent = `${pt.rhoGMA.toFixed(1)} mol/m³`;
      valGmaEl.classList.remove("no-root");
      const eGma = formatErr(pt.errGMA);
      errGmaEl.textContent = eGma.text;
      errGmaEl.className = `mc-err ${eGma.cls}`;
      subGmaEl.textContent = "Lineal en isoterma";
    }

    // AAD Bars
    const m = scenario.metrics;
    document.getElementById("aad-scope-label").textContent = m.scopeLabel;
    const maxAAD = Math.max(10.5, m.gma.aad || 10, m.pr.aad || 6);
    const setBar = (idBar, idVal, val, suffix = "") => {
      document.getElementById(idBar).style.width = `${Math.min(100, (val / maxAAD) * 100)}%`;
      document.getElementById(idVal).textContent = `${val.toFixed(2)}%${suffix}`;
    };
    setBar("bar-ir", "aad-ir", m.ir.aad);
    setBar("bar-gerg", "aad-gerg", m.gergPaper.aad);
    setBar("bar-pr", "aad-pr", m.pr.aad);
    if (m.gma.aad !== null) {
      setBar("bar-gma", "aad-gma", m.gma.aad, "*");
    } else {
      document.getElementById("bar-gma").style.width = "100%";
      document.getElementById("aad-gma").textContent = "Falló";
    }

    document.getElementById("gma-fail-count").textContent = `${m.gmaNoRootCount} / ${m.totalPoints} pts`;
    document.getElementById("aad-footnote").textContent =
      `*Global paper (615 pts): IR ${paperBenchmarks.densityGlobal.ir.aad}% · GERG ${paperBenchmarks.densityGlobal.gerg.aad}% · PR ${paperBenchmarks.densityGlobal.pr.aad}%`;

    // Update coeffs in code modal
    const names = ["A₀", "A₁", "A₂", "B₀", "B₁", "B₂", "C₀", "C₁", "C₂"];
    document.getElementById("modal-coeffs-scope").textContent = m.scopeLabel;
    document.getElementById("modal-coeffs-grid").innerHTML = scenario.irCoeffs
      .map((c, idx) => `<div class="coeff-chip"><strong>${names[idx]}</strong> = ${c.toExponential(5)}</div>`)
      .join("");

    renderLabChart();
  }

  function renderLabChart() {
    const holder = document.getElementById("lab-svg-holder");
    const noteEl = document.getElementById("chart-note");
    const isoPts = scenario.points
      .filter((d) => Math.abs(d.T - selectedTemp) < 1e-3)
      .sort((a, b) => a.P - b.P);
    const activeP = PRESSURES[selectedPressIdx];
    const activePt = isoPts.find((d) => Math.abs(d.P - activeP) < 1e-2);

    const W = 740;
    const H = 335;
    const pad = { l: 84, r: 24, t: 24, b: 48 };
    const pw = W - pad.l - pad.r;
    const ph = H - pad.t - pad.b;

    const mapX = (x, xMin, xMax) => pad.l + ((x - xMin) / (xMax - xMin)) * pw;
    const mapY = (y, yMin, yMax) => pad.t + ph - ((y - yMin) / (yMax - yMin)) * ph;

    let svgBody = "";

    if (activeChart === "reg-ir") {
      noteEl.textContent = `Fig. 3 · T = ${selectedTemp} K (${hiddenMode ? "predicha" : "ajustada"})`;
      const params = scenario.evalIRParams(selectedTemp);
      const rMin = Math.min(...isoPts.map((d) => d.rhoExp)) * 0.92;
      const rMax = Math.max(...isoPts.map((d) => d.rhoExp)) * 1.04;

      const curve = [];
      for (let i = 0; i <= 80; i++) {
        const r = rMin + (i / 80) * (rMax - rMin);
        const val = params.C + params.B / r + params.A / (r * r);
        curve.push([r, val]);
      }

      const allY = [...isoPts.map((d) => d.regIR_exp), ...curve.map((c) => c[1]), 0];
      const yMin = Math.min(...allY) * 1.08;
      const yMax = Math.max(...allY, 0.2e-12);

      // Grid & ticks
      for (let i = 0; i <= 4; i++) {
        const yv = yMin + (i / 4) * (yMax - yMin);
        const yp = mapY(yv, yMin, yMax);
        svgBody += `<line x1="${pad.l}" y1="${yp}" x2="${W - pad.r}" y2="${yp}" stroke="#E2E8F0" stroke-width="1" />`;
        svgBody += `<text x="${pad.l - 8}" y="${yp + 4}" text-anchor="end" fill="#475569" font-family="JetBrains Mono, monospace" font-size="10.5">${yv.toExponential(1)}</text>`;
      }
      for (let i = 0; i <= 4; i++) {
        const xv = rMin + (i / 4) * (rMax - rMin);
        const xp = mapX(xv, rMin, rMax);
        svgBody += `<line x1="${xp}" y1="${pad.t}" x2="${xp}" y2="${H - pad.b}" stroke="#E2E8F0" stroke-width="1" />`;
        svgBody += `<text x="${xp}" y="${H - pad.b + 16}" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="10.5">${Math.round(xv)}</text>`;
      }

      const pathD = curve
        .map(([r, v], idx) => `${idx === 0 ? "M" : "L"}${mapX(r, rMin, rMax).toFixed(1)},${mapY(v, yMin, yMax).toFixed(1)}`)
        .join(" ");
      svgBody += `<path d="${pathD}" fill="none" stroke="#E07B39" stroke-width="3" />`;

      isoPts.forEach((d) => {
        const cx = mapX(d.rhoExp, rMin, rMax);
        const cy = mapY(d.regIR_exp, yMin, yMax);
        const isSel = d === activePt;
        if (isSel) {
          svgBody += `<circle cx="${cx}" cy="${cy}" r="11" fill="#FFF4EC" stroke="#E07B39" stroke-width="2.5" />`;
        }
        svgBody += `<circle cx="${cx}" cy="${cy}" r="5" fill="#14284B" stroke="#FFFFFF" stroke-width="1.5" />`;
      });

      // Legend & Axis labels
      svgBody += `<text x="${pad.l + pw / 2}" y="${H - 8}" text-anchor="middle" fill="#14284B" font-family="Inter, sans-serif" font-size="12.5" font-weight="700">Densidad molar ρ (mol/m³)</text>`;
      svgBody += `<text x="18" y="${pad.t + ph / 2}" text-anchor="middle" transform="rotate(-90 18 ${pad.t + ph / 2})" fill="#14284B" font-family="Inter, sans-serif" font-size="12.5" font-weight="700">(Z − 1)ν³  [m⁹/mol³]</text>`;
      svgBody += `<g transform="translate(${W - 220}, ${pad.t + 8})">
        <rect width="190" height="44" rx="5" fill="#FFF" stroke="#CBD5E1" />
        <line x1="10" y1="15" x2="32" y2="15" stroke="#E07B39" stroke-width="3" /><text x="38" y="19" font-size="11.5" fill="#111827" font-weight="700">Curva IR EOS</text>
        <circle cx="21" cy="31" r="4.5" fill="#14284B" /><text x="38" y="35" font-size="11.5" fill="#111827">Exp. Tabla 4</text>
      </g>`;
    } else if (activeChart === "reg-gma") {
      noteEl.textContent = `Fig. 1 · Falla lineal GMA (T = ${selectedTemp} K)`;
      const gma = scenario.gmaByTemp[selectedTemp];
      const rMin = Math.min(...isoPts.map((d) => d.rhoExp)) * 0.92;
      const rMax = Math.max(...isoPts.map((d) => d.rhoExp)) * 1.04;

      const line = [
        [rMin, gma.alpha + gma.beta * rMin],
        [rMax, gma.alpha + gma.beta * rMax],
      ];
      const allY = [...isoPts.map((d) => d.regGMA_exp), line[0][1], line[1][1], 0];
      const yMin = Math.min(...allY) * 1.15;
      const yMax = Math.max(...allY) * 1.10;

      for (let i = 0; i <= 4; i++) {
        const yv = yMin + (i / 4) * (yMax - yMin);
        const yp = mapY(yv, yMin, yMax);
        svgBody += `<line x1="${pad.l}" y1="${yp}" x2="${W - pad.r}" y2="${yp}" stroke="#E2E8F0" stroke-width="1" />`;
        svgBody += `<text x="${pad.l - 8}" y="${yp + 4}" text-anchor="end" fill="#475569" font-family="JetBrains Mono, monospace" font-size="10.5">${yv.toExponential(1)}</text>`;
      }
      for (let i = 0; i <= 4; i++) {
        const xv = rMin + (i / 4) * (rMax - rMin);
        const xp = mapX(xv, rMin, rMax);
        svgBody += `<line x1="${xp}" y1="${pad.t}" x2="${xp}" y2="${H - pad.b}" stroke="#E2E8F0" stroke-width="1" />`;
        svgBody += `<text x="${xp}" y="${H - pad.b + 16}" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="10.5">${Math.round(xv)}</text>`;
      }

      svgBody += `<line x1="${mapX(line[0][0], rMin, rMax)}" y1="${mapY(line[0][1], yMin, yMax)}" x2="${mapX(line[1][0], rMin, rMax)}" y2="${mapY(line[1][1], yMin, yMax)}" stroke="#B91C1C" stroke-width="2.8" stroke-dasharray="7 5" />`;

      isoPts.forEach((d) => {
        const cx = mapX(d.rhoExp, rMin, rMax);
        const cy = mapY(d.regGMA_exp, yMin, yMax);
        if (d === activePt) svgBody += `<circle cx="${cx}" cy="${cy}" r="11" fill="#FEF2F2" stroke="#B91C1C" stroke-width="2" />`;
        svgBody += `<circle cx="${cx}" cy="${cy}" r="5" fill="#14284B" stroke="#FFFFFF" stroke-width="1.5" />`;
      });

      svgBody += `<text x="${pad.l + pw / 2}" y="${H - 8}" text-anchor="middle" fill="#14284B" font-family="Inter, sans-serif" font-size="12.5" font-weight="700">Densidad molar ρ (mol/m³)</text>`;
      svgBody += `<text x="18" y="${pad.t + ph / 2}" text-anchor="middle" transform="rotate(-90 18 ${pad.t + ph / 2})" fill="#14284B" font-family="Inter, sans-serif" font-size="12.5" font-weight="700">(2Z − 1)ν³  [m⁹/mol³]</text>`;
      svgBody += `<g transform="translate(${W - 235}, ${pad.t + 8})">
        <rect width="205" height="44" rx="5" fill="#FFF" stroke="#CBD5E1" />
        <line x1="10" y1="15" x2="32" y2="15" stroke="#B91C1C" stroke-width="2.5" stroke-dasharray="5 3" /><text x="38" y="19" font-size="11.5" fill="#B91C1C" font-weight="700">Ajuste lineal GMA</text>
        <circle cx="21" cy="31" r="4.5" fill="#14284B" /><text x="38" y="35" font-size="11.5" fill="#111827">Curva real (Exp.)</text>
      </g>`;
    } else {
      noteEl.textContent = `ρ vs P · T = ${selectedTemp} K (4 modelos)`;
      const pMin = 13.5;
      const pMax = 41.5;
      const allRho = isoPts.flatMap((d) => [d.rhoExp, d.rhoIR, d.rhoPR, d.rhoGERG_paper, d.rhoGMA].filter((v) => v !== null));
      const yMin = Math.min(...allRho) * 0.90;
      const yMax = Math.max(...allRho) * 1.05;

      for (let i = 0; i <= 4; i++) {
        const yv = yMin + (i / 4) * (yMax - yMin);
        const yp = mapY(yv, yMin, yMax);
        svgBody += `<line x1="${pad.l}" y1="${yp}" x2="${W - pad.r}" y2="${yp}" stroke="#E2E8F0" stroke-width="1" />`;
        svgBody += `<text x="${pad.l - 8}" y="${yp + 4}" text-anchor="end" fill="#475569" font-family="JetBrains Mono, monospace" font-size="10.5">${Math.round(yv)}</text>`;
      }
      PRESSURES.forEach((pv) => {
        const xp = mapX(pv, pMin, pMax);
        svgBody += `<line x1="${xp}" y1="${pad.t}" x2="${xp}" y2="${H - pad.b}" stroke="#E2E8F0" stroke-width="1" />`;
        svgBody += `<text x="${xp}" y="${H - pad.b + 16}" text-anchor="middle" fill="#475569" font-family="JetBrains Mono, monospace" font-size="10.5">${pv.toFixed(1)}</text>`;
      });

      // Vertical marker at active pressure
      const actX = mapX(activeP, pMin, pMax);
      svgBody += `<line x1="${actX}" y1="${pad.t}" x2="${actX}" y2="${H - pad.b}" stroke="#E07B39" stroke-width="1.8" stroke-dasharray="4 3" opacity="0.7" />`;

      // PR smooth curve
      const prPts = [];
      const irPts = [];
      for (let i = 0; i <= 50; i++) {
        const pv = 14.92 + (i / 50) * (40.03 - 14.92);
        prPts.push(`${i === 0 ? "M" : "L"}${mapX(pv, pMin, pMax).toFixed(1)},${mapY(scenario.solvePengRobinson(selectedTemp, pv), yMin, yMax).toFixed(1)}`);
        irPts.push(`${i === 0 ? "M" : "L"}${mapX(pv, pMin, pMax).toFixed(1)},${mapY(scenario.solveIRDensity(selectedTemp, pv), yMin, yMax).toFixed(1)}`);
      }
      svgBody += `<path d="${prPts.join(" ")}" fill="none" stroke="#6B7280" stroke-width="2.5" />`;
      const gergPath = isoPts.map((d, i) => `${i === 0 ? "M" : "L"}${mapX(d.P, pMin, pMax).toFixed(1)},${mapY(d.rhoGERG_paper, yMin, yMax).toFixed(1)}`).join(" ");
      svgBody += `<path d="${gergPath}" fill="none" stroke="#14284B" stroke-width="2" stroke-dasharray="6 4" />`;
      svgBody += `<path d="${irPts.join(" ")}" fill="none" stroke="#E07B39" stroke-width="3" />`;

      isoPts.forEach((d) => {
        const cx = mapX(d.P, pMin, pMax);
        svgBody += `<circle cx="${cx}" cy="${mapY(d.rhoExp, yMin, yMax)}" r="4.5" fill="#14284B" stroke="#FFF" stroke-width="1.2" />`;
        if (d.rhoGMA !== null) {
          const gy = mapY(d.rhoGMA, yMin, yMax);
          svgBody += `<path d="M${cx - 4},${gy - 4} L${cx + 4},${gy + 4} M${cx + 4},${gy - 4} L${cx - 4},${gy + 4}" stroke="#B91C1C" stroke-width="2" />`;
        }
      });

      svgBody += `<text x="${pad.l + pw / 2}" y="${H - 8}" text-anchor="middle" fill="#14284B" font-family="Inter, sans-serif" font-size="12.5" font-weight="700">Presión P (MPa)</text>`;
      svgBody += `<text x="18" y="${pad.t + ph / 2}" text-anchor="middle" transform="rotate(-90 18 ${pad.t + ph / 2})" fill="#14284B" font-family="Inter, sans-serif" font-size="12.5" font-weight="700">Densidad ρ (mol/m³)</text>`;
      svgBody += `<g transform="translate(${pad.l + 12}, ${pad.t + 6})">
        <rect width="175" height="82" rx="5" fill="#FFF" fill-opacity="0.94" stroke="#CBD5E1" />
        <line x1="10" y1="16" x2="30" y2="16" stroke="#E07B39" stroke-width="3" /><text x="36" y="20" font-size="11" fill="#111827" font-weight="700">IR EOS</text>
        <line x1="10" y1="33" x2="30" y2="33" stroke="#14284B" stroke-width="2" stroke-dasharray="5 3" /><text x="36" y="37" font-size="11" fill="#111827">GERG-2008 (Tabla 4)</text>
        <line x1="10" y1="50" x2="30" y2="50" stroke="#6B7280" stroke-width="2.5" /><text x="36" y="54" font-size="11" fill="#111827">PR EOS (en vivo)</text>
        <circle cx="20" cy="68" r="4" fill="#14284B" /><text x="36" y="72" font-size="11" fill="#111827">Exp. · ✕ GMA válido</text>
      </g>`;
    }

    // Axes frame
    const axes = `<line x1="${pad.l}" y1="${H - pad.b}" x2="${W - pad.r}" y2="${H - pad.b}" stroke="#14284B" stroke-width="2" />
                  <line x1="${pad.l}" y1="${pad.t}" x2="${pad.l}" y2="${H - pad.b}" stroke="#14284B" stroke-width="2" />`;

    holder.innerHTML = `<svg viewBox="0 0 ${W} ${H}" width="100%" height="100%" style="max-height:330px;">${svgBody}${axes}</svg>`;
  }

  /* ==================== 4. ARRANQUE ==================== */
  document.addEventListener("DOMContentLoaded", () => {
    if (window.renderMathInElement) {
      window.renderMathInElement(document.body, {
        delimiters: [
          { left: "$$", right: "$$", display: true },
          { left: "$", right: "$", display: false },
        ],
        throwOnError: false,
      });
    }
    renderLab();
    renderTimer();
    const params = new URLSearchParams(window.location.search);
    const initialStep = parseInt(params.get("step") || "0", 10);
    if (params.get("hidden") === "1") {
      btnHiddenIso.click();
    }
    const chartParam = params.get("chart");
    if (chartParam && ["reg-ir", "reg-gma", "iso-pr"].includes(chartParam)) {
      activeChart = chartParam;
      document.querySelectorAll(".tab-btn").forEach((t) => t.classList.toggle("active", t.dataset.chart === chartParam));
      renderLabChart();
    }
    if (params.get("modal") === "code") modalCode.classList.add("open");
    if (params.get("modal") === "critique") modalCritique.classList.add("open");
    if (params.get("notes") === "1") notesDrawer.classList.add("open");
    goToStep(Number.isFinite(initialStep) ? initialStep : 0, false);
  });
})();
