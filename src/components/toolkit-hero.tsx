import { ArrowDown, ArrowUpRight, BookOpen, Dices, Map, UserRound } from "lucide-react";

export function ToolkitHero({ count }: { count: number }) {
  return (
    <section className="toolkit-hero" aria-labelledby="hub-title">
      <div className="toolkit-hero-copy">
        <p className="toolkit-eyebrow"><span /> YOUR D&D WORKSPACE</p>
        <h1 id="hub-title">Less prep.<br /><em>More adventure.</em></h1>
        <p className="toolkit-intro">Your characters, encounters, worlds, and stories.<br className="desktop-break" /> Finally, a place to bring it all together.</p>
        <div className="toolkit-hero-actions"><a href="#toolkit" className="toolkit-primary">Explore your toolkit <ArrowDown size={16} /></a>
          <a href="#workbench" className="toolkit-text-link">Open the workbench <ArrowUpRight size={15} /></a></div>
        <div className="toolkit-hero-foot"><span><b>{count}</b> projects, one home</span><i /><span>Made for your table</span></div>
      </div>
      <div className="toolkit-table-scene" aria-hidden="true">
        <div className="table-orbit orbit-one" /><div className="table-orbit orbit-two" />
        <span className="scene-caption">A GOOD SESSION STARTS HERE</span>
        <div className="scene-card scene-map"><Map /><span>THE WORLD</span><strong>Set the scene.</strong><div className="scene-map-grid" /></div>
        <div className="scene-card scene-character"><UserRound /><span>THE PARTY</span><strong>Meet your heroes.</strong><div className="scene-character-bars"><i /><i /><i /></div></div>
        <div className="scene-card scene-story"><BookOpen /><span>THE STORY</span><strong>Make it yours.</strong><div className="scene-story-lines"><i /><i /><i /></div></div>
        <div className="scene-die"><Dices /><span>LET'S ROLL</span></div>
        <span className="scene-star star-one">✦</span><span className="scene-star star-two">✧</span>
      </div>
    </section>
  );
}
