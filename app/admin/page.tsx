import { organiserAccess } from "../../lib/organiser-auth";
import Dashboard from "./dashboard";
import "./admin.css";
export const dynamic="force-dynamic";
export const metadata={title:"Admin | Axcelasia RSVP",robots:{index:false,follow:false}};
export default async function Admin({searchParams}:{searchParams:Promise<{error?:string}>}){
 const {configured,authorised}=await organiserAccess();
 const {error}=await searchParams;
 if(!authorised)return <main className="admin-gate"><div className="gate-card"><p className="admin-kicker">AXCELASIA · ORGANISERS ONLY</p><span className="gate-icon" aria-hidden="true">↗</span><h1>Welcome back.</h1><p>Enter the organiser password to view RSVP responses, manage your guest list and download an Excel report.</p>{!configured?<p className="admin-error gate-error" role="alert">Organiser access is not configured yet. Set ADMIN_PASSWORD and ADMIN_SESSION_SECRET on the Railway service.</p>:<form className="gate-form" method="post" action="/api/admin/login"><label htmlFor="password">Organiser password</label><input id="password" name="password" type="password" autoComplete="current-password" required autoFocus/>{error&&<p className="admin-error gate-error" role="alert">{error==="password"?"That password is incorrect. Please try again.":"Please sign in from this page."}</p>}<button className="admin-primary" type="submit">Sign in <span>→</span></button></form>}<small>Guest responses are available only to approved organisers.</small></div></main>;
 return <Dashboard email="Organiser" signOutUrl="/api/admin/logout"/>;
}
