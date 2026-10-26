import { requireOrganiserApi } from "../../../../lib/organiser-auth";
import { getRegistrations,filterRegistrations,registrationDate } from "../../../../lib/rsvp-data";
import { createWorkbook } from "../../../../lib/xlsx";
export const dynamic="force-dynamic";
export async function GET(request:Request){
  const denied=await requireOrganiserApi();if(denied)return denied;
  try{const url=new URL(request.url),rows=filterRegistrations(await getRegistrations(),url.searchParams.get("q")||"",url.searchParams.get("spa")||"all");
    const data=createWorkbook(rows.map(row=>[row.name,row.designation,row.company,row.email,row.phone,row.spa==="yes"?"Yes":"No",row.consentAt?registrationDate(row.consentAt):"Not recorded",registrationDate(row.createdAt)]));
    return new Response(data as BodyInit,{headers:{"Content-Type":"application/vnd.openxmlformats-officedocument.spreadsheetml.sheet","Content-Disposition":`attachment; filename="axcelasia-rsvp-${new Date().toISOString().slice(0,10)}.xlsx"`,"Cache-Control":"private, no-store","X-Content-Type-Options":"nosniff"}});
  }catch{return Response.json({error:"Could not export registrations. Please try again."},{status:503,headers:{"Cache-Control":"no-store"}});}
}
