import { Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import type { Client } from "#/services/client/client.type";
import { Button } from "#/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "#/components/ui/card";
import { Field, FieldContent, FieldDescription, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "#/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "#/components/table/table";
import {
  calculateCredit,
  type CreditInput,
  type CreditResult,
} from "#/lib/credit/credit-calculator";

const FREQUENCY_OPTIONS = [
  { label: "Mensual", value: 1 },
  { label: "Trimestral", value: 3 },
  { label: "Semestral", value: 6 },
  { label: "Anual", value: 12 },
] as const;

function formatCurrency(value: number): string {
  return value.toLocaleString("es-BO", {
    style: "currency",
    currency: "BOB",
  });
}

interface ViewCreditProps {
  client?: Client | null;
}

export function ViewCredit({ client }: ViewCreditProps) {
  const [exchangeRate, setExchangeRate] = useState(6.86);
  const [dollars, setDollars] = useState(0);
  const [term, setTerm] = useState(12);
  const [interestRate, setInterestRate] = useState(0);
  const [desgravamenRate, setDesgravamenRate] = useState(0.9);
  const [frequency, setFrequency] = useState<number>(1);

  const input: CreditInput = useMemo(
    () => ({ exchangeRate, dollars, term, interestRate, desgravamenRate, frequency }),
    [exchangeRate, dollars, term, interestRate, desgravamenRate, frequency],
  );

  const result: CreditResult = useMemo(() => calculateCredit(input), [input]);

  const totalInterest = result.rows.reduce((acc, row) => acc + row.interest, 0);
  const totalDesgravamen = result.rows.reduce(
    (acc, row) => acc + row.desgravamen,
    0,
  );
  const totalCuota = result.rows.reduce((acc, row) => acc + row.cuota, 0);

  return (
    <div className="flex flex-1 flex-col gap-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h2 className="text-base font-semibold">Cálculo de Crédito</h2>
        {client && (
          <span className="rounded-full border bg-muted/50 px-3 py-1 text-sm">
            Cliente: <span className="font-medium">{client.name}</span>
          </span>
        )}
      </div>

      {!client && (
        <Card>
          <CardContent className="flex flex-wrap items-center justify-between gap-2 py-4">
            <p className="text-sm text-muted-foreground">
              No hay un cliente seleccionado. Puedes calcular un crédito sin
              asociar o elegir un cliente desde la lista.
            </p>
            <Button size="sm" variant="outline" render={<Link to="/dashboard/client" />}>
              Ir a Clientes
            </Button>
          </CardContent>
        </Card>
      )}

      <Card>
        <CardHeader>
          <CardTitle>Datos del Crédito</CardTitle>
          <CardDescription>
            Completa los datos para calcular la cuota y la tabla de amortización.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            <Field>
              <FieldLabel htmlFor="exchange-rate">Cotización (Bs/USD)</FieldLabel>
              <FieldContent>
                <Input
                  id="exchange-rate"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={exchangeRate}
                  onChange={(e) => setExchangeRate(Number(e.target.value))}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="dollars">Dólares</FieldLabel>
              <FieldContent>
                <Input
                  id="dollars"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={dollars}
                  onChange={(e) => setDollars(Number(e.target.value))}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="amount">Monto (Bs)</FieldLabel>
              <FieldContent>
                <Input
                  id="amount"
                  value={result.amount ? formatCurrency(result.amount) : ""}
                  readOnly
                  disabled
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="term">Plazo (meses)</FieldLabel>
              <FieldContent>
                <Input
                  id="term"
                  type="number"
                  inputMode="numeric"
                  min="1"
                  step="1"
                  value={term}
                  onChange={(e) => setTerm(Number(e.target.value))}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="interest-rate">Tasa de interés (% anual)</FieldLabel>
              <FieldContent>
                <Input
                  id="interest-rate"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value))}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="desgravamen">Desgravamen (‰)</FieldLabel>
              <FieldContent>
                <Input
                  id="desgravamen"
                  type="number"
                  inputMode="decimal"
                  min="0"
                  step="0.01"
                  value={desgravamenRate}
                  onChange={(e) => setDesgravamenRate(Number(e.target.value))}
                />
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel htmlFor="frequency">Frecuencia</FieldLabel>
              <FieldContent>
                <Select
                  value={String(frequency)}
                  onValueChange={(value) => setFrequency(Number(value))}
                >
                  <SelectTrigger id="frequency" className="w-full">
                    <SelectValue placeholder="Selecciona una frecuencia" />
                  </SelectTrigger>
                  <SelectContent>
                    {FREQUENCY_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={String(option.value)}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FieldContent>
            </Field>
            <Field>
              <FieldLabel>Cuota</FieldLabel>
              <FieldContent>
                <Input
                  value={result.cuota ? formatCurrency(result.cuota) : ""}
                  readOnly
                  disabled
                />
                <FieldDescription>
                  Cuota fija (Cuota 1) calculada con PMT sobre {result.periods} cuota(s).
                </FieldDescription>
              </FieldContent>
            </Field>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Tabla de Amortización</CardTitle>
          <CardDescription>
            Monto: {formatCurrency(result.amount)} · Cuota:{" "}
            {formatCurrency(result.cuota)} · Plazo: {result.periods} cuota(s)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>N.º</TableHead>
                <TableHead className="text-right">Capital</TableHead>
                <TableHead className="text-right">Interés</TableHead>
                <TableHead className="text-right">Desgravamen</TableHead>
                <TableHead className="text-right">Prenda Mercantil</TableHead>
                <TableHead className="text-right">Seguro de Propiedad</TableHead>
                <TableHead className="text-right">Cuota</TableHead>
                <TableHead className="text-right">Cuota 1</TableHead>
                <TableHead className="text-right">Saldo</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {result.rows.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={9} className="h-24 text-center">
                    Ingresa los datos del crédito para generar la tabla.
                  </TableCell>
                </TableRow>
              ) : (
                result.rows.map((row) => (
                  <TableRow key={row.number}>
                    <TableCell>{row.number}</TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.capital)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.interest)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.desgravamen)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.merchandisePledge)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.propertyInsurance)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.cuota)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.cuota1)}
                    </TableCell>
                    <TableCell className="text-right">
                      {formatCurrency(row.balance)}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
            {result.rows.length > 0 && (
              <TableFooter>
                <TableRow>
                  <TableCell colSpan={1} className="font-medium">
                    Totales
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(result.amount)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(totalInterest)}
                  </TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(totalDesgravamen)}
                  </TableCell>
                  <TableCell className="text-right font-medium">—</TableCell>
                  <TableCell className="text-right font-medium">—</TableCell>
                  <TableCell className="text-right font-medium">
                    {formatCurrency(totalCuota)}
                  </TableCell>
                  <TableCell className="text-right font-medium">—</TableCell>
                  <TableCell className="text-right font-medium">—</TableCell>
                </TableRow>
              </TableFooter>
            )}
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
