import { requireOrganiserApi } from "../../../../lib/organiser-auth";
import { getRegistrations } from "../../../../lib/rsvp-data";
export const dynamic="force-dynamic";
export async function GET(){
  const denied=await requireOrganiserApi();if(denied)return denied;
  try{return Response.json({registrations:await getRegistrations(),updatedAt:new Date().toISOString()},{headers:{"Cache-Control":"private, no-store"}});}
  catch{return Response.json({error:"Could not load registrations. Please try again."},{status:503,headers:{"Cache-Control":"no-store"}});}
}
