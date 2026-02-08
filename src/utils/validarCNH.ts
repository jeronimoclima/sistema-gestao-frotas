import dayjs from "dayjs";


export function cnhValida(validade: string): boolean {
return dayjs(validade).isAfter(dayjs());


}

