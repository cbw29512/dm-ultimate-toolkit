# DM Ultimate Toolkit

One hub for every D&D site Chris Wilson has shipped.

- **Hub** — live sites, repos with no site yet, and the workbench already folded here
- **Batch** — open a site, come back, mark Keep / Fold / Park / Later, next
- **Workbench** — starter fight (level 1 fighter vs two goblins), forge, maps, cards, dice, healing box, scribe, translator

D&D only. Concealed Carry Crossing and Pet Health Log are not on this site.

## Hosting

This site deploys on **Netlify**, same as the rest of the table tools.

- Repo: [cbw29512/dm-ultimate-toolkit](https://github.com/cbw29512/dm-ultimate-toolkit)
- Build: `npm run build`
- Publish directory: `dist`
- Node 22

## Iron Pit

The certified combat engine is **not** in this repo. It lives in [D20-ironpit](https://github.com/cbw29512/D20-ironpit) and at [ironpit.netlify.app](https://ironpit.netlify.app). This hub links to it and ships a small starter loop only.

## Notes

Marks from a batch pass stay on the device that made them (`localStorage`).
