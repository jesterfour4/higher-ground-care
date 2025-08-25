// Script to update all page headers to the new mobile-friendly design
// This is a reference for manual updates

const newHeaderStructure = `
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-app/70 border-b border-app-line">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-3">
          {/* Top row - Logo and actions */}
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <LogoMark />
              <div className="leading-tight hidden sm:block">
                <p className="font-semibold tracking-tight text-lg">{BRAND}</p>
                <p className="text-sm text-app-muted">{t.tagline}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <LangToggle lang={lang} setLang={setLang} />
              <button 
                onClick={openContactModal}
                className="rounded-2xl bg-app-ink/90 px-3 py-2 text-sm font-medium text-app hover:bg-app-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-app-ink/40"
              >
                {t.cta}
              </button>
              <a
                href="https://chatgpt.com/g/g-68ab9b39de488191a3feee3a12af6250-higher-ground-guide"
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-2xl bg-[color:var(--green)] px-3 py-2 text-sm font-medium text-app-ink/90 hover:opacity-95 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--green)]/40"
              >
                {t.higherGroundGuide}
              </a>
            </div>
          </div>
          
          {/* Bottom row - Navigation */}
          <nav aria-label={t.primaryNav} className="flex items-center justify-center gap-4 sm:gap-6 text-sm">
            <NavLink href="/">{t.nav.home}</NavLink>
            <NavLink href="/services">{t.nav.services}</NavLink>
            <NavLink href="/the-center">{t.nav.theCenter}</NavLink>
            <NavLink href="/community">{t.nav.community}</NavLink>
            <NavLink href="/about">{t.nav.about}</NavLink>
          </nav>
        </div>
      </header>
`;

console.log('New header structure for reference:');
console.log(newHeaderStructure);

// ✅ ALL PAGES HAVE BEEN SUCCESSFULLY UPDATED!
const updatedPages = [
  'app/page.tsx ✅',
  'app/services/page.tsx ✅',
  'app/about/page.tsx ✅',
  'app/the-center/page.tsx ✅',
  'app/community/page.tsx ✅',
  'app/privacy/page.tsx ✅',
  'app/land-acknowledgement/page.tsx ✅'
];

console.log('\n🎉 All page headers have been updated to the new mobile-friendly design!');
console.log('\nUpdated pages:');
updatedPages.forEach(page => console.log(`- ${page}`));

console.log('\nKey improvements made:');
console.log('- Split header into two rows for better mobile layout');
console.log('- Reduced button padding from px-4 to px-3');
console.log('- Hidden tagline on small screens (hidden sm:block)');
console.log('- Centered navigation below logo and actions');
console.log('- Consistent spacing and responsive design across all pages');
