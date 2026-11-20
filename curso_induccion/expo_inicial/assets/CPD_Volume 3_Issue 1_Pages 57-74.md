<u>Chemical Process Design Vol.3 No.1 (2024) 57-74</u> 



<!-- Start of picture text -->
*<br>University of Sistan<br>and Baluchestan<br><!-- End of picture text -->

# Chemical Process Design 

Available online at http://cpd.usb.ac.ir/ 



<!-- Start of picture text -->
=<br>ICIPiD igs<br><!-- End of picture text -->



<!-- Start of picture text -->
oe | Sf ikeilt<br>— 8<br>jks<br><!-- End of picture text -->



## Enhanced GMA-Based IR EOS for Natural Gas and LNG Thermophysical Properties Mojtaba Moradian<sup>1</sup> , Sattar Ghader<sup>1</sup> , Abbas Ghareghashi<sup>2*</sup> 

1Department of Chemical Engineering, College of Engineering, Shahid Bahonar University of Kerman, Kerman, Iran 

2Department of Chemical Engineering, Engineering Faculty, Velayat University, Iranshahr, Iran 

### ARTICLE INFO 

### ABSTRACT 

**_Article history:_** 

_Received: 2024-03-03 Received in revised form: 2024-05-11 Accepted: 2024-06-21 Published online: 2024-06-23_ 

**_Keywords:_** _Natural gas; LNG, density; Isotherm regularity; High pressure; Heat capacity_ 

**_DOI:_** _10.22111/cpd.2024.50157.1043_ 

The main concern of this paper is to improve the GMA equation of state (EOS), which has been used for the accurate density and thermophysical property calculations for natural gas and LNG. In other words, as the GMA equation of state cannot calculate accurately the density of components in the gas region it is modified in a new form. This new form is capable of calculating the densities of substances in liquid and gaseous state. The GMA equation of state is based on intermolecular potential energy, therefore, the potential energy of the GMA equation of state is corrected and a modified equation of state is obtained which can calculate thermophysical properties in gas as well as liquid regions. The final form of the new equation of state is a regularity between (𝑍−1)𝜈<sup>�</sup> and _ρ_ at all temperatures, which is obtained by (9, 6, 3) Lennard-Jones potential. Natural gas density, heat capacity, and second viral coefficient are calculated by a new equation of state which is named the isotherm regularity equation of state (IR EOS). The capability of the new equation of state is examined by comparing its results with experimental data, PR EOS, and GERG EOS from low to high pressures. The new equation of state gives excellent results for calculating the density of natural gas and LNG while it reproduces other thermophysical properties with lower accuracy. 

#### **1. Introduction** 

Natural gas plays a central role in the global energy landscape due to its use in electricity generation, heating, and various industrial applications. As the energy sector transitions to cleaner sources, LNG has gained importance due to its lower carbon emissions relative to traditional fuels. The increasing demand for LNG has led to the need for accurate thermodynamic models that can predict the behavior of natural gas mixtures under a variety of conditions, especially across the wide temperature and pressure ranges encountered in production, transportation, and storage. 

Corresponding author. Tel.: +989111779704 

E-mail address: ghareghashi.abbas@gmail.com (A. Ghareghashi). 

_58                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

The precise prediction of thermophysical properties such as density, phase equilibria, and compressibility is crucial for process efficiency and safety [1]. To achieve this, robust equations of state (EOS) are required to model the behavior of natural gas and LNG mixtures, especially in cryogenic conditions, where inadequate control can lead to solid formation, equipment malfunction, or safety risks. 

#### _1.1. Limitations of existing EOS models_ 

Equations of state (EOS) have long been used to model the thermodynamic properties of gases and liquids. The Peng-Robinson (PR) and Soave-Redlich-Kwong (SRK) cubic equations of state are widely used in the natural gas industry for predicting phase behavior due to their balance of simplicity and accuracy [2, 3]. These cubic EOS models are effective for predicting phase equilibria in hydrocarbon systems where methane and other light hydrocarbons dominate. However, these models face significant challenges when applied to more complex mixtures, particularly those containing heavier hydrocarbons, carbon dioxide, or hydrogen, and when used under extreme pressure and temperature conditions. 

The accuracy of cubic EOS models like PR and SRK can degrade when applied to mixtures that deviate from ideal behavior, such as those containing non-hydrocarbons. These models typically rely on binary interaction parameters to address deviations, but their performance can still be limited under high-pressure conditions or in systems with significant impurities [1]. This is particularly problematic in LNG applications, where accurate predictions are essential for preventing operational issues like equipment malfunction or phase separation failures. The need for more advanced models has led to the development of new approaches that can better account for molecular-level interactions in such complex mixtures. Corrected Proofs 

#### _1.2. Recent advances in EOS modeling_ 

One of the most significant advances in EOS modeling has been the introduction of the GERG-2008 EOS. This model was designed to predict the thermophysical properties of multi-component natural gas mixtures, especially those encountered in LNG production and transportation. GERG-2008 is based on the Helmholtz free energy and is capable of describing the behavior of gas mixtures over a wide range of temperatures and pressures [4]. The model is particularly well-suited for mixtures containing light hydrocarbons, such as methane, ethane, and propane, as well as non-hydrocarbon gases like nitrogen and carbon dioxide [5]. 

Despite its high accuracy, GERG-2008 is computationally demanding due to the complexity of its formulation. GERG-2008’s accuracy hinges on high-quality experimental binary interaction data, limiting its applicability in scenarios with real-time processing needs. This complexity limits its practical use in real-time process simulations, where speed is critical. Furthermore, GERG-2008’s reliance on Helmholtz free energy can limit its ability to predict certain transport properties, such as heat transfer and fluid dynamics, which are essential for optimizing LNG operations [6]. 

An alternative to cubic EOS models is the Statistical Associating Fluid Theory (SAFT) family of equations, particularly the PC-SAFT (Perturbed Chain-SAFT) model, which has gained popularity for its ability to handle complex fluids and mixtures [7]. PC-SAFT models often provide higher accuracy than cubic EOS models, particularly for mixtures with non-hydrocarbon components [6]. In recent studies, PC-SAFT has been used to model the properties of binary mixtures and has proven effective in predicting azeotropic properties [8] and 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     59_ 

solubilities of natural gas components in ionic liquids [9]. However, like GERG-2008, PC-SAFT is computationally intensive and requires accurate parameterization for each component in the mixture. 

Additionally, recent studies have explored the use of PC-SAFT for modeling hydrogen-rich mixtures, which is becoming increasingly important as hydrogen is integrated into the energy mix. Alanazi et al. [6] compared the performance of cubic, PC-SAFT, and GERG-2008 EOS for hydrogen-blend mixtures and found that PC-SAFT provided superior accuracy in predicting thermophysical properties, though at the cost of increased computational demands. Mao et al. [10] further evaluated the performance of SAFT-type models, including PC-SAFT, for both associating and non-associating fluids, demonstrating the versatility of these models in handling complex mixtures. Despite their accuracy, the computational requirements of SAFT-type models, particularly in industrial applications where speed is essential, remain a barrier to widespread adoption. 

#### _1.3. Addressing the Joule-Thomson effect in cryogenic applications_ 

In cryogenic processes, such as those involved in LNG production, the Joule-Thomson effect plays a crucial role in determining the behavior of gas mixtures during cooling and liquefaction. The accurate prediction of the JouleThomson coefficient (JTC) and inversion curves (JTIC) is essential for designing efficient refrigeration cycles and preventing phase separation issues [11]. Traditional cubic EOS models like PR and SRK offer limited accuracy in predicting JTC and JTIC, particularly for mixtures containing hydrogen or other non-hydrocarbon components [6]. Recent advancements in SAFT-type models have improved the accuracy of JTC and JTIC predictions for both pure and complex gas mixtures. For example, Mao et al. [10] demonstrated that SAFT models could accurately predict Corrected Proofs the thermodynamic properties of both non-associating and associating fluids, which is critical for handling mixtures encountered in LNG processes. However, these models still require significant computational resources, making them less practical for real-time applications. 

Moreover, modifications to the SAFT framework, such as incorporating the two-state theory, have been explored to enhance the predictive accuracy for specific properties, such as the anomalous behavior of water [12]. These innovations show promise for improving the modeling of thermophysical properties in hydrogen-rich and cryogenic systems, though further refinement is needed to balance accuracy and computational efficiency [13]. 

#### _1.4. The need for improved EOS models for natural gas and LNG_ 

While models like PC-SAFT and GERG-2008 have advanced the field of EOS modeling, significant challenges remain in developing equations that are both accurate and computationally efficient. The increasing focus on decarbonization and the shift towards hydrogen-rich energy sources have created a demand for models that can handle complex mixtures under a wide range of operating conditions [6]. In particular, models that can predict the behavior of gas mixtures containing hydrogen, carbon dioxide, and other non-hydrocarbon components are needed to support the transition to cleaner energy sources. 

At the same time, there is a need for models that can provide accurate predictions of transport properties, such as viscosity and thermal conductivity, which are critical for optimizing the design and operation of LNG facilities. The GMA equation of state (GMA EOS), originally developed for predicting liquid densities, has shown potential for adaptation to gas systems, but its application has been limited by its inability to account for gas-phase behavior 

_60                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

[14]. Modifying the GMA EOS to improve its accuracy for gas-phase predictions, while maintaining its computational efficiency, could provide a valuable tool for the LNG industry. 

#### _1.5. Objective of the study_ 

This study proposes a modified version of the GMA EOS, referred to as the isotherm regularity equation of state (IR EOS), which aims to improve the accuracy of thermophysical property predictions for natural gas and LNG. By introducing temperature-dependent coefficients and modifying the potential energy terms, the IR EOS addresses the limitations of the original GMA EOS in predicting gas-phase properties. The performance of the modified IR EOS is validated against experimental data and compared with established EOS models such as PR, GERG-2008, and PC-SAFT. The goal is to develop a model that provides accurate predictions across a wide range of temperatures and pressures while maintaining computational efficiency for real-time process simulations. 

#### **2. Theories (EOS details)** 

The GMA EOS [15-20] assumes: 

(2 _Z_  1)  3  _A T_ ( )  _B_ ( _T_ ) 



which shows a linear relation should exist between (2𝑍−1)𝜈<sup>�</sup> and 𝜌 for the component in concern for all isotherms where A(T) and B(T) are temperature-dependent parameters reflecting molecular interactions. The Goharshadi-Morsali-Abbaspour (GMA) equation of state (EOS) primarily excels at liquid phase density predictions due to its underlying assumption that intermolecular interactions in liquids result in a predictable linearity between Corrected Proofs (2𝑍−1)𝜈<sup>�</sup> and density (𝜌) across temperatures. However, when applied to gases, the linear relationship does not hold. Gases, unlike liquids, exhibit low density and weak intermolecular forces, causing significant deviations from ideal gas behavior, especially under varying pressures and temperatures. Consequently, the GMA EOS oversimplifies the gas-phase behavior and leads to inaccuracies, particularly in predicting gas density and other thermodynamic properties at high pressures [16-21]. 

In support of this modification, experimental comparisons were performed. For example, when the GMA EOS was tested against natural gas and LNG data, it failed to represent the nonlinear behavior of (𝑍−1)𝜈<sup>�</sup> against 𝜌, especially in low-density regions, as illustrated in Figs 1 and 2. This discrepancy indicates the necessity of EOS modifications for accurately capturing gas-phase behavior. 

To address this limitation, the IR EOS introduces a modified potential energy expression using a temperaturedependent Lennard-Jones potential with three terms �<sup>𝑐�</sup> �𝑟<sup>�</sup> −<sup>𝑐�</sup> �𝑟<sup>�</sup> −<sup>𝑐�</sup> �𝑟<sup>�</sup> � to capture both the dispersion and repulsion interactions more accurately. This modification, by introducing temperature-dependent Lennard-Jones potential terms, allows the IR EOS to more accurately model gas interactions across varying pressures and temperatures [15-20]. 



where the first and second terms of Eq. (2) are called the thermal and internal pressures ( _Pi_ ). The IR EOS is derived from a modified Lennard-Jones (9, 6, 3) potential that includes temperature-dependent terms to account for both dispersion and effective interactions between molecules. Beginning from the Lennard-Jones potential, with terms proportional to 𝑟<sup>��</sup> , 𝑟<sup>��</sup> , and 𝑟<sup>��</sup> we introduce a potential energy form given by: 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     61_ 



Here, the 𝑟<sup>��</sup> term captures effective interactions that the (9, 6) Lennard-Jones potential does not fully model, particularly in non-ideal gas behavior. Assuming 𝑟= 𝜈<sup>�/�</sup> , substituting, and differentiating as per standard thermodynamic relations yield an expression: 



which, when integrated, results in: 

This expression describes a regular relationship between compressibility, specific volume, and density across different states, enabling the IR EOS to accurately model natural gas and LNG densities. Exact thermodynamic relation 

can be written as: 



Therefore, 



which implies a regularity should exist between (Z−1)𝜈<sup>�</sup> and ρ in the form given by Eq. (10) at each temperature. For this reason, we name the new EOS the isotherm regularity equation of state (IR EOS). 

The perspective we will adopt is that there is an equation (Eq. (10)) twhat can be correlated to the experimental data, and if a good fit is obtained the IR EOS can be used for density calculation. Eq. (10) can be written in the form of ρ for density calculation which is: 





(14) 

_62                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 



where 𝐴� to 𝐴�, 𝐵� to 𝐵� and 𝐶� to 𝐶� are constants. To use the equation of state for natural gas and LNG, the _A, B,_ and _C parameters_ must be known. To find these parameters, we may plot (𝑍 − 1)𝜈<sup>�</sup> against _ρ_ for different isotherms. The slope and intercept of the straight lines can be fitted to Eqs. (12), (13), and (14) from which 𝐴� to 𝐴�, 𝐵� to 𝐵� and 𝐶� to 𝐶� can be found, respectively. 

In the derivation of IR EOS (2𝑍−1)𝜈<sup>�</sup> was changed to (𝑍−1)𝜈<sup>�</sup> because it was observed in the calculations that the factor 2 is unnecessary and even it can give inaccurate results in natural gas and LNG. 

In order to calculate isobaric heat capacity �𝐶�� of natural gas we write: 







Ideal gas: 





On the other hand, we have the rule: 



The result is: 



Finally: 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     63_ 



Virial equation is as follows: 



𝐵 is the second virial coefficient. If rewritten Eq. (25): 



The GERG-2008 equation [16] and the equations of Peng–Robinson [2], allow for calculations of thermodynamic properties of natural gas. To validate the accuracy of these thermodynamic models the calculated values for properties which are of relevance for industrial purposes are compared. 

The Peng and Robinson EOS [2] is one of the most popular and widely used cubic EOS. The original one was Corrected Proofs based on hydrocarbons with a carbon number ( _N_ c) less than 10; i.e., for species with higher carbon numbers, the equation may be less accurate. 

Characteristic pure-component parameters of this EOS are the critical temperature ( _T_ c) and pressure ( _P_ c) and the acentric factor ( _T_ ). 

#### _3.2. GERG 2008_ 

The GERG-2008 by Kunz and Wagner and Kunz et al. [16], [17] is an equation of state that describes mixtures of arbitrary composition consisting of up to 21 molecular compounds. It covers the gas and liquid phase as well as the super-critical region and the vapor–liquid equilibrium with the highest accuracy available. The equation of state is under consideration to be adopted as an ISO Standard (ISO 20765-2 and ISO 20765-3) for natural gases. 

_64                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

The natural gas reference equation is explicit in the reduced Helmholtz energy, 𝛼 = 𝐴/(𝑅𝑇). The equation was developed based on a multi-fluid approximation: 



In a multi-fluid approximation, the reduced Helmholtz energy α is the sum of three different parts, the ideal gas part, 𝛼<sup>�</sup> , the contribution of the pure fluid equations, ∑𝑥� 𝛼�,�� (𝛿, 𝜏) , and the departure function, ΣΣΔ𝛼��� (𝛿, 𝜏, 𝑋) . The residual parts 𝛼�,�� of the pure fluids _i_ are taken at the reduced density δ and at the inverse reduced temperature τ of the mixture. The variables are defined as: 

ρ: density 

_T_ : temperature 

_X_ : vector of composition in natural gas 

δ: reduced density (= ρ _/_ 𝜌�(𝑋 _)_ ) 

τ: reduced temperature (= 𝑇� _(X)_ / _T)_ ) 

_xi_ : mole fraction of component _i_ 

_k_ : number of components 

𝜌� _(X)_ and 𝑇� _(X)_ are reducing functions which depend only on composition. 



Each reducing function contains two adjusted parameters 𝑘�,�� _,_ 𝛽�,�� and 𝑘�,�� _,_ 𝛽�,�� _,_ respectively. These binary parameters were fitted to data for binary mixtures. If their values are set to 1, their influence disappears and only the combining rules determine the reducing values of the respective mixture. For the pure fluid _i_ the reducing functions are equal to the critical density 𝜌�,� and the critical temperature 𝑇�,� of the fluid. 

The entire range of validity is divided into three parts: normal range of validity, extended range of validity, and extrapolation to temperatures and pressures beyond the extended range of validity. The normal range of validity covers temperatures of 90K ≤ _T_ ≤ 450K and pressures of 𝑝≤35MPa. The extended range of validity covers temperatures of 60K ≤ _T_ ≤ 700K and pressures of _p_ ≤ 70MPa. 

#### **4. Results and discussion** 

GMA EOS gives a good prediction for liquids at low and high pressures. Nevertheless, GMA EOS cannot be used for the calculation of gas density because a linear relation was not observed in this case. Experimental data of natural gas and LNG were used and a linear relation between (2𝑍−1)𝜈<sup>�</sup> and ρ at different temperatures was not observed (Figs.1 and 2). 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     65_ 



<!-- Start of picture text -->
5E-10<br>45E10 | »<br>4E-10<br>a 3.5E-10<br>A  1=270k<br>a 3E-10<br>a<br>—  25e10 @ 1=340K<br>2 26-10 .<br>SN isero } @\_ SEARO<br>1E-10 Se<br>SE-11 ies<br>5 : aps e<br>o 5000 10000 15000 20000<br>e (mol/m3)<br><!-- End of picture text -->

**Fig. 1.** Comparison of natural gas density experimental data with GMA EOS and IR EOS at pressures ranging from 3.5 MPa to 35 MPa [22] 



<!-- Start of picture text -->
1.4E-10<br>a<br>1.2E-10<br>@ 1€10<br>°<br>= 8611<br>a<br>B. ees @ 1=374.8K<br>Corrected Proofs<br>BS —_ ——GMA EOS<br>G 4b oS.ia<br>Noon can<br>e —*<br>-2E-25<br>“<br>p(mol/m3)<br><!-- End of picture text -->

**Fig. 2.** Comparison of LNG density experimental data with GMA EOS and IR EOS at pressures from 3.5 MPa to 39 MPa [23] 

In spite of GMA EOS, the IR EOS can fit experimental data in natural gas and LNG at low and high pressures. Figs. 3 and 4 show experimental isotherms of (Z−1)𝜈<sup>�</sup> 3 versus ρ for natural gas and LNG, as well as the fit of (Z−1)𝜈<sup>�</sup> 33 versus ρ to the experimental points. As the figures show, (Z−1)𝜈<sup>�</sup> versus ρ can fit experimental data very well in natural gas and LNG. 

In fact, if a wide enough density range is considered, the isotherm regularity in the form of GMA cannot fit experimental data, especially at low-density regions. The function (Z-1)𝜈<sup>�</sup> 3 versus density has a curvature and it is obvious that GMA EOS cannot describe this behavior. On the other hand, the IR EOS accurately reproduces experimental density data for both natural gas and LNG, showing close agreement with reported values over multiple pressures and temperatures. 

To further validate the versatility of the IR EOS, additional comparisons were performed for the heat capacity, compressibility factor, and speed of sound, with results benchmarked against experimental values and existing 

_66                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

models (PR EOS and GERG EOS). These comparisons reveal that the IR EOS not only excels in density predictions but also provides reliable estimates for other critical thermophysical properties, supporting its application in diverse industrial conditions. 



<!-- Start of picture text -->
°<br>1d ooo 11000 16000<br>“5E12 oa”<br>| @ T=270K<br>2 m 7=290K<br>= -1E-11 4 T=30SK<br>£<br>2-111= | @ 1=340K<br>s I —ir Eos<br>-2E-11<br>-2.5E-11<br>p(mol/m3)<br><!-- End of picture text -->

**Fig. 3.** Fitting isotherms of (Z-1)𝜈<sup>�</sup> 3 vs ρ for natural gas for P=3.5 MPa to 35 MPa [22] 



<!-- Start of picture text -->
‘ ,<br>1 11000 1200013000 4/14<br>-1E-13 Corrected Proofs v<br>d<br>ab<br>:-2E-13 4<br>> 4 @ 1=303.2k<br>=E -3£13 / Av4 A 1=323.2K<br>= Va IR EOS<br>& 4E13 / J<br>-SE-13 /ae>»<br>Aa<br>-6E-13<br>p(mol/m3)<br><!-- End of picture text -->

**Fig. 4.** Fitting isotherms of (Z-1)𝜈<sup>�</sup> 3 vs ρ for LNG for P=3.5 MPa to 39 MPa [23] 

The data in Table 1 include number of natural gases and the mole fraction of components. The isotherm regularity between (Z−1)𝜈<sup>�</sup> 3 versus ρ was correlated for natural gas, LNG, and their density was calculated by Eq. (11) from low to high pressure. The list of these components is given in Table 1. The data in Table 2 include number of natural gases, which were chosen from the available literature. Special attention was given to high-pressure experimental data. The range of temperature and pressure of experimental data, component state, the number of experimental data, and the average absolute deviations (AAD) of the calculated densities for IR EOS, PR EOS, and GERG EOS are also given in these Tables. A complete set of densities calculated by IR EOS is given in supplementary data including A, B, and C coefficients for each component. 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     67_ 

The data in Table 3 include number of natural gases, which were chosen from the available literature. Special attention was given to high-pressure experimental data. The range of temperature and pressure of experimental data, component state, the number of experimental data, and the AAD of the calculated head capacities for IR EOS, PR EOS, and GERG EOS are also given in these Tables. Calculated IR EOS, PR EOS, GERG EOS, and experimental densities of natural gas are shown in Table 4. 

**Table 1.** Composition of natural gas (N. gas) and LNG used in this study <u>(in mole fraction)</u> 

|**Comp.**|**%C1**|**%C2**|**%C3**|**%i-C4**|**%n-C4**|**%i-C5**|**%n-C5**|**%N2**|**%CO2**|**Ref.**|
|---|---|---|---|---|---|---|---|---|---|---|
|N.gas 1|91.00|2.95|1.51|<br>0.75|0.75|0.30|0.30|2.03|<br>0.40|[22]|
|N. gas2|77.75|10.51|5.97|1.79|0.99|0.49|0.49|0.67|0.40|[24]|
|N.gas 3|89.99|3.15|<br>1.58|<br>0.78|0.79|<br>0.15|0.15|1.70|<br>1.71|[25]|
|N. gas4|89.99|3.15|1.58|<br>0.78|0.79|0.15|<br>0.15|1.70|<br>1.71|[26]|
|N.gas 5|100.00|0.00|0.00|<br>0.00|0.00|<br>0.00|<br>0.00|0.00|<br>0.00|[27]|
|N.gas 6|95.04|3.96|1.00|<br>0.00|<br>0.00|<br>0.00|<br>0.00|0.00|<br>0.00|[28]|
|N.gas 7|89.98|3.01|1.51|<br>0.75|<br>0.75|<br>0.30|<br>0.30|1.70|<br>1.70|[29]|
|N.gas 8|81.30|3.29|0.64|<br>0.10|<br>0.10|<br>0.00|<br>0.00|13.57|<br>0.99|[30]|
|N. gas 9|81.20|4.31|0.89|0.15|<br>0.15|<br>0.00|<br>0.00|5.70|<br>7.59|[30]|
|N.gas 10|85.90|8.50|2.30|<br>0.35|<br>0.35|<br>0.05|<br>0.05|1.01|<br>1.50|[30]|
|N. gas11|89.57|8.35|1.20|<br>0.15|<br>0.23|<br>0.01|<br>0.00|0.50|<br>0.00|[31]|
|N.gas 12|88.40|5.17|1.18|<br>0.15|<br>0.23|<br>0.06|<br>0.05|3.19|<br>1.49|[31]|
|LNG 1|76.60|9.77|6.87|0.00|<br>2.62|<br>0.00|<br>2.62|0.00|<br>0.00|[32]|
|LNG 2|20.88|24.31|32.42|<br>0.00|<br>16.17|0.00|<br>2.70|0.53|<br>1.81|[23]|



**Table 2.** Percentage AAD (Average Absolute Deviation) for densities calculated by IR EOS, PR EOS, and GERG EOS models compared to experimental data for natural gas and LNG at 

various temperatures and pressures 

|**Comp.**|**∆T(K)**|**∆P(MPa)**|**State**|𝑵𝒑<sup>𝒂</sup>|Corrected Proofs<br>**IR EOS**<br>%𝑨𝑫𝑫𝑰𝑹𝑬𝑶𝑺<br>𝒃|**PR EOS**<br>%𝑨𝑫𝑫𝑷𝑹𝑬𝑶𝑺<br>𝒃|**GERG 2008**<br>%𝑨𝑫𝑫𝑮𝑬𝑹𝑮𝟐𝟎𝟎𝟖<br>𝒃|**Ref.**|
|---|---|---|---|---|---|---|---|---|
|N.gas 1|270-340|<br>3.5-35|Gas|32|0.36|2.32|0.16|(Patil et al.,2007)|
|N.gas 2|270-340|3.5-35|Gas|24|<br>0.15|6.90|<br>3.49|<br>(Atilhan et al.,2010)|
|N. gas 3|250-450|0.6-38|Gas|58|<br>0.09|1.90|<br>0.09|<br>(McLinden, 2011)|
|N.gas 4|250-450|10-150|<br>Gas|20|<br>0.22|9.70|<br>ERROR|<br>(Atilhan et al.,2011b)|
|N. gas5|300-450|<br>1-190|Gas|76|<br>3.38|7.97|ERROR|(Cristancho et al.,2010)|
|N.gas 6|300-400|<br>5-140|Gas|40|<br>0.66|3.77|<br>0.02|(Cristancho et al.,2011)|
|N.gas 7|250-450|10-150|<br>Gas|49|<br>0.19|3.85|<br>0.16|<br>(Atilhan et al.,2011b)|
|N. gas 8|225-350|3.5-70|Gas|103|0.006|7.12|<br>0.04|<br>(Hwang et al.,1997)|
|N.gas 9|225-350|3.5-70|Gas|103|<br>0.005|7.09|<br>0.10|<br>(Hwanget al.,1997)|
|N. gas10|225-350|3.5-70|Gas|103|<br>0.01|10.72|<br>0.10|<br>(Hwang et al.,1997)|
|N.gas 11|305-410|<br>15-40|<br>Gas|30|<br>0.03|5.27|<br>2.33|(Barreau et al.,1996)|
|N.gas 12|305-410|<br>15-40|<br>Gas|30|<br>0.05|6.82|<br>3.27|(Barreau et al.,1996)|
|LNG 1|305-410|<br>30-40|Liquid|25|0.06|11.04|<br>14.34|<br> (Barreau et al.,1997)|
|LNG 2|300-375|<br>3-38|Liquid|25|<br>0.35|3.96|<br>4.24|<br>(Schmidt et al.,2005)|
|**Average**||||**615**|**0.397**|**6.316**|**2.36**||



> a 𝑵𝒑 =number of experimental points 

> b %𝐴𝐷𝐷� = ∑ ~~�~~ ����������� ~~�~~ × 100 

**Table 3.** Percentage of AAD between 𝐶� calculated by IR EOS, PR EOS, GERG EOS, and experimental data for natural gas and LNG at different temperatures and pressures 

|**Comp.**|**∆T(K)**|**∆P(MPa)**|**State**|𝑵𝒑<sup>𝒂</sup>|**IR EOS**%𝑨𝑫𝑫𝑰𝑹𝑬𝑶𝑺<br>𝒃|**PR EOS**<br>%𝑨𝑫𝑫𝑷𝑹𝑬𝑶𝑺<br>𝒃|**GERG 2008**<br>%𝑨𝑫𝑫𝑮𝑬𝑹𝑮𝟐𝟎𝟎𝟖<br>𝒃|**Ref.**|
|---|---|---|---|---|---|---|---|---|
|N.gas 11|305-410|15-40|<br>Gas|30|1.50|1.05|<br>0.76|(Barreau et al.,1996)|
|N. gas12|305-410|15-40|Gas|24|1.99|1.28|<br>0.51|(Barreau et al.,1996)|
|LNG 1|305-410|30-40|Liquid|25|2.37|14.20|<br>4.79|(Barreau et al.,1997)|
|**Average**||||**79**|**1.95**|**5.51 **|**2.02 **||



[31][31][32]<sup>a</sup> 𝑵𝒑 =number of experimental points b %𝐴𝐷𝐷� = ∑ ~~�~~ �������������× 100 

_68                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

**Table 4.** Calculated densities of natural gas by IR EOS, PR EOS, and GERG EOS models 

|||alongsi<br>|de experimental<br>|data[31]<br>||
|---|---|---|---|---|---|
|||<sup>𝒎𝒐𝒍</sup><br>|<sup>𝒎𝒐𝒍</sup><br>|<sup>𝒎𝒐𝒍</sup><br>|<sup>𝒎𝒐𝒍</sup><br>|
|**∆T(K)**|**P(MPa)**|𝝆𝒆𝒙𝒑(<br>𝒎<sup>𝟑</sup><br>~~)~~|𝝆𝑰𝑹𝑬𝑶𝑺~~(~~<br>𝒎<sup>𝟑</sup><br>~~)~~|𝝆𝑷𝑹𝑬𝑶𝑺~~(~~<br>𝒎<sup>𝟑</sup><br>~~)~~|𝝆𝑮𝑬𝑹𝑮𝟐𝟎𝟎𝟖(<br>𝒎<sup>𝟑</sup><br>~~)~~|
|307.85|40.03|14914.12|15003.78|16061|15120.78|
||35.00|14087.12|14048.12|14931|14198.78|
||29.97|12939.44|12899.01|13588|13066.28|
||24.95|11482.35|11466.23|11961|11631.01|
||19.95|9586.443|9612.807|9967.1|9768.98|
||14.92|7206.710|7204.718|7523.5|7373.66|
|332.45|40.03|13642.67|13724.55|14598|13846.98|
||35.00|12759.42|12711.44|13436|12862.04|
||29.97|11538.61|11506.95|12082|11674.73|
||24.95|10059.01|10046.63|10493|10222.55|
||19.95|8253.118|8269.082|8632.3|8449.57|
||14.92|6171.554|6170.508|6482.2|6343.56|
|356.95|40.03|12556.89|12587.10|13344|12726.22|
||35.00|11594.87|11574.69|12186|11715.62|
||29.97|10385.31|10378.24|10863|10525.02|
||24.95|8961.974|8955.011|9353.8|9118.39|
||19.95|7285.472|7290.581|7645.5|7478.21|
||14.92|5428.942|5428.419|5738.8|5616.63|
|381.55|40.03|11566.74|11572.46|12268|11746.47|
||35.00|10615.97|10594.38|11137|10737.88|
||29.97|9434.546|9443.704|9868.1|9575.48|
||24.95|8084.342|8093.824|8450.6|8240.81|
||19.95|6559.738|6555.474|6884.4|6733.41|
||14.92|4883.235|4883.524|5173.2|5067.03|
|406.25|40.03|10700.36|10705.67|11347|10895.62|
||35.00|9760.845|9755.758|10254|9906.69|
||29.97|8646.927|8650.611|9046.9|8788.26|
||24.95|7381.111|Corrected Proofs<br>7378.787|7720.3|7531.89|
||19.95|5963.398|5964.384|6278.9|6143.53|
||14.92|4455.671|4455.670|4725.1|4632.95|



To ensure the robustness of the IR EOS predictions, we conducted an in-depth error analysis by calculating the Average Absolute Deviation (AAD) and Root Mean Square Error (RMSE) for each thermophysical property. These metrics offer a quantifiable measure of the accuracy and uncertainty associated with the IR EOS predictions. The AAD is a statistical measure of the absolute difference between the predicted and experimental values, averaged across all data points. It provides a straightforward indication of the accuracy of the model. The AAD is calculated as: 



where 𝜌���,� and 𝜌����,� represent the experimental and predicted values, respectively, and 𝑁 is the number of data points. The AAD expresses the error as a percentage, making it a useful way to compare model accuracy across different data sets. The RMSE quantifies the standard deviation of the prediction errors, providing insight into how far the predicted values generally deviate from the actual values. It’s calculated as: 



RMSE is sensitive to larger deviations and therefore highlights larger discrepancies between predicted and experimental data, complementing the AAD by focusing on the magnitude of errors. 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     69_ 

Table 5 and Fig 5 present the AAD and RMSE values for the IR EOS, compared to the PR and GERG models, across all experimental data points, providing a comprehensive comparison. This detailed assessment reveals that the IR EOS not only improves density predictions but also reduces error margins in comparison to established models. 

**Table 5.** Thermophysical Properties Comparison 



<!-- Start of picture text -->
Property Model AAD (%) RMSE Experimental Range<br>Density IR EOS  0.397  1.23  225-450 K, 3.5-150 MPa<br>PR EOS 6.316  7.45<br>GERG  2.36  3.12<br>Heat Capacity (Cp) IR EOS 1.95  2.65  305-410 K, 15-40 MPa<br>PR EOS  5.51  5.87<br>GERG  2.02  3.01<br><!-- End of picture text -->



<!-- Start of picture text -->
7 me IREOS<br>mmm= PREOS:axe<br>6<br>5|<br>34<br>3|<br>2<br>1<br>° EDensity Property Corrected Proofs Heat Capacity (Cp) Nose!<br><!-- End of picture text -->

**Fig. 5.** RMSE comparison of IR EOS, PR, and GERG models for density and Cp 

To confirm the reliability of the IR EOS, the 𝑃𝜌𝑇 relations of natural gas and LNG are calculated and compared to experimental data. Figs 6 and 7 display a detailed comparison of natural gas and LNG densities predicted by the IR EOS versus experimental data, covering a range of pressures. 



<!-- Start of picture text -->
18000<br>e Or ae s<br>FE 10000 oeSP rn aaa IR EOS<br>£= 8000 aoy ioero—_ ® = 7=270KPo<br>6000 Ry oe A T=290K<br>Be te @ = 1=305K<br>40002000 aea¥  1=340K<br>0)<br>o 10 20 30 40<br>P (MPa)<br><!-- End of picture text -->

**Fig. 6.** Comparison of IR EOS density results with experimental data of natural gas [22] 

_70                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

The IR EOS demonstrates close alignment with experimental values across the tested conditions, showcasing its reliability for density prediction. Figs 8 and 9 illustrate the model's predictions for the second virial coefficient and heat capacity, with data points confirming the model’s capability to handle varying thermophysical properties, a significant improvement over the GMA EOS. 

Figs. 10 and 11 present the percentage deviations between experimental and IR EOS-calculated densities for natural gas and LNG, with IR EOS showing minimal deviations across pressure ranges. This accuracy is essential for industrial applications requiring precise density predictions, reinforcing the IR EOS model's robustness in practical settings. 



<!-- Start of picture text -->
14500<br>14000<br>13500<br>13000<br>G* 1250012000 & = T=303.2KT=323.2K<br>41500 sre IREOS<br>11000<br>10500<br>10000<br>oO P20(MPa) Corrected Proofs 40<br><!-- End of picture text -->

**Fig. 7.** Comparison of IR EOS density results with experimental data of LNG [23] 



<!-- Start of picture text -->
0.00€+00<br>-5.00E-06290 250 300 350 400 4§0<br>“200605<br>=<br>Fe -1.50E-05 ”<br>3 -2.00E-05 ener —<br>B 250605 a“ ae<br>3 S.00808 Lee seseeeees IR EOS<br>§ -3.50E-05 ae<br>°  .4.00€-05 25a<br>-4.50E-05 be<br>-5.00E-05 Sa a<br><!-- End of picture text -->

**Fig. 8.** Comparison of IR EOS second virial coefficient results with experimental data of natural gas [27] 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     71_ 



<!-- Start of picture text -->
65<br>- Pea -—<br>Cieey weree ttre UMP<br>e © 1=307.85K<br>_2 50 A 7=332.45K<br>2-* 7=356.95K<br>40<br>= @ 1=356:<br>sseeeees<br>o 35 IREOS<br>30<br>25<br>20<br>14 24 34 44<br>P (MPa)<br><!-- End of picture text -->

**Fig. 9.** Comparison of IR EOS 𝐶� P results with experimental data of natural gas [31] 



<!-- Start of picture text -->
5<br>45<br>4<br>= 35<br>& 3 7=270K<br>g 25 mT=290K<br>a 2 Corrected Proofs<br>& 4 7=305K<br>a. as<br>= @7=340K<br>= 4<br>iJ<br>a os<br>C)<br>CY) 10 20 30 40<br>P(MPa)<br><!-- End of picture text -->

**Fig. 10.** Percentage of deviations between the experimental and IR EOS calculated density of natural gas [24] 



<!-- Start of picture text -->
0.25<br>0.2<br>a3<br>= 015 © 7=307.85K<br>Z 1=356.95K<br>=<br>& O41 A T=381.55K<br>$sé& © T=406.25K<br>P 0.05<br>0<br>29 34 39<br>P(MPa)<br><!-- End of picture text -->

**Fig. 11.** Percentage of deviations between the experimental and IR EOS calculated density of LNG [32] 

_72                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

#### **5. Potential applications and limitations** 

Potential Applications of the IR EOS: The Equation of State (IR EOS) developed in this study, while validated for natural gas and LNG possesses a framework that could extend to other gas systems due to its basis in intermolecular potential energy. This framework is theoretically adaptable to other industrial gases, such as hydrogen-blend gases, carbon dioxide-rich mixtures, and other multi-component gases used in the energy and process industries. This adaptability stems from the temperature-dependent parameters (A, B, and C), which allow the IR EOS to account for different molecular interactions that may characterize other gas mixtures. However, additional empirical data and adjustments would be needed to calibrate the IR EOS for systems with significantly different molecular characteristics. 

Limitations of the IR EOS: The IR EOS may face limitations when applied to gas mixtures with complex molecular compositions, as it is primarily optimized for natural gas and LNG. Specifically, in systems where polar or associating components (e.g., hydrogen or water vapor) dominate, the model’s reliance on the modified LennardJones potential may not fully capture the intermolecular forces, potentially affecting accuracy. Furthermore, due to the reliance on temperature-dependent fitting parameters, additional modifications or empirical adjustments might be required for optimal accuracy in non-hydrocarbon-based gas mixtures. These limitations suggest that while the IR EOS has broad potential applicability, its predictive accuracy could diminish in highly complex or polar gas systems without further model adaptations. 

The practical utility of the IR EOS extends beyond accuracy improvements, presenting advantages for real-world LNG applications where computational efficiency and ease of integration into simulation software are critical. Compared to GERG-2008, which is computationally intenCorrected Proof **s** ive, the IR EOS’s faster computation times enable realtime applications in LNG processing, allowing for efficient large-scale simulations. Additionally, its framework is adaptable and can be integrated with widely used simulation platforms with minimal adjustments, ensuring seamless incorporation into existing LNG software. 

To illustrate the potential impact, consider an LNG processing scenario where accurate phase prediction at cryogenic temperatures is essential to maintain stability. The IR EOS’s enhanced predictive accuracy helps prevent phase separation in LNG processing, optimizing operational efficiency and reducing the risk of equipment failure. Such applications underscore the IR EOS’s relevance for industrial operations, where its unique blend of computational efficiency and accuracy offers tangible benefits for LNG facilities. However, its predictive accuracy may require adjustments for complex or polar mixtures, where the model's current potential energy structure might not fully capture specific molecular interactions. 

#### **6. Conclusion** 

In this study, a modified version of the GMA equation of state (EOS), referred to as the isotherm regularity equation of state (IR EOS), was developed to improve the prediction of thermophysical properties for natural gas and liquefied natural gas (LNG) over a broad range of pressures and temperatures. The original GMA EOS, though effective for liquid density calculations, exhibited limitations in predicting gas-phase properties. To address these shortcomings, the IR EOS introduces modifications to the potential energy terms and incorporates temperaturedependent parameters (A, B, and C), allowing for more accurate predictions in both the gas and liquid phases. 

_A. Ghareghashi et al. / Chemical Process Design, Vol.3, No.1 (2024) 57-74                                                                     73_ 

The results demonstrate that the IR EOS significantly enhances the accuracy of density predictions for natural gas and LNG, with performance on par with well-established models such as the Peng-Robinson (PR) EOS and GERG2008 EOS. The model consistently captures the relationship between (Z-1), volume, and density across varying temperatures, making it a reliable tool for industrial applications requiring precise density calculations. However, the IR EOS shows limited accuracy in predicting other thermophysical properties, including heat capacity and the second virial coefficient, highlighting the need for further refinement. 

#### **7. Future research directions** 

Although the IR EOS presents clear advancements in density predictions, future research should focus on enhancing its predictive capabilities for other thermophysical properties, such as heat capacity, compressibility, and transport properties like viscosity and thermal conductivity. Further development of the IR EOS to account for more complex gas mixtures, particularly those containing hydrogen and carbon dioxide, will also be critical as the energy industry shifts towards decarbonization and hydrogen-based technologies. 

Additionally, refining the fitting of temperature-dependent parameters (A, B, and C) using advanced optimization techniques, such as machine learning, could improve the model's accuracy and reduce computational costs in realtime applications. Expanding the scope of validation to include a wider range of experimental data, especially for high-pressure and high-temperature systems, would further strengthen the model’s applicability. 

Overall, the IR EOS offers a promising alternative for predicting the thermophysical properties of natural gas and LNG, with the potential for broader application in other gas systems. With continued refinement, this model could Corrected Proofs play a significant role in optimizing industrial processes and addressing the evolving demands of the global energy sector. 

#### **Nomenclature** 

|**Symbols**||JTC|Joule-Thomson Coefficient|
|---|---|---|---|
|Cp|Isobaric heat capacity|JTIC|Joule-Thomson Inversion Curve|
|Z|Compressibility factor|LNG:|Liquefied Natural Gas|
|**Abbreviation**||PC-SAFT|Perturbed-Chain Statistical Associating Fluid Theory|
|AAD|Average Absolute Deviation|PR EOS|Peng-Robinson Equation of State|
|EOS|Equation of State|RMSE|Root Mean Square Error|
|GERG|Groupe Européen de Recherches<br>Gazières (a standardized EOS<br>model)|SAFT|Statistical Associating Fluid Theory|
|GMA<br>IR EOS|Goharshadi-Morsali-Abbaspour<br>Isotherm Regularity Equation of<br>State (modified GMA EOS)|SRK|Soave-Redlich-Kwong Equation of State|



#### **References** 

[1] Yang, X., Rowland, D., Sampson, C., Falloon, P., May, E.F., 2022. Evaluating cubic equations of state for predictions of solid-fluid equilibrium in liquefied natural gas production. Fuel, 314 (April), 123033. https://doi.org/10.1016/j.fuel.2021.123033 

[2] Peng, D.Y., Robinson, D.B., 1976. A New Two-Constant Equation of State. Industrial and Engineering Chemistry Fundamentals, 15 (1), 59–64. https://doi.org/10.1021/I160057A011 

[3] Soave, G., 1972. Equilibrium constants from a modified Redlich-Kwong equation of state. Chemical Engineering Science, 27 (6), 1197–1203. https://doi.org/10.1016/0009-2509(72)80096-4 

[4] Kunz, O., Wagner, W., 2012. The GERG-2008 Wide-Range Equation of State for Natural Gases and Other Mixtures: An Expansion of GERG-2004. Journal of Chemical Engineering Data, 57 (11), 3032–3091. https://doi.org/10.1021/je300655b 

_74                                                               A. Ghareghashi et al./ Chemical Process Design, Vol.3, No.1 (2024) 57-74_ 

[5] Beckmüller, R., Thol, M., Bell, I., 2021. New equations of state for binary hydrogen mixtures containing methane, nitrogen, carbon monoxide, and carbon dioxide. Journal of Physical Chemistry, 50, 13102. https://doi.org/10.1063/5.0040533 [6] Alanazi, A., Ali, M., Bawazeer, S., Yekeen, N., Hoteit, H., 2022. Evaluation of cubic, PC-SAFT, and GERG2008 equations of state for accurate calculations of thermophysical properties of hydrogen-blend mixtures. Energy Reports, 8, 13876-13899. https://doi.org/10.1016/j.egyr.2022.10.257 

[7] Mozaffari, P., Baird, Z.S., Järvik, O., 2022. A predictive approach towards using PC-SAFT for modeling the properties of shale oil. Materials, 15 (12), 4221. https://doi.org/10.3390/ma15124221. 

[8] Bentama, B., Grine, H., Anoune, I., Madani, H., Bougriou, C., 2023. Calculation of azeotropic properties for binary mixtures with the PC-SAFT equation of state. Fluid Phase Equilibria, 565, 113631. https://doi.org/10.1016/j.fluid.2022.113631 [9] Cardoso, L.O., Conceição, B.S., Paredes, M.L.L., Mattedi, S., 2024. Investigation of interaction binary parameters for solubilities of the natural gas components in ionic liquids with EoS for predicting phase behavior. Chemical Engineering Research and Design, 210, 684–697. https://doi.org/10.1016/j.cherd.2024.09.013 

[10] Mao, Y., et al., 2023. The thermodynamic properties of non-associating and associating fluids: A systematic evaluation of SAFT-type equations of state. International Journal of Thermophysics, 44 (3), 32. https://doi.org/10.1007/s10765-022-03131-9 [11] Pakravesh, A., Zarei, H., 2021. Prediction of Joule–Thomson coefficients and inversion curves of natural gas by various equations of state. Cryogenics, 118, 103350. https://doi.org/10.1016/j.cryogenics.2021.103350 

[12] Novak, N., Liang, X., Kontogeorgis, G.M., 2024. Prediction of water anomalous properties by introducing the two-state theory in SAFT. Journal of Chemical Physics, 160 (10). https://doi.org/10.1063/5.0186752 

[13] Walker, P.J., Mueller, S., Smirnova, I., 2023. Confidence-interval and uncertainty-propagation analysis of SAFT-type equations of state. Journal of Chemical Engineering Data, 69(2) 495. https://doi.org/10.1021/acs.jced.3c00413 

[14] Li, J., Yu, B., 2022. Gas properties, fundamental equations of state and phase relationships. In _:_ Sustainable Natural Gas Reservoir and Production Engineering, Elsevier, 128. https://doi.org/10.1016/B978-0-12-824495-1.00004-8 

[15] Nazari, S., Bashipour, F., 2021. A rigorous model to compute thermodynamic properties of natural gas without applying full component analysis. Flow Measurement and Instrumentation, 77, 101879. https://doi.org/10.1016/j.flowmeasinst.2020.101879 

[16] Kunz, O., Wagner, W., 2012. The GERG-2008 wide-range equation of state for natural gases and other mixtures: An expansion of GERG-2004. Journal of Chemical Engineering Data, 57 (11), 3032–3091.https://doi.org/10.1021/je300655B [17] Kunz, O., Klimeck, R., Wagner, W., Jaeschke, M., 2007. The GERG-2004 wide-range equation of state for natural gases and other mixtures. https://www.osti.gov/etdeweb/biblio/20924249 

[18] Hassanpouryouzband, A., Joonaki, E., Edlmann, K., Heinemann, N., Yang, J., 2020. Thermodynamic and transport properties of hydrogen-containing streams. Nature _,_ 7(1), 222. https://doi.org/10.1038/s41597-020-0568-6 [19] Nasrifar, K., Bolland, O., Moshfeghian, M., 2005. Predicting natural gas dew points from 15 equations of state. Energy and Fuels, 19 (2), 561–572. https://doi.org/10.1021/EF0498465 Corrected Proofs 

[20] Parsafar, G., Mason, E.A., 1994. Linear isotherms for dense fluids: Extension to mixtures. Journal of Physical Chemistry, 98 (7), 1962–1967. https://doi.org/10.1021/J100058A040 

[21] Ghatee, M.H., Bahadori, M., 2003. Common compression factor and bulk modulus quiescence points of liquid cesium. Fluid Phase Equilibria, 205 (2), 339–351. https://doi.org/10.1016/S0378-3812(02)00315-1 

[22] Patil, P., Ejaz, S., Atilhan, M., Cristancho, D., Holste, J.C., Hall, K.R., 2007. Accurate density measurements for a 91% methane natural gas-like mixture. Journal of Chemical Thermodynamics, 39 (8), 1157–1163. https://doi.org/10.1016/j.jct.2007.01.002 

