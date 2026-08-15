import { __toESM } from "../_runtime.mjs";
import { require_jsx_runtime, require_react } from "../_libs/@base-ui/react+[...].mjs";
import { Button$1 } from "./button-DORldgde.mjs";
import { Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Input$1 } from "./input-D-ih8VQd.mjs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./card-DxU141PH.mjs";
import { Select$1, SelectContent, SelectItem, SelectTrigger, SelectValue, Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "./table-ceAvqM03.mjs";
import { Field, FieldContent, FieldDescription, FieldLabel } from "./field-BnhY_mcb.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/view.credit-DqyIGeoP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function round2(value) {
	return Math.round((value + Number.EPSILON) * 100) / 100;
}
function pmt(rate, periods, presentValue) {
	if (rate === 0) return -presentValue / periods;
	const factor = Math.pow(1 + rate, periods);
	return -presentValue * rate * factor / (factor - 1);
}
function calculateCredit(input) {
	const { exchangeRate, dollars, term, interestRate, desgravamenRate, frequency } = input;
	const amount = round2(exchangeRate * dollars);
	const periods = Math.floor(term / frequency);
	const empty = {
		amount,
		cuota: 0,
		periods: 0,
		rows: []
	};
	if (amount <= 0 || periods <= 0) return empty;
	const monthlyRate = interestRate / 100 / 12;
	const cuota = round2(pmt(monthlyRate * frequency, periods, -amount));
	const desgravamenBase = round2(desgravamenRate * dollars / 1e3 * exchangeRate);
	const rows = [];
	let accumulatedCapital = 0;
	const merchandisePledge = 0;
	const propertyInsurance = 0;
	for (let i = 1; i <= periods; i++) {
		const balancePrev = round2(amount - accumulatedCapital);
		const interest = round2(balancePrev * monthlyRate * frequency);
		const desgravamen = i === 1 ? desgravamenBase : round2(desgravamenBase * (balancePrev / amount));
		const cuota1 = cuota;
		const capital = round2(cuota1 - interest);
		const balance = round2(amount - (accumulatedCapital + capital));
		const cuotaTotal = round2(cuota1 + desgravamen + merchandisePledge + propertyInsurance);
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
			balance
		});
	}
	return {
		amount,
		cuota,
		periods,
		rows
	};
}
var FREQUENCY_OPTIONS = [
	{
		label: "Mensual",
		value: 1
	},
	{
		label: "Trimestral",
		value: 3
	},
	{
		label: "Semestral",
		value: 6
	},
	{
		label: "Anual",
		value: 12
	}
];
function formatCurrency(value) {
	return value.toLocaleString("es-BO", {
		style: "currency",
		currency: "BOB"
	});
}
function ViewCredit({ client }) {
	const [exchangeRate, setExchangeRate] = (0, import_react.useState)(6.86);
	const [dollars, setDollars] = (0, import_react.useState)(0);
	const [term, setTerm] = (0, import_react.useState)(12);
	const [interestRate, setInterestRate] = (0, import_react.useState)(0);
	const [desgravamenRate, setDesgravamenRate] = (0, import_react.useState)(.9);
	const [frequency, setFrequency] = (0, import_react.useState)(1);
	const input = (0, import_react.useMemo)(() => ({
		exchangeRate,
		dollars,
		term,
		interestRate,
		desgravamenRate,
		frequency
	}), [
		exchangeRate,
		dollars,
		term,
		interestRate,
		desgravamenRate,
		frequency
	]);
	const result = (0, import_react.useMemo)(() => calculateCredit(input), [input]);
	const totalInterest = result.rows.reduce((acc, row) => acc + row.interest, 0);
	const totalDesgravamen = result.rows.reduce((acc, row) => acc + row.desgravamen, 0);
	const totalCuota = result.rows.reduce((acc, row) => acc + row.cuota, 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-1 flex-col gap-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-center justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "text-base font-semibold",
					children: "Cálculo de Crédito"
				}), client && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "rounded-full border bg-muted/50 px-3 py-1 text-sm",
					children: ["Cliente: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "font-medium",
						children: client.name
					})]
				})]
			}),
			!client && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardContent, {
				className: "flex flex-wrap items-center justify-between gap-2 py-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-sm text-muted-foreground",
					children: "No hay un cliente seleccionado. Puedes calcular un crédito sin asociar o elegir un cliente desde la lista."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button$1, {
					size: "sm",
					variant: "outline",
					render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, { to: "/dashboard/client" }),
					children: "Ir a Clientes"
				})]
			}) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Datos del Crédito" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardDescription, { children: "Completa los datos para calcular la cuota y la tabla de amortización." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "exchange-rate",
						children: "Cotización (Bs/USD)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "exchange-rate",
						type: "number",
						inputMode: "decimal",
						min: "0",
						step: "0.01",
						value: exchangeRate,
						onChange: (e) => setExchangeRate(Number(e.target.value))
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "dollars",
						children: "Dólares"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "dollars",
						type: "number",
						inputMode: "decimal",
						min: "0",
						step: "0.01",
						value: dollars,
						onChange: (e) => setDollars(Number(e.target.value))
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "amount",
						children: "Monto (Bs)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "amount",
						value: result.amount ? formatCurrency(result.amount) : "",
						readOnly: true,
						disabled: true
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "term",
						children: "Plazo (meses)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "term",
						type: "number",
						inputMode: "numeric",
						min: "1",
						step: "1",
						value: term,
						onChange: (e) => setTerm(Number(e.target.value))
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "interest-rate",
						children: "Tasa de interés (% anual)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "interest-rate",
						type: "number",
						inputMode: "decimal",
						min: "0",
						step: "0.01",
						value: interestRate,
						onChange: (e) => setInterestRate(Number(e.target.value))
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "desgravamen",
						children: "Desgravamen (‰)"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						id: "desgravamen",
						type: "number",
						inputMode: "decimal",
						min: "0",
						step: "0.01",
						value: desgravamenRate,
						onChange: (e) => setDesgravamenRate(Number(e.target.value))
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, {
						htmlFor: "frequency",
						children: "Frecuencia"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Select$1, {
						value: String(frequency),
						onValueChange: (value) => setFrequency(Number(value)),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectTrigger, {
							id: "frequency",
							className: "w-full",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectValue, { placeholder: "Selecciona una frecuencia" })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectContent, { children: FREQUENCY_OPTIONS.map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SelectItem, {
							value: String(option.value),
							children: option.label
						}, option.value)) })]
					}) })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Field, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FieldLabel, { children: "Cuota" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldContent, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input$1, {
						value: result.cuota ? formatCurrency(result.cuota) : "",
						readOnly: true,
						disabled: true
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(FieldDescription, { children: [
						"Cuota fija (Cuota 1) calculada con PMT sobre ",
						result.periods,
						" cuota(s)."
					] })] })] })
				]
			}) })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardHeader, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Tabla de Amortización" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardDescription, { children: [
				"Monto: ",
				formatCurrency(result.amount),
				" · Cuota:",
				" ",
				formatCurrency(result.cuota),
				" · Plazo: ",
				result.periods,
				" cuota(s)"
			] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardContent, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Table, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHeader, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, { children: "N.º" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Capital"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Interés"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Desgravamen"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Prenda Mercantil"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Seguro de Propiedad"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Cuota"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Cuota 1"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableHead, {
						className: "text-right",
						children: "Saldo"
					})
				] }) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableBody, { children: result.rows.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableRow, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
					colSpan: 9,
					className: "h-24 text-center",
					children: "Ingresa los datos del crédito para generar la tabla."
				}) }) : result.rows.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, { children: row.number }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.capital)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.interest)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.desgravamen)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.merchandisePledge)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.propertyInsurance)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.cuota)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.cuota1)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right",
						children: formatCurrency(row.balance)
					})
				] }, row.number)) }),
				result.rows.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableFooter, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(TableRow, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						colSpan: 1,
						className: "font-medium",
						children: "Totales"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: formatCurrency(result.amount)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: formatCurrency(totalInterest)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: formatCurrency(totalDesgravamen)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: formatCurrency(totalCuota)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: "—"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TableCell, {
						className: "text-right font-medium",
						children: "—"
					})
				] }) })
			] }) })] })
		]
	});
}
//#endregion
export { ViewCredit };
