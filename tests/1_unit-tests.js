const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function () {
  test("Whole number input", function (done) {
    assert.equal(convertHandler.getNum("32L"), 32);
    done();
  });

  test("Decimal number input", function (done) {
    assert.equal(convertHandler.getNum("3.2L"), 3.2);
    done();
  });

  test("Fractional input", function (done) {
    assert.equal(convertHandler.getNum("1/2L"), 0.5);
    done();
  });

  test("Fractional input with decimal", function (done) {
    assert.equal(convertHandler.getNum("5.4/3L"), 1.8);
    done();
  });

  test("Double fraction error", function (done) {
    assert.equal(convertHandler.getNum("3/2/3L"), "invalid number");
    done();
  });

  test("No numerical input defaults to 1", function (done) {
    assert.equal(convertHandler.getNum("L"), 1);
    done();
  });

  test("Read each valid input unit", function (done) {
    const input = [
      "gal",
      "l",
      "mi",
      "km",
      "lbs",
      "kg",
      "GAL",
      "L",
      "MI",
      "KM",
      "LBS",
      "KG",
    ];
    const output = [
      "gal",
      "L",
      "mi",
      "km",
      "lbs",
      "kg",
      "gal",
      "L",
      "mi",
      "km",
      "lbs",
      "kg",
    ];
    input.forEach(function (ele, index) {
      assert.equal(convertHandler.getUnit(ele), output[index]);
    });
    done();
  });

  test("Unknown unit input error", function (done) {
    assert.equal(convertHandler.getUnit("34kilograms"), "invalid unit");
    done();
  });

  test("Return unit for each valid input unit", function (done) {
    const input = ["gal", "l", "mi", "km", "lbs", "kg"];
    const expect = ["L", "gal", "km", "mi", "kg", "lbs"];
    input.forEach(function (ele, i) {
      assert.equal(convertHandler.getReturnUnit(ele), expect[i]);
    });
    done();
  });

  test("Spelled-out string unit for each valid input unit", function (done) {
    const input = ["gal", "l", "mi", "km", "lbs", "kg"];
    const expect = [
      "gallons",
      "liters",
      "miles",
      "kilometers",
      "pounds",
      "kilograms",
    ];
    input.forEach(function (ele, i) {
      assert.equal(convertHandler.spellOutUnit(ele), expect[i]);
    });
    done();
  });

  test("Convert gal to L", function (done) {
    assert.approximately(convertHandler.convert(5, "gal"), 18.92705, 0.1);
    done();
  });

  test("Convert L to gal", function (done) {
    assert.approximately(convertHandler.convert(5, "L"), 1.32086, 0.1);
    done();
  });

  test("Convert mi to km", function (done) {
    assert.approximately(convertHandler.convert(5, "mi"), 8.0467, 0.1);
    done();
  });

  test("Convert km to mi", function (done) {
    assert.approximately(convertHandler.convert(5, "km"), 3.10686, 0.1);
    done();
  });

  test("Convert lbs to kg", function (done) {
    assert.approximately(convertHandler.convert(5, "lbs"), 2.26796, 0.1);
    done();
  });

  test("Convert kg to lbs", function (done) {
    assert.approximately(convertHandler.convert(5, "kg"), 11.02312, 0.1);
    done();
  });
});
