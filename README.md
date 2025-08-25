# Higher Ground Speech Therapy Website

A mobile-first, low-sensory website for Higher Ground Speech Therapy, built with Next.js and TailwindCSS. Features bilingual support (English/Spanish), accessibility-first design, and a trauma-informed approach.

## Features

- 🌐 **Bilingual Support**: English and Spanish language toggle
- ♿ **Accessibility First**: Skip links, semantic HTML, focus management
- 📱 **Mobile-First Design**: Responsive layout optimized for all devices
- 🧠 **Low-Sensory Design**: Minimal motion, high contrast, clear typography
- 🎨 **Modern UI**: Clean, professional design with TailwindCSS
- 🚀 **Performance**: Optimized images, minimal JavaScript, fast loading

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Styling**: TailwindCSS with custom design tokens
- **Language**: TypeScript
- **Fonts**: Inter (Google Fonts)
- **Deployment**: Ready for Vercel, Netlify, or any static hosting

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd higher-ground-speech-therapy
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/
│   ├── globals.css          # Global styles and CSS variables
│   ├── layout.tsx           # Root layout with metadata
│   └── page.tsx             # Homepage component
├── public/
│   └── images/              # Static images
├── package.json             # Dependencies and scripts
├── tailwind.config.js       # TailwindCSS configuration
├── tsconfig.json            # TypeScript configuration
└── README.md                # This file
```

## Customization

### Design Tokens

The website uses CSS custom properties for consistent theming. Colors are defined in `app/globals.css`:

```css
:root {
  --app: hsl(180 33% 98%);      /* Background */
  --ink: hsl(210 25% 12%);      /* Text */
  --muted: hsl(210 10% 35%);    /* Secondary text */
  --line: hsl(200 20% 90%);     /* Borders */
  --soft: hsl(180 33% 96%);     /* Cards/sections */
}
```

### Content Updates

All text content is managed in the `translations` object in `app/page.tsx`. Update the English and Spanish text as needed.

### Images

Replace the placeholder image in `public/images/laura-placeholder.jpg` with an actual optimized image of Laura.

## Building for Production

```bash
npm run build
npm start
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify

1. Build the project: `npm run build`
2. Deploy the `out` directory to Netlify

### Other Hosting

The site can be deployed to any static hosting service. Build with `npm run build` and serve the static files.

## Accessibility Features

- Skip to content links
- Semantic HTML structure
- Proper heading hierarchy
- Focus management
- Screen reader support
- High contrast design
- Reduced motion support

## SEO Features

- Meta tags for social sharing
- Structured data ready
- Semantic HTML
- Fast loading times
- Mobile-friendly design

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is proprietary to Higher Ground Speech Therapy.

## Contact

For questions about this website, contact Higher Ground Speech Therapy.

---

Built with ❤️ for accessible, inclusive speech therapy care. 