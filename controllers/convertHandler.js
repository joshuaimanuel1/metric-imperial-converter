function ConvertHandler() {
  // 1. Fungsi mendapatkan angka
  this.getNum = function (input) {
    let resultRegex = /[a-z]+|[^a-z]+/gi;
    let match = input.match(resultRegex);

    if (!match) return 1;

    let result = match[0];

    // Jika karakter pertama adalah huruf, berarti tidak ada angka (default 1)
    if (/[a-z]/i.test(result)) {
      return 1;
    }

    // Cek Double Fraction (Error handling untuk kasus seperti 3/2/3)
    if ((result.match(/\//g) || []).length > 1) {
      return "invalid number";
    }

    // Evaluasi pecahan (misal: 1.5/3 atau 5/2)
    try {
      result = eval(result);
    } catch (e) {
      return "invalid number";
    }

    return result;
  };

  // 2. Fungsi mendapatkan unit
  this.getUnit = function (input) {
    let resultRegex = /[a-z]+|[^a-z]+/gi;
    let match = input.match(resultRegex);

    if (!match) return "invalid unit";

    // Ambil elemen yang merupakan huruf. Jika input '5kg', match[1] adalah unit. Jika 'kg', match[0] adalah unit.
    let unit =
      match.length === 1 && /[a-z]/i.test(match[0]) ? match[0] : match[1];

    if (!unit) return "invalid unit";

    unit = unit.toLowerCase();

    const validUnits = ["gal", "l", "mi", "km", "lbs", "kg"];

    if (!validUnits.includes(unit)) {
      return "invalid unit";
    }

    // Khusus Liter harus 'L' besar, sisanya kecil
    if (unit === "l") return "L";

    return unit;
  };

  // 3. Fungsi mendapatkan unit konversi (FIXED)
  this.getReturnUnit = function (initUnit) {
    const unitMap = {
      gal: "L",
      L: "gal",
      mi: "km",
      km: "mi",
      lbs: "kg",
      kg: "lbs",
    };

    // Pastikan input dinormalisasi dulu
    let unit = initUnit.toLowerCase();

    // Jika unit adalah 'l', ubah jadi 'L' agar cocok dengan key di unitMap
    if (unit === "l") {
      unit = "L";
    }

    return unitMap[unit] || "invalid unit";
  };

  // 4. Fungsi mengeja unit (Full name)
  this.spellOutUnit = function (unit) {
    const unitSpelling = {
      gal: "gallons",
      L: "liters",
      mi: "miles",
      km: "kilometers",
      lbs: "pounds",
      kg: "kilograms",
    };

    // Handle L besar atau l kecil untuk akses object key
    if (unit === "l" || unit === "L") return unitSpelling["L"];

    return unitSpelling[unit.toLowerCase()];
  };

  // 5. Fungsi Konversi Matematika
  this.convert = function (initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592; // Pastikan angkanya ini
    const miToKm = 1.60934;
    let result;

    // Normalisasi input
    const unit = initUnit.toLowerCase() === "l" ? "L" : initUnit.toLowerCase();

    switch (unit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break; // Lbs ke Kg = DIKALI
      case "kg":
        result = initNum / lbsToKg;
        break; // Kg ke Lbs = DIBAGI
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break;
      default:
        return undefined;
    }

    return parseFloat(result.toFixed(5));
  };

  // 6. Output String Lengkap
  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(
      initUnit
    )} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
}

module.exports = ConvertHandler;
