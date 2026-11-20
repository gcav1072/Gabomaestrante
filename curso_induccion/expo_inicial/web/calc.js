/**
 * Motor de cálculo termodinámico en vivo (JavaScript puro):
 *  - IR EOS: Ajuste QR de 9 constantes globales (Ecs. 12-14) + Newton-Raphson (Ec. 11)
 *  - Peng-Robinson (1976): Reglas de mezcla VdW (k_ij = 0) + raíz cúbica analítica
 *  - GMA EOS: Ajuste lineal de (2Z-1)v³ vs ρ por isoterma + búsqueda de raíz
 *  - GERG-2008: Referencia reportada por los autores en Tabla 4
 */

(function (global) {
  "use strict";

  const { R, components, table4 } = global.IR_DATA;

  /** Mínimos cuadrados lineales mediante factorización QR de Householder con escalado de columnas. */
  function solveLeastSquaresQR(matrix, rhs) {
    const m = matrix.length;
    const n = matrix[0].length;
    const scales = new Array(n).fill(0);
    for (let j = 0; j < n; j++) {
      let maxAbs = 0;
      for (let i = 0; i < m; i++) {
        const a = Math.abs(matrix[i][j]);
        if (a > maxAbs) maxAbs = a;
      }
      scales[j] = maxAbs > 0 ? maxAbs : 1;
    }

    const A = matrix.map((row) => row.map((v, j) => v / scales[j]));
    const b = rhs.slice();

    for (let k = 0; k < n; k++) {
      let normSq = 0;
      for (let i = k; i < m; i++) normSq += A[i][k] * A[i][k];
      const norm = Math.sqrt(normSq);
      if (norm === 0) continue;

      const alpha = A[k][k] >= 0 ? -norm : norm;
      const v0 = A[k][k] - alpha;
      const v = new Array(m - k);
      v[0] = 1;
      for (let i = k + 1; i < m; i++) v[i - k] = A[i][k] / v0;

      let vNormSq = 0;
      for (let i = 0; i < v.length; i++) vNormSq += v[i] * v[i];
      const beta = 2 / vNormSq;

      A[k][k] = alpha;
      for (let j = k + 1; j < n; j++) {
        let dot = 0;
        for (let i = k; i < m; i++) dot += v[i - k] * A[i][j];
        for (let i = k; i < m; i++) A[i][j] -= beta * dot * v[i - k];
      }

      let dotB = 0;
      for (let i = k; i < m; i++) dotB += v[i - k] * b[i];
      for (let i = k; i < m; i++) b[i] -= beta * dotB * v[i - k];
    }

    const x = new Array(n).fill(0);
    for (let i = n - 1; i >= 0; i--) {
      let sum = b[i];
      for (let j = i + 1; j < n; j++) sum -= A[i][j] * x[j];
      x[i] = sum / A[i][i];
    }
    return x.map((v, j) => v / scales[j]);
  }

  /** Ajusta las 9 constantes globales [A0, A1, A2, B0, B1, B2, C0, C1, C2] del IR EOS. */
  function fitIRGlobal(points) {
    const M = [];
    const y = [];
    for (const pt of points) {
      const P = pt.P * 1e6;
      const T = pt.T;
      const r = pt.rhoExp;
      const Z = P / (r * R * T);
      const tTerms = [1, -1 / (R * T), Math.log(T) / R];
      const row = [];
      for (const deg of [1, 2, 3]) {
        const rk = Math.pow(r, deg);
        for (const tf of tTerms) row.push(tf * rk);
      }
      M.push(row);
      y.push(Z - 1);
    }
    return solveLeastSquaresQR(M, y);
  }

  /** Evalúa A(T), B(T), C(T) según Ecs. (12)-(14). */
  function evalIRParams(T, coeffs) {
    const invRT = 1 / (R * T);
    const lnTR = Math.log(T) / R;
    return {
      A: coeffs[0] - coeffs[1] * invRT + coeffs[2] * lnTR,
      B: coeffs[3] - coeffs[4] * invRT + coeffs[5] * lnTR,
      C: coeffs[6] - coeffs[7] * invRT + coeffs[8] * lnTR,
    };
  }

  /** Resuelve densidad ρ [mol/m³] con Ec. (11) por Newton-Raphson amortiguado. */
  function solveIRDensity(T, P_MPa, coeffs) {
    const { A, B, C } = evalIRParams(T, coeffs);
    const target = (P_MPa * 1e6) / (R * T);
    let rho = target;
    for (let iter = 0; iter < 50; iter++) {
      const r2 = rho * rho;
      const f = C * r2 * r2 + B * r2 * rho + A * r2 + rho - target;
      const df = 4 * C * r2 * rho + 3 * B * r2 + 2 * A * rho + 1;
      const step = f / df;
      rho = Math.max(1.0, rho - step);
      if (Math.abs(step) < 1e-9 * rho) break;
    }
    return rho;
  }

  /** Ajusta GMA original lineal por isoterma: (2Z - 1)v³ = α(T) + β(T)ρ. */
  function fitGMAIsotherm(isoPoints) {
    const M = [];
    const y = [];
    for (const pt of isoPoints) {
      const P = pt.P * 1e6;
      const r = pt.rhoExp;
      const Z = P / (r * R * pt.T);
      M.push([1, r]);
      y.push((2 * Z - 1) / (r * r * r));
    }
    const [alpha, beta] = solveLeastSquaresQR(M, y);
    return { alpha, beta };
  }

  /** Busca raíz física de GMA en fase gas; devuelve null si la recta lineal no corta la curva P-ρ. */
  function solveGMADensity(T, P_MPa, gma, rhoRef) {
    const P = P_MPa * 1e6;
    const g = (r) => {
      const Z = P / (r * R * T);
      return (2 * Z - 1) / (r * r * r) - (gma.alpha + gma.beta * r);
    };

    const rMin = Math.max(500, 0.35 * (P / (R * T)));
    const rMax = 22000;
    const steps = 600;
    const dr = (rMax - rMin) / steps;
    const roots = [];

    let rPrev = rMin;
    let gPrev = g(rPrev);
    for (let i = 1; i <= steps; i++) {
      const rCurr = rMin + i * dr;
      const gCurr = g(rCurr);
      if (gPrev === 0) roots.push(rPrev);
      else if (gPrev * gCurr < 0) {
        let lo = rPrev;
        let hi = rCurr;
        let fLo = gPrev;
        for (let k = 0; k < 48; k++) {
          const mid = 0.5 * (lo + hi);
          const fMid = g(mid);
          if (fLo * fMid <= 0) hi = mid;
          else {
            lo = mid;
            fLo = fMid;
          }
        }
        roots.push(0.5 * (lo + hi));
      }
      rPrev = rCurr;
      gPrev = gCurr;
    }

    if (roots.length === 0) return null;
    if (roots.length === 1) return roots[0];
    // Si hay múltiples cruces en la cuártica de GMA, tomar la raíz más próxima a la rama física
    const ref = rhoRef || P / (R * T);
    return roots.reduce((best, r) => (Math.abs(r - ref) < Math.abs(best - ref) ? r : best), roots[0]);
  }

  /** Resuelve Peng-Robinson (1976) analíticamente para mezcla multicomponente (k_ij = 0). */
  function solvePengRobinson(T, P_MPa, comps = components) {
    const active = comps.filter((c) => c.molePct > 0);
    const totalPct = active.reduce((s, c) => s + c.molePct, 0);
    const P = P_MPa * 1e6;

    const a = [];
    const b = [];
    const x = [];
    for (const c of active) {
      const Pc = c.Pc * 1e6;
      const m = 0.37464 + 1.54226 * c.omega - 0.26992 * c.omega * c.omega;
      const alpha = Math.pow(1 + m * (1 - Math.sqrt(T / c.Tc)), 2);
      a.push(((0.45724 * R * R * c.Tc * c.Tc) / Pc) * alpha);
      b.push((0.07780 * R * c.Tc) / Pc);
      x.push(c.molePct / totalPct);
    }

    let am = 0;
    let bm = 0;
    for (let i = 0; i < active.length; i++) {
      bm += x[i] * b[i];
      for (let j = 0; j < active.length; j++) {
        am += x[i] * x[j] * Math.sqrt(a[i] * a[j]);
      }
    }

    const A = (am * P) / (R * T * R * T);
    const B = (bm * P) / (R * T);

    // Z³ + c2 Z² + c1 Z + c0 = 0
    const c2 = -(1 - B);
    const c1 = A - 3 * B * B - 2 * B;
    const c0 = -(A * B - B * B - B * B * B);

    const p = c1 - (c2 * c2) / 3;
    const q = (2 * c2 * c2 * c2) / 27 - (c1 * c2) / 3 + c0;
    const disc = (q * q) / 4 + (p * p * p) / 27;

    let Z;
    if (disc >= 0) {
      const sqrtD = Math.sqrt(disc);
      const u = Math.cbrt(-q / 2 + sqrtD);
      const v = Math.cbrt(-q / 2 - sqrtD);
      Z = u + v - c2 / 3;
    } else {
      const r = Math.sqrt((-p * p * p) / 27);
      const phi = Math.acos(Math.max(-1, Math.min(1, -q / (2 * r))));
      const t = 2 * Math.cbrt(r);
      const roots = [
        t * Math.cos(phi / 3) - c2 / 3,
        t * Math.cos((phi + 2 * Math.PI) / 3) - c2 / 3,
        t * Math.cos((phi + 4 * Math.PI) / 3) - c2 / 3,
      ].filter((z) => z > B);
      Z = Math.max(...roots);
    }

    return { rho: P / (Z * R * T), Z };
  }

  /** Calcula AAD % y RMSE [mol/m³] dado un arreglo de pares [pred, exp]. */
  function calcStats(pairs) {
    const valid = pairs.filter(([pred]) => pred !== null && Number.isFinite(pred));
    if (valid.length === 0) return { aad: null, rmse: null, count: 0 };
    let sumRel = 0;
    let sumSq = 0;
    for (const [pred, exp] of valid) {
      sumRel += (Math.abs(pred - exp) / exp) * 100;
      const diff = pred - exp;
      sumSq += diff * diff;
    }
    return {
      aad: sumRel / valid.length,
      rmse: Math.sqrt(sumSq / valid.length),
      count: valid.length,
    };
  }

  /** Construye el escenario completo (30 puntos o modo Isoterma Oculta). */
  function buildScenario(hiddenIsotherm = null) {
    const trainPoints = hiddenIsotherm
      ? table4.filter((pt) => Math.abs(pt.T - hiddenIsotherm) > 1e-3)
      : table4;

    const irCoeffs = fitIRGlobal(trainPoints);

    // Ajuste GMA por cada isoterma
    const temps = [...new Set(table4.map((pt) => pt.T))];
    const gmaByTemp = {};
    for (const T of temps) {
      gmaByTemp[T] = fitGMAIsotherm(table4.filter((pt) => pt.T === T));
    }

    const evaluated = table4.map((pt) => {
      const P = pt.P * 1e6;
      const Zexp = P / (pt.rhoExp * R * pt.T);
      const rhoIR = solveIRDensity(pt.T, pt.P, irCoeffs);
      const pr = solvePengRobinson(pt.T, pt.P);
      const rhoGMA = solveGMADensity(pt.T, pt.P, gmaByTemp[pt.T], pt.rhoExp);

      const err = (pred) => (pred === null ? null : ((pred - pt.rhoExp) / pt.rhoExp) * 100);
      return {
        ...pt,
        Zexp,
        regIR_exp: (Zexp - 1) / Math.pow(pt.rhoExp, 3),
        regGMA_exp: (2 * Zexp - 1) / Math.pow(pt.rhoExp, 3),
        rhoIR,
        rhoPR: pr.rho,
        rhoGMA,
        errIR: err(rhoIR),
        errIR_paper: err(pt.rhoIR_paper),
        errPR: err(pr.rho),
        errPR_paper: err(pt.rhoPR_paper),
        errGERG: err(pt.rhoGERG_paper),
        errGMA: err(rhoGMA),
      };
    });

    const targetSet = hiddenIsotherm
      ? evaluated.filter((pt) => Math.abs(pt.T - hiddenIsotherm) < 1e-3)
      : evaluated;

    const metrics = {
      scopeLabel: hiddenIsotherm ? `Isoterma oculta ${hiddenIsotherm} K (6 pts)` : "30 puntos Tabla 4",
      ir: calcStats(targetSet.map((d) => [d.rhoIR, d.rhoExp])),
      irPaper: calcStats(targetSet.map((d) => [d.rhoIR_paper, d.rhoExp])),
      gergPaper: calcStats(targetSet.map((d) => [d.rhoGERG_paper, d.rhoExp])),
      pr: calcStats(targetSet.map((d) => [d.rhoPR, d.rhoExp])),
      prPaper: calcStats(targetSet.map((d) => [d.rhoPR_paper, d.rhoExp])),
      gma: calcStats(targetSet.map((d) => [d.rhoGMA, d.rhoExp])),
      gmaNoRootCount: targetSet.filter((d) => d.rhoGMA === null).length,
      totalPoints: targetSet.length,
    };

    return {
      temps,
      irCoeffs,
      gmaByTemp,
      points: evaluated,
      metrics,
      evalIRParams: (T) => evalIRParams(T, irCoeffs),
      solveIRDensity: (T, P) => solveIRDensity(T, P, irCoeffs),
      solvePengRobinson: (T, P) => solvePengRobinson(T, P).rho,
      solveGMADensity: (T, P, ref) => solveGMADensity(T, P, gmaByTemp[T], ref),
    };
  }

  // Fragmento legible del solver para mostrar en el botón "Ver código JS"
  const IR_SOLVER_SNIPPET = `// 1. Ajuste QR lineal (Ecs. 12-14): Z - 1 = A(T)ρ + B(T)ρ² + C(T)ρ³
const coeffs = fitIRGlobal(trainPoints); // [A0,A1,A2, B0,B1,B2, C0,C1,C2]

// 2. Evaluación térmica y Newton-Raphson sobre Ec. (11)
function solveIRDensity(T, P_MPa, c) {
  const A = c[0] - c[1]/(R*T) + c[2]*Math.log(T)/R;
  const B = c[3] - c[4]/(R*T) + c[5]*Math.log(T)/R;
  const C = c[6] - c[7]/(R*T) + c[8]*Math.log(T)/R;
  const target = (P_MPa * 1e6) / (R * T);
  let rho = target; // inicio desde gas ideal
  for (let i = 0; i < 50; i++) {
    const f  = C*rho**4 + B*rho**3 + A*rho**2 + rho - target;
    const df = 4*C*rho**3 + 3*B*rho**2 + 2*A*rho + 1;
    const step = f / df;
    rho = Math.max(1.0, rho - step);
    if (Math.abs(step) < 1e-9 * rho) break;
  }
  return rho; // mol/m³
}`;

  global.IR_CALC = {
    buildScenario,
    IR_SOLVER_SNIPPET,
  };
})(window);
