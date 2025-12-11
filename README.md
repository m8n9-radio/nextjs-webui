# 📻 Radio Frontend

Un player modern de radio streaming construit cu Next.js 16, React 19, și HeroUI. Suportă streaming Icecast cu metadata în timp real (titlul piesei și artwork).

## ✨ Caracteristici

- 🎵 **Streaming Icecast** cu metadata în timp real
- 🎨 **UI Modern** cu HeroUI și Tailwind CSS
- 🌓 **Dark/Light Mode** cu next-themes
- 📱 **Responsive Design** optimizat pentru toate dispozitivele
- ♿ **Accessible** (WCAG compliant)
- 🚀 **Performance** optimizat cu React Compiler
- 🐳 **Docker Ready** pentru deployment ușor
- 🎯 **TypeScript** strict mode pentru type safety

## 🛠️ Tehnologii

- **Framework:** Next.js 16.0.3 (App Router)
- **React:** 19.2.0
- **UI Library:** HeroUI 2.x
- **Styling:** Tailwind CSS 4
- **Audio Player:** icecast-metadata-player
- **Linting:** Biome 2.2.0
- **Type Checking:** TypeScript 5

## 📋 Cerințe

- Node.js 20+ sau 22+
- Yarn (recomandat) sau npm
- Un server Icecast cu metadata activată

## 🚀 Instalare

### 1. Clonează repository-ul

```bash
git clone <repository-url>
cd radio_frontend
```

### 2. Instalează dependențele

```bash
yarn install
# sau
npm install
```

### 3. Configurează variabilele de mediu

Creează un fișier `.env.local` în root:

```bash
cp .env.example .env.local
```

Editează `.env.local` cu datele tale:

```env
# URL-ul serverului Icecast (fără trailing slash)
NEXT_PUBLIC_ICECAST_HOST=https://stream.example.com

# Mount point-ul stream-ului (cu leading slash)
NEXT_PUBLIC_ICECAST_MOUNT=/live

# Numele stației radio
NEXT_PUBLIC_RADIO_NAME="My Radio Station"

# (Opțional) Parola admin Icecast
ICECAST_ADMIN_PASSWORD=your_password
```

### 4. Pornește serverul de development

```bash
yarn dev
```

Aplicația va fi disponibilă la [http://localhost:3000](http://localhost:3000)

## 📦 Build pentru producție

### Build local

```bash
# Verifică linting și type checking
yarn validate

# Build pentru producție
yarn build

# Pornește serverul de producție
yarn start
```

### Build cu Docker

```bash
# Build imagine Docker
yarn docker:build

# Rulează containerul
yarn docker:run
```

Sau manual:

```bash
docker build -t radio-frontend .
docker run -p 3000:3000 --env-file .env.local radio-frontend
```

## 🎮 Comenzi disponibile

| Comandă             | Descriere                                              |
| ------------------- | ------------------------------------------------------ |
| `yarn dev`          | Pornește serverul de development                       |
| `yarn build`        | Build pentru producție                                 |
| `yarn start`        | Pornește serverul de producție                         |
| `yarn lint`         | Verifică codul cu Biome                                |
| `yarn lint:fix`     | Corectează automat problemele de linting               |
| `yarn format`       | Formatează codul                                       |
| `yarn type-check`   | Verifică tipurile TypeScript                           |
| `yarn validate`     | Rulează toate verificările (lint + type-check + build) |
| `yarn docker:build` | Build imagine Docker                                   |
| `yarn docker:run`   | Rulează containerul Docker                             |

## 📁 Structura proiectului

```
radio_frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── (home)/
│   │   │   └── page.tsx             # Pagina principală
│   │   ├── api/
│   │   │   └── health/              # Health check endpoint
│   │   └── layout.tsx               # Layout principal
│   ├── assets/
│   │   └── globals.css              # Stiluri globale
│   ├── components/
│   │   ├── error-boundary/          # Error boundary component
│   │   ├── stream-player/           # Player component
│   │   │   ├── player/
│   │   │   │   ├── player.component.tsx
│   │   │   │   ├── player.hook.ts
│   │   │   │   └── player-skeleton.component.tsx
│   │   │   └── stream-player.component.tsx
│   │   └── theme-switch/            # Dark/Light mode switch
│   ├── constants/
│   │   └── player.constants.ts      # Constante player
│   ├── icons/
│   │   ├── player.icon.ts           # Iconițe player
│   │   └── theme.icon.ts            # Iconițe theme
│   ├── libs/
│   │   ├── cn.lib.ts                # Utility pentru className
│   │   ├── env.lib.ts               # Validare env variables
│   │   ├── font.lib.ts              # Configurare font
│   │   └── metadata.lib.ts          # Metadata SEO
│   ├── provider/
│   │   └── index.tsx                # Providers (HeroUI, Theme)
│   └── types/
│       └── player.types.ts          # Tipuri TypeScript
├── public/
│   ├── favicon.ico
│   ├── robots.txt
│   └── vinil.png                    # Imagine default player
├── .env.example                     # Exemplu variabile de mediu
├── .env.local                       # Variabile de mediu (nu se commitează)
├── biome.json                       # Configurare Biome
├── Dockerfile                       # Docker configuration
├── next.config.ts                   # Configurare Next.js
├── package.json
├── tsconfig.json                    # Configurare TypeScript
└── README.md
```

## 🎨 Personalizare

### Schimbă tema

Editează `src/provider/index.tsx` pentru a modifica tema default:

```tsx
<ThemeProvider
  attribute="class"
  defaultTheme="dark"  // sau "light"
  enableSystem={true}
  themes={["light", "dark"]}
>
```

### Adaugă stiluri custom

Editează `src/assets/globals.css` pentru stiluri globale.

### Modifică constante player

Editează `src/constants/player.constants.ts`:

```tsx
export const PLAYER_DEFAULTS = {
  VOLUME: 50, // Volumul inițial (0-100)
  VOLUME_STEP: 25, // Pasul slider-ului
  MIN_VOLUME: 0,
  MAX_VOLUME: 100,
} as const;
```

## 🔧 Configurare Icecast

Pentru ca metadata să funcționeze corect, serverul Icecast trebuie configurat:

```xml
<mount>
  <mount-name>/live</mount-name>
  <stream-name>My Radio Station</stream-name>
  <stream-description>Live Stream</stream-description>
  <stream-url>https://example.com</stream-url>
  <genre>Various</genre>
  <public>1</public>

  <!-- Important pentru metadata -->
  <icy-metadata>1</icy-metadata>
</mount>
```

## 🌐 Deployment

### Vercel (Recomandat)

1. Push codul pe GitHub
2. Importă proiectul în Vercel
3. Adaugă variabilele de mediu în Vercel Dashboard
4. Deploy automat

### Docker

```bash
# Build
docker build -t radio-frontend .

# Run
docker run -d \
  -p 3000:3000 \
  -e NEXT_PUBLIC_ICECAST_HOST=https://stream.example.com \
  -e NEXT_PUBLIC_ICECAST_MOUNT=/live \
  -e NEXT_PUBLIC_RADIO_NAME="My Radio" \
  --name radio-frontend \
  radio-frontend
```

### VPS/Server

```bash
# Build
yarn build

# Folosește PM2 pentru process management
pm2 start yarn --name "radio-frontend" -- start
```

## 🐛 Troubleshooting

### Player-ul nu pornește

- Verifică că variabilele de mediu sunt setate corect
- Verifică că serverul Icecast este accesibil
- Verifică consola browser-ului pentru erori CORS

### Metadata nu se actualizează

- Verifică că serverul Icecast are `icy-metadata` activat
- Verifică că sursa audio trimite metadata corect

### Erori de autoplay

- Browser-ele moderne blochează autoplay-ul cu sunet
- Player-ul pornește muted și utilizatorul trebuie să dea click pe play
- Aceasta este o restricție a browser-ului, nu un bug

## 🤝 Contribuții

Pentru contribuții, te rog să deschizi un issue sau pull request.

## � Toask List - Features viitoare

### 🎯 Statistici Ascultători

- [ ] **Total ascultători**

  - [ ] Endpoint API pentru statistici Icecast (`/admin/stats`)
  - [ ] Component pentru afișare număr total ascultători
  - [ ] Actualizare în timp real (polling sau WebSocket)
  - [ ] Animație pentru schimbarea numărului

- [ ] **Ascultători activi acum**
  - [ ] Integrare cu Icecast stats API
  - [ ] Badge/indicator vizual pentru numărul curent
  - [ ] Istoric grafic (ultimi 24h/7 zile)
  - [ ] Export date statistici

### 📜 History Play

- [ ] **Istoric piese redate**

  - [ ] Backend API pentru salvare istoric
  - [ ] Database schema (PostgreSQL/MongoDB)
  - [ ] Component listă istoric cu scroll infinit
  - [ ] Filtrare și căutare în istoric
  - [ ] Paginare și cache
  - [ ] Export istoric (CSV/JSON)

- [ ] **Detalii piese**
  - [ ] Timestamp când a fost redată piesa
  - [ ] Durată redare
  - [ ] Link către artist/album (dacă disponibil)
  - [ ] Artwork persistent

### 👍👎 Like/Dislike System

- [ ] **Backend**

  - [ ] API endpoints pentru like/dislike
  - [ ] Database schema pentru votes
  - [ ] Rate limiting (prevent spam)
  - [ ] Autentificare utilizatori (opțional)
  - [ ] Session-based voting (fără cont)

- [ ] **Frontend**

  - [ ] Butoane Like/Dislike în player
  - [ ] Animații pentru interacțiuni
  - [ ] Afișare număr total like/dislike
  - [ ] Disable după vot (prevent duplicate)
  - [ ] Toast notifications pentru feedback

- [ ] **Analytics**
  - [ ] Top piese liked
  - [ ] Statistici per piesă
  - [ ] Dashboard admin pentru moderare
  - [ ] Export rapoarte

### 🔧 Infrastructură necesară

- [ ] **Backend API**

  - [ ] Setup Next.js API Routes sau server separat
  - [ ] Database (PostgreSQL/MongoDB/Supabase)
  - [ ] Redis pentru caching și rate limiting
  - [ ] Autentificare (NextAuth.js sau similar)

- [ ] **Icecast Integration**

  - [ ] Polling Icecast stats API
  - [ ] Parser pentru metadata extinsă
  - [ ] Webhook pentru evenimente (dacă disponibil)

- [ ] **Real-time Updates**
  - [ ] WebSocket server pentru live stats
  - [ ] Server-Sent Events (SSE) ca alternativă
  - [ ] Optimizare pentru multiple conexiuni

### 📊 UI/UX Improvements

- [ ] **Dashboard Statistics**

  - [ ] Grafice pentru ascultători (Chart.js/Recharts)
  - [ ] Heatmap pentru ore de vârf
  - [ ] Statistici geografice (dacă disponibil)

- [ ] **Player Enhancements**
  - [ ] Mini player persistent
  - [ ] Keyboard shortcuts
  - [ ] Media Session API pentru notificări OS
  - [ ] Share button pentru piesa curentă

### 🎨 Design Tasks

- [ ] Mockup-uri pentru features noi
- [ ] Design system pentru componente noi
- [ ] Mobile-first approach
- [ ] Accessibility audit

### 🧪 Testing

- [ ] Unit tests pentru componente noi
- [ ] Integration tests pentru API
- [ ] E2E tests pentru flow-uri complete
- [ ] Load testing pentru scalabilitate

---

**Made with ❤️ using Next.js and React**
