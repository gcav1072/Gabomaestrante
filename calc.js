/**
 * Procesamiento directo de los datos publicados en la Tabla 4 del artículo
 * (sin simulaciones propias):
 *  - Calcula factor de compresibilidad Z y variables de regularidad (Z-1)v³ y (2Z-1)v³
 *    directamente desde ρ_exp y ρ_IR_paper reportados en la Tabla 4.
 *  - Calcula desviación porcentual puntual y AAD % de IR EOS, GERG-2008 y PR EOS
 *    sobre los valores publicados en la Tabla 4.
 *  - Calcula la recta de referencia lineal GMA (Fig. 1) para ilustrar visualmente
 *    su incapacidad de seguir la curvatura experimental en fase gas.
 */

(function (global) {
  "use strict";

  const { R, table4 } = global.IR_DATA;

  /** Regresión lineal simple y = alpha + beta * x para ilustrar la recta GMA (Fig. 1). */
  function fitLinearLine(points) {
    const n = points.length;
    let sx = 0;
    let sy = 0;
    let sxx = 0;
    let sxy = 0;
    for (const [x, y] of points) {
      sx += x;
      sy += y;
      sxx += x * x;
      sxy += x * y;
    }
    const denom = n * sxx - sx * sx;
    const beta = denom !== 0 ? (n * sxy - sx * sy) / denom : 0;
    const alpha = (sy - beta * sx) / n;
    return { alpha, beta };
  }

  /** Calcula AAD % y RMSE [mol/m³] dado un arreglo de pares [reportado, exp]. */
  function calcStats(pairs) {
    const valid = pairs.filter(([val]) => val !== null && Number.isFinite(val));
    if (valid.length === 0) return { aad: null, rmse: null, count: 0 };
    let sumRel = 0;
    let sumSq = 0;
    for (const [val, exp] of valid) {
      sumRel += (Math.abs(val - exp) / exp) * 100;
      const diff = val - exp;
      sumSq += diff * diff;
    }
    return {
      aad: sumRel / valid.length,
      rmse: Math.sqrt(sumSq / valid.length),
      count: valid.length,
    };
  }

  /** Construye las métricas y series directamente desde los datos publicados en la Tabla 4. */
  function buildPaperDataset() {
    const temps = [...new Set(table4.map((pt) => pt.T))];

    const points = table4.map((pt) => {
      const P = pt.P * 1e6;
      const Zexp = P / (pt.rhoExp * R * pt.T);
      const Zir = P / (pt.rhoIR_paper * R * pt.T);
      const err = (val) => ((val - pt.rhoExp) / pt.rhoExp) * 100;

      return {
        ...pt,
        Zexp,
        regIR_exp: (Zexp - 1) / Math.pow(pt.rhoExp, 3),
        regIR_paper: (Zir - 1) / Math.pow(pt.rhoIR_paper, 3),
        regGMA_exp: (2 * Zexp - 1) / Math.pow(pt.rhoExp, 3),
        errIR: err(pt.rhoIR_paper),
        errPR: err(pt.rhoPR_paper),
        errGERG: err(pt.rhoGERG_paper),
      };
    });

    const gmaLineByTemp = {};
    for (const T of temps) {
      const iso = points.filter((p) => p.T === T);
      gmaLineByTemp[T] = fitLinearLine(iso.map((p) => [p.rhoExp, p.regGMA_exp]));
    }

    const metrics = {
      scopeLabel: "30 puntos Tabla 4",
      ir: calcStats(points.map((d) => [d.rhoIR_paper, d.rhoExp])),
      gerg: calcStats(points.map((d) => [d.rhoGERG_paper, d.rhoExp])),
      pr: calcStats(points.map((d) => [d.rhoPR_paper, d.rhoExp])),
      totalPoints: points.length,
    };

    return {
      temps,
      points,
      gmaLineByTemp,
      metrics,
    };
  }

  global.IR_CALC = {
    buildPaperDataset,
  };
})(window);
