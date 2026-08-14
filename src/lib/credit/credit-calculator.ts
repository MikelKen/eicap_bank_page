export interface CreditInput {
  exchangeRate: number;
  dollars: number;
  term: number;
  interestRate: number;
  desgravamenRate: number;
  frequency: number;
}

export interface CreditRow {
  number: number;
  capital: number;
  interest: number;
  desgravamen: number;
  merchandisePledge: number;
  propertyInsurance: number;
  cuota1: number;
  cuota: number;
  balance: number;
}

export interface CreditResult {
  amount: number;
  cuota: number;
  periods: number;
  rows: CreditRow[];
}

function round2(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

function pmt(rate: number, periods: number, presentValue: number): number {
  if (rate === 0) {
    return -presentValue / periods;
  }
  const factor = Math.pow(1 + rate, periods);
  return (-presentValue * rate * factor) / (factor - 1);
}

export function calculateCredit(input: CreditInput): CreditResult {
  const { exchangeRate, dollars, term, interestRate, desgravamenRate, frequency } =
    input;

  const amount = round2(exchangeRate * dollars);
  const periods = Math.floor(term / frequency);
  const empty: CreditResult = { amount, cuota: 0, periods: 0, rows: [] };

  if (amount <= 0 || periods <= 0) {
    return empty;
  }

  const monthlyRate = interestRate / 100 / 12;
  const rate = monthlyRate * frequency;
  const cuota = round2(pmt(rate, periods, -amount));
  const desgravamenBase = round2(
    ((desgravamenRate * dollars) / 1000) * exchangeRate,
  );

  const rows: CreditRow[] = [];
  let accumulatedCapital = 0;
  const merchandisePledge = 0;
  const propertyInsurance = 0;

  for (let i = 1; i <= periods; i++) {
    const balancePrev = round2(amount - accumulatedCapital);
    const interest = round2(balancePrev * monthlyRate * frequency);
    const desgravamen =
      i === 1
        ? desgravamenBase
        : round2(desgravamenBase * (balancePrev / amount));
    const cuota1 = cuota;
    const capital = round2(cuota1 - interest);
    const balance = round2(amount - (accumulatedCapital + capital));
    const cuotaTotal = round2(
      cuota1 + desgravamen + merchandisePledge + propertyInsurance,
    );

    accumulatedCapital = round2(accumulatedCapital + capital);

    rows.push({
      number: i,
      capital,
      interest,
      desgravamen,
      merchandisePledge,
      propertyInsurance,
      cuota1,
      cuota: cuotaTotal,
      balance,
    });
  }

  return { amount, cuota, periods, rows };
}
