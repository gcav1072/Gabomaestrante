/**
 * Datos verificados del artículo:
 * Moradian, M., Ghader, S., & Ghareghashi, A. (2024).
 * "Enhanced GMA-Based IR EOS for Natural Gas and LNG Thermophysical Properties"
 * Chemical Process Design, Vol. 3, No. 1, pp. 57-74.
 * DOI: 10.22111/cpd.2024.50157.1043
 */

window.IR_DATA = {
  meta: {
    title: "Enhanced GMA-Based IR EOS for Natural Gas and LNG Thermophysical Properties",
    shortTitle: "Nuevo Modelo IR EOS para Gas Natural y LNG",
    authors: "Mojtaba Moradian¹, Sattar Ghader¹, Abbas Ghareghashi²*",
    affiliations: "¹Shahid Bahonar Univ. of Kerman · ²Velayat Univ., Iranshahr, Irán",
    journal: "Chemical Process Design, Vol. 3, No. 1 (2024), pp. 57–74",
    doi: "10.22111/cpd.2024.50157.1043",
    presenters: "Ing. Ruben Barrios · Ing. Gabriel Astudillo",
    program: "M.Sc. Ingeniería de Gas · Universidad de Oriente · Cohorte 9-A",
  },

  // Constante universal de los gases [J / (mol·K)]
  R: 8.314462618,

  // Composición molar (%) de N. gas 11 (Tabla 1, ref. [31] Barreau et al., 1996)
  // Propiedades críticas estándar (Tc [K], Pc [MPa], omega [-], M [g/mol])
  mixtureName: "N. gas 11 (Barreau et al., 1996)",
  components: [
    { key: "C1",  name: "Metano (CH₄)",     molePct: 89.57, Tc: 190.564, Pc: 4.5992, omega: 0.01142, mw: 16.043 },
    { key: "C2",  name: "Etano (C₂H₆)",     molePct: 8.35,  Tc: 305.320, Pc: 4.8722, omega: 0.09950, mw: 30.070 },
    { key: "C3",  name: "Propano (C₃H₈)",   molePct: 1.20,  Tc: 369.890, Pc: 4.2512, omega: 0.15210, mw: 44.096 },
    { key: "iC4", name: "i-Butano (i-C₄)",  molePct: 0.15,  Tc: 407.810, Pc: 3.6290, omega: 0.18400, mw: 58.122 },
    { key: "nC4", name: "n-Butano (n-C₄)",  molePct: 0.23,  Tc: 425.125, Pc: 3.7960, omega: 0.20100, mw: 58.122 },
    { key: "iC5", name: "i-Pentano (i-C₅)", molePct: 0.01,  Tc: 460.350, Pc: 3.3780, omega: 0.22740, mw: 72.149 },
    { key: "nC5", name: "n-Pentano (n-C₅)", molePct: 0.00,  Tc: 469.700, Pc: 3.3700, omega: 0.25100, mw: 72.149 },
    { key: "N2",  name: "Nitrógeno (N₂)",   molePct: 0.50,  Tc: 126.192, Pc: 3.3958, omega: 0.03720, mw: 28.014 },
    { key: "CO2", name: "CO₂",              molePct: 0.00,  Tc: 304.128, Pc: 7.3773, omega: 0.22394, mw: 44.010 },
  ],

  // Tabla 4 completa: 5 isotermas x 6 presiones = 30 puntos experimentales [mol/m³]
  table4: [
    // T = 307.85 K
    { T: 307.85, P: 40.03, rhoExp: 14914.12, rhoIR_paper: 15003.78, rhoPR_paper: 16061.0, rhoGERG_paper: 15120.78 },
    { T: 307.85, P: 35.00, rhoExp: 14087.12, rhoIR_paper: 14048.12, rhoPR_paper: 14931.0, rhoGERG_paper: 14198.78 },
    { T: 307.85, P: 29.97, rhoExp: 12939.44, rhoIR_paper: 12899.01, rhoPR_paper: 13588.0, rhoGERG_paper: 13066.28 },
    { T: 307.85, P: 24.95, rhoExp: 11482.35, rhoIR_paper: 11466.23, rhoPR_paper: 11961.0, rhoGERG_paper: 11631.01 },
    { T: 307.85, P: 19.95, rhoExp: 9586.443, rhoIR_paper: 9612.807, rhoPR_paper: 9967.1,  rhoGERG_paper: 9768.98  },
    { T: 307.85, P: 14.92, rhoExp: 7206.710, rhoIR_paper: 7204.718, rhoPR_paper: 7523.5,  rhoGERG_paper: 7373.66  },

    // T = 332.45 K
    { T: 332.45, P: 40.03, rhoExp: 13642.67, rhoIR_paper: 13724.55, rhoPR_paper: 14598.0, rhoGERG_paper: 13846.98 },
    { T: 332.45, P: 35.00, rhoExp: 12759.42, rhoIR_paper: 12711.44, rhoPR_paper: 13436.0, rhoGERG_paper: 12862.04 },
    { T: 332.45, P: 29.97, rhoExp: 11538.61, rhoIR_paper: 11506.95, rhoPR_paper: 12082.0, rhoGERG_paper: 11674.73 },
    { T: 332.45, P: 24.95, rhoExp: 10059.01, rhoIR_paper: 10046.63, rhoPR_paper: 10493.0, rhoGERG_paper: 10222.55 },
    { T: 332.45, P: 19.95, rhoExp: 8253.118, rhoIR_paper: 8269.082, rhoPR_paper: 8632.3,  rhoGERG_paper: 8449.57  },
    { T: 332.45, P: 14.92, rhoExp: 6171.554, rhoIR_paper: 6170.508, rhoPR_paper: 6482.2,  rhoGERG_paper: 6343.56  },

    // T = 356.95 K
    { T: 356.95, P: 40.03, rhoExp: 12556.89, rhoIR_paper: 12587.10, rhoPR_paper: 13344.0, rhoGERG_paper: 12726.22 },
    { T: 356.95, P: 35.00, rhoExp: 11594.87, rhoIR_paper: 11574.69, rhoPR_paper: 12186.0, rhoGERG_paper: 11715.62 },
    { T: 356.95, P: 29.97, rhoExp: 10385.31, rhoIR_paper: 10378.24, rhoPR_paper: 10863.0, rhoGERG_paper: 10525.02 },
    { T: 356.95, P: 24.95, rhoExp: 8961.974, rhoIR_paper: 8955.011, rhoPR_paper: 9353.8,  rhoGERG_paper: 9118.39  },
    { T: 356.95, P: 19.95, rhoExp: 7285.472, rhoIR_paper: 7290.581, rhoPR_paper: 7645.5,  rhoGERG_paper: 7478.21  },
    { T: 356.95, P: 14.92, rhoExp: 5428.942, rhoIR_paper: 5428.419, rhoPR_paper: 5738.8,  rhoGERG_paper: 5616.63  },

    // T = 381.55 K
    { T: 381.55, P: 40.03, rhoExp: 11566.74, rhoIR_paper: 11572.46, rhoPR_paper: 12268.0, rhoGERG_paper: 11746.47 },
    { T: 381.55, P: 35.00, rhoExp: 10615.97, rhoIR_paper: 10594.38, rhoPR_paper: 11137.0, rhoGERG_paper: 10737.88 },
    { T: 381.55, P: 29.97, rhoExp: 9434.546, rhoIR_paper: 9443.704, rhoPR_paper: 9868.1,  rhoGERG_paper: 9575.48  },
    { T: 381.55, P: 24.95, rhoExp: 8084.342, rhoIR_paper: 8093.824, rhoPR_paper: 8450.6,  rhoGERG_paper: 8240.81  },
    { T: 381.55, P: 19.95, rhoExp: 6559.738, rhoIR_paper: 6555.474, rhoPR_paper: 6884.4,  rhoGERG_paper: 6733.41  },
    { T: 381.55, P: 14.92, rhoExp: 4883.235, rhoIR_paper: 4883.524, rhoPR_paper: 5173.2,  rhoGERG_paper: 5067.03  },

    // T = 406.25 K
    { T: 406.25, P: 40.03, rhoExp: 10700.36, rhoIR_paper: 10705.67, rhoPR_paper: 11347.0, rhoGERG_paper: 10895.62 },
    { T: 406.25, P: 35.00, rhoExp: 9760.845, rhoIR_paper: 9755.758, rhoPR_paper: 10254.0, rhoGERG_paper: 9906.69  },
    { T: 406.25, P: 29.97, rhoExp: 8646.927, rhoIR_paper: 8650.611, rhoPR_paper: 9046.9,  rhoGERG_paper: 8788.26  },
    { T: 406.25, P: 24.95, rhoExp: 7381.111, rhoIR_paper: 7378.787, rhoPR_paper: 7720.3,  rhoGERG_paper: 7531.89  },
    { T: 406.25, P: 19.95, rhoExp: 5963.398, rhoIR_paper: 5964.384, rhoPR_paper: 6278.9,  rhoGERG_paper: 6143.53  },
    { T: 406.25, P: 14.92, rhoExp: 4455.671, rhoIR_paper: 4455.670, rhoPR_paper: 4725.1,  rhoGERG_paper: 4632.95  },
  ],

  // Resumen global reportado en Tablas 2, 3 y 5
  paperBenchmarks: {
    densityGlobal: {
      points: 615,
      range: "225–450 K · 0.6–190 MPa (12 Gas Nat. + 2 LNG)",
      ir: { aad: 0.397, rmse: 1.23 },
      gerg: { aad: 2.36, rmse: 3.12 },
      pr: { aad: 6.316, rmse: 7.45 },
    },
    cpGlobal: {
      points: 79,
      range: "305–410 K · 15–40 MPa (N. gas 11, 12 y LNG 1)",
      ir: { aad: 1.95, rmse: 2.65 },
      gerg: { aad: 2.02, rmse: 3.01 },
      pr: { aad: 5.51, rmse: 5.87 },
    },
  },
};
