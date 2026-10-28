import { Globe2, Compass, UsersRound, Target, Presentation, BookOpen, MessagesSquare, MapPin, Clock3 } from "lucide-react";

export default function CompactInvitation() {
  return (
    <div className="v2-invitation">
      <p className="eyebrow v2-eyebrow"><span className="red-line" /> EXECUTIVE LEADERSHIP ROUNDTABLE</p>
      <h1>Business as usual is <em>over.</em></h1>
      <h2>The Digital, AI &amp; ESG Revolution</h2>

      <div className="v2-event-strip" aria-label="Event details">
        <div className="v2-calendar" aria-hidden="true"><span>DEC</span><strong>01</strong></div>
        <div className="v2-event-meta">
          <p><strong>Tuesday, 1 December 2026</strong><span className="v2-event-time"><Clock3 size={14} /> 2:00 – 5:00 PM MYT</span></p>
          <p><MapPin size={15} /><span>The Majestic Hotel Kuala Lumpur</span></p>
        </div>
      </div>

      <a className="v2-mobile-rsvp" href="#rsvp">Reserve your seat <span aria-hidden="true">↓</span></a>

      <div className="v2-copy">
        <article className="v2-insight">
          <h3><span><Globe2 size={18} strokeWidth={1.6} aria-hidden="true" /></span>Business is changing</h3>
          <p>Digital disruption, artificial intelligence and rising ESG expectations are fundamentally changing how businesses compete, create value and remain relevant.</p>
        </article>
        <article className="v2-insight">
          <h3><span><Compass size={18} strokeWidth={1.6} aria-hidden="true" /></span>Leadership must evolve</h3>
          <p>The question is no longer whether these forces will reshape our industries, but whether our organisations and our leadership are evolving fast enough to stay ahead. <strong>What worked yesterday may no longer be enough for tomorrow.</strong></p>
        </article>
        <article className="v2-insight">
          <h3><span><UsersRound size={18} strokeWidth={1.6} aria-hidden="true" /></span>An exclusive exchange</h3>
          <p>Join us for an <strong>exclusive Executive Leadership Roundtable</strong>, bringing together business leaders for a candid, thought-provoking exchange on the opportunities, risks and difficult choices ahead.</p>
        </article>
        <article className="v2-insight">
          <h3><span><Target size={18} strokeWidth={1.6} aria-hidden="true" /></span>The strategic choices ahead</h3>
          <p>Beyond the buzzwords and technology hype, we will explore what truly matters: where to invest, what to rethink, and how to lead organisations through change without losing sight of long-term value.</p>
        </article>
      </div>

      <ul className="v2-experience-points" aria-label="What to expect from the roundtable">
        <li><Presentation size={20} strokeWidth={1.6} aria-hidden="true" /><p><strong>No lengthy presentations.</strong></p></li>
        <li><BookOpen size={20} strokeWidth={1.6} aria-hidden="true" /><p><strong>No textbook answers.</strong></p></li>
        <li><MessagesSquare size={20} strokeWidth={1.6} aria-hidden="true" /><p><strong>Just meaningful conversations</strong> among leaders navigating the same challenges.</p></li>
      </ul>

      <p className="v2-closing">The future of business is being shaped today. <strong>Be part of the conversation.</strong></p>
    </div>
  );
}
