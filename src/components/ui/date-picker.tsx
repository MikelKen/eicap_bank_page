"use client";

import * as React from "react";
import { CalendarIcon } from "lucide-react";

import { Calendar } from "@/components/ui/calendar";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

function formatDisplayDate(date: Date | undefined) {
  if (!date) return "";
  return date.toLocaleDateString("es-ES", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export function toISODate(date: Date | undefined) {
  if (!date) return "";
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function isValidDate(date: Date | undefined) {
  return !!date && !isNaN(date.getTime());
}

interface DatePickerProps {
  id?: string;
  label?: string;
  value?: Date;
  defaultToToday?: boolean;
  onChange?: (date: Date | undefined) => void;
  placeholder?: string;
  className?: string;
}

export function DatePicker({
  id = "date-picker",
  label,
  value,
  defaultToToday = true,
  onChange,
  placeholder = "Selecciona una fecha",
  className,
}: DatePickerProps) {
  const [open, setOpen] = React.useState(false);
  const [internalDate, setInternalDate] = React.useState<Date | undefined>(
    value ?? (defaultToToday ? new Date() : undefined),
  );

  // Soporta uso controlado (con "value") o no controlado (interno)
  const date = value !== undefined ? value : internalDate;
  const [month, setMonth] = React.useState<Date | undefined>(date);
  const [textValue, setTextValue] = React.useState(formatDisplayDate(date));

  React.useEffect(() => {
    setTextValue(formatDisplayDate(date));
    setMonth(date);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date?.getTime()]);

  const updateDate = (newDate: Date | undefined) => {
    if (value === undefined) {
      setInternalDate(newDate);
    }
    onChange?.(newDate);
  };

  const content = (
    <InputGroup className={className}>
      <InputGroupInput
        id={id}
        value={textValue}
        placeholder={placeholder}
        onChange={(e) => {
          const parsed = new Date(e.target.value);
          setTextValue(e.target.value);
          if (isValidDate(parsed)) {
            updateDate(parsed);
          }
        }}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
      />
      <InputGroupAddon align="inline-end">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger>
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              aria-label="Seleccionar fecha"
            >
              <CalendarIcon />
              <span className="sr-only">Seleccionar fecha</span>
            </InputGroupButton>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto overflow-hidden p-0"
            align="end"
            alignOffset={-8}
            sideOffset={10}
          >
            <Calendar
              mode="single"
              selected={date}
              month={month}
              onMonthChange={setMonth}
              onSelect={(newDate) => {
                updateDate(newDate);
                setOpen(false);
              }}
            />
          </PopoverContent>
        </Popover>
      </InputGroupAddon>
    </InputGroup>
  );

  if (!label) return content;

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      {content}
    </Field>
  );
}
