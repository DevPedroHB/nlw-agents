import {
	type DateArg,
	formatRelative as dateFnsFormatRelative,
	type FormatRelativeOptions,
} from "date-fns";
import { ptBR } from "date-fns/locale";

export function formatRelative(
	date: DateArg<Date> & {},
	baseDate: DateArg<Date> & {},
	options?: FormatRelativeOptions,
) {
	return dateFnsFormatRelative(date, baseDate, {
		locale: ptBR,
		...options,
	});
}
