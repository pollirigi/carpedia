// Mapa curado de generaciones por modelo. Reemplaza las entradas "agrupadas"
// de models.json por generaciones individuales, cada una con:
//   - q:      consulta para la API de Wikimedia Commons
//   - al:     regexes (case-insensitive) que deben aparecer en el TÍTULO o las
//             CATEGORÍAS del archivo de Commons para aceptar la imagen
//   - trims:  versiones "normales" de esa generación (solo texto)
//   - sport:  versiones deportivas, cada una con su propia imagen verificada
// Los modelos sin entrada acá conservan sus generaciones actuales.

const g = (code, years, q, al, trims, sport) => ({ code, years, q, al, trims, sport });
const s = (name, q, al) => ({ name, q, al });

export const GEN_MAP = {
  // ============================ PORSCHE ============================
  "porsche-911": {
    base: "Porsche 911",
    gens: [
      g("911 original (901/F)", "1964–1973", "Porsche 911 1970", ["\\b19(6[4-9]|7[0-3])\\b|911 classic|\\b901\\b"], "911 T · E · S",
        [s("911 Carrera RS 2.7", "Porsche 911 Carrera RS 2.7", ["carrera rs"])]),
      g("Serie G (930)", "1973–1989", "Porsche 911 G-Series", ["g-model|g-serie|\\b19(7[4-9]|8[0-9])\\b|\\b930\\b"], "911 SC · Carrera 3.2",
        [s("930 Turbo", "Porsche 930 Turbo", ["\\b930\\b", "turbo"])]),
      g("964", "1989–1994", "Porsche 964", ["\\b964\\b"], "Carrera 2 · Carrera 4",
        [s("964 Turbo / Carrera RS", "Porsche 964 Turbo", ["\\b964\\b"])]),
      g("993", "1994–1998", "Porsche 993", ["\\b993\\b"], "Carrera · Carrera 4S · Targa",
        [s("993 Turbo / GT2", "Porsche 993 Turbo", ["\\b993\\b"])]),
      g("996", "1997–2006", "Porsche 996", ["\\b996\\b"], "Carrera · Carrera 4S · Targa",
        [s("996 GT3 / GT2 / Turbo", "Porsche 996 GT3", ["\\b996\\b"])]),
      g("997", "2004–2012", "Porsche 997", ["\\b997\\b"], "Carrera · Carrera S · Targa 4",
        [s("997 GT3 RS / GT2 RS / Turbo", "Porsche 997 GT3", ["\\b997\\b"])]),
      g("991", "2011–2019", "Porsche 991", ["\\b991\\b"], "Carrera · Carrera S · Targa",
        [s("991 GT3 RS / GT2 RS / Turbo S / R", "Porsche 991 GT3 RS", ["\\b991\\b"])]),
      g("992", "2019–presente", "Porsche 992", ["\\b992\\b"], "Carrera · Carrera S · Targa · Dakar",
        [s("992 GT3 / Turbo S", "Porsche 992 GT3", ["\\b992\\b"])])
    ]
  },
  "porsche-924": {
    base: "Porsche 924",
    gens: [
      g("924", "1976–1985", "Porsche 924", ["\\b924\\b"], "924 · 924 S",
        [s("924 Turbo / Carrera GT", "Porsche 924 Carrera GT", ["\\b924\\b", "turbo|carrera"])]),
      g("924 S", "1985–1988", "Porsche 924 S", ["\\b924\\b"], "924 S 2.5", [])
    ]
  },
  "porsche-944": {
    base: "Porsche 944",
    gens: [
      g("944 / 944 S / S2", "1982–1991", "Porsche 944", ["\\b944\\b"], "944 · 944 S · 944 S2",
        [s("944 Turbo (951)", "Porsche 944 Turbo", ["\\b944\\b", "turbo|951"])])
    ]
  },
  "porsche-968": {
    base: "Porsche 968",
    gens: [
      g("968", "1991–1995", "Porsche 968", ["\\b968\\b"], "968 coupé · cabrio",
        [s("968 Club Sport / Turbo S", "Porsche 968 Club Sport", ["\\b968\\b", "club sport|clubsport|turbo"])])
    ]
  },
  "porsche-boxster": {
    base: "Porsche Boxster",
    gens: [
      g("986", "1996–2004", "Porsche Boxster 986", ["\\b986\\b"], "Boxster · Boxster S", []),
      g("987", "2004–2012", "Porsche Boxster 987", ["\\b987\\b"], "Boxster · Boxster S",
        [s("Boxster Spyder (987)", "Porsche Boxster Spyder 987", ["spyder"])]),
      g("981", "2012–2016", "Porsche Boxster 981", ["\\b981\\b"], "Boxster · Boxster S · GTS",
        [s("Boxster Spyder (981)", "Porsche Boxster Spyder 981", ["spyder"])]),
      g("982 (718)", "2016–presente", "Porsche 718 Boxster", ["\\b718\\b|\\b982\\b"], "718 Boxster · S · GTS 4.0",
        [s("718 Spyder / Spyder RS", "Porsche 718 Spyder", ["spyder"])])
    ]
  },
  "porsche-cayman": {
    base: "Porsche Cayman",
    gens: [
      g("987c", "2005–2012", "Porsche Cayman 987", ["cayman"], "Cayman · Cayman S",
        [s("Cayman R", "Porsche Cayman R", ["cayman r\\b"])]),
      g("981c", "2013–2016", "Porsche Cayman 981", ["cayman"], "Cayman · Cayman S · GTS",
        [s("Cayman GT4 (981)", "Porsche Cayman GT4", ["gt4"])]),
      g("982 (718)", "2016–presente", "Porsche 718 Cayman", ["\\b718\\b", "cayman"], "718 Cayman · S · GTS 4.0",
        [s("718 Cayman GT4 / GT4 RS", "Porsche 718 Cayman GT4 RS", ["gt4"])])
    ]
  },
  "porsche-cayenne": {
    base: "Porsche Cayenne",
    gens: [
      g("E1 (955/957)", "2002–2010", "Porsche Cayenne 955", ["\\b955\\b|\\b957\\b|\\b9pa\\b|\\b20(0[2-9]|10)\\b"], "Cayenne · S · GTS",
        [s("Cayenne Turbo S (E1)", "Porsche Cayenne Turbo 955", ["turbo"])]),
      g("E2 (958)", "2010–2017", "Porsche Cayenne 958", ["\\b958\\b|\\b201[0-7]\\b"], "Cayenne · S · GTS · Diesel",
        [s("Cayenne Turbo S (E2)", "Porsche Cayenne Turbo 958", ["turbo"])]),
      g("E3 (9YA)", "2017–presente", "Porsche Cayenne 9YA", ["\\b9ya\\b|\\b20(1[89]|2[0-9])\\b"], "Cayenne · S · E-Hybrid",
        [s("Cayenne Turbo GT", "Porsche Cayenne Turbo GT", ["turbo gt"])])
    ]
  },
  "porsche-panamera": {
    base: "Porsche Panamera",
    gens: [
      g("970", "2009–2016", "Porsche Panamera 970", ["\\b970\\b|\\b20(09|1[0-6])\\b"], "Panamera · 4S · GTS",
        [s("Panamera Turbo S (970)", "Porsche Panamera Turbo 970", ["turbo"])]),
      g("971", "2016–2023", "Porsche Panamera 971", ["\\b971\\b|\\b20(1[6-9]|2[0-3])\\b"], "Panamera · 4S · Sport Turismo",
        [s("Panamera Turbo S E-Hybrid (971)", "Porsche Panamera Turbo S E-Hybrid", ["turbo"])]),
      g("972", "2023–presente", "Porsche Panamera 972", ["\\b972\\b|\\b202[3-9]\\b"], "Panamera · 4S E-Hybrid",
        [s("Panamera Turbo S E-Hybrid (972)", "Porsche Panamera 972 Turbo", ["turbo"])])
    ]
  },
  "porsche-macan": {
    base: "Porsche Macan",
    gens: [
      g("95B (combustión)", "2014–2026", "Porsche Macan 95B", ["macan"], "Macan · S · GTS",
        [s("Macan Turbo (95B)", "Porsche Macan Turbo", ["macan", "turbo"])]),
      g("Macan Eléctrico (PPE)", "2024–presente", "Porsche Macan Electric", ["macan", "electric|ev\\b|202[4-9]"], "Macan 4 Electric",
        [s("Macan Turbo Electric", "Porsche Macan Turbo Electric", ["macan", "turbo"])])
    ]
  },
  "porsche-taycan": {
    base: "Porsche Taycan",
    gens: [
      g("Taycan (J1)", "2019–2024", "Porsche Taycan", ["taycan"], "Taycan · 4S · Cross Turismo",
        [s("Taycan Turbo S", "Porsche Taycan Turbo S", ["taycan", "turbo"])]),
      g("Taycan restyling", "2024–presente", "Porsche Taycan 2024", ["taycan", "202[4-9]"], "Taycan · 4S",
        [s("Taycan Turbo GT", "Porsche Taycan Turbo GT", ["taycan", "turbo gt"])])
    ]
  },

  // ============================ BMW ============================
  "bmw-3-series": {
    base: "BMW 3 Series",
    gens: [
      g("E21", "1975–1983", "BMW E21", ["\\be21\\b"], "316 · 318 · 320 · 323i", []),
      g("E30", "1982–1994", "BMW E30", ["\\be30\\b"], "316i · 318i · 320i · 325i",
        [s("M3 (E30)", "BMW M3 E30", ["m3"])]),
      g("E36", "1990–2000", "BMW E36", ["\\be36\\b"], "318i · 320i · 325i · 328i",
        [s("M3 (E36)", "BMW M3 E36", ["m3"])]),
      g("E46", "1998–2006", "BMW E46", ["\\be46\\b"], "318i · 320i · 325i · 330i",
        [s("M3 (E46)", "BMW M3 E46", ["m3"])]),
      g("E90/E91/E92/E93", "2005–2013", "BMW E90", ["\\be9[0-3]\\b"], "318i · 320i · 325i · 335i",
        [s("M3 (E90/E92)", "BMW M3 E92", ["m3"])]),
      g("F30/F31/F34", "2012–2019", "BMW F30", ["\\bf3[014]\\b"], "316i · 320i · 328i · 340i",
        [s("M3 (F80)", "BMW M3 F80", ["m3"])]),
      g("G20/G21", "2019–presente", "BMW G20", ["\\bg2[01]\\b"], "318i · 320i · 330i · M340i",
        [s("M3 (G80)", "BMW M3 G80", ["m3"])])
    ]
  },
  "bmw-5-series": {
    base: "BMW 5 Series",
    gens: [
      g("E12", "1972–1981", "BMW E12", ["\\be12\\b"], "518 · 520 · 525 · 528i", []),
      g("E28", "1981–1988", "BMW E28", ["\\be28\\b"], "518i · 520i · 525i · 528i",
        [s("M5 (E28)", "BMW M5 E28", ["m5|m535i"])]),
      g("E34", "1988–1996", "BMW E34", ["\\be34\\b"], "520i · 525i · 530i · 540i",
        [s("M5 (E34)", "BMW M5 E34", ["m5"])]),
      g("E39", "1995–2004", "BMW E39", ["\\be39\\b"], "520i · 528i · 530i · 540i",
        [s("M5 (E39)", "BMW M5 E39", ["m5"])]),
      g("E60/E61", "2003–2010", "BMW E60", ["\\be6[01]\\b"], "520i · 525i · 530i · 545i",
        [s("M5 (E60) V10", "BMW M5 E60", ["m5"])]),
      g("F10/F11", "2010–2017", "BMW F10", ["\\bf1[01]\\b"], "520i · 528i · 535i · 550i",
        [s("M5 (F10)", "BMW M5 F10", ["m5"])]),
      g("G30/G31", "2017–2023", "BMW G30", ["\\bg3[01]\\b"], "520i · 530i · 540i · M550i",
        [s("M5 (F90)", "BMW M5 F90", ["m5"])]),
      g("G60/G61 (incl. i5)", "2023–presente", "BMW G60", ["\\bg6[01]\\b|\\bi5\\b"], "520i · 530e · i5 eDrive40",
        [s("M5 (G90)", "BMW M5 G90", ["m5"])])
    ]
  },
  "bmw-7-series": {
    base: "BMW 7 Series",
    gens: [
      g("E23", "1977–1986", "BMW E23", ["\\be23\\b"], "728i · 732i · 745i", []),
      g("E32", "1986–1994", "BMW E32", ["\\be32\\b"], "730i · 735i · 750i V12", []),
      g("E38", "1994–2001", "BMW E38", ["\\be38\\b"], "728i · 735i · 740i · 750i", []),
      g("E65/E66", "2001–2008", "BMW E65", ["\\be6[56]\\b"], "730i · 745i · 760i", []),
      g("F01/F02", "2008–2015", "BMW F01", ["\\bf0[12]\\b"], "730d · 740i · 750i · 760i", []),
      g("G11/G12", "2015–2022", "BMW G11", ["\\bg1[12]\\b"], "730d · 740i · 750i · M760Li", []),
      g("G70 (incl. i7)", "2022–presente", "BMW G70", ["\\bg70\\b|\\bi7\\b"], "740i · 760i · i7 xDrive60", [])
    ]
  },
  "bmw-6-series": {
    base: "BMW 6 Series",
    gens: [
      g("E24 (\"tiburón\")", "1976–1989", "BMW E24", ["\\be24\\b"], "628CSi · 633CSi · 635CSi",
        [s("M635CSi / M6 (E24)", "BMW M635CSi", ["m6|m635"])]),
      g("E63/E64", "2003–2010", "BMW E63", ["\\be6[34]\\b"], "630i · 645Ci · 650i",
        [s("M6 (E63)", "BMW M6 E63", ["m6"])]),
      g("F06/F12/F13", "2011–2018", "BMW F12", ["\\bf0?6\\b|\\bf1[23]\\b"], "640i · 650i · Gran Coupé",
        [s("M6 (F13)", "BMW M6 F13", ["m6"])])
    ]
  },
  "bmw-8-series": {
    base: "BMW 8 Series",
    gens: [
      g("E31", "1990–1999", "BMW E31", ["\\be31\\b"], "840Ci · 850i · 850Ci",
        [s("850CSi", "BMW 850CSi", ["850csi|csi"])]),
      g("G14/G15/G16", "2018–presente", "BMW G15", ["\\bg1[456]\\b"], "840i · M850i · Gran Coupé",
        [s("M8 (F91/F92)", "BMW M8", ["m8"])])
    ]
  },
  "bmw-1-series": {
    base: "BMW 1 Series",
    gens: [
      g("E81/E87", "2004–2013", "BMW E87", ["\\be8[1278]\\b"], "116i · 118i · 120i · 130i",
        [s("1M Coupé (E82)", "BMW 1 Series M Coupe", ["1m|1 series m"])]),
      g("F20/F21", "2011–2019", "BMW F20", ["\\bf2[01]\\b"], "116i · 118i · 120i",
        [s("M135i / M140i", "BMW M135i F20", ["m13[45]|m140"])]),
      g("F40", "2019–2024", "BMW F40", ["\\bf40\\b"], "118i · 120d",
        [s("M135i xDrive (F40)", "BMW M135i F40", ["m135"])]),
      g("F70", "2024–presente", "BMW F70", ["\\bf70\\b|\\b202[4-9]\\b"], "120 · 123 xDrive",
        [s("M135 xDrive (F70)", "BMW M135 F70", ["m135"])])
    ]
  },
  "bmw-2-series": {
    base: "BMW 2 Series",
    gens: [
      g("F22/F23 coupé", "2014–2021", "BMW F22", ["\\bf2[23]\\b"], "220i · 228i · M240i",
        [s("M2 (F87)", "BMW M2 F87", ["m2"])]),
      g("G42 coupé", "2021–presente", "BMW G42", ["\\bg42\\b"], "220i · 230i · M240i",
        [s("M2 (G87)", "BMW M2 G87", ["m2"])]),
      g("Active/Gran Tourer y Gran Coupé (FWD)", "2014–presente", "BMW 2 Series Gran Coupe", ["\\bf4[456]\\b|\\bu06\\b|gran coupe|tourer"], "216i · 218i · 220i", [])
    ]
  },
  "bmw-4-series": {
    base: "BMW 4 Series",
    gens: [
      g("F32/F33/F36", "2013–2020", "BMW F32", ["\\bf3[236]\\b"], "420i · 428i · 440i",
        [s("M4 (F82)", "BMW M4 F82", ["m4"])]),
      g("G22/G23/G26 (incl. i4)", "2020–presente", "BMW G22", ["\\bg2[236]\\b|\\bi4\\b"], "420i · 430i · i4",
        [s("M4 (G82)", "BMW M4 G82", ["m4"])])
    ]
  },
  "bmw-x1": {
    base: "BMW X1",
    gens: [
      g("E84", "2009–2015", "BMW X1 E84", ["\\be84\\b|\\b20(09|1[0-5])\\b"], "sDrive18i · xDrive28i", []),
      g("F48", "2015–2022", "BMW X1 F48", ["\\bf48\\b|\\b201[5-9]\\b"], "sDrive18i · xDrive25i", []),
      g("U11 (incl. iX1)", "2022–presente", "BMW X1 U11", ["\\bu11\\b|\\bix1\\b|\\b202[2-9]\\b"], "sDrive18i · xDrive23i · iX1", [])
    ]
  },
  "bmw-x3": {
    base: "BMW X3",
    gens: [
      g("E83", "2003–2010", "BMW X3 E83", ["\\be83\\b|\\b20(0[3-9]|10)\\b"], "2.5i · 3.0i · 3.0sd", []),
      g("F25", "2010–2017", "BMW X3 F25", ["\\bf25\\b|\\b201[0-7]\\b"], "xDrive20i · 28i · 35i", []),
      g("G01", "2017–2024", "BMW X3 G01", ["\\bg01\\b|\\b20(1[7-9]|2[0-4])\\b"], "xDrive20i · 30i · M40i",
        [s("X3 M (F97)", "BMW X3 M F97", ["x3 m"])]),
      g("G45", "2024–presente", "BMW X3 G45", ["\\bg45\\b|\\b202[4-9]\\b"], "20 xDrive · M50", [])
    ]
  },
  "bmw-x5": {
    base: "BMW X5",
    gens: [
      g("E53", "1999–2006", "BMW X5 E53", ["\\be53\\b|\\b(1999|200[0-6])\\b"], "3.0i · 4.4i",
        [s("X5 4.8is", "BMW X5 4.8is", ["4\\.8"])]),
      g("E70", "2006–2013", "BMW X5 E70", ["\\be70\\b|\\b20(0[7-9]|1[0-3])\\b"], "xDrive30i · 48i",
        [s("X5 M (E70)", "BMW X5 M E70", ["x5 m"])]),
      g("F15", "2013–2018", "BMW X5 F15", ["\\bf15\\b|\\b201[3-8]\\b"], "xDrive35i · 50i",
        [s("X5 M (F85)", "BMW X5 M F85", ["x5 m"])]),
      g("G05", "2018–presente", "BMW X5 G05", ["\\bg05\\b|\\b20(19|2[0-9])\\b"], "xDrive40i · 50e",
        [s("X5 M (F95)", "BMW X5 M F95", ["x5 m"])])
    ]
  },
  "bmw-x6": {
    base: "BMW X6",
    gens: [
      g("E71", "2008–2014", "BMW X6 E71", ["\\be71\\b|\\b20(0[89]|1[0-4])\\b"], "xDrive35i · 50i",
        [s("X6 M (E71)", "BMW X6 M E71", ["x6 m"])]),
      g("F16", "2014–2019", "BMW X6 F16", ["\\bf16\\b|\\b201[4-9]\\b"], "xDrive35i · 50i",
        [s("X6 M (F86)", "BMW X6 M F86", ["x6 m"])]),
      g("G06", "2019–presente", "BMW X6 G06", ["\\bg06\\b|\\b20(19|2[0-9])\\b"], "xDrive40i · M60i",
        [s("X6 M (F96)", "BMW X6 M F96", ["x6 m"])])
    ]
  },
  "bmw-z3": {
    base: "BMW Z3",
    gens: [
      g("Z3 roadster", "1995–2002", "BMW Z3 roadster", ["z3"], "1.9 · 2.8 · 3.0i",
        [s("Z3 M Roadster", "BMW Z3 M Roadster", ["m roadster"])]),
      g("Z3 coupé", "1998–2002", "BMW Z3 coupe", ["z3", "coup"], "2.8 · 3.0i",
        [s("Z3 M Coupé", "BMW Z3 M Coupe", ["m coup"])])
    ]
  },
  "bmw-z4": {
    base: "BMW Z4",
    gens: [
      g("E85/E86", "2002–2008", "BMW Z4 E85", ["\\be8[56]\\b|\\b200[2-8]\\b"], "2.5i · 3.0i",
        [s("Z4 M (E85/E86)", "BMW Z4 M", ["z4 m"])]),
      g("E89", "2009–2016", "BMW Z4 E89", ["\\be89\\b|\\b20(09|1[0-6])\\b"], "sDrive23i · 35i",
        [s("sDrive35is", "BMW Z4 sDrive35is", ["35is"])]),
      g("G29", "2018–presente", "BMW Z4 G29", ["\\bg29\\b|\\b20(1[89]|2[0-9])\\b"], "sDrive20i · 30i",
        [s("Z4 M40i", "BMW Z4 M40i", ["m40i"])])
    ]
  },

  // ============================ MERCEDES-BENZ ============================
  "mb-c-class": {
    base: "Mercedes-Benz C-Class",
    gens: [
      g("W202", "1993–2000", "Mercedes-Benz W202", ["w202"], "C180 · C200 · C280",
        [s("C36 / C43 AMG", "Mercedes-Benz C36 AMG", ["amg"])]),
      g("W203", "2000–2007", "Mercedes-Benz W203", ["w203"], "C180 · C240 · C320",
        [s("C32 / C55 AMG", "Mercedes-Benz C32 AMG", ["amg"])]),
      g("W204", "2007–2014", "Mercedes-Benz W204", ["w204"], "C200 · C250 · C350",
        [s("C63 AMG (W204)", "Mercedes-Benz C63 AMG W204", ["amg"])]),
      g("W205", "2014–2021", "Mercedes-Benz W205", ["w205"], "C180 · C250 · C300",
        [s("C63 AMG (W205)", "Mercedes-AMG C63 W205", ["amg"])]),
      g("W206", "2021–presente", "Mercedes-Benz W206", ["w206"], "C200 · C300e",
        [s("C63 S E Performance", "Mercedes-AMG C63 W206", ["amg"])])
    ]
  },
  "mb-e-class": {
    base: "Mercedes-Benz E-Class",
    gens: [
      g("W124", "1984–1995", "Mercedes-Benz W124", ["w124"], "200E · 230E · 300E",
        [s("500E / E500", "Mercedes-Benz 500E", ["500 ?e|e ?500"])]),
      g("W210", "1995–2002", "Mercedes-Benz W210", ["w210"], "E200 · E240 · E320",
        [s("E55 AMG (W210)", "Mercedes-Benz E55 AMG W210", ["amg"])]),
      g("W211", "2002–2009", "Mercedes-Benz W211", ["w211"], "E200 · E280 · E350",
        [s("E55 / E63 AMG (W211)", "Mercedes-Benz E63 AMG W211", ["amg"])]),
      g("W212", "2009–2016", "Mercedes-Benz W212", ["w212"], "E200 · E250 · E350",
        [s("E63 AMG (W212)", "Mercedes-Benz E63 AMG W212", ["amg"])]),
      g("W213", "2016–2023", "Mercedes-Benz W213", ["w213"], "E200 · E300 · E450",
        [s("E63 S AMG (W213)", "Mercedes-AMG E63 W213", ["amg"])]),
      g("W214", "2023–presente", "Mercedes-Benz W214", ["w214"], "E200 · E300e",
        [s("E53 AMG Hybrid", "Mercedes-AMG E53 W214", ["amg"])])
    ]
  },
  "mb-s-class": {
    base: "Mercedes-Benz S-Class",
    gens: [
      g("W116", "1972–1980", "Mercedes-Benz W116", ["w116"], "280 S · 350 SE · 450 SEL",
        [s("450 SEL 6.9", "Mercedes-Benz 450 SEL 6.9", ["6\\.9"])]),
      g("W126", "1979–1991", "Mercedes-Benz W126", ["w126"], "300 SE · 420 SE · 560 SEL", []),
      g("W140", "1991–1998", "Mercedes-Benz W140", ["w140"], "300 SE · S500 · S600 V12", []),
      g("W220", "1998–2005", "Mercedes-Benz W220", ["w220"], "S320 · S430 · S500",
        [s("S55 / S65 AMG (W220)", "Mercedes-Benz S55 AMG W220", ["amg"])]),
      g("W221", "2005–2013", "Mercedes-Benz W221", ["w221"], "S350 · S500 · S600",
        [s("S63 / S65 AMG (W221)", "Mercedes-Benz S63 AMG W221", ["amg"])]),
      g("W222", "2013–2020", "Mercedes-Benz W222", ["w222"], "S350 · S450 · S560",
        [s("S63 / S65 AMG (W222)", "Mercedes-AMG S63 W222", ["amg"])]),
      g("W223", "2020–presente", "Mercedes-Benz W223", ["w223"], "S450 · S500 · S580e",
        [s("S63 E Performance", "Mercedes-AMG S63 W223", ["amg"])])
    ]
  },
  "mb-sl-modern": {
    base: "Mercedes-Benz SL",
    gens: [
      g("R129", "1989–2001", "Mercedes-Benz R129", ["r129"], "SL320 · SL500 · SL600",
        [s("SL60 / SL73 AMG", "Mercedes-Benz SL73 AMG", ["amg"])]),
      g("R230", "2001–2011", "Mercedes-Benz R230", ["r230"], "SL350 · SL500",
        [s("SL55 / SL65 AMG", "Mercedes-Benz SL65 AMG", ["amg"])]),
      g("R231", "2012–2020", "Mercedes-Benz R231", ["r231"], "SL400 · SL500",
        [s("SL63 / SL65 AMG (R231)", "Mercedes-Benz SL63 AMG R231", ["amg"])]),
      g("R232 (AMG SL)", "2021–presente", "Mercedes-AMG SL R232", ["r232"], "SL43 · SL55",
        [s("SL63 AMG (R232)", "Mercedes-AMG SL63 R232", ["amg"])])
    ]
  },
  "mb-slk": {
    base: "Mercedes-Benz SLK",
    gens: [
      g("R170", "1996–2004", "Mercedes-Benz R170", ["r170"], "SLK200 · SLK230 · SLK320",
        [s("SLK32 AMG", "Mercedes-Benz SLK32 AMG", ["amg"])]),
      g("R171", "2004–2011", "Mercedes-Benz R171", ["r171"], "SLK200 · SLK280 · SLK350",
        [s("SLK55 AMG (R171)", "Mercedes-Benz SLK55 AMG R171", ["amg"])]),
      g("R172 (SLK/SLC)", "2011–2020", "Mercedes-Benz R172", ["r172"], "SLK200 · SLC300",
        [s("SLK55 / SLC43 AMG", "Mercedes-Benz SLK55 AMG R172", ["amg"])])
    ]
  },
  "mb-a-class": {
    base: "Mercedes-Benz A-Class",
    gens: [
      g("W168", "1997–2004", "Mercedes-Benz W168", ["w168"], "A140 · A160 · A190", []),
      g("W169", "2004–2012", "Mercedes-Benz W169", ["w169"], "A150 · A170 · A200", []),
      g("W176", "2012–2018", "Mercedes-Benz W176", ["w176"], "A180 · A200 · A250",
        [s("A45 AMG (W176)", "Mercedes-Benz A45 AMG", ["amg"])]),
      g("W177", "2018–presente", "Mercedes-Benz W177", ["w177"], "A180 · A200 · A250e",
        [s("A35 / A45 S AMG", "Mercedes-AMG A45 W177", ["amg"])])
    ]
  },
  "mb-cls": {
    base: "Mercedes-Benz CLS",
    gens: [
      g("C219", "2004–2010", "Mercedes-Benz C219", ["c219|w219"], "CLS350 · CLS500",
        [s("CLS55 / CLS63 AMG (C219)", "Mercedes-Benz CLS55 AMG", ["amg"])]),
      g("C218", "2011–2018", "Mercedes-Benz C218", ["c218|w218"], "CLS350 · CLS500",
        [s("CLS63 AMG (C218)", "Mercedes-Benz CLS63 AMG C218", ["amg"])]),
      g("C257", "2018–2023", "Mercedes-Benz C257", ["c257"], "CLS350 · CLS450",
        [s("CLS53 AMG", "Mercedes-AMG CLS53", ["amg"])])
    ]
  },
  "mb-g-class": {
    base: "Mercedes-Benz G-Class",
    gens: [
      g("W460/W461", "1979–1992", "Mercedes-Benz W460", ["w46[01]"], "230 G · 280 GE · 300 GD", []),
      g("W463 (clásico)", "1990–2018", "Mercedes-Benz W463", ["w463"], "G320 · G500",
        [s("G55 / G63 / G65 AMG", "Mercedes-Benz G63 AMG", ["amg"])]),
      g("W463 (2018)", "2018–presente", "Mercedes-Benz G-Class 2018", ["w463|g-class", "\\b20(1[89]|2[0-9])\\b"], "G500 · G580 EQ",
        [s("G63 AMG (2018)", "Mercedes-AMG G63 2018", ["amg"])])
    ]
  },
  "mb-ml-gle": {
    base: "Mercedes-Benz M-Class",
    gens: [
      g("W163 (ML)", "1997–2005", "Mercedes-Benz W163", ["w163"], "ML320 · ML430",
        [s("ML55 AMG", "Mercedes-Benz ML55 AMG", ["amg"])]),
      g("W164 (ML)", "2005–2011", "Mercedes-Benz W164", ["w164"], "ML350 · ML500",
        [s("ML63 AMG (W164)", "Mercedes-Benz ML63 AMG", ["amg"])]),
      g("W166 (ML/GLE)", "2011–2019", "Mercedes-Benz W166", ["w166"], "ML350 · GLE400",
        [s("GLE63 AMG (W166)", "Mercedes-Benz GLE63 AMG W166", ["amg"])]),
      g("W167 (GLE)", "2019–presente", "Mercedes-Benz GLE W167", ["w167|\\bgle\\b"], "GLE350 · GLE450",
        [s("GLE63 S AMG (W167)", "Mercedes-AMG GLE63 W167", ["amg"])])
    ]
  },
  "mb-glc": {
    base: "Mercedes-Benz GLC",
    gens: [
      g("X204 (GLK)", "2008–2015", "Mercedes-Benz X204", ["x204|\\bglk\\b"], "GLK280 · GLK350", []),
      g("X253", "2015–2022", "Mercedes-Benz GLC X253", ["x253|c253"], "GLC250 · GLC300",
        [s("GLC63 AMG (X253)", "Mercedes-AMG GLC63", ["amg"])]),
      g("X254", "2022–presente", "Mercedes-Benz GLC X254", ["x254|\\b202[2-9]\\b"], "GLC300 · GLC400e",
        [s("GLC63 AMG (X254)", "Mercedes-AMG GLC63 X254", ["amg"])])
    ]
  },
  "mb-190-w201": {
    base: "Mercedes-Benz W201",
    gens: [
      g("W201", "1982–1993", "Mercedes-Benz W201", ["w201|190 ?e"], "190 · 190 E · 190 D",
        [s("190 E 2.3-16 / 2.5-16 Evo II", "Mercedes-Benz 190E 2.5-16 Evolution II", ["2\\.[35]-16|evolution|cosworth"])])
    ]
  },

  // ============================ VOLKSWAGEN ============================
  "vw-golf": {
    base: "Volkswagen Golf",
    gens: [
      g("Mk1", "1974–1983", "Volkswagen Golf Mk1", ["golf (i|1)\\b|mk ?1\\b|golf mk1|typ 17"], "1.1 · 1.5 · Diesel",
        [s("Golf GTI Mk1", "Volkswagen Golf GTI Mk1", ["gti"])]),
      g("Mk2", "1983–1992", "Volkswagen Golf Mk2", ["golf (ii|2)\\b|mk ?2\\b|golf mk2|typ 19"], "1.3 · 1.6 · 1.8 · Syncro",
        [s("Golf GTI 16V / G60 Mk2", "Volkswagen Golf GTI Mk2", ["gti|g60|rallye"])]),
      g("Mk3", "1991–1997", "Volkswagen Golf Mk3", ["golf (iii|3)\\b|mk ?3\\b|golf mk3"], "1.6 · 1.8 · TDI",
        [s("Golf GTI / VR6 Mk3", "Volkswagen Golf VR6", ["gti|vr6"])]),
      g("Mk4", "1997–2003", "Volkswagen Golf Mk4", ["golf (iv|4)\\b|mk ?4\\b|golf mk4"], "1.4 · 1.6 · 1.9 TDI",
        [s("Golf GTI / R32 Mk4", "Volkswagen Golf R32 Mk4", ["gti|r32"])]),
      g("Mk5", "2003–2008", "Volkswagen Golf Mk5", ["golf (v|5)\\b|mk ?5\\b|golf mk5"], "1.4 TSI · 1.6 · 2.0 TDI",
        [s("Golf GTI / R32 Mk5", "Volkswagen Golf GTI Mk5", ["gti|r32"])]),
      g("Mk6", "2008–2012", "Volkswagen Golf Mk6", ["golf (vi|6)\\b|mk ?6\\b|golf mk6"], "1.2 TSI · 1.4 TSI · 2.0 TDI",
        [s("Golf GTI / R Mk6", "Volkswagen Golf R Mk6", ["gti\\b|golf r\\b(?!-? ?line)"])]),
      g("Mk7", "2012–2019", "Volkswagen Golf Mk7", ["golf (vii|7)\\b|mk ?7\\b|golf mk7"], "1.0 TSI · 1.4 TSI · e-Golf",
        [s("Golf GTI / R Mk7", "Volkswagen Golf R Mk7", ["gti\\b|golf r\\b(?!-? ?line)"])]),
      g("Mk8", "2019–presente", "Volkswagen Golf Mk8", ["golf (viii|8)\\b|mk ?8\\b|golf mk8"], "1.0 eTSI · 1.5 eTSI",
        [s("Golf GTI / R Mk8", "Volkswagen Golf R Mk8", ["gti\\b|golf r\\b(?!-? ?line)"])])
    ]
  },
  "vw-polo": {
    base: "Volkswagen Polo",
    gens: [
      g("Mk1 (86)", "1975–1981", "Volkswagen Polo Mk1", ["polo (i|1)\\b|mk ?1|typ 86\\b"], "0.9 · 1.1 · 1.3", []),
      g("Mk2 (86C)", "1981–1994", "Volkswagen Polo Mk2", ["polo (ii|2)\\b|mk ?2|86c"], "1.0 · 1.3 · Coupé",
        [s("Polo G40", "Volkswagen Polo G40", ["g40"])]),
      g("Mk3 (6N)", "1994–2002", "Volkswagen Polo Mk3", ["polo (iii|3)\\b|mk ?3|6n"], "1.0 · 1.4 · 1.9 D",
        [s("Polo GTI (6N2)", "Volkswagen Polo GTI 6N2", ["gti"])]),
      g("Mk4 (9N)", "2002–2009", "Volkswagen Polo Mk4", ["polo (iv|4)\\b|mk ?4|9n"], "1.2 · 1.4 · 1.9 TDI",
        [s("Polo GTI (9N3)", "Volkswagen Polo GTI 9N", ["gti"])]),
      g("Mk5 (6R/6C)", "2009–2017", "Volkswagen Polo Mk5", ["polo (v|5)\\b|mk ?5|6r|6c"], "1.2 TSI · 1.6 TDI",
        [s("Polo GTI (6R)", "Volkswagen Polo GTI 6R", ["gti"])]),
      g("Mk6 (AW)", "2017–presente", "Volkswagen Polo Mk6", ["polo (vi|6)\\b|mk ?6|\\baw\\b|\\b20(1[7-9]|2[0-9])\\b"], "1.0 TSI · 1.0 MPI",
        [s("Polo GTI (AW)", "Volkswagen Polo GTI Mk6", ["gti"])])
    ]
  },
  "vw-passat": {
    base: "Volkswagen Passat",
    gens: [
      g("B1", "1973–1980", "Volkswagen Passat B1", ["passat b1|passat (i|1)\\b|typ 32"], "1.3 · 1.5 · 1.6", []),
      g("B2", "1980–1988", "Volkswagen Passat B2", ["passat b2|passat (ii|2)\\b|typ 32b|santana"], "1.6 · 1.8 · Variant", []),
      g("B3", "1988–1993", "Volkswagen Passat B3", ["passat b3|passat (iii|3)\\b|35i"], "1.8 · 2.0 · VR6", []),
      g("B4", "1993–1997", "Volkswagen Passat B4", ["passat b4|passat (iv|4)\\b"], "1.8 · 1.9 TDI · VR6", []),
      g("B5", "1996–2005", "Volkswagen Passat B5", ["passat b5|passat (v|5)\\b|3b\\b"], "1.8T · 1.9 TDI · V6",
        [s("Passat W8", "Volkswagen Passat W8", ["w8"])]),
      g("B6", "2005–2010", "Volkswagen Passat B6", ["passat b6|passat (vi|6)\\b|3c\\b"], "1.4 TSI · 2.0 TDI",
        [s("Passat R36", "Volkswagen Passat R36", ["r36"])]),
      g("B7", "2010–2014", "Volkswagen Passat B7", ["passat b7|passat (vii|7)\\b"], "1.4 TSI · 2.0 TDI · Alltrack", []),
      g("B8", "2014–2023", "Volkswagen Passat B8", ["passat b8|passat (viii|8)\\b"], "1.5 TSI · 2.0 TDI · GTE", []),
      g("B9", "2023–presente", "Volkswagen Passat B9", ["passat b9|passat (ix|9)\\b|\\b202[3-9]\\b"], "1.5 eTSI · 2.0 TDI Variant", [])
    ]
  },
  "vw-jetta": {
    base: "Volkswagen Jetta",
    gens: [
      g("Mk1 (A1)", "1979–1984", "Volkswagen Jetta Mk1", ["jetta (i|1)\\b|mk ?1|typ 16"], "1.3 · 1.6 · GLI", []),
      g("Mk2 (A2)", "1984–1992", "Volkswagen Jetta Mk2", ["jetta (ii|2)\\b|mk ?2"], "1.6 · 1.8 · GLI 16V", []),
      g("Mk3 (Vento)", "1992–1999", "Volkswagen Vento", ["vento|jetta (iii|3)\\b|mk ?3"], "1.8 · 2.0 · VR6", []),
      g("Mk4 (Bora)", "1999–2005", "Volkswagen Bora", ["bora|jetta (iv|4)\\b|mk ?4"], "1.6 · 2.0 · 1.9 TDI · VR6", []),
      g("Mk5 (A5)", "2005–2010", "Volkswagen Jetta Mk5", ["jetta (v|5)\\b|mk ?5|typ 1k"], "1.6 · 2.5 · TDI",
        [s("Jetta GLI (Mk5)", "Volkswagen Jetta GLI", ["gli"])]),
      g("Mk6 (A6)", "2011–2018", "Volkswagen Jetta Mk6", ["jetta (vi|6)\\b|mk ?6|201[1-8]"], "1.4 TSI · 2.0 · TDI",
        [s("Jetta GLI (Mk6)", "Volkswagen Jetta GLI Mk6", ["gli"])]),
      g("Mk7 (A7)", "2018–presente", "Volkswagen Jetta Mk7", ["jetta (vii|7)\\b|mk ?7|\\b20(19|2[0-9])\\b"], "1.4 TSI · 1.5 TSI",
        [s("Jetta GLI (Mk7)", "Volkswagen Jetta GLI Mk7", ["gli"])])
    ]
  },
  "vw-scirocco": {
    base: "Volkswagen Scirocco",
    gens: [
      g("Mk1", "1974–1981", "Volkswagen Scirocco Mk1", ["scirocco (i|1)\\b|mk ?1|typ 53\\b"], "1.1 · 1.5 · 1.6 GTI", []),
      g("Mk2", "1981–1992", "Volkswagen Scirocco Mk2", ["scirocco (ii|2)\\b|mk ?2|53b"], "1.6 · 1.8 · 16V", []),
      g("Mk3", "2008–2017", "Volkswagen Scirocco Mk3", ["scirocco (iii|3)\\b|mk ?3|\\b20(0[89]|1[0-7])\\b"], "1.4 TSI · 2.0 TSI",
        [s("Scirocco R", "Volkswagen Scirocco R", ["scirocco r\\b"])])
    ]
  },

  // ============================ TOYOTA ============================
  "toyota-corolla": {
    base: "Toyota Corolla",
    gens: [
      g("E10", "1966–1970", "Toyota Corolla E10", ["\\be1[0-9]\\b|ke1[0-9]"], "1100 · Sprinter", []),
      g("E20", "1970–1974", "Toyota Corolla E20", ["\\be2[0-9]\\b|ke2[0-9]|te2[0-9]"], "1200 · 1400 · 1600", []),
      g("E30/E50", "1974–1979", "Toyota Corolla E30", ["\\be[35][0-9]\\b|ke[35]|te[35]"], "1200 · 1600 · Liftback", []),
      g("E70", "1979–1983", "Toyota Corolla E70", ["\\be7[0-9]\\b|ke7[0-9]|te7[0-9]"], "1.3 · 1.6 · DX", []),
      g("E80", "1983–1987", "Toyota Corolla E80", ["\\be8[0-9]\\b|ae8[0-9]"], "1.3 · 1.6 · FX",
        [s("AE86 Levin / Trueno", "Toyota AE86 Sprinter Trueno", ["ae86|trueno|levin"])]),
      g("E90", "1987–1991", "Toyota Corolla E90", ["\\be9[0-9]\\b|ae9[0-9]"], "1.3 · 1.6 · GT-i", []),
      g("E100", "1991–1995", "Toyota Corolla E100", ["e10[0-9]|ae10[0-9]"], "1.3 · 1.6 · 1.8", []),
      g("E110", "1995–2000", "Toyota Corolla E110", ["e11[0-9]|ae11[0-9]"], "1.4 · 1.6 · 1.8", []),
      g("E120/E130", "2000–2007", "Toyota Corolla E120", ["e12[0-9]|e13[0-9]"], "1.4 · 1.6 · 1.8 VVT-i", []),
      g("E140/E150", "2006–2013", "Toyota Corolla E140", ["e14[0-9]|e15[0-9]"], "1.4 · 1.6 · 1.8", []),
      g("E160/E170", "2012–2019", "Toyota Corolla E170", ["e16[0-9]|e17[0-9]"], "1.6 · 1.8 · Hybrid", []),
      g("E210", "2018–presente", "Toyota Corolla E210", ["e21[0-9]"], "1.8 Hybrid · 2.0",
        [s("GR Corolla", "Toyota GR Corolla", ["gr corolla"])])
    ]
  },
  "toyota-supra": {
    base: "Toyota Supra",
    gens: [
      g("A40/A50 (Celica Supra)", "1978–1981", "Toyota Celica Supra A40", ["a4[05]|ma4[06]|celica supra"], "2.6i · 2.8i", []),
      g("A60 (Celica Supra)", "1981–1986", "Toyota Celica Supra A60", ["a6[0-9]|ma6[0-9]|celica supra"], "2.8i", []),
      g("A70", "1986–1993", "Toyota Supra A70", ["a7[0-9]|ma7[0-9]|ja7[0-9]"], "3.0i · 2.5 Twin Turbo",
        [s("Supra Turbo A (A70)", "Toyota Supra A70 Turbo", ["turbo"])]),
      g("A80", "1993–2002", "Toyota Supra A80", ["a8[0-9]|jza80"], "3.0 (2JZ-GE)",
        [s("Supra RZ Twin Turbo (2JZ-GTE)", "Toyota Supra A80 Turbo", ["turbo|rz\\b"])]),
      g("A90/J29 (GR Supra)", "2019–presente", "Toyota GR Supra", ["a90|a91|j29|gr supra"], "2.0 · 3.0", [])
    ]
  },
  "toyota-celica": {
    base: "Toyota Celica",
    gens: [
      g("A20/A30", "1970–1977", "Toyota Celica A20", ["a2[0-9]|a3[0-9]|ta2[0-9]|ra2[0-9]"], "1600 GT · 2000 GT", []),
      g("A40/A50", "1977–1981", "Toyota Celica A40", ["a4[0-9]|a5[0-9]|ra4[0-9]"], "1.6 · 2.0 · Liftback", []),
      g("A60", "1981–1985", "Toyota Celica A60", ["a6[0-9]|ra6[0-9]|ta6[0-9]"], "1.6 · 2.0 · GT-S", []),
      g("T160", "1985–1989", "Toyota Celica T160", ["t16[0-9]|st16[0-9]|at16[0-9]"], "1.6 · 2.0 GT",
        [s("Celica GT-Four (ST165)", "Toyota Celica GT-Four ST165", ["gt-?four|st165"])]),
      g("T180", "1989–1993", "Toyota Celica T180", ["t18[0-9]|st18[0-9]|at18[0-9]"], "1.6 · 2.0 GT",
        [s("Celica GT-Four (ST185)", "Toyota Celica GT-Four ST185", ["gt-?four|st185"])]),
      g("T200", "1993–1999", "Toyota Celica T200", ["t20[0-9]|st20[0-9]|at20[0-9]"], "1.8 · 2.0 GT",
        [s("Celica GT-Four (ST205)", "Toyota Celica GT-Four ST205", ["gt-?four|st205"])]),
      g("T230", "1999–2006", "Toyota Celica T230", ["t23[0-9]|zzt23[01]"], "1.8 VVT-i · 1.8 VVTL-i TS", [])
    ]
  },
  "toyota-land-cruiser": {
    base: "Toyota Land Cruiser",
    gens: [
      g("BJ / Serie 20", "1951–1960", "Toyota Land Cruiser 20", ["\\bbj\\b|fj2[0-9]|j2[0-9]\\b|\\b19(5[1-9]|60)\\b"], "BJ · FJ25", []),
      g("Serie 40", "1960–1984", "Toyota Land Cruiser J40", ["j4[0-9]|fj4[0-9]|bj4[0-9]|hj4[0-9]"], "FJ40 · BJ40", []),
      g("Serie 55", "1967–1980", "Toyota Land Cruiser J55", ["j5[0-9]|fj5[0-9]"], "FJ55", []),
      g("Serie 60", "1980–1990", "Toyota Land Cruiser J60", ["j6[0-9]|fj6[0-9]|hj6[0-9]"], "FJ60 · HJ61", []),
      g("Serie 70", "1984–presente", "Toyota Land Cruiser J70", ["j7[0-9]|fj7[0-9]|hzj7[0-9]|grj7[0-9]"], "70 · 73 · 79 pickup", []),
      g("Serie 80", "1990–1997", "Toyota Land Cruiser J80", ["j8[0-9]|fj8[0-9]|fzj8[0-9]|hdj8[0-9]"], "FZJ80 · HDJ80", []),
      g("Serie 100", "1998–2007", "Toyota Land Cruiser J100", ["j10[0-9]|uzj100|hdj100"], "100 VX · 105", []),
      g("Serie 200", "2007–2021", "Toyota Land Cruiser J200", ["j20[0-9]|uzj200|urj200|vdj200"], "200 VX · V8 D-4D", []),
      g("Serie 300", "2021–presente", "Toyota Land Cruiser J300", ["j30[0-9]|\\b202[1-9]\\b"], "300 VX · GR Sport", []),
      g("Prado / 250", "1990–presente", "Toyota Land Cruiser Prado", ["prado|j25[0-9]|j15[0-9]|j12[0-9]|j9[0-9]\\b"], "90 · 120 · 150 · 250", [])
    ]
  },
  "toyota-yaris": {
    base: "Toyota Yaris",
    gens: [
      g("XP10", "1999–2005", "Toyota Yaris XP10", ["xp1[0-9]\\b|yaris.*(1999|200[0-5])|vitz"], "1.0 · 1.3 · T Sport", []),
      g("XP90", "2005–2011", "Toyota Yaris XP90", ["xp9[0-9]|yaris.*(200[5-9]|201[01])"], "1.0 · 1.3 · TS", []),
      g("XP130", "2011–2020", "Toyota Yaris XP130", ["xp13[0-9]|yaris.*(201[1-9])"], "1.0 · 1.3 · Hybrid", []),
      g("XP210", "2020–presente", "Toyota Yaris XP210", ["xp21[0-9]|yaris.*(202[0-9])"], "1.0 · 1.5 Hybrid",
        [s("GR Yaris", "Toyota GR Yaris", ["gr yaris"])])
    ]
  },
  "toyota-prius": {
    base: "Toyota Prius",
    gens: [
      g("XW10", "1997–2003", "Toyota Prius XW10", ["xw1[0-9]|nhw1[01]|prius.*(199[7-9]|200[0-3])"], "1.5 HSD", []),
      g("XW20", "2003–2009", "Toyota Prius XW20", ["xw2[0-9]|nhw20|prius.*(200[3-9])"], "1.5 HSD", []),
      g("XW30", "2009–2015", "Toyota Prius XW30", ["xw3[0-9]|zvw3[05]|prius.*(20(09|1[0-5]))"], "1.8 HSD · PHV", []),
      g("XW50", "2015–2022", "Toyota Prius XW50", ["xw5[0-9]|zvw5[0-9]|prius.*(201[5-9]|202[0-2])"], "1.8 HSD · Prime", []),
      g("XW60", "2023–presente", "Toyota Prius XW60", ["xw6[0-9]|prius.*(202[3-9])"], "2.0 HEV · PHEV", [])
    ]
  },
  "toyota-camry": {
    base: "Toyota Camry",
    gens: [
      g("V10", "1982–1986", "Toyota Camry V10", ["\\bv1[0-9]\\b|camry.*(198[2-6])"], "1.8 · 2.0", []),
      g("V20", "1986–1991", "Toyota Camry V20", ["\\bv2[0-9]\\b|camry.*(198[6-9]|1990)"], "2.0 · V6", []),
      g("XV10", "1991–1996", "Toyota Camry XV10", ["xv1[0-9]|camry.*(199[1-6])"], "2.2 · 3.0 V6", []),
      g("XV20", "1996–2001", "Toyota Camry XV20", ["xv2[0-9]|camry.*(199[6-9]|200[01])"], "2.2 · 3.0 V6", []),
      g("XV30", "2001–2006", "Toyota Camry XV30", ["xv3[0-9]|camry.*(200[1-6])"], "2.4 · 3.0 V6", []),
      g("XV40", "2006–2011", "Toyota Camry XV40", ["xv4[0-9]|camry.*(200[6-9]|201[01])"], "2.4 · 3.5 V6 · Hybrid", []),
      g("XV50", "2011–2017", "Toyota Camry XV50", ["xv5[0-9]|camry.*(201[1-7])"], "2.5 · 3.5 V6 · Hybrid", []),
      g("XV70", "2017–2024", "Toyota Camry XV70", ["xv7[0-9]|camry.*(201[7-9]|202[0-4])"], "2.5 · 3.5 V6 · Hybrid",
        [s("Camry TRD", "Toyota Camry TRD", ["trd"])]),
      g("XV80", "2024–presente", "Toyota Camry XV80", ["xv8[0-9]|camry.*(202[4-9])"], "2.5 HEV", [])
    ]
  },
  "toyota-hilux": {
    base: "Toyota Hilux",
    gens: [
      g("N10", "1968–1972", "Toyota Hilux N10", ["n1[0-9]\\b|hilux.*(19(6[89]|7[0-2]))"], "1.5 · 1.6", []),
      g("N20", "1972–1978", "Toyota Hilux N20", ["n2[0-9]\\b|hilux.*(197[2-8])"], "1.6 · 2.0", []),
      g("N30/N40", "1978–1983", "Toyota Hilux N30", ["n[34][0-9]\\b|hilux.*(19(7[89]|8[0-3]))"], "1.6 · 2.2 D · 4x4", []),
      g("N50/N60/N70", "1983–1988", "Toyota Hilux N50", ["n[567][0-9]\\b|hilux.*(198[3-8])"], "1.8 · 2.4 D", []),
      g("N80–N110", "1988–1997", "Toyota Hilux N80", ["n(8[0-9]|9[0-9]|1[01][0-9])\\b|hilux.*(19(8[89]|9[0-7]))"], "2.4 · 2.8 D", []),
      g("N140–N170 (Tiger)", "1997–2005", "Toyota Hilux N140", ["n1[4-7][0-9]|hilux.*(199[7-9]|200[0-5])"], "2.7 · 3.0 D", []),
      g("AN10/AN30 (Vigo)", "2005–2015", "Toyota Hilux Vigo", ["an[13][0-9]|vigo|hilux.*(200[5-9]|201[0-5])"], "2.5 · 3.0 D-4D", []),
      g("AN120 (Revo)", "2015–presente", "Toyota Hilux Revo", ["an12[0-9]|revo|hilux.*(201[5-9]|202[0-9])"], "2.4 · 2.8 D-4D",
        [s("Hilux GR Sport", "Toyota Hilux GR Sport", ["gr sport"])])
    ]
  },

  // ============================ CHEVROLET ============================
  "chevy-corvette": {
    base: "Chevrolet Corvette",
    gens: [
      g("C1", "1953–1962", "Chevrolet Corvette C1", ["\\bc1\\b|corvette.*(19(5[3-9]|6[0-2]))"], "283 · Fuel Injection", []),
      g("C2 Sting Ray", "1963–1967", "Chevrolet Corvette C2", ["\\bc2\\b|sting ray|corvette.*(196[3-7])"], "327 · 427",
        [s("C2 Z06 / 427 Big Block", "Chevrolet Corvette C2 427", ["427|z06"])]),
      g("C3", "1968–1982", "Chevrolet Corvette C3", ["\\bc3\\b|corvette.*(19(6[89]|7[0-9]|8[0-2]))"], "350 · Stingray",
        [s("C3 ZL1 / L88", "Chevrolet Corvette L88", ["zl1|l88"])]),
      g("C4", "1984–1996", "Chevrolet Corvette C4", ["\\bc4\\b|corvette.*(19(8[4-9]|9[0-6]))"], "L98 · LT1",
        [s("C4 ZR-1", "Chevrolet Corvette C4 ZR-1", ["zr-?1"])]),
      g("C5", "1997–2004", "Chevrolet Corvette C5", ["\\bc5\\b|corvette.*(199[7-9]|200[0-4])"], "LS1",
        [s("C5 Z06", "Chevrolet Corvette C5 Z06", ["z06"])]),
      g("C6", "2005–2013", "Chevrolet Corvette C6", ["\\bc6\\b|corvette.*(200[5-9]|201[0-3])"], "LS2 · LS3",
        [s("C6 Z06 / ZR1", "Chevrolet Corvette C6 ZR1", ["z06|zr1"])]),
      g("C7 Stingray", "2014–2019", "Chevrolet Corvette C7", ["\\bc7\\b|corvette.*(201[4-9])"], "LT1 Stingray",
        [s("C7 Z06 / ZR1", "Chevrolet Corvette C7 Z06", ["z06|zr1"])]),
      g("C8 (motor central)", "2020–presente", "Chevrolet Corvette C8", ["\\bc8\\b|corvette.*(202[0-9])"], "Stingray LT2",
        [s("C8 Z06 / E-Ray", "Chevrolet Corvette C8 Z06", ["z06|e-ray"])])
    ]
  },
  "chevy-camaro": {
    base: "Chevrolet Camaro",
    gens: [
      g("1ª gen", "1967–1969", "Chevrolet Camaro 1967", ["camaro.*(196[7-9])|first.generation"], "327 · RS",
        [s("SS / Z/28 (1ª gen)", "Chevrolet Camaro Z28 1969", ["z.?28|\\bss\\b"])]),
      g("2ª gen", "1970–1981", "Chevrolet Camaro 1970", ["camaro.*(19(7[0-9]|8[01]))|second.generation"], "RS · Berlinetta",
        [s("Z28 (2ª gen)", "Chevrolet Camaro Z28 1979", ["z.?28"])]),
      g("3ª gen", "1982–1992", "Chevrolet Camaro 1985", ["camaro.*(19(8[2-9]|9[0-2]))|third.generation"], "Sport Coupé · RS",
        [s("IROC-Z", "Chevrolet Camaro IROC-Z", ["iroc"])]),
      g("4ª gen", "1993–2002", "Chevrolet Camaro 1998", ["camaro.*(199[3-9]|200[0-2])|fourth.generation"], "3.8 V6",
        [s("SS / Z28 (4ª gen)", "Chevrolet Camaro SS 2000", ["\\bss\\b|z28"])]),
      g("5ª gen", "2010–2015", "Chevrolet Camaro 2012", ["camaro.*(20(09|1[0-5]))|fifth.generation"], "LS · LT · RS",
        [s("ZL1 / Z/28 (5ª gen)", "Chevrolet Camaro ZL1 2012", ["zl1|z.?28"])]),
      g("6ª gen", "2016–2024", "Chevrolet Camaro 2018", ["camaro.*(201[6-9]|202[0-4])|sixth.generation"], "LT · RS · SS",
        [s("ZL1 (6ª gen)", "Chevrolet Camaro ZL1 2017", ["zl1"])])
    ]
  },
  "chevy-chevelle": {
    base: "Chevrolet Chevelle",
    gens: [
      g("1ª gen", "1964–1967", "Chevrolet Chevelle 1965", ["chevelle.*(196[4-7])"], "Malibu · 300",
        [s("Chevelle SS 396 (1ª gen)", "Chevrolet Chevelle SS 1966", ["\\bss\\b|396"])]),
      g("2ª gen", "1968–1972", "Chevrolet Chevelle 1970", ["chevelle.*(19(6[89]|7[0-2]))"], "Malibu · Concours",
        [s("Chevelle SS 454 (2ª gen)", "Chevrolet Chevelle SS 454", ["\\bss\\b|454"])]),
      g("3ª gen (Laguna)", "1973–1977", "Chevrolet Chevelle 1975", ["chevelle.*(197[3-7])|laguna"], "Malibu · Laguna S-3", [])
    ]
  },
  "chevy-impala": {
    base: "Chevrolet Impala",
    gens: [
      g("1ª/2ª gen", "1958–1960", "Chevrolet Impala 1959", ["impala.*(19(5[89]|60))"], "348 · convertible", []),
      g("3ª gen", "1961–1964", "Chevrolet Impala 1963", ["impala.*(196[1-4])"], "283 · 327",
        [s("Impala SS 409", "Chevrolet Impala SS 1964", ["\\bss\\b|409"])]),
      g("4ª gen", "1965–1970", "Chevrolet Impala 1967", ["impala.*(19(6[5-9]|70))"], "327 · 396",
        [s("Impala SS 427", "Chevrolet Impala SS 427", ["\\bss\\b|427"])]),
      g("5ª gen", "1971–1976", "Chevrolet Impala 1973", ["impala.*(197[1-6])"], "350 · 400", []),
      g("6ª gen", "1977–1985", "Chevrolet Impala 1980", ["impala.*(19(7[7-9]|8[0-5]))"], "267 · 305", []),
      g("7ª gen (SS)", "1994–1996", "Chevrolet Impala SS 1996", ["impala.*(199[4-6])"], "—",
        [s("Impala SS (B-body)", "Chevrolet Impala SS 1995", ["\\bss\\b"])]),
      g("8ª gen", "2000–2005", "Chevrolet Impala 2003", ["impala.*(200[0-5])"], "3.4 · 3.8", []),
      g("9ª gen", "2006–2013", "Chevrolet Impala 2008", ["impala.*(200[6-9]|201[0-3])"], "3.5 · 3.9",
        [s("Impala SS V8 (9ª gen)", "Chevrolet Impala SS 2007", ["\\bss\\b"])]),
      g("10ª gen", "2014–2020", "Chevrolet Impala 2015", ["impala.*(201[4-9]|2020)"], "2.5 · 3.6", [])
    ]
  },
  "chevy-el-camino": {
    base: "Chevrolet El Camino",
    gens: [
      g("1ª gen", "1959–1960", "Chevrolet El Camino 1959", ["el camino.*(19(59|60))"], "283 · 348", []),
      g("2ª gen", "1964–1967", "Chevrolet El Camino 1965", ["el camino.*(196[4-7])"], "283 · 327", []),
      g("3ª gen", "1968–1972", "Chevrolet El Camino 1970", ["el camino.*(19(6[89]|7[0-2]))"], "307 · 350",
        [s("El Camino SS 454", "Chevrolet El Camino SS", ["\\bss\\b|454"])]),
      g("4ª gen", "1973–1977", "Chevrolet El Camino 1975", ["el camino.*(197[3-7])"], "350 · 454", []),
      g("5ª gen", "1978–1987", "Chevrolet El Camino 1980", ["el camino.*(19(7[89]|8[0-7]))"], "229 · 305",
        [s("El Camino SS (5ª gen)", "Chevrolet El Camino SS 1985", ["\\bss\\b"])])
    ]
  },
  "chevy-nova": {
    base: "Chevrolet Nova",
    gens: [
      g("Chevy II (1ª/2ª gen)", "1962–1967", "Chevrolet Chevy II 1963", ["chevy ii|nova.*(196[2-7])"], "4 · 6 cil",
        [s("Nova SS (2ª gen)", "Chevrolet Chevy II Nova SS 1966", ["\\bss\\b"])]),
      g("3ª gen", "1968–1974", "Chevrolet Nova 1970", ["nova.*(19(6[89]|7[0-4]))"], "250 · 307",
        [s("Nova SS 396", "Chevrolet Nova SS 1970", ["\\bss\\b|396"])]),
      g("4ª gen", "1975–1979", "Chevrolet Nova 1976", ["nova.*(197[5-9])"], "250 · 305", []),
      g("5ª gen (NUMMI)", "1985–1988", "Chevrolet Nova 1986", ["nova.*(198[5-8])"], "1.6 (base Corolla)", [])
    ]
  },
  "chevy-monte-carlo": {
    base: "Chevrolet Monte Carlo",
    gens: [
      g("1ª gen", "1970–1972", "Chevrolet Monte Carlo 1970", ["monte carlo.*(197[0-2])"], "350 · 402",
        [s("Monte Carlo SS 454", "Chevrolet Monte Carlo SS 454", ["\\bss\\b|454"])]),
      g("2ª gen", "1973–1977", "Chevrolet Monte Carlo 1975", ["monte carlo.*(197[3-7])"], "350 · Landau", []),
      g("3ª gen", "1978–1980", "Chevrolet Monte Carlo 1979", ["monte carlo.*(19(7[89]|80))"], "231 · 305", []),
      g("4ª gen", "1981–1988", "Chevrolet Monte Carlo 1985", ["monte carlo.*(198[1-8])"], "229 · 305",
        [s("Monte Carlo SS / Aerocoupe", "Chevrolet Monte Carlo SS 1986", ["\\bss\\b|aerocoupe"])]),
      g("5ª gen", "1995–1999", "Chevrolet Monte Carlo 1997", ["monte carlo.*(199[5-9])"], "3.1 · Z34", []),
      g("6ª gen", "2000–2007", "Chevrolet Monte Carlo 2004", ["monte carlo.*(200[0-7])"], "3.4 · 3.8",
        [s("Monte Carlo SS (6ª gen)", "Chevrolet Monte Carlo SS 2004", ["\\bss\\b"])])
    ]
  },

  // ============================ ALFA ROMEO ============================
  "alfa-giulia-952": {
    base: "Alfa Romeo Giulia 952",
    gens: [
      g("Giulia (952)", "2016–presente", "Alfa Romeo Giulia 2016", ["giulia", "\\b20(1[6-9]|2[0-9])\\b|952"], "Giulia · Super · Veloce",
        [s("Giulia Quadrifoglio / GTA", "Alfa Romeo Giulia Quadrifoglio", ["quadrifoglio|gtam?\\b"])])
    ]
  },
  "alfa-stelvio": {
    base: "Alfa Romeo Stelvio",
    gens: [
      g("Stelvio (949)", "2017–presente", "Alfa Romeo Stelvio", ["stelvio"], "Stelvio · Super · Veloce",
        [s("Stelvio Quadrifoglio", "Alfa Romeo Stelvio Quadrifoglio", ["quadrifoglio"])])
    ]
  },
  "alfa-156": {
    base: "Alfa Romeo 156",
    gens: [
      g("156 / Sportwagon", "1997–2003", "Alfa Romeo 156", ["\\b156\\b"], "1.6 · 2.0 TS · 2.5 V6", []),
      g("156 restyling", "2003–2007", "Alfa Romeo 156 2003", ["\\b156\\b"], "1.9 JTD · 2.0 JTS",
        [s("156 GTA 3.2 V6", "Alfa Romeo 156 GTA", ["gta"])])
    ]
  },
  "alfa-147": {
    base: "Alfa Romeo 147",
    gens: [
      g("147", "2000–2010", "Alfa Romeo 147", ["\\b147\\b"], "1.6 TS · 2.0 TS · 1.9 JTD",
        [s("147 GTA 3.2 V6", "Alfa Romeo 147 GTA", ["gta"])])
    ]
  },
  "alfa-75": {
    base: "Alfa Romeo 75",
    gens: [
      g("75", "1985–1992", "Alfa Romeo 75", ["\\b75\\b|milano"], "1.6 · 1.8 · 2.0 TS · 3.0 V6",
        [s("75 Turbo / Turbo Evoluzione", "Alfa Romeo 75 Turbo", ["turbo"])])
    ]
  },
  "alfa-giulietta-940": {
    base: "Alfa Romeo Giulietta 940",
    gens: [
      g("Giulietta (940)", "2010–2020", "Alfa Romeo Giulietta 2010", ["giulietta", "\\b20(1[0-9]|20)\\b|940"], "1.4 TB · 1.6 JTDm · 2.0 JTDm",
        [s("Giulietta Quadrifoglio Verde", "Alfa Romeo Giulietta Quadrifoglio Verde", ["quadrifoglio|1750 tbi|\\bqv\\b"])])
    ]
  },
  "alfa-giulietta-116": {
    base: "Alfa Romeo Giulietta 116",
    gens: [
      g("Giulietta (116)", "1977–1985", "Alfa Romeo Giulietta 1977", ["giulietta", "\\b19(7[7-9]|8[0-5])\\b|nuova"], "1.3 · 1.6 · 1.8 · 2.0",
        [s("Giulietta Turbodelta", "Alfa Romeo Giulietta Turbodelta", ["turbodelta"])])
    ]
  },

  // ============================ SAAB ============================
  "saab-99": {
    base: "Saab 99",
    gens: [
      g("99", "1968–1984", "Saab 99", ["\\b99\\b"], "99 · 99 EMS · 99 GL",
        [s("99 Turbo", "Saab 99 Turbo", ["turbo"])])
    ]
  },
  "saab-900": {
    base: "Saab 900",
    gens: [
      g("900 \"clásico\"", "1978–1994", "Saab 900 classic", ["\\b900\\b", "\\b19(7[89]|8[0-9]|9[0-4])\\b|classic"], "900 GL · 900i · Cabrio",
        [s("900 Turbo / Aero", "Saab 900 Turbo", ["turbo|aero"])]),
      g("900 NG", "1993–1998", "Saab 900 NG", ["\\b900\\b", "\\b199[3-8]\\b|ng\\b|new generation"], "2.0i · 2.3i · V6",
        [s("900 NG Turbo / Talladega", "Saab 900 NG Turbo", ["turbo"])])
    ]
  },
  "saab-9000": {
    base: "Saab 9000",
    gens: [
      g("9000 CC", "1984–1991", "Saab 9000 CC", ["9000"], "9000i · 9000 CC",
        [s("9000 Turbo", "Saab 9000 Turbo", ["turbo"])]),
      g("9000 CS/CD", "1991–1998", "Saab 9000 CS", ["9000"], "CSE · CDE",
        [s("9000 Aero", "Saab 9000 Aero", ["aero"])])
    ]
  },
  "saab-9-3": {
    base: "Saab 9-3",
    gens: [
      g("9-3 I", "1998–2003", "Saab 9-3 1998", ["9-3", "\\b19(9[89])\\b|\\b200[0-3]\\b"], "2.0i · 2.0t · 2.2 TiD",
        [s("9-3 Viggen", "Saab 9-3 Viggen", ["viggen"])]),
      g("9-3 II", "2002–2014", "Saab 9-3 2005", ["9-3", "\\b20(0[2-9]|1[0-4])\\b"], "1.8t · 2.0t · TTiD",
        [s("9-3 Aero / Turbo X", "Saab 9-3 Aero", ["aero|turbo x"])]),
      g("9-3 NEVS", "2013–2014", "NEVS Saab 9-3", ["9-3", "nevs|201[34]"], "9-3 sedán", [])
    ]
  },
  "saab-9-5": {
    base: "Saab 9-5",
    gens: [
      g("9-5 I", "1997–2010", "Saab 9-5 sedan", ["9-5", "\\b19(9[7-9])\\b|\\b20(0[0-9]|10)\\b"], "2.0t · 2.3t · 3.0 TiD",
        [s("9-5 Aero (I)", "Saab 9-5 Aero", ["aero"])]),
      g("9-5 II", "2010–2012", "Saab 9-5 2010", ["9-5", "\\b201[0-2]\\b"], "2.0T · 2.8T V6",
        [s("9-5 Aero (II)", "Saab 9-5 Aero 2011", ["aero"])])
    ]
  },

  // ==================== Overrides de búsqueda (sin reestructura) ====================
  "vw-beetle": { base: "Volkswagen Beetle", aliases: ["beetle|käfer|kafer|type 1|fusca|vocho"] },
  "vw-type2": { base: "Volkswagen Type 2", aliases: ["type 2|kombi|transporter|bulli|microbus"] },
  "vw-type3": { base: "Volkswagen Type 3", aliases: ["type 3|1500|1600"] },
  "vw-type4": { base: "Volkswagen Type 4", aliases: ["type 4|411|412"] },
  "vw-karmann-ghia": { base: "Volkswagen Karmann Ghia", aliases: ["karmann"] },
  "vw-gol": { base: "Volkswagen Gol", aliases: ["\\bgol\\b"] },
  "vw-new-beetle": { base: "Volkswagen New Beetle", aliases: ["new beetle|beetle"] },
  "vw-up": { base: "Volkswagen up", aliases: ["\\bup!?\\b"] },
  "vw-t-roc": { base: "Volkswagen T-Roc", aliases: ["t-roc|t-cross"] },
  "vw-id3": { base: "Volkswagen ID.3", aliases: ["id\\.? ?3"] },
  "vw-id4": { base: "Volkswagen ID.4", aliases: ["id\\.? ?[45]"] },
  "vw-id-buzz": { base: "Volkswagen ID. Buzz", aliases: ["buzz"] },
  "vw-fox": { base: "Volkswagen Fox", aliases: ["\\bfox\\b|suran|spacefox" ] },
  "bmw-3-15": { base: "BMW 3/15 Dixi", aliases: ["dixi|3/15"] },
  "bmw-02": { base: "BMW 2002", aliases: ["2002|1602|1802|1502"] },
  "bmw-neue-klasse": { base: "BMW New Class", aliases: ["new class|neue klasse|1500|1800|2000"] },
  "bmw-e3": { base: "BMW E3", aliases: ["\\be3\\b|2500|2800|bavaria"] },
  "bmw-e9": { base: "BMW E9", aliases: ["\\be9\\b|3\\.0 cs|2800 cs|csl"] },
  "bmw-m1": { base: "BMW M1", aliases: ["\\bm1\\b|e26"] },
  "bmw-i3": { base: "BMW i3", aliases: ["\\bi3\\b"] },
  "bmw-i8": { base: "BMW i8", aliases: ["\\bi8\\b"] },
  "bmw-ix": { base: "BMW iX", aliases: ["\\bix\\b"] },
  "bmw-x7": { base: "BMW X7", aliases: ["\\bx7\\b|g07"] },
  "mb-ssk": { base: "Mercedes-Benz SSK", aliases: ["ssk|w06"] },
  "mb-170v": { base: "Mercedes-Benz 170 V", aliases: ["170|w136|w15"] },
  "mb-500k": { base: "Mercedes-Benz 500K", aliases: ["500 ?k|540 ?k|w29"] },
  "mb-260d": { base: "Mercedes-Benz 260 D", aliases: ["260 ?d|w138"] },
  "mb-300-adenauer": { base: "Mercedes-Benz 300 Adenauer", aliases: ["adenauer|w186|w189|\\b300\\b"] },
  "mb-ponton": { base: "Mercedes-Benz Ponton", aliases: ["ponton|w120|w121|w180|w128"] },
  "mb-300sl": { base: "Mercedes-Benz 300 SL", aliases: ["300 ?sl|gullwing|w198"] },
  "mb-190sl": { base: "Mercedes-Benz 190 SL", aliases: ["190 ?sl"] },
  "mb-fintail": { base: "Mercedes-Benz Fintail", aliases: ["fintail|heckflosse|w110|w111|w112"] },
  "mb-600": { base: "Mercedes-Benz 600", aliases: ["w100|\\b600\\b|pullman"] },
  "mb-pagoda": { base: "Mercedes-Benz W113", aliases: ["w113|pagoda|230 ?sl|250 ?sl|280 ?sl"] },
  "mb-strich8": { base: "Mercedes-Benz W114", aliases: ["w114|w115|strich"] },
  "mb-sl-r107": { base: "Mercedes-Benz R107", aliases: ["r107|c107|280 ?sl|350 ?sl|450 ?sl|500 ?sl|560 ?sl|slc"] },
  "mb-w123": { base: "Mercedes-Benz W123", aliases: ["w123"] },
  "mb-b-class": { base: "Mercedes-Benz B-Class", aliases: ["b-class|w24[567]|b ?1[78]0|b ?200"] },
  "mb-gla": { base: "Mercedes-Benz GLA", aliases: ["\\bgla\\b|\\bglb\\b|x156|h247|x247"] },
  "mb-slr": { base: "Mercedes-Benz SLR McLaren", aliases: ["slr"] },
  "mb-sls": { base: "Mercedes-Benz SLS AMG", aliases: ["sls"] },
  "mb-amg-gt": { base: "Mercedes-AMG GT", aliases: ["amg gt"] },
  "mb-eq": { base: "Mercedes-Benz EQS", aliases: ["\\beq[sce]\\b"] },
  "toyota-aa": { base: "Toyota AA", aliases: ["\\baa\\b|toyoda"] },
  "toyota-crown": { base: "Toyota Crown", aliases: ["crown"] },
  "toyota-corona": { base: "Toyota Corona", aliases: ["corona"] },
  "toyota-2000gt": { base: "Toyota 2000GT", aliases: ["2000 ?gt"] },
  "toyota-sports-800": { base: "Toyota Sports 800", aliases: ["sports 800"] },
  "toyota-mark2": { base: "Toyota Mark II", aliases: ["mark ii|chaser|cresta"] },
  "toyota-mr2": { base: "Toyota MR2", aliases: ["mr2|mr-s"] },
  "toyota-86": { base: "Toyota 86", aliases: ["\\b86\\b|gt86|gr86|zn[68]"] },
  "toyota-4runner": { base: "Toyota 4Runner", aliases: ["4runner|hilux surf"] },
  "toyota-chr": { base: "Toyota C-HR", aliases: ["c-hr"] },
  "toyota-bz4x": { base: "Toyota bZ4X", aliases: ["bz4x"] },
  "toyota-fj-cruiser": { base: "Toyota FJ Cruiser", aliases: ["fj cruiser"] },
  "toyota-corolla-cross": { base: "Toyota Corolla Cross", aliases: ["corolla cross"] },
  "chevy-490": { base: "Chevrolet Series 490", aliases: ["490"] },
  "chevy-3100": { base: "Chevrolet Advance Design", aliases: ["advance design|3100|3600|3800"] },
  "chevy-bel-air": { base: "Chevrolet Bel Air", aliases: ["bel air"] },
  "chevy-ck": { base: "Chevrolet C/K", aliases: ["c/k|c-10|c10|k10|c20|cheyenne|silverado"] },
  "chevy-corvair": { base: "Chevrolet Corvair", aliases: ["corvair"] },
  "chevy-blazer-k5": { base: "Chevrolet K5 Blazer", aliases: ["blazer"] },
  "chevy-s10": { base: "Chevrolet S-10", aliases: ["s-10|s10"] },
  "chevy-aveo": { base: "Chevrolet Aveo", aliases: ["aveo|sonic|kalos"] },
  "chevy-onix": { base: "Chevrolet Onix", aliases: ["onix"] },
  "chevy-bolt": { base: "Chevrolet Bolt", aliases: ["bolt"] },
  "chevy-spark": { base: "Chevrolet Spark", aliases: ["spark|matiz"] },
  "chevy-trailblazer": { base: "Chevrolet TrailBlazer", aliases: ["trailblazer"] },
  "alfa-6-flagship": { base: "Alfa Romeo 6", aliases: ["romeo 6\\b|alfa 6\\b|alfa romeo sei"] },
  "alfa-gt-105": { base: "Alfa Romeo Giulia Sprint GT", aliases: ["sprint gt|gtv|gt junior|gt veloce|105"] },
  "alfa-spider-105": { base: "Alfa Romeo Spider 105", aliases: ["spider|duetto"] },
  "alfa-giulietta-750": { base: "Alfa Romeo Giulietta 1955", aliases: ["giulietta"] },
  "alfa-sz-rz": { base: "Alfa Romeo SZ", aliases: ["\\bsz\\b|\\brz\\b|es-?30"] },
  "alfa-gtv-spider-916": { base: "Alfa Romeo GTV 916", aliases: ["gtv|spider", "916|\\b19(9[5-9])\\b|\\b200[0-6]\\b"] },
  "alfa-8c-competizione": { base: "Alfa Romeo 8C Competizione", aliases: ["8c"] },
  "alfa-junior": { base: "Alfa Romeo Junior 2024", aliases: ["junior"] },
  "lotus-seven": { base: "Lotus Seven", aliases: ["seven"] },
  "lotus-elite-type14": { base: "Lotus Elite Type 14", aliases: ["elite"] },
  "lotus-elite-type75": { base: "Lotus Elite Type 75", aliases: ["elite"] },
  "lotus-elan-m100": { base: "Lotus Elan M100", aliases: ["elan"] },
  "porsche-356": { base: "Porsche 356", aliases: ["356"] },
  "porsche-550": { base: "Porsche 550", aliases: ["550"] },
  "porsche-912": { base: "Porsche 912", aliases: ["912"] },
  "porsche-914": { base: "Porsche 914", aliases: ["914"] },
  "porsche-928": { base: "Porsche 928", aliases: ["928"] },
  "porsche-959": { base: "Porsche 959", aliases: ["959"] },
  "porsche-918": { base: "Porsche 918 Spyder", aliases: ["918"] },
  "porsche-carrera-gt": { base: "Porsche Carrera GT", aliases: ["carrera gt"] },
  "ferrari-america": { base: "Ferrari 375 America", aliases: ["america|superamerica|superfast"] },
  "ferrari-365-family": { base: "Ferrari 365 GT", aliases: ["365"] },
  "ferrari-daytona": { base: "Ferrari 365 GTB/4 Daytona", aliases: ["daytona|365 gtb"] },
  "ferrari-dino-206-246": { base: "Dino 246 GT", aliases: ["dino|206|246"] },
  "ferrari-dino-308gt4": { base: "Ferrari Dino 308 GT4", aliases: ["308 gt4|gt4"] },
  "ferrari-bb": { base: "Ferrari 512 BB", aliases: ["512 bb|365 gt4 bb|berlinetta boxer|bbi"] },
  "ferrari-400": { base: "Ferrari 400", aliases: ["\\b400i?\\b|\\b412\\b|365 gt4"] },
  "ferrari-enzo": { base: "Enzo Ferrari car", aliases: ["enzo"] },
  "delorean-dmc12": { base: "DeLorean DMC-12", aliases: ["delorean|dmc"] },
  "saab-92": { base: "Saab 92", aliases: ["\\b92\\b"] },
  "saab-93": { base: "Saab 93", aliases: ["\\b93\\b"] },
  "saab-95": { base: "Saab 95", aliases: ["\\b95\\b"] },
  "saab-96": { base: "Saab 96", aliases: ["\\b96\\b"] },
  "saab-90": { base: "Saab 90", aliases: ["\\b90\\b"] },
  "saab-9-2x": { base: "Saab 9-2X", aliases: ["9-2x"] },
  "saab-9-7x": { base: "Saab 9-7X", aliases: ["9-7x"] },
  "saab-9-4x": { base: "Saab 9-4X", aliases: ["9-4x"] }
};
