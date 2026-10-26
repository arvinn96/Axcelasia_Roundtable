export type Registration = { id: string; name: string; company: string; phone: string; spa: "yes" | "no"; createdAt: string };
export function filterRegistrations<T extends Pick<Registration, "name" | "company" | "phone" | "spa">>(rows: T[], query: string, spa: string) {
  const search = query.trim().toLowerCase();
  return rows.filter(row => (spa !== "yes" && spa !== "no" || row.spa === spa) && (!search || [row.name,row.company,row.phone].some(value => value.toLowerCase().includes(search))));
}
export function registrationDate(value: string) {
  return new Intl.DateTimeFormat("en-MY", { timeZone:"Asia/Kuala_Lumpur", day:"2-digit", month:"short", year:"numeric", hour:"2-digit", minute:"2-digit", hour12:true }).format(new Date(value));
}
