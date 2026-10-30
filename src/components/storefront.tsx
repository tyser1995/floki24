"use client";

import { useMemo, useState } from "react";
import {
  Search, UserRound, ShoppingBag, Menu, X, ChevronDown, ChevronLeft,
  ChevronRight, ArrowRight, Heart, Truck, ShieldCheck, Headphones,
  Instagram, Facebook, Mail, Plus, Minus
} from "lucide-react";

type Product = { name: string; brand: string; price: string; oldPrice?: string; image: string; sale?: string; soldOut?: boolean };

const navItems = [
  { label: "Saunen & Infrarotkabinen", children: ["Innensaunen", "Aussensaunen", "Infrarotkabinen", "Sauna Zubehör"] },
  { label: "Garten & Terrasse", children: ["Gartenmöbel", "Lounge Möbel", "Strandkörbe", "Pavillons", "Sonnenschirme"] },
  { label: "Haus & Wohnen", children: ["Möbel", "Beleuchtung", "Wohnaccessoires", "Büromöbel"] },
  { label: "Wellness", children: ["Massagesessel", "Whirlpools", "Badewannen", "Wellnessprodukte"] },
  { label: "Sport & Freizeit", children: ["Fitness", "Camping", "Fahrradzubehör"] },
  { label: "Tierbedarf", children: ["Hund", "Katze", "Kleintiere"] }
];

const products: Product[] = [
  { name: "Strandkorb deVries PURE® Comfort XL PE", brand: "floki24", price: "CHF 1,999.00", image: "photo-1600210492486-724fe5c67fb0", soldOut: true },
  { name: "William Morris Beauty Adventskalender", brand: "Heathcote & Ivory", price: "CHF 84.90", oldPrice: "CHF 94.90", sale: "11%", image: "photo-1608571423902-eed4a5ad8108" },
  { name: "Christmas Collection Adventskalender", brand: "Plantes & Parfums", price: "CHF 84.90", oldPrice: "CHF 94.90", sale: "11%", image: "photo-1602874801007-bd458bb1b8b6" },
  { name: "Strandkorb FSC® Trend 10 PE nature", brand: "floki24", price: "CHF 999.00", image: "photo-1600566753086-00f18fb6b3ea" }
];

const arrivals: Product[] = [
  { name: "Drehsessel Sister Ria, Outdoor 100% Acryl", brand: "floki24", price: "CHF 3,399.00", image: "photo-1598300053653-4c9b4f6f6f6b", soldOut: true },
  { name: "Hundestrandkorb PE schwarz Dessin", brand: "floki24", price: "CHF 229.00", image: "photo-1548199973-03cce0bbc87b" },
  { name: "Tablett Woodie mit Gestell, klappbar", brand: "floki24", price: "CHF 139.00", image: "photo-1600585154340-be6161a56a0c" },
  { name: "Strandkorb Twin View Dessin", brand: "floki24", price: "CHF 999.00", image: "photo-1600607687939-ce8a6c25118c" }
];

const imageUrl = (id: string, width = 900) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`;

function ProductCard({ product, onAdd }: { product: Product; onAdd: () => void }) {
  return (
    <article className="product-card">
      <div className="product-image-wrap">
        <img src={imageUrl(product.image, 700)} alt={product.name} className="product-image" />
        {product.sale && <span className="sale-badge">Sparen Sie {product.sale}</span>}
        {product.soldOut && <span className="sold-badge">Ausverkauft</span>}
        <button className="heart-button" aria-label="Merken"><Heart size={18} /></button>
        <button className="quick-add" onClick={onAdd}>{product.soldOut ? "Ausverkauft" : "Schnellkauf"}</button>
      </div>
      <div className="product-info">
        <p className="brand">{product.brand}</p>
        <h3>{product.name}</h3>
        <div className="price-row">
          {product.oldPrice && <span className="old-price">{product.oldPrice}</span>}
          <strong>{product.price}</strong>
        </div>
      </div>
    </article>
  );
}

export default function Storefront() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const [slide, setSlide] = useState(0);
  const [cartOpen, setCartOpen] = useState(false);
  const slides = [
    { eyebrow: "Für Innen und Aussen", title: "Saunen & Infrarotkabinen", copy: "Für warme Stunden in der kalten Jahreszeit", image: "photo- sauna", url: "photo-1600607687920-4e2a09cf159d", cta: "Jetzt ansehen" },
    { eyebrow: "Entspannung zuhause", title: "Whirlpools", copy: "Geniessen Sie wohlige Stunden in unseren Whirlpools", image: "photo-1564540583246-934409427776", url: "photo-1564540583246-934409427776", cta: "Jetzt entdecken" },
    { eyebrow: "Wohlfühlen & relaxen", title: "Massagesessel", copy: "Gönnen Sie sich eine perfekte Massage zu Hause", image: "photo-1618221195710-dd6b41faaea6", url: "photo-1618221195710-dd6b41faaea6", cta: "Mehr erfahren" },
    { eyebrow: "Garten & Terrasse", title: "Hochwertige Gartenmöbel", copy: "Einrichten mit Weitsicht – überdauert Dekaden", image: "photo-1600210492486-724fe5c67fb0", url: "photo-1600210492486-724fe5c67fb0", cta: "Jetzt stöbern" }
  ];
  const current = slides[slide];
  const filteredProducts = useMemo(() => products.filter(p => p.name.toLowerCase().includes(search.toLowerCase())), [search]);
  const addToCart = () => setCartCount(n => n + 1);

  return (
    <main>
      <div className="topline">
        <span>Fragen? <b>☎ 071 511 98 64</b> · Schneller Kundensupport</span>
        <span className="topline-right">Schweizer Unternehmen</span>
      </div>
      <div className="shipping-bar"><Truck size={15} /> Kostenloser Versand in der Schweiz und Liechtenstein!</div>

      <header className="site-header">
        <button className="icon-button mobile-menu-button" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menü">{mobileOpen ? <X /> : <Menu />}</button>
        <a className="logo" href="#"><span className="logo-mark">f</span><span>floki<span className="logo-light">24</span><small>.ch</small></span></a>
        <div className={`search-box ${searchOpen ? "search-visible" : ""}`}>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Wonach suchen Sie?" aria-label="Suche" />
          <button aria-label="Suchen"><Search size={19} /></button>
          {search && <div className="search-results">{filteredProducts.length ? filteredProducts.map(p => <p key={p.name}>{p.name} <b>{p.price}</b></p>) : <p>Keine passenden Produkte gefunden.</p>}</div>}
        </div>
        <div className="header-actions">
          <button className="icon-button search-toggle" onClick={() => setSearchOpen(!searchOpen)} aria-label="Suche"><Search /></button>
          <button className="icon-button account-button" aria-label="Konto"><UserRound /></button>
          <button className="icon-button bag-button" onClick={() => setCartOpen(true)} aria-label="Warenkorb"><ShoppingBag /><span>{cartCount}</span></button>
        </div>
      </header>

      <nav className={`main-nav ${mobileOpen ? "nav-open" : ""}`} onMouseLeave={() => setActiveMenu(null)}>
        <div className="nav-inner">
          {navItems.map(item => <div className="nav-item" key={item.label} onMouseEnter={() => setActiveMenu(item.label)}>
            <button onClick={() => setActiveMenu(activeMenu === item.label ? null : item.label)}>{item.label}<ChevronDown size={13} /></button>
            {activeMenu === item.label && <div className="mega-menu"><div><span className="mega-heading">{item.label}</span><p>Entdecken Sie unsere Auswahl</p>{item.children.map(child => <a href="#" key={child}>{child}</a>)}</div><div className="mega-feature"><img src={imageUrl("photo-1600607687920-4e2a09cf159d", 600)} alt="" /><b>Inspiration für Ihr Zuhause</b><a href="#">Jetzt entdecken <ArrowRight size={14}/></a></div></div>}
          </div>)}
          <a className="nav-sale" href="#angebote">Angebote</a>
        </div>
      </nav>

      <section className="hero">
        <img className="hero-image" src={imageUrl(current.url, 2000)} alt={current.title} />
        <div className="hero-shade" />
        <div className="hero-content">
          <p>{current.eyebrow}</p><h1>{current.title}</h1><span>{current.copy}</span>
          <a href="#kategorien" className="dark-button">{current.cta} <ArrowRight size={16}/></a>
        </div>
        <button className="hero-arrow prev" onClick={() => setSlide((slide + slides.length - 1) % slides.length)} aria-label="Vorherige Folie"><ChevronLeft /></button>
        <button className="hero-arrow next" onClick={() => setSlide((slide + 1) % slides.length)} aria-label="Nächste Folie"><ChevronRight /></button>
        <div className="hero-dots">{slides.map((s, i) => <button key={s.title} onClick={() => setSlide(i)} className={i === slide ? "active" : ""} aria-label={`Folie ${i + 1}`} />)}</div>
      </section>

      <section className="benefits">
        <div><Truck/><span><b>Kostenloser Versand</b><small>Schweiz & Liechtenstein</small></span></div>
        <div><ShieldCheck/><span><b>Sicher einkaufen</b><small>Geschützte Zahlung</small></span></div>
        <div><Headphones/><span><b>Persönlicher Support</b><small>Wir sind für Sie da</small></span></div>
      </section>

      <section className="section categories" id="kategorien">
        <div className="section-heading"><div><span className="eyebrow">Entdecken Sie floki24</span><h2>Unsere Kategorien</h2></div><a href="#">Alle Kategorien <ArrowRight size={16}/></a></div>
        <div className="category-grid">
          {[
            ["Saunen & Infrarotkabinen", "photo-1600607687920-4e2a09cf159d"],
            ["Garten- & Loungemöbel", "photo-1600210492486-724fe5c67fb0"],
            ["Massagesessel", "photo-1618221195710-dd6b41faaea6"],
            ["Whirlpools & Badewannen", "photo-1564540583246-934409427776"],
            ["Strandkörbe", "photo-1600566753086-00f18fb6b3ea"],
            ["Wellnessprodukte", "photo-1540555700478-4be289fbecea"],
            ["Duschkabinen & Badewannen", "photo-1620626011761-996317b8d101"],
            ["Pavillons & Garten", "photo-1600566753190-17f0baa2a6c3"]
          ].map(([name, image]) => <a href="#" className="category-card" key={name}><img src={imageUrl(image, 700)} alt={name}/><span>{name}<ArrowRight size={16}/></span></a>)}
        </div>
      </section>

      <section className="editorial">
        <div className="editorial-image"><img src={imageUrl("photo-1540555700478-4be289fbecea", 1100)} alt="Wellness und Entspannung"/></div>
        <div className="editorial-copy"><span className="eyebrow">Neuigkeiten & Infos von Floki24.ch</span><h2>Inspiration für Ihr Zuhause und Ihren Garten</h2><p>Entdecken Sie Ideen, Tipps und Wissenswertes rund um Wellness, Wohnen und Freizeit. Lassen Sie sich inspirieren und finden Sie Ihre persönlichen Lieblingsstücke.</p><a href="#" className="text-link">Alle Beiträge entdecken <ArrowRight size={16}/></a></div>
      </section>

      <section className="section product-section" id="angebote">
        <div className="section-heading"><div><span className="eyebrow">Ausgewählte Highlights</span><h2>Angebote</h2></div><a href="#">Alle Angebote <ArrowRight size={16}/></a></div>
        <div className="product-grid">{products.map(p => <ProductCard key={p.name} product={p} onAdd={addToCart}/>)}</div>
      </section>

      <section className="section product-section new-section">
        <div className="section-heading"><div><span className="eyebrow">Gerade eingetroffen</span><h2>Neue Artikel</h2></div><a href="#">Jetzt entdecken <ArrowRight size={16}/></a></div>
        <div className="product-grid">{arrivals.map(p => <ProductCard key={p.name} product={p} onAdd={addToCart}/>)}</div>
      </section>

      <section className="wide-promo">
        <img src={imageUrl("photo-1600210492486-724fe5c67fb0", 1800)} alt="Garten und Loungemöbel"/>
        <div><span className="eyebrow">Draussen zuhause</span><h2>Garten- & Loungemöbel</h2><p>Gestalten Sie Ihren Lieblingsplatz im Freien.</p><a className="light-button" href="#">Kollektion entdecken <ArrowRight size={16}/></a></div>
      </section>

      <footer className="footer">
        <div className="footer-top">
          <div className="footer-brand"><a className="logo footer-logo" href="#"><span className="logo-mark">f</span><span>floki<span className="logo-light">24</span><small>.ch</small></span></a><p>Schöne Dinge für Haus, Garten und Freizeit. Entdecken Sie unser vielfältiges Sortiment.</p><div className="socials"><a href="#" aria-label="Instagram"><Instagram/></a><a href="#" aria-label="Facebook"><Facebook/></a></div></div>
          <div><h4>Service</h4><a href="#">Kontakt</a><a href="#">Versand & Lieferung</a><a href="#">Zahlungsarten</a><a href="#">Rückgabe</a></div>
          <div><h4>Über floki24</h4><a href="#">Über uns</a><a href="#">Blog</a><a href="#">Häufige Fragen</a><a href="#">Impressum</a></div>
          <div className="newsletter"><h4>Newsletter</h4><p>Erhalten Sie Neuigkeiten und Angebote direkt in Ihr Postfach.</p><form onSubmit={e => { e.preventDefault(); alert("Vielen Dank für Ihre Anmeldung!"); }}><input type="email" required placeholder="Ihre E-Mail-Adresse"/><button aria-label="Anmelden"><ArrowRight/></button></form></div>
        </div>
        <div className="footer-bottom"><span>© 2025 floki24.ch</span><span>Datenschutz　 ·　 AGB　 ·　 Impressum</span><span>CHF / Schweiz</span></div>
      </footer>

      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={e => e.stopPropagation()}><div className="drawer-head"><h2>Warenkorb ({cartCount})</h2><button onClick={() => setCartOpen(false)} aria-label="Schliessen"><X/></button></div>{cartCount ? <><p className="cart-message">Artikel wurde zum Warenkorb hinzugefügt.</p><div className="cart-line"><span>Demo-Produkt</span><b>{cartCount} ×</b></div><button className="checkout-button" onClick={() => setCartOpen(false)}>Weiter einkaufen</button></> : <div className="empty-cart"><ShoppingBag size={36}/><p>Ihr Warenkorb ist noch leer.</p><button className="dark-button" onClick={() => setCartOpen(false)}>Weiter einkaufen</button></div>}</aside></div>}
    </main>
  );
}
