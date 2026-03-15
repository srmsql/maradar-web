import { useState, useMemo, useRef, useEffect, createContext, useContext } from "react";

// ─── i18n ─────────────────────────────────────────────────────────────────────
const T = {
  es: {
    howItWorks:"CÓMO FUNCIONA", pricing:"PRECIOS", enter:"ENTRAR",
    heroTitle:"Merger Arbitrage para todos.",
    heroSub:"La plataforma que rastrea fusiones y adquisiciones en tiempo real, calcula spreads automáticamente y te dice cuándo comprar, acumular o evitar.",
    ctaFree:"ACCEDER GRATIS →", ctaPlans:"VER PLANES", liveBadge:"DATOS EN TIEMPO REAL",
    dashTitle:"Todos los deals. Una sola vista.", dashSub:"EL DASHBOARD",
    seeAll:"VER TODOS LOS DEALS →", liveTag:"EN VIVO",
    statDeals:"Deals activos", statCost:"Coste de datos",
    statSources:"Fuentes oficiales", statFirst:"1º en español",
    whyTitle:"Construido para el inversor particular.", whySub:"POR QUÉ M&A RADAR",
    why1T:"Datos directos y verificados",
    why1D:"Fuentes regulatorias oficiales — la misma información que usan los profesionales. Sin intermediarios.",
    why2T:"Señales claras",
    why2D:"COMPRAR / ACUMULAR / CAUTO / EVITAR. Sin ambigüedad. Con análisis de riesgo y probabilidad de cierre.",
    why3T:"Cobertura global",
    why3D:"USA, Europa y mercados internacionales. Deals regulados por SEC, EU Commission, FCA y otros organismos.",
    why4T:"Precios en tiempo real",
    why4D:"Spreads recalculados automáticamente con cotizaciones live. Sabes exactamente cuánto puedes ganar.",
    pricingTitle:"Empieza gratis. Escala cuando lo necesites.",
    pricingSub:"PLANES", pricingNote:"Sin tarjeta de crédito. Sin permanencia.",
    popular:"MÁS POPULAR",
    tierFree:"Free", tierInv:"Inversor", tierPro:"Pro",
    period:"/mes",
    ctaFreeBtn:"Acceder gratis",
    ctaInvBtn:"Empezar — $2.99/mes",
    ctaProBtn:"Empezar — $3.99/mes",
    f_free:["Todos los deals visibles","Nombre, sector y stage","Glosario educativo completo","3 deals con análisis básico"],
    f_free_locked:["Señal COMPRAR/EVITAR","Spread % en tiempo real","Probabilidad de cierre","Análisis de riesgo","Timeline detallado"],
    f_inv:["Todo lo de Free","Señal COMPRAR / ACUMULAR / CAUTO / EVITAR","Spread % y precio de oferta","Probabilidad de cierre","Análisis de riesgo detallado","Timeline completo por deal","Cobertura USA + Europa","Newsletter semanal"],
    f_pro:["Todo lo de Inversor","Watchlist personalizada","Alertas email (cambio de stage)","Alertas de variación de spread","Exportar a CSV/Excel","Historial completo de deals","Acceso API (próximamente)"],
    loginTitle:"Acceder a M&A RADAR", loginSub:"Elige tu plan y empieza ahora",
    emailLabel:"EMAIL", emailPh:"tu@email.com",
    loginFreeNote:"Sin tarjeta de crédito. Puedes actualizar cuando quieras.",
    loginPaidNote:"Simulación demo — no se realizará ningún cargo real.",
    loginFreeCta:"ACCEDER GRATIS →",
    loginPaidCta:(tier)=>`EMPEZAR ${tier.toUpperCase()} →`,
    loginFreeDesc:"Acceso básico — sin tarjeta",
    loginInvDesc:"Señales, spreads y análisis completo",
    loginProDesc:"Todo + alertas y watchlist",
    topActive:"ACTIVOS", topBuys:"COMPRAR", topSpread:"SPREAD MEDIO", topTotal:"TOTAL",
    topPrices:"PRECIOS", topLoading:"⟳ cargando...", topOffline:"— offline",
    topPlan:"PLAN", topUpgrade:"⬆ UPGRADE",
    fStatus:"Estado", fStage:"Stage", fRegion:"Región",
    fSector:"Sector", fSize:"Tamaño", fPayment:"Pago",
    fSignal:"Señal", fSort:"Ordenar",
    clearN:(n)=>`Limpiar (${n})`,
    searchPh:"Ticker, empresa, sector...",
    oAll:"Todos", oAll2:"Todas", oGlobal:"Global",
    oActive:"Activos", oCompleted:"Completados", oBlocked:"Bloqueados",
    oRegulatory:"Regulatorio", oPreclose:"Pre-Cierre",
    oUSA:"USA", oEurope:"Europa",
    oTech:"Tecnología", oFinance:"Finanzas", oEnergy:"Energía",
    oConsumer:"Consumo", oIndustrial:"Industrial",
    oLarge:"Large >$10B", oMid:"Mid $1–10B",
    oCash:"💵 Cash", oStock:"📈 Stock", oMixed:"⚖️ Mixto",
    oBuy:"Comprar", oAcc:"Acumular", oCaut:"Cauto", oAvoid:"Evitar",
    oProb:"Probabilidad", oSpread:"Spread", oPremium:"Prima", oValue:"Valor deal",
    mValor:"Valor", mSpread:"Spread", mPrima:"Prima", mPago:"Pago", mProb:"Prob. cierre",
    mCash:"💵 Cash", mStock:"📈 Stock", mMixed:"⚖️ Mixto",
    acquiredBy:"Adquirida por", selectDeal:"SELECCIONA UN DEAL",
    lockedTitle:"Análisis bloqueado — Plan Premium",
    lockedDesc:"Desbloquea señal, spread, probabilidad de cierre y análisis de riesgo completo.",
    seePlans:"VER PLANES →",
    paymentTypeLabel:"Tipo de pago",
    tabDeals:"Deals", tabGlossary:"Glosario",
    emptyQ:(q)=>`Sin resultados para "${q}"`,
    emptyF:"Sin deals con estos filtros",
    emptyQHint:"Prueba con el ticker, nombre completo o sector",
    emptyFHint:"Prueba cambiando el estado a Todos o limpiando los filtros",
    clearAll:"Limpiar todo",
    footerLegal:"Solo con fines informativos. No constituye asesoramiento financiero. Toda inversión implica riesgo.",
    footerDash:"⚠ Solo educativo · No es asesoramiento financiero · Fuentes: SEC EDGAR, EU Commission, Reuters, Bloomberg",
    version:(d)=>`M&A RADAR v1.0 · ${d}`,
  },
  en: {
    howItWorks:"HOW IT WORKS", pricing:"PRICING", enter:"LOG IN",
    heroTitle:"Merger Arbitrage for everyone.",
    heroSub:"The platform that tracks mergers & acquisitions in real time, automatically calculates spreads, and tells you when to buy, accumulate or avoid.",
    ctaFree:"GET STARTED FREE →", ctaPlans:"SEE PLANS", liveBadge:"REAL-TIME DATA",
    dashTitle:"All deals. One view.", dashSub:"THE DASHBOARD",
    seeAll:"SEE ALL DEALS →", liveTag:"LIVE",
    statDeals:"Active deals", statCost:"Data cost",
    statSources:"Official sources", statFirst:"1st in Spanish",
    whyTitle:"Built for the individual investor.", whySub:"WHY M&A RADAR",
    why1T:"Direct, verified data",
    why1D:"Official regulatory sources — the same data professionals use. No middlemen, no delays.",
    why2T:"Clear signals",
    why2D:"BUY / ACCUMULATE / CAUTION / AVOID. No ambiguity. With risk analysis and closing probability.",
    why3T:"Global coverage",
    why3D:"USA, Europe and international markets. Deals regulated by SEC, EU Commission, FCA and other official bodies.",
    why4T:"Real-time prices",
    why4D:"Spreads automatically recalculated with live quotes. Know exactly how much you can earn right now.",
    pricingTitle:"Start free. Scale when you need to.",
    pricingSub:"PLANS", pricingNote:"No credit card. No commitment.",
    popular:"MOST POPULAR",
    tierFree:"Free", tierInv:"Investor", tierPro:"Pro",
    period:"/mo",
    ctaFreeBtn:"Get started free",
    ctaInvBtn:"Start — $2.99/mo",
    ctaProBtn:"Start — $3.99/mo",
    f_free:["All deals visible","Name, sector and stage","Full educational glossary","3 deals with basic data"],
    f_free_locked:["BUY/AVOID signal","Real-time spread %","Closing probability","Risk analysis","Detailed timeline"],
    f_inv:["Everything in Free","BUY / ACCUMULATE / CAUTION / AVOID signal","Spread % and offer price","Closing probability","Detailed risk analysis","Full deal timeline","USA + Europe coverage","Weekly newsletter"],
    f_pro:["Everything in Investor","Personal watchlist","Email alerts (stage changes)","Spread variation alerts","Export to CSV/Excel","Full deal history","API access (coming soon)"],
    loginTitle:"Log in to M&A RADAR", loginSub:"Choose your plan and start now",
    emailLabel:"EMAIL", emailPh:"you@email.com",
    loginFreeNote:"No credit card required. Upgrade anytime.",
    loginPaidNote:"Demo simulation — no real charge will be made.",
    loginFreeCta:"GET STARTED FREE →",
    loginPaidCta:(tier)=>`START ${tier.toUpperCase()} →`,
    loginFreeDesc:"Basic access — no card required",
    loginInvDesc:"Signals, spreads and full analysis",
    loginProDesc:"Everything + alerts and watchlist",
    topActive:"ACTIVE", topBuys:"BUY", topSpread:"AVG SPREAD", topTotal:"TOTAL",
    topPrices:"PRICES", topLoading:"⟳ loading...", topOffline:"— offline",
    topPlan:"PLAN", topUpgrade:"⬆ UPGRADE",
    fStatus:"Status", fStage:"Stage", fRegion:"Region",
    fSector:"Sector", fSize:"Size", fPayment:"Payment",
    fSignal:"Signal", fSort:"Sort",
    clearN:(n)=>`Clear (${n})`,
    searchPh:"Ticker, company, sector...",
    oAll:"All", oAll2:"All", oGlobal:"Global",
    oActive:"Active", oCompleted:"Completed", oBlocked:"Blocked",
    oRegulatory:"Regulatory", oPreclose:"Pre-Close",
    oUSA:"USA", oEurope:"Europe",
    oTech:"Technology", oFinance:"Finance", oEnergy:"Energy",
    oConsumer:"Consumer", oIndustrial:"Industrial",
    oLarge:"Large >$10B", oMid:"Mid $1–10B",
    oCash:"💵 Cash", oStock:"📈 Stock", oMixed:"⚖️ Mixed",
    oBuy:"Buy", oAcc:"Accumulate", oCaut:"Caution", oAvoid:"Avoid",
    oProb:"Probability", oSpread:"Spread", oPremium:"Premium", oValue:"Deal value",
    mValor:"Value", mSpread:"Spread", mPrima:"Premium", mPago:"Payment", mProb:"Close prob.",
    mCash:"💵 Cash", mStock:"📈 Stock", mMixed:"⚖️ Mixed",
    acquiredBy:"Acquired by", selectDeal:"SELECT A DEAL",
    lockedTitle:"Analysis locked — Premium Plan",
    lockedDesc:"Unlock signal, spread, closing probability and full risk analysis.",
    seePlans:"SEE PLANS →",
    paymentTypeLabel:"Payment type",
    tabDeals:"Deals", tabGlossary:"Glossary",
    emptyQ:(q)=>`No results for "${q}"`,
    emptyF:"No deals match these filters",
    emptyQHint:"Try the ticker, full company name or sector",
    emptyFHint:"Try changing status to All or clearing filters",
    clearAll:"Clear all",
    footerLegal:"For informational purposes only. Not financial advice. All investing involves risk.",
    footerDash:"⚠ Educational only · Not financial advice · Sources: SEC EDGAR, EU Commission, Reuters, Bloomberg",
    version:(d)=>`M&A RADAR v1.0 · ${d}`,
  },
};

const LangCtx = createContext("es");
const useT = () => T[useContext(LangCtx)];

const DEALS = [
  {
    id:1, acquirer:"PIF / Silver Lake / Affinity", target:"Electronic Arts", ticker:"EA",
    sector:"Tecnología", sectorKey:"tech", region:"USA", regionKey:"usa",
    dealValue:"$55B", dealValueNum:55, announced:"2025-09-29", expectedClose:"2026 Q1/Q2",
    stage:"regulatory", paymentType:"cash", sizeCat:"large",
    premium:25, probability:82, currentPrice:204.5, preAnnouncementPrice:168.32,
    offerPrice:210, spreadNum:2.7, status:"active",
    signal:"ACUMULAR", signalColor:"#3b82f6", flag:"🇺🇸🇸🇦",
    source:"SEC 8-K EA · Wikipedia · Barchart",
    sourceUrl:"https://ir.ea.com/press-releases/press-release-details/2025/EA-Announces-Agreement-to-be-Acquired-by-PIF-Silver-Lake-and-Affinity-Partners-for-55-Billion/default.aspx",
    notes:"Mayor LBO de la historia ($55B). Accionistas aprobaron en Dic 2025. Spread del ~2.7% con riesgo moderado por escrutinio político CFIUS (senadores alertaron sobre influencia saudí). Cierre esperado Q1-Q2 2026.",
    timeline:[
      {label:"Anuncio consorcio PIF/Silver Lake",date:"Sep 2025",done:true},
      {label:"Acuerdo definitivo ($210/sh)",date:"Sep 2025",done:true},
      {label:"Aprobación accionistas EA",date:"Dic 2025",done:true},
      {label:"Revisión regulatoria DOJ/CFIUS/global",date:"En curso",done:false},
      {label:"Cierre",date:"Q1-Q2 2026",done:false},
    ],
    risks:[
      {label:"Escrutinio político CFIUS (influencia saudí)",level:"medio"},
      {label:"Deuda LBO $20B — presión operativa",level:"medio"},
      {label:"Investigación legal fiduciaria del board",level:"bajo"},
    ],
  },
  {
    id:2, acquirer:"Kimberly-Clark (KMB)", target:"Kenvue", ticker:"KVUE",
    sector:"Consumo", sectorKey:"consumer", region:"USA", regionKey:"usa",
    dealValue:"$48.7B", dealValueNum:48.7, announced:"2025-11-03", expectedClose:"2026 H2",
    stage:"regulatory", paymentType:"mixed", sizeCat:"large",
    premium:46, probability:78, currentPrice:17.5, preAnnouncementPrice:14.4,
    offerPrice:21.01, spreadNum:20.1, status:"active",
    signal:"ACUMULAR", signalColor:"#3b82f6", flag:"🇺🇸",
    source:"SEC 8-K Kenvue · PRNewswire · Seeking Alpha",
    sourceUrl:"https://investors.kenvue.com/financial-news/news-details/2025/Kimberly-Clark-to-Acquire-Kenvue-Creating-a-32-Billion-Global-Health-and-Wellness-Leader/default.aspx",
    notes:"Spread del ~20% con ambas juntas de accionistas ya aprobadas (99% KVUE, 90% KMB). Sin solapamiento antimonopolio relevante. Riesgo principal: litigación Tylenol y volatilidad del precio de KMB (deal mixto). Oportunidad atractiva con riesgo moderado.",
    timeline:[
      {label:"Anuncio",date:"Nov 2025",done:true},
      {label:"Aprobación accionistas KMB (~90%)",date:"Ene 2026",done:true},
      {label:"Aprobación accionistas KVUE (~99%)",date:"Ene 2026",done:true},
      {label:"Revisión regulatoria FTC/global",date:"En curso",done:false},
      {label:"Cierre",date:"H2 2026",done:false},
    ],
    risks:[
      {label:"Litigación Tylenol (autismo)",level:"medio"},
      {label:"Volatilidad precio KMB (deal mixto)",level:"medio"},
      {label:"Revisión FTC antimonopolio",level:"bajo"},
    ],
  },
  {
    id:3, acquirer:"Union Pacific (UNP)", target:"Norfolk Southern", ticker:"NSC",
    sector:"Industria", sectorKey:"industrial", region:"USA", regionKey:"usa",
    dealValue:"$85B", dealValueNum:85, announced:"2025-07-29", expectedClose:"2027 (est.)",
    stage:"regulatory", paymentType:"mixed", sizeCat:"large",
    premium:25, probability:38, currentPrice:278.0, preAnnouncementPrice:256.0,
    offerPrice:320.0, spreadNum:15.1, status:"active",
    signal:"CAUTO", signalColor:"#f59e0b", flag:"🇺🇸",
    source:"SEC S-4 · AllianceBernstein M&A Report 2026 · Seeking Alpha",
    sourceUrl:"https://www.alliancebernstein.com/americas/en/institutions/insights/investment-insights/merger-arbitrage-riding-the-wave-into-2026.html",
    notes:"Deal más grande en M&A de los últimos años ($85B). STB rechazó la solicitud inicial (Ene 2026) por documentación incompleta. Oposición sindical SMART-TD y BLET muy activa. Spread del 15% compensa solo con horizonte de 2+ años.",
    timeline:[
      {label:"Anuncio",date:"Jul 2025",done:true},
      {label:"Aprobación accionistas (ambas empresas)",date:"Nov 2025",done:true},
      {label:"STB rechaza solicitud (incompleta)",date:"Ene 2026",done:true},
      {label:"Nueva solicitud STB",date:"Pendiente",done:false},
      {label:"Revisión STB (~18 meses)",date:"2026-2027",done:false},
      {label:"Cierre estimado",date:"2027",done:false},
    ],
    risks:[
      {label:"STB rechazó solicitud Ene 2026",level:"alto"},
      {label:"Oposición sindical SMART-TD / BLET",level:"alto"},
      {label:"Oposición política bipartidista",level:"alto"},
      {label:"Timeline 2027+ muy largo",level:"medio"},
    ],
  },
  {
    id:4, acquirer:"Fifth Third Bancorp", target:"Comerica", ticker:"CMA",
    sector:"Finanzas", sectorKey:"finance", region:"USA", regionKey:"usa",
    dealValue:"$10.85B", dealValueNum:10.85, announced:"2025-10-06", expectedClose:"2026 Q1",
    stage:"closing", paymentType:"stock", sizeCat:"mid",
    premium:18, probability:100, currentPrice:null, preAnnouncementPrice:null,
    offerPrice:null, spreadNum:0, status:"completed",
    signal:"COMPLETADO", signalColor:"#6b7280", flag:"🇺🇸",
    source:"Fifth Third IR · SEC EDGAR",
    sourceUrl:"https://ir.53.com/news/news-details/2026/Fifth-Third-Completes-Merger-with-Comerica-to-Become-9th-Largest-U-S--Bank/default.aspx",
    notes:"Cerrado el 2 Feb 2026. Deal all-stock: accionistas CMA recibieron 1.8663 acciones FITB por cada CMA. Se creó el 9º banco más grande de EEUU con $294B en activos. Shareholders aprobaron con 99.7% de votos el 6 Ene 2026. Caso de estudio: spread ~1.5% en pre-cierre era entrada con riesgo casi cero.",
    timeline:[
      {label:"Anuncio",date:"Oct 2025",done:true},
      {label:"Shareholders aprobaron (99.7%)",date:"6 Ene 2026",done:true},
      {label:"Fed Reserve + OCC aprobaron",date:"13 Ene 2026",done:true},
      {label:"Cierre ✓",date:"2 Feb 2026",done:true},
    ],
    risks:[],
  },
  {
    id:5, acquirer:"Constellation Energy", target:"Calpine Corp.", ticker:"CEG",
    sector:"Energía", sectorKey:"energy", region:"USA", regionKey:"usa",
    dealValue:"$16.4B", dealValueNum:16.4, announced:"2025-Q1", expectedClose:"2026",
    stage:"regulatory", paymentType:"cash", sizeCat:"large",
    premium:0, probability:100, currentPrice:null, preAnnouncementPrice:null,
    offerPrice:null, spreadNum:0, status:"completed",
    signal:"COMPLETADO", signalColor:"#6b7280", flag:"🇺🇸",
    source:"Intellizence Q1 2025 M&A Report · PWC Global M&A Trends",
    sourceUrl:"https://intellizence.com/insights/insights/merger-and-acquisition/the-largest-mergers-acquisitions-ma-deals-q1-2025/",
    notes:"Cerrado el 7 Ene 2026. Constellation adquirió Calpine en deal mixto: $4.5B cash + 50M acciones CEG. Se creó el mayor productor privado de electricidad del mundo con 55 GW de capacidad (nuclear + gas natural + geotérmica). EPS accretion inmediata >20% en 2026. TD Cowen inició cobertura post-cierre con Buy y precio objetivo $440. CEG cotiza ~$317 a Mar 2026.",
    timeline:[
      {label:"Anuncio",date:"10 Ene 2025",done:true},
      {label:"FERC + PUCT + Canada aprobaron",date:"Dic 2025",done:true},
      {label:"Cierre ✓",date:"7 Ene 2026",done:true},
    ],
    risks:[],
  },
  {
    id:6, acquirer:"Alphabet (Google)", target:"Wiz Inc.", ticker:"GOOGL",
    sector:"Tecnología", sectorKey:"tech", region:"USA", regionKey:"usa",
    dealValue:"$32B", dealValueNum:32, announced:"2025-03-18", expectedClose:"2026",
    stage:"closing", paymentType:"cash", sizeCat:"large",
    premium:0, probability:97, currentPrice:null, preAnnouncementPrice:null,
    offerPrice:null, spreadNum:0, status:"active",
    signal:"COMPRAR", signalColor:"#10b981", flag:"🇺🇸🇮🇱",
    source:"SEC 8-K Google · TechCrunch · EC Decision Feb 2026",
    sourceUrl:"https://www.sec.gov/Archives/edgar/data/1652044/000165204425000027/goog-20250318.htm",
    notes:"Mayor adquisición de Google de su historia: $32B all-cash. DOJ USA aprobó incondicionalmente Nov 2025. EU Commission aprobó incondicionalmente el 10 Feb 2026 — último obstáculo mayor eliminado. Google financió con emisión de bonos de $31.5B (incluye bono a 100 años). Wiz seguirá siendo compatible con AWS, Azure y Oracle post-cierre. Cierre inminente.",
    timeline:[
      {label:"Anuncio",date:"Mar 2025",done:true},
      {label:"DOJ USA aprobó ✓",date:"Nov 2025",done:true},
      {label:"EU Commission aprobó ✓",date:"10 Feb 2026",done:true},
      {label:"Otras jurisdicciones (en curso)",date:"Q1-Q2 2026",done:false},
      {label:"Cierre esperado",date:"Q1-Q2 2026",done:false},
    ],
    risks:[
      {label:"Reguladores Asia-Pacífico (bajo riesgo)",level:"bajo"},
      {label:"Condiciones menores de cierre",level:"bajo"},
    ],
  },
  {
    id:7, acquirer:"UniCredit (UCG)", target:"Commerzbank (CBK)", ticker:"CBK.DE",
    sector:"Finanzas", sectorKey:"finance", region:"Europa", regionKey:"europe",
    dealValue:"~€15B", dealValueNum:16.5, announced:"2024-09", expectedClose:"2027+ (incierto)",
    stage:"regulatory", paymentType:"stock", sizeCat:"large",
    premium:0, probability:28, currentPrice:35.92, preAnnouncementPrice:12.0,
    offerPrice:null, spreadNum:0, status:"active",
    signal:"CAUTO", signalColor:"#f59e0b", flag:"🇮🇹🇩🇪",
    source:"UniCredit Press Release · Bloomberg · CNBC · StocksToday Mar 2026",
    sourceUrl:"https://www.unicreditgroup.eu/en/press-media/press-releases-price-sensitive/2025/august/unicredit-further-converts-into-shares-part-of-its-synthetic-pos.html",
    notes:"UniCredit tiene ~29% stake (cerca del umbral del 30% que obligaría a OPA formal). CEO Orcel señaló en Jun 2025 que 'el precio actual es demasiado caro para hacer una oferta'. Gobierno alemán tiene 12% y se opone activamente. Acción ya subió +100% en un año.",
    timeline:[
      {label:"UniCredit compra 9% sorpresa",date:"Sep 2024",done:true},
      {label:"Stake sube a 20% (derivados)",date:"Ene 2025",done:true},
      {label:"ECB autoriza hasta 29.9%",date:"2025",done:true},
      {label:"Stake físico ~26%, total ~29%",date:"Ago 2025",done:true},
      {label:"OPA formal si supera 30%",date:"2027?",done:false},
    ],
    risks:[
      {label:"Gobierno alemán opuesto (12% stake)",level:"alto"},
      {label:"Precio Commerzbank ya subió >100%",level:"alto"},
      {label:"UniCredit también persigue Banco BPM",level:"medio"},
    ],
  },
  {
    id:8, acquirer:"Nippon Steel", target:"US Steel", ticker:"X",
    sector:"Industria", sectorKey:"industrial", region:"USA", regionKey:"usa",
    dealValue:"$14.9B", dealValueNum:14.9, announced:"2023-12-18", expectedClose:"Bloqueado",
    stage:"blocked", paymentType:"cash", sizeCat:"large",
    premium:40, probability:10, currentPrice:38.4, preAnnouncementPrice:24.8,
    offerPrice:55.0, spreadNum:43.2, status:"blocked",
    signal:"EVITAR", signalColor:"#ef4444", flag:"🇯🇵🇺🇸",
    source:"CFIUS · Reuters · Bloomberg · Nippon Steel Press Release",
    sourceUrl:"https://dealroom.net/blog/upcoming-m-a",
    notes:"Bloqueado por Biden (Ene 2025) por seguridad nacional. Recurso legal en marcha pero perspectivas muy bajas. Spread aparente del 43% es una TRAMPA — riesgo real de pérdida total. Caso de manual sobre cómo el riesgo político destruye un arbitraje.",
    timeline:[
      {label:"Anuncio",date:"Dic 2023",done:true},
      {label:"Revisión CFIUS",date:"2024",done:true},
      {label:"Bloqueo presidencial (Biden)",date:"Ene 2025",done:true},
      {label:"Recurso legal en tribunales",date:"En curso",done:false},
    ],
    risks:[
      {label:"Veto presidencial ejecutivo",level:"alto"},
      {label:"CFIUS seguridad nacional",level:"alto"},
      {label:"Riesgo político bipartidista",level:"alto"},
    ],
  },
  {
    id:9, acquirer:"Adobe", target:"Figma", ticker:"ADBE",
    sector:"Tecnología", sectorKey:"tech", region:"Europa / USA", regionKey:"europe",
    dealValue:"$20B", dealValueNum:20, announced:"2022-09-15", expectedClose:"Terminado Dic 2023",
    stage:"blocked", paymentType:"mixed", sizeCat:"large",
    premium:50, probability:0, currentPrice:null, preAnnouncementPrice:null,
    offerPrice:null, spreadNum:0, status:"blocked",
    signal:"EVITAR", signalColor:"#ef4444", flag:"🇺🇸🇪🇺",
    source:"Adobe Press Release · EU Commission · UK CMA · Fortune",
    sourceUrl:"https://news.adobe.com/news/news-details/2023/adobe-and-figma-mutually-agree-to-terminate-merger-agreement",
    notes:"CASO DE ESTUDIO: Terminado Dic 2023 tras 15 meses. EU Commission y UK CMA bloquearon por riesgo de supresión de competencia en diseño colaborativo. Adobe pagó $1B de breakup fee. Figma salió a bolsa en Jul 2025 con valoración ~$57B — Adobe habría ganado $37B adicionales.",
    timeline:[
      {label:"Anuncio ($20B cash+stock)",date:"Sep 2022",done:true},
      {label:"CMA UK Phase 2 — preocupaciones",date:"Jul 2023",done:true},
      {label:"EU Commission abre investigación profunda",date:"Nov 2023",done:true},
      {label:"Terminación mutua — $1B breakup fee",date:"Dic 2023",done:true},
      {label:"Figma IPO (~$57B valoración)",date:"Jul 2025",done:true},
    ],
    risks:[
      {label:"Bloqueado definitivamente (histórico)",level:"alto"},
      {label:"Adobe pagó $1B breakup fee",level:"alto"},
    ],
  },
  {
    id:10, acquirer:"Microsoft", target:"Activision Blizzard", ticker:"ATVI",
    sector:"Tecnología", sectorKey:"tech", region:"Global", regionKey:"usa",
    dealValue:"$68.7B", dealValueNum:68.7, announced:"2022-01-18", expectedClose:"Completado Oct 2023",
    stage:"completed", paymentType:"cash", sizeCat:"large",
    premium:45, probability:100, currentPrice:95.0, preAnnouncementPrice:65.4,
    offerPrice:95.0, spreadNum:0, status:"completed",
    signal:"COMPLETADO", signalColor:"#6b7280", flag:"🇺🇸",
    source:"SEC · FTC · UK CMA · EU Commission · Microsoft Press Release",
    sourceUrl:"https://news.microsoft.com/2023/10/13/microsoft-completes-acquisition-of-activision-blizzard/",
    notes:"Mayor adquisición tecnológica de la historia. FTC intentó bloquearlo 2 veces y perdió en tribunales. UK CMA inicialmente bloqueó (cloud gaming) y luego aprobó con desinversión a Ubisoft. Cerrado Oct 2023 tras 21 meses. Referencia de resiliencia ante reguladores hostiles.",
    timeline:[
      {label:"Anuncio ($95/sh, all-cash)",date:"Ene 2022",done:true},
      {label:"FTC demanda en tribunales (pierde)",date:"Jul 2023",done:true},
      {label:"EU Commission aprueba con condiciones",date:"May 2023",done:true},
      {label:"UK CMA: bloqueo inicial → revisado",date:"Oct 2023",done:true},
      {label:"Cierre ✓",date:"Oct 2023",done:true},
    ],
    risks:[],
  },
  {
    id:11, acquirer:"Mars Inc.", target:"Kellanova", ticker:"K",
    sector:"Consumo", sectorKey:"consumer", region:"Global", regionKey:"usa",
    dealValue:"$36B", dealValueNum:36, announced:"2024-08-14", expectedClose:"Completado Mar 2025",
    stage:"completed", paymentType:"cash", sizeCat:"large",
    premium:33, probability:100, currentPrice:83.5, preAnnouncementPrice:58.6,
    offerPrice:83.5, spreadNum:0, status:"completed",
    signal:"COMPLETADO", signalColor:"#6b7280", flag:"🌍",
    source:"SEC 8-K Kellanova · Morrison Foerster M&A 2024 Review",
    sourceUrl:"https://www.mofo.com/resources/insights/250109-m-a-in-2024-and-trends-for-2025",
    notes:"Completado Mar 2025. Mars pagó $83.5/sh. Deal limpio: sin solapamiento antimonopolio, aprobación rápida. Prima del 33% sobre precio pre-anuncio. Referencia clásica de arbitraje exitoso en sector FMCG.",
    timeline:[
      {label:"Anuncio",date:"Ago 2024",done:true},
      {label:"Aprobación accionistas",date:"Oct 2024",done:true},
      {label:"Aprobaciones regulatorias globales",date:"2024-2025",done:true},
      {label:"Cierre ✓",date:"Mar 2025",done:true},
    ],
    risks:[],
  },
  {
    id:12, acquirer:"ExxonMobil", target:"Pioneer Natural Resources", ticker:"PXD",
    sector:"Energía", sectorKey:"energy", region:"USA", regionKey:"usa",
    dealValue:"$59.5B", dealValueNum:59.5, announced:"2023-10-11", expectedClose:"Completado May 2024",
    stage:"completed", paymentType:"stock", sizeCat:"large",
    premium:18, probability:100, currentPrice:253.0, preAnnouncementPrice:214.2,
    offerPrice:253.0, spreadNum:0, status:"completed",
    signal:"COMPLETADO", signalColor:"#6b7280", flag:"🇺🇸",
    source:"SEC · FTC · Bloomberg",
    sourceUrl:"https://corporate.exxonmobil.com/news/news-releases/2024/0503_exxonmobil-completes-pioneer-natural-resources-acquisition",
    notes:"Completado May 2024. Mayor deal energético del año. FTC aprobó con condición de que el ex-CEO de Pioneer no entrara al board de Exxon. Deal limpio sin grandes obstáculos. Referencia de arbitraje en oil & gas.",
    timeline:[
      {label:"Anuncio",date:"Oct 2023",done:true},
      {label:"FTC aprueba (condición Sheffield)",date:"Feb 2024",done:true},
      {label:"Aprobación accionistas",date:"Mar 2024",done:true},
      {label:"Cierre ✓",date:"May 2024",done:true},
    ],
    risks:[],
  },


  // ── DEALS SCRAPER EDGAR BATCH 2 (Mar 2026) ───────────────────────────────
  {
    id:17, acquirer:"Brink's Company (BCO)", target:"NCR Atleos Corporation", ticker:"NATL",
    sector:"Tecnología", sectorKey:"tech", region:"USA", regionKey:"usa",
    dealValue:"$6.6B", dealValueNum:6.6, announced:"2026-02-26", expectedClose:"2027 Q1",
    stage:"regulatory", paymentType:"mixed", sizeCat:"large",
    premium:22, probability:75, currentPrice:47.8, preAnnouncementPrice:41.5,
    offerPrice:50.40, spreadNum:5.4, status:"active",
    signal:"ACUMULAR", signalColor:"#3b82f6", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://investor.ncratleos.com/news-events/press-releases/detail/174/brinks-acquire-ncr-atleos-for-6-6-billion",
    notes:"Brink's adquiere NCR Atleos (mayor red ATM independiente del mundo) en deal mixto: $2.2B cash + 13.3M acciones BCO + asunción de $2.6B de deuda. Valor implícito $50.40/sh. NCR Atleos completó con éxito una solicitud de consentimiento de bonistas el 11 Mar 2026, eliminando el riesgo de cambio de control en su deuda. Deal estratégico: crea el líder global en infraestructura financiera de autoservicio.",
    timeline:[
      {label:"Acuerdo firmado",date:"26 Feb 2026",done:true},
      {label:"Consentimiento bonistas obtenido",date:"11 Mar 2026",done:true},
      {label:"Filing HSR / revisión antimonopolio",date:"Q2 2026",done:false},
      {label:"Voto accionistas NATL",date:"Q2-Q3 2026",done:false},
      {label:"Cierre esperado",date:"Q1 2027",done:false},
    ],
    risks:[
      {label:"Revisión antimonopolio por concentración en mercado ATM global",level:"medio"},
      {label:"Riesgo de precio: parte del pago en acciones BCO (volátil)",level:"medio"},
      {label:"Integración de deuda elevada ($2.6B asumida)",level:"medio"},
    ],
  },
  {
    id:18, acquirer:"Affinius Capital + Vista Hill Partners", target:"Veris Residential", ticker:"VRE",
    sector:"Inmobiliario", sectorKey:"realestate", region:"USA", regionKey:"usa",
    dealValue:"$3.4B", dealValueNum:3.4, announced:"2026-02-23", expectedClose:"2026 Q2",
    stage:"regulatory", paymentType:"cash", sizeCat:"mid",
    premium:23.2, probability:87, currentPrice:18.75, preAnnouncementPrice:15.42,
    offerPrice:19.00, spreadNum:1.3, status:"active",
    signal:"COMPRAR", signalColor:"#10b981", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://investors.verisresidential.com/news-events/press-releases/detail/548/veris-residential-to-be-acquired-by-affinius-capital-led",
    notes:"Take-private de REIT multifamiliar clase A en el noreste de USA. Affinius Capital lidera el consorcio junto a Vista Hill Partners. $19/sh en cash, prima 23.2% sobre precio no afectado del 4 Feb 2026. Financiación: $2.08B en bridge loan comprometido + equity. Board aprobó por unanimidad tras revisión estratégica de varios años. Spread mínimo indica alta confianza del mercado en el cierre.",
    timeline:[
      {label:"Acuerdo firmado",date:"23 Feb 2026",done:true},
      {label:"Dividendo Q1 2026 (último)",date:"Mar 2026",done:false},
      {label:"Revisión regulatoria",date:"Mar-Abr 2026",done:false},
      {label:"Voto accionistas VRE",date:"Q2 2026",done:false},
      {label:"Cierre esperado",date:"Q2 2026",done:false},
    ],
    risks:[
      {label:"Riesgo de financiación: bridge loan de $2.08B pendiente de sindicalizar",level:"medio"},
      {label:"Posibles investigaciones de abogados de accionistas (habitual en REITs)",level:"bajo"},
      {label:"Exposición a tipos de interés en el periodo de cierre",level:"bajo"},
    ],
  },
  {
    id:19, acquirer:"Universal Health Services (UHS)", target:"Talkspace", ticker:"TALK",
    sector:"Salud", sectorKey:"health", region:"USA", regionKey:"usa",
    dealValue:"$835M", dealValueNum:0.835, announced:"2026-03-09", expectedClose:"2026 Q3",
    stage:"announced", paymentType:"cash", sizeCat:"mid",
    premium:10, probability:82, currentPrice:5.18, preAnnouncementPrice:4.77,
    offerPrice:5.25, spreadNum:1.3, status:"active",
    signal:"COMPRAR", signalColor:"#10b981", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://www.prnewswire.com/news-releases/universal-health-services-inc-to-acquire-talkspace-inc-302708096.html",
    notes:"UHS (hospital giant, $17.4B revenue 2025) adquiere Talkspace, plataforma líder de salud mental virtual con ~6,000 profesionales y $229M revenue 2025. All-cash a $5.25/sh, financiado con la revolving credit facility existente de UHS. Deal aprobado por unanimidad por ambos boards. Spread muy ajustado indica confianza alta del mercado. Se espera sea ligeramente acretivo al EPS de UHS en los primeros 12 meses.",
    timeline:[
      {label:"Acuerdo firmado",date:"9 Mar 2026",done:true},
      {label:"Filing HSR presentado",date:"Mar 2026",done:false},
      {label:"Revisión regulatoria",date:"Abr-Jun 2026",done:false},
      {label:"Voto accionistas TALK",date:"Q2 2026",done:false},
      {label:"Cierre esperado",date:"Q3 2026",done:false},
    ],
    risks:[
      {label:"Revisión antimonopolio en sector salud (habitual pero bajo riesgo aquí)",level:"bajo"},
      {label:"Integración de fuerza laboral 100% remota en estructura hospitalaria tradicional",level:"medio"},
      {label:"Retención de talento clínico post-cierre",level:"bajo"},
    ],
  },
  {
    id:20, acquirer:"Bending Spoons S.p.A.", target:"Eventbrite", ticker:"EB",
    sector:"Tecnología", sectorKey:"tech", region:"USA", regionKey:"usa",
    dealValue:"$500M", dealValueNum:0.5, announced:"2025-12-02", expectedClose:"Completado Mar 2026",
    stage:"completed", paymentType:"cash", sizeCat:"mid",
    premium:82, probability:100, currentPrice:4.50, preAnnouncementPrice:2.47,
    offerPrice:4.50, spreadNum:0, status:"completed",
    signal:"COMPRAR", signalColor:"#10b981", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://investor.eventbrite.com/press-releases/press-releases-details/2025/Eventbrite-Enters-into-Definitive-Agreement-to-Be-Acquired-by-Bending-Spoons",
    notes:"Eventbrite adquirida por Bending Spoons (misma empresa que compró Meetup) en take-private all-cash a $4.50/sh, prima del 82%. Deal cerrado el 10 Mar 2026. Accionistas aprobaron el 27 Feb 2026 con 88.7% del poder de voto representado. Caso de estudio: spread de ~5% hasta días antes del cierre ofrecía oportunidad clara con riesgo mínimo.",
    timeline:[
      {label:"Anuncio",date:"2 Dic 2025",done:true},
      {label:"Acuerdo accionistas mayoritarios (Hartz)",date:"1 Dic 2025",done:true},
      {label:"Voto accionistas ✓ (88.7%)",date:"27 Feb 2026",done:true},
      {label:"Cierre ✓",date:"10 Mar 2026",done:true},
    ],
    risks:[],
  },
  // ── DEALS IMPORTADOS DESDE SEC EDGAR (Mar 2026) ───────────────────────────
  {
    id:13, acquirer:"Danaher Corporation", target:"Masimo Corporation", ticker:"MASI",
    sector:"Salud", sectorKey:"health", region:"USA", regionKey:"usa",
    dealValue:"$9.9B", dealValueNum:9.9, announced:"2026-02-17", expectedClose:"2026 H2",
    stage:"regulatory", paymentType:"cash", sizeCat:"large",
    premium:38.3, probability:88, currentPrice:174.4, preAnnouncementPrice:130,
    offerPrice:180, spreadNum:3.1, status:"active",
    signal:"COMPRAR", signalColor:"#10b981", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0000937556&type=8-K&dateb=&owner=include&count=5",
    notes:"Danaher adquiere Masimo en cash puro a $180/sh. Deal aprobado por unanimidad por ambos boards. Masimo operará como unidad independiente dentro del segmento Diagnostics de Danaher. Politan Capital (activista) firmó voting agreement a favor. Financiación: cash + deuda nueva.",
    timeline:[
      {label:"Acuerdo firmado",date:"17 Feb 2026",done:true},
      {label:"Filing HSR presentado",date:"Mar 2026",done:false},
      {label:"Revisión DOJ/FTC",date:"Mar-Abr 2026",done:false},
      {label:"Voto accionistas MASI",date:"Q2 2026",done:false},
      {label:"Cierre esperado",date:"H2 2026",done:false},
    ],
    risks:[
      {label:"Revisión FTC por solapamiento en diagnóstico médico",level:"medio"},
      {label:"Riesgo de tipo de interés en financiación de deuda",level:"bajo"},
      {label:"Integración post-merger (cultura corporativa)",level:"bajo"},
    ],
  },
  {
    id:14, acquirer:"Leonard Green & Partners", target:"Mister Car Wash", ticker:"MCW",
    sector:"Consumo", sectorKey:"consumer", region:"USA", regionKey:"usa",
    dealValue:"$3.1B", dealValueNum:3.1, announced:"2026-02-18", expectedClose:"2026 H1",
    stage:"regulatory", paymentType:"cash", sizeCat:"mid",
    premium:29, probability:91, currentPrice:6.95, preAnnouncementPrice:5.43,
    offerPrice:7.00, spreadNum:0.7, status:"active",
    signal:"COMPRAR", signalColor:"#10b981", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001853513&type=8-K&dateb=&owner=include&count=5",
    notes:"Take-private por LGP, que ya controla ~67% de MCW desde 2014. Compra el float restante a $7/sh en cash. Riesgo regulatorio muy bajo — no hay concentración de mercado en autolavados. Special Committee de directores independientes aprobó la operación. Spread mínimo indica alta confianza del mercado en el cierre.",
    timeline:[
      {label:"Acuerdo firmado",date:"18 Feb 2026",done:true},
      {label:"Revisión regulatoria",date:"Mar 2026",done:false},
      {label:"Voto accionistas minoritarios",date:"Abr 2026",done:false},
      {label:"Cierre esperado",date:"H1 2026",done:false},
    ],
    risks:[
      {label:"Conflicto de interés: LGP es adquirente y accionista mayoritario",level:"medio"},
      {label:"Posibles investigaciones de abogados de accionistas (habitual en take-privates)",level:"bajo"},
      {label:"Riesgo de cierre: mínimo dado el control previo de LGP",level:"bajo"},
    ],
  },
  {
    id:15, acquirer:"Boston Scientific", target:"Penumbra Inc.", ticker:"PEN",
    sector:"Salud", sectorKey:"health", region:"USA", regionKey:"usa",
    dealValue:"$14.5B", dealValueNum:14.5, announced:"2026-01-15", expectedClose:"2026 H2",
    stage:"regulatory", paymentType:"mixed", sizeCat:"large",
    premium:32, probability:78, currentPrice:352.8, preAnnouncementPrice:283.3,
    offerPrice:374, spreadNum:6.2, status:"active",
    signal:"ACUMULAR", signalColor:"#3b82f6", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001321732&type=8-K&dateb=&owner=include&count=5",
    notes:"Mayor adquisición de BSX en más de dos décadas. PEN aporta tecnología líder en trombectomía mecánica y neurovascular. Pago mixto: cash + stock de BSX. BSX bajó ~6% tras el anuncio — oportunidad si el deal cierra. Analistas Stifel califican el deal de 'excelente fit operativo y cultural'.",
    timeline:[
      {label:"Acuerdo firmado",date:"15 Ene 2026",done:true},
      {label:"Filing HSR presentado",date:"Feb 2026",done:true},
      {label:"Revisión FTC/DOJ",date:"Mar-May 2026",done:false},
      {label:"Investor event BSX",date:"28 Mar 2026",done:false},
      {label:"Cierre esperado",date:"H2 2026",done:false},
    ],
    risks:[
      {label:"Revisión FTC por consolidación en mercado medtech",level:"medio"},
      {label:"Parte del pago en acciones de BSX (spread variable)",level:"medio"},
      {label:"Integración compleja de tecnología neurovascular",level:"bajo"},
    ],
  },
  {
    id:16, acquirer:"Permira + Warburg Pincus + Temasek", target:"Clearwater Analytics", ticker:"CWAN",
    sector:"Tecnología", sectorKey:"tech", region:"USA", regionKey:"usa",
    dealValue:"$8.4B", dealValueNum:8.4, announced:"2025-12-21", expectedClose:"2026 H1",
    stage:"regulatory", paymentType:"cash", sizeCat:"large",
    premium:47, probability:82, currentPrice:23.45, preAnnouncementPrice:16.7,
    offerPrice:24.55, spreadNum:4.5, status:"active",
    signal:"ACUMULAR", signalColor:"#3b82f6", flag:"🇺🇸",
    source:"SEC EDGAR 8-K", sourceUrl:"https://www.sec.gov/cgi-bin/browse-edgar?action=getcompany&CIK=0001866368&type=8-K&dateb=&owner=include&count=5",
    notes:"Consorcio PE (Permira + Warburg Pincus + Temasek + Francisco Partners) adquiere software de gestión de inversiones institucionales. Prima del 47% sobre precio pre-anuncio. Take-private de fintech con ingresos recurrentes sólidos. Special Committee recomendó la operación. Ventana go-shop activa hasta Abr 2026.",
    timeline:[
      {label:"Acuerdo firmado",date:"20 Dic 2025",done:true},
      {label:"Anuncio público",date:"21 Dic 2025",done:true},
      {label:"Revisión regulatoria",date:"Ene-Mar 2026",done:false},
      {label:"Voto accionistas",date:"Q1-Q2 2026",done:false},
      {label:"Cierre esperado",date:"H1 2026",done:false},
    ],
    risks:[
      {label:"Revisión CFIUS por participación de Temasek (capital soberano Singapur)",level:"medio"},
      {label:"Ventana go-shop activa: posible oferta competidora",level:"bajo"},
      {label:"Investigaciones rutinarias de abogados de accionistas",level:"bajo"},
    ],
  },
];
const STAGE_CFG = {
  announced:    {label:"Anunciado",    color:"#8b5cf6"},
  duediligence: {label:"Due Diligence",color:"#f59e0b"},
  regulatory:   {label:"Regulatorio", color:"#f97316"},
  closing:      {label:"Pre-Cierre",  color:"#10b981"},
  completed:    {label:"Completado",  color:"#6b7280"},
  blocked:      {label:"Bloqueado",   color:"#ef4444"},
};


const GLOSSARY = [
  {term:"SPREAD", color:"#10b981",
   def:"Diferencia entre el precio actual de la acción y el precio de oferta. Si cotiza a $96 y la oferta es $100, el spread es +4%. Es tu beneficio potencial si el deal cierra. Spread alto = mayor riesgo percibido de ruptura.",
   ex:"Cotización $96 → Oferta $100 → Spread +4%"},
  {term:"PRIMA",  color:"#8b5cf6",
   def:"% que el adquirente paga por encima del precio previo al anuncio. Indica cuánto valora el comprador la empresa respecto al mercado. Primas típicas: 20–40%. Prima alta puede indicar guerra de ofertas o activo muy estratégico.",
   ex:"Pre-anuncio $80 → Oferta $100 → Prima +25%"},
  {term:"PROB. CIERRE", color:"#f59e0b",
   def:"Estimación de la probabilidad de que el deal se complete con éxito. Se calcula valorando el estado regulatorio, la oposición política, el historial de deals similares, el tipo de pago y el tiempo restante. +85% = prácticamente cerrado. 50–85% = riesgo moderado. <50% = alta incertidumbre o deal en peligro.",
   ex:"+85% aprobaciones obtenidas → bajo riesgo · <50% veto político → evitar"},
];

const PAYMENT_GUIDE = [
  {term:"💵 ALL CASH", color:"#10b981",
   def:"El adquirente paga en efectivo por cada acción del objetivo a un precio fijo. Es el tipo de deal más favorable para el arbitrajista: el beneficio es exactamente el spread entre el precio actual y el precio de oferta, sin ninguna exposición a la volatilidad del adquirente. Si el deal cierra, cobras el precio acordado sin sorpresas.",
   ex:"Oferta $100/sh cash → cotiza a $96 → spread +4% garantizado si cierra"},
  {term:"📈 STOCK DEAL", color:"#8b5cf6",
   def:"El adquirente paga con sus propias acciones a un ratio de canje fijo (ej: 0.5 acciones de la adquirente por cada acción del objetivo). El spread fluctúa cada día porque depende del precio de las dos acciones. Estrategia habitual: comprar el objetivo y vender en corto al adquirente para neutralizar el riesgo de mercado y aislar el spread puro.",
   ex:"Ratio 0.5x → adquirente a $200 → valor $100/sh → objetivo cotiza $92 → spread +8.7%"},
  {term:"⚖️ CASH + STOCK", color:"#f59e0b",
   def:"El adquirente paga una combinación de efectivo y acciones propias. El riesgo es intermedio: la parte en cash es fija y segura, pero la parte en stock fluctúa con el precio del adquirente. Hay que recalcular el valor total del canje diariamente. Ejemplo: $60 en cash + 0.2 acciones del adquirente por cada acción del objetivo.",
   ex:"$60 cash + 0.2x acciones ($200) = valor total $100 → objetivo a $92 → spread +8.7%"},
];

const STAGES_GUIDE = [
  {term:"ANUNCIADO",    color:"#8b5cf6",
   def:"El deal acaba de hacerse público. Ambas partes han firmado un acuerdo de intención o definitivo. Es el momento de mayor incertidumbre: todavía no se ha iniciado el proceso regulatorio ni se conoce la reacción del mercado. El spread suele ser el más amplio en esta fase.",
   ex:"Anuncio público → acuerdo firmado → inicio del proceso"},
  {term:"DUE DILIGENCE", color:"#f59e0b",
   def:"Fase de revisión exhaustiva donde el adquirente analiza en profundidad las finanzas, contratos, litigios y riesgos del objetivo. Si surgen problemas graves ('material adverse change'), el comprador puede renegociar o cancelar. Raramente visible en deals públicos, ya suele ocurrir antes del anuncio.",
   ex:"Revisión financiera, legal y operativa → confirmación de la oferta"},
  {term:"REGULATORIO",  color:"#f97316",
   def:"El deal está bajo revisión de organismos antimonopolio (DOJ, FTC, EU Commission, CMA, CFIUS...). Es la fase más larga y de mayor riesgo. Los reguladores pueden aprobar sin condiciones, aprobar con desinversiones obligatorias, o bloquear el deal. El spread refleja directamente el riesgo percibido de bloqueo.",
   ex:"DOJ investiga solapamiento → exige vender una división → deal aprobado"},
  {term:"PRE-CIERRE",   color:"#10b981",
   def:"Todas las aprobaciones regulatorias y de accionistas han sido obtenidas. El deal está en la recta final: se están completando los trámites legales, financieros y de integración previos al cierre formal. El spread se comprime al mínimo. Riesgo muy bajo salvo eventos excepcionales.",
   ex:"Aprobaciones obtenidas → trámites finales → cierre en días o semanas"},
  {term:"COMPLETADO",   color:"#6b7280",
   def:"El deal cerró con éxito. La empresa objetivo fue absorbida o fusionada con el adquirente. Su acción dejó de cotizar al precio de la oferta. Estos deals se muestran como referencia histórica para estudiar patrones de arbitraje, primas habituales y tiempos de cierre por sector.",
   ex:"Accionistas cobran el precio de oferta → empresa objetivo se descotiza"},
  {term:"BLOQUEADO",    color:"#ef4444",
   def:"El deal fue bloqueado por un regulador, vetado por el gobierno, o terminado de mutuo acuerdo ante la imposibilidad de obtener aprobaciones. El adquirente suele pagar una 'breakup fee' al objetivo. La cotización del objetivo cae abruptamente hacia su precio previo al anuncio o incluso por debajo.",
   ex:"Adobe/Figma: bloqueado por EU+CMA → Adobe paga $1B breakup fee"},
];

const SIGNALS_GUIDE = [
  {term:"COMPRAR",    color:"#10b981",
   def:"El deal tiene alta probabilidad de cierre (>85%), el spread es atractivo y los riesgos regulatorios o políticos son bajos o ya han sido superados. Es el momento óptimo para entrar en la acción del objetivo y capturar el spread hasta el cierre. Cuanto más cerca del cierre, menor el riesgo.",
   ex:"Aprobaciones obtenidas, spread +2–5%, cierre en semanas → entrada óptima"},
  {term:"ACUMULAR",  color:"#3b82f6",
   def:"La oportunidad es atractiva pero existe riesgo moderado controlable: revisión regulatoria en curso sin señales de bloqueo, deal mixto con algo de volatilidad en el precio de canje, o timeline algo largo. Tiene sentido construir posición gradualmente y monitorizar hitos regulatorios.",
   ex:"Spread +15-20%, accionistas aprobaron, FTC en revisión sin señales negativas"},
  {term:"CAUTO",     color:"#f59e0b",
   def:"Existen factores de riesgo significativos que hacen la entrada arriesgada en este momento: reguladores activos con posiciones negativas, oposición política fuerte, STB/CFIUS complicados, o timeline muy largo (2+ años). El spread puede parecer atractivo pero no compensa el riesgo de ruptura.",
   ex:"STB rechazó solicitud, oposición sindical activa, riesgo político alto"},
  {term:"EVITAR",    color:"#ef4444",
   def:"El riesgo de ruptura definitiva es muy alto. El spread aparente puede ser enorme, pero es una trampa: si el deal cae, la acción del objetivo se desploma al precio previo al anuncio. Casos típicos: veto gubernamental, CFIUS con objeciones de seguridad nacional, o terminación inminente.",
   ex:"Nippon/US Steel: spread +43% pero bloqueado → precio caería de $38 a $25"},
];

// ─── DESIGN TOKENS ────────────────────────────────────────────────────────────
const BG    = "#030a14";
const BG2   = "#050d18";
const BDR   = "#0d1e30";
const BDR2  = "#1e3a5f";
const TXT   = "#f0f4f8";
const TXT2  = "#94a3b8";
const TXT3  = "#4a6080";
const GREEN = "#10b981";
const BLUE  = "#3b82f6";
const PURP  = "#8b5cf6";
const AMBER = "#f59e0b";
const RED   = "#ef4444";

// ─── STAGE CONFIG ─────────────────────────────────────────────────────────────
// ─── UTILITIES ────────────────────────────────────────────────────────────────
function RiskDot({level}) {
  const c = {alto:RED, medio:AMBER, bajo:GREEN}[level] || TXT3;
  return (
    <span style={{display:"inline-flex",alignItems:"center",gap:5}}>
      <span style={{width:7,height:7,borderRadius:"50%",background:c,display:"inline-block",boxShadow:`0 0 5px ${c}`}}/>
      <span style={{fontSize:11,color:c,fontWeight:600,textTransform:"capitalize"}}>{level}</span>
    </span>
  );
}

function ProgressBar({value, color}) {
  return (
    <div style={{height:4,background:"#0d1e30",borderRadius:99,overflow:"hidden"}}>
      <div style={{height:"100%",width:`${Math.min(value,100)}%`,background:color,borderRadius:99,transition:"width 0.6s ease"}}/>
    </div>
  );
}

// ─── FILTER DROPDOWN ──────────────────────────────────────────────────────────
function FilterDropdown({label, value, onChange, options, accentColor}) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const active = value !== "all";

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false); }
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = options.find(o => o.value === value);

  return (
    <div ref={ref} style={{position:"relative", flexShrink:0}}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          background: active ? accentColor+"18" : "transparent",
          border: `1px solid ${active ? accentColor+"66" : BDR2}`,
          borderRadius:8, padding:"6px 10px",
          color: active ? accentColor : TXT3,
          fontSize:11, cursor:"pointer",
          fontFamily:"inherit", display:"flex", alignItems:"center", gap:6,
          transition:"all 0.15s",
        }}
      >
        <span style={{letterSpacing:0.5}}>{label}{active ? `: ${selected?.label}` : ""}</span>
        <span style={{fontSize:9, transition:"transform 0.2s", transform:open?"rotate(180deg)":"rotate(0deg)"}}>▼</span>
      </button>
      {open && (
        <div style={{
          position:"absolute", top:"calc(100% + 4px)", left:0, zIndex:200,
          background:"#0a1628", border:`1px solid ${BDR2}`,
          borderRadius:10, padding:4, minWidth:160,
          boxShadow:"0 8px 32px rgba(0,0,0,0.6)",
        }}>
          {options.map(o => (
            <div key={o.value}
              onClick={() => { onChange(o.value); setOpen(false); }}
              style={{
                padding:"8px 12px", borderRadius:7, cursor:"pointer",
                fontSize:12, color: o.value===value ? accentColor : TXT2,
                background: o.value===value ? accentColor+"18" : "transparent",
                transition:"background 0.1s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = o.value===value ? accentColor+"18" : BDR}
              onMouseLeave={e => e.currentTarget.style.background = o.value===value ? accentColor+"18" : "transparent"}
            >
              {o.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── LOCK BADGE ───────────────────────────────────────────────────────────────
function LockBadge({onUpgrade}) {
  return (
    <span
      onClick={e => { e.stopPropagation(); onUpgrade && onUpgrade(); }}
      style={{
        display:"inline-flex", alignItems:"center", gap:3,
        background:BDR, border:`1px solid ${BDR2}`,
        borderRadius:5, padding:"2px 7px", fontSize:10,
        color:TXT3, cursor:"pointer", userSelect:"none",
        transition:"all 0.15s",
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor=BLUE; e.currentTarget.style.color=BLUE; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor=BDR2; e.currentTarget.style.color=TXT3; }}
    >🔒 Premium</span>
  );
}

// ─── DEAL CARD ────────────────────────────────────────────────────────────────
function DealCard({deal, onClick, selected, isPremium, onUpgrade}) {
  const t = useT();
  const stage = STAGE_CFG[deal.stage] || STAGE_CFG.announced;
  return (
    <div
      onClick={() => onClick(deal)}
      style={{
        background: selected ? "#0c1628" : "#080e1a",
        border:`1px solid ${selected ? deal.signalColor+"55" : "#111d2e"}`,
        borderLeft:`3px solid ${deal.signalColor}`,
        borderRadius:10, padding:"14px 16px", cursor:"pointer",
        transition:"all 0.18s",
        boxShadow: selected ? `0 2px 20px ${deal.signalColor}18` : "none",
      }}
    >
      <div style={{display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:10}}>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:10, color:TXT3, letterSpacing:0.8, marginBottom:3, textTransform:"uppercase"}}>
            {deal.flag} {deal.sector} · {deal.region}
          </div>
          <div style={{fontSize:15, fontWeight:700, color:TXT, fontFamily:"'JetBrains Mono',monospace", lineHeight:1.2}}>
            {deal.ticker}
            <span style={{color:TXT3, fontWeight:400, fontSize:13}}> · {deal.target}</span>
          </div>
          <div style={{fontSize:11, color:"#3a5070", marginTop:2}}>← {deal.acquirer}</div>
        </div>
        {isPremium
          ? <span style={{background:deal.signalColor+"20", color:deal.signalColor, border:`1px solid ${deal.signalColor}44`, borderRadius:6, padding:"4px 9px", fontSize:10, fontWeight:800, letterSpacing:1.2, whiteSpace:"nowrap", flexShrink:0, marginLeft:8}}>{deal.signal}</span>
          : <LockBadge onUpgrade={onUpgrade}/>
        }
      </div>

      <div style={{display:"flex", gap:16, marginBottom:10, flexWrap:"wrap"}}>
        {[
          [t.mValor,  deal.dealValue,                                                              TXT2],
          [t.mSpread, isPremium ? (deal.spreadNum > 0 ? `+${deal.spreadNum}%` : "—") : "🔒",     isPremium && deal.spreadNum > 0 ? GREEN : BDR],
          [t.mPrima,  deal.premium > 0 ? `+${deal.premium}%` : "—",                               PURP],
          [t.mPago,   deal.paymentType==="cash" ? t.mCash : deal.paymentType==="stock" ? t.mStock : t.mMixed, TXT2],
        ].map(([l,v,c],i) => (
          <div key={i}>
            <div style={{fontSize:9, color:"#334155", letterSpacing:0.8, marginBottom:2, textTransform:"uppercase"}}>{l}</div>
            <div style={{fontSize:13, color:c, fontFamily:"'JetBrains Mono',monospace", fontWeight:600}}>{v}</div>
          </div>
        ))}
      </div>

      <div style={{marginBottom:10}}>
        <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
          <span style={{fontSize:10, color:"#334155"}}>{t.mProb}</span>
          {isPremium
            ? <span style={{fontSize:11, color:deal.signalColor, fontFamily:"'JetBrains Mono',monospace", fontWeight:700}}>{deal.probability}%</span>
            : <LockBadge onUpgrade={onUpgrade}/>
          }
        </div>
        {isPremium
          ? <ProgressBar value={deal.probability} color={deal.signalColor}/>
          : <div style={{height:4, background:BDR, borderRadius:99}}/>
        }
      </div>

      <div style={{display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <span style={{background:stage.color+"14", color:stage.color, borderRadius:5, padding:"2px 8px", fontSize:9, fontWeight:700, letterSpacing:0.8, border:`1px solid ${stage.color}30`}}>
          {stage.label}
        </span>
        <span style={{fontSize:10, color:TXT3, fontFamily:"'JetBrains Mono',monospace"}}>{deal.expectedClose}</span>
      </div>
    </div>
  );
}

// ─── DETAIL PANEL ─────────────────────────────────────────────────────────────
function DetailPanel({deal, isPremium, onUpgrade}) {
  const t = useT();
  if (!deal) return (
    <div style={{height:"100%", display:"flex", alignItems:"center", justifyContent:"center", flexDirection:"column", gap:10, color:BDR2}}>
      <div style={{fontSize:28}}>📊</div>
      <div style={{fontSize:12, letterSpacing:2, color:BDR2}}>{t.selectDeal}</div>
    </div>
  );

  const stage = STAGE_CFG[deal.stage] || STAGE_CFG.announced;

  // Payment type block
  const ptCfg = {
    cash:  {icon:"💵", label:"All Cash",    color:GREEN, desc: t.paymentTypeLabel + " — Cash"},
    stock: {icon:"📈", label:"Stock Deal",  color:PURP,  desc: t.paymentTypeLabel + " — Stock"},
    mixed: {icon:"⚖️", label:"Cash + Stock",color:AMBER, desc: t.paymentTypeLabel + " — Mixto"},
  }[deal.paymentType] || {icon:"—", label:"N/A", color:TXT3, desc:""};

  return (
    <div style={{padding:"0 2px"}}>
      {/* Header */}
      <div style={{marginBottom:20}}>
        <div style={{fontSize:11, color:TXT3, letterSpacing:1.5, textTransform:"uppercase", marginBottom:6}}>
          {deal.flag} {deal.sector} · {deal.region}
        </div>
        <h2 style={{margin:"0 0 4px", fontSize:24, color:TXT, fontFamily:"'JetBrains Mono',monospace", fontWeight:800, letterSpacing:-0.5}}>
          {deal.target}
        </h2>
        <div style={{fontSize:13, color:TXT3}}>
          {t.acquiredBy} <span style={{color:TXT2, fontWeight:600}}>{deal.acquirer}</span>
        </div>
      </div>

      {/* Signal banner or lock */}
      {!isPremium && deal.status === "active" ? (
        <div onClick={onUpgrade} style={{
          background:"#0a1628", border:`1px solid ${BDR2}`, borderLeft:`3px solid ${BLUE}`,
          borderRadius:10, padding:"14px 16px", marginBottom:16, cursor:"pointer",
          display:"flex", alignItems:"center", gap:14,
        }}>
          <div style={{fontSize:26}}>🔒</div>
          <div>
            <div style={{fontSize:13, fontWeight:700, color:TXT2, marginBottom:4}}>{t.lockedTitle}</div>
            <div style={{fontSize:11, color:TXT3, lineHeight:1.6}}>{t.lockedDesc}</div>
            <div style={{marginTop:8, display:"inline-block", background:`linear-gradient(135deg,${BLUE},${PURP})`, borderRadius:6, padding:"4px 12px", fontSize:10, color:"#fff", fontWeight:700, letterSpacing:1}}>{t.seePlans}</div>
          </div>
        </div>
      ) : deal.status === "active" ? (() => {
        const cfg = {
          "COMPRAR":    {color:GREEN, icon:"🟢", msg:"Oportunidad de entrada. El spread es atractivo y el riesgo de ruptura es bajo."},
          "ACUMULAR":   {color:BLUE,  icon:"🔵", msg:"Construir posición gradualmente. Riesgo moderado controlable."},
          "CAUTO":      {color:AMBER, icon:"🟡", msg:"Factores de riesgo significativos. Monitorizar antes de entrar."},
          "EVITAR":     {color:RED,   icon:"🔴", msg:"Riesgo de ruptura muy alto. El spread puede ser una trampa."},
          "COMPLETADO": {color:"#6b7280", icon:"✅", msg:"Deal cerrado. Referencia histórica."},
        }[deal.signal] || {color:TXT3, icon:"—", msg:""};
        return (
          <div style={{background:cfg.color+"12", border:`1px solid ${cfg.color}33`, borderLeft:`3px solid ${cfg.color}`, borderRadius:10, padding:"14px 16px", marginBottom:16, display:"flex", alignItems:"flex-start", gap:12}}>
            <div style={{fontSize:22, flexShrink:0}}>{cfg.icon}</div>
            <div>
              <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:6}}>
                <span style={{background:cfg.color+"22", color:cfg.color, border:`1px solid ${cfg.color}44`, borderRadius:5, padding:"2px 9px", fontSize:11, fontWeight:800, letterSpacing:1.5}}>{deal.signal}</span>
              </div>
              <p style={{margin:0, fontSize:12, color:TXT3, lineHeight:1.7}}>{cfg.msg}</p>
              {deal.notes && <p style={{margin:"8px 0 0", fontSize:11, color:"#4a6080", lineHeight:1.7}}>{deal.notes}</p>}
            </div>
          </div>
        );
      })() : (
        <div style={{background:"#0a1628", border:`1px solid ${BDR}`, borderRadius:10, padding:"12px 16px", marginBottom:16}}>
          <p style={{margin:0, fontSize:12, color:TXT3, lineHeight:1.7}}>{deal.notes}</p>
        </div>
      )}

      {/* Payment type */}
      <div style={{background:ptCfg.color+"10", border:`1px solid ${ptCfg.color}30`, borderLeft:`3px solid ${ptCfg.color}`, borderRadius:10, padding:"14px 16px", marginBottom:16, display:"flex", alignItems:"center", gap:14}}>
        <div style={{fontSize:28, flexShrink:0}}>{ptCfg.icon}</div>
        <div>
          <div style={{display:"flex", alignItems:"center", gap:8, marginBottom:4}}>
            <span style={{background:ptCfg.color+"22", color:ptCfg.color, border:`1px solid ${ptCfg.color}44`, borderRadius:5, padding:"2px 9px", fontSize:11, fontWeight:800, letterSpacing:1.5}}>{ptCfg.label.toUpperCase()}</span>
            <span style={{fontSize:11, color:TXT3}}>{t.paymentTypeLabel}</span>
          </div>
        </div>
      </div>

      {/* Metrics grid */}
      {deal.currentPrice && (
        <div style={{display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:8, marginBottom:16}}>
          {[
            ["Cotización", `$${deal.currentPrice}`, TXT2],
            ["Oferta",     deal.offerPrice ? `$${deal.offerPrice}` : deal.dealValue, GREEN],
            ["Spread",     deal.spreadNum > 0 ? `+${deal.spreadNum}%` : "—", deal.spreadNum > 10 ? AMBER : GREEN],
          ].map(([l,v,c],i) => (
            <div key={i} style={{background:BDR, borderRadius:8, padding:"10px 12px"}}>
              <div style={{fontSize:9, color:TXT3, letterSpacing:0.8, marginBottom:4, textTransform:"uppercase"}}>{l}</div>
              <div style={{fontSize:14, color:c, fontFamily:"'JetBrains Mono',monospace", fontWeight:700}}>{v}</div>
            </div>
          ))}
        </div>
      )}

      {/* Probability */}
      {isPremium && (
        <div style={{marginBottom:16}}>
          <div style={{display:"flex", justifyContent:"space-between", marginBottom:4}}>
            <span style={{fontSize:10, color:TXT3}}>{t.mProb}</span>
            <span style={{fontSize:11, color:deal.signalColor, fontFamily:"'JetBrains Mono',monospace", fontWeight:700}}>{deal.probability}%</span>
          </div>
          <ProgressBar value={deal.probability} color={deal.signalColor}/>
        </div>
      )}

      {/* Timeline */}
      {deal.timeline?.length > 0 && (
        <div style={{marginBottom:16}}>
          <div style={{fontSize:10, color:TXT3, letterSpacing:2, textTransform:"uppercase", marginBottom:12, paddingBottom:8, borderBottom:`1px solid ${BDR}`}}>Timeline</div>
          <div style={{position:"relative", paddingLeft:16}}>
            <div style={{position:"absolute", left:4, top:0, bottom:0, width:1, background:BDR}}/>
            {deal.timeline.map((item,i) => (
              <div key={i} style={{display:"flex", alignItems:"flex-start", gap:10, marginBottom:10, position:"relative"}}>
                <div style={{width:10, height:10, borderRadius:"50%", background:item.done ? GREEN : BDR2, border:`2px solid ${item.done ? GREEN : BDR2}`, flexShrink:0, marginTop:1, position:"relative", zIndex:1}}/>
                <div>
                  <div style={{fontSize:12, color:item.done ? TXT : TXT3, fontWeight:item.done ? 600 : 400}}>{item.label}</div>
                  <div style={{fontSize:10, color:TXT3}}>{item.date}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Risks */}
      {isPremium && deal.risks?.length > 0 && (
        <div style={{marginBottom:16}}>
          <div style={{fontSize:10, color:TXT3, letterSpacing:2, textTransform:"uppercase", marginBottom:10, paddingBottom:8, borderBottom:`1px solid ${BDR}`}}>Riesgos</div>
          {deal.risks.map((r,i) => (
            <div key={i} style={{display:"flex", alignItems:"flex-start", gap:8, marginBottom:8, fontSize:12, color:TXT2}}>
              <RiskDot level={r.level}/>
              <span>{r.label}</span>
            </div>
          ))}
        </div>
      )}

      {/* Source */}
      {deal.sourceUrl && (
        <div style={{paddingTop:12, borderTop:`1px solid ${BDR}`}}>
          <a href={deal.sourceUrl} target="_blank" rel="noopener noreferrer"
            style={{fontSize:10, color:TXT3, textDecoration:"none", display:"flex", alignItems:"center", gap:4}}
            onMouseEnter={e=>e.currentTarget.style.color=BLUE}
            onMouseLeave={e=>e.currentTarget.style.color=TXT3}
          >
            🔗 {deal.source || "SEC EDGAR"} ↗
          </a>
        </div>
      )}
    </div>
  );
}

// ─── GLOSSARY ─────────────────────────────────────────────────────────────────
function GlossarySection({title, items}) {
  return (
    <div style={{marginBottom:24}}>
      <div style={{fontSize:10, color:TXT3, letterSpacing:2, textTransform:"uppercase", marginBottom:14, paddingBottom:8, borderBottom:`1px solid ${BDR}`}}>{title}</div>
      {items.map((item,i) => (
        <div key={i} style={{marginBottom:16, background:BDR, borderRadius:8, padding:"12px 14px", borderLeft:`3px solid ${item.color}`}}>
          <div style={{fontSize:11, fontWeight:800, color:item.color, letterSpacing:1.5, marginBottom:6}}>{item.term}</div>
          <div style={{fontSize:11, color:TXT2, lineHeight:1.7, marginBottom:item.ex?6:0}}>{item.def}</div>
          {item.ex && <div style={{fontSize:10, color:TXT3, fontFamily:"'JetBrains Mono',monospace", background:"#030a14", borderRadius:5, padding:"4px 8px"}}>{item.ex}</div>}
        </div>
      ))}
    </div>
  );
}

function GlossaryPanel() {
  return (
    <div style={{padding:"0 2px"}}>
      <GlossarySection title="Métricas clave" items={GLOSSARY}/>
      <GlossarySection title="Tipo de pago" items={PAYMENT_GUIDE}/>
      <GlossarySection title="Stages del deal" items={STAGES_GUIDE}/>
      <GlossarySection title="Señales de entrada" items={SIGNALS_GUIDE}/>
    </div>
  );
}

// ─── LIVE PRICE FETCHER ───────────────────────────────────────────────────────
async function fetchLivePrice(ticker) {
  if (!ticker || ticker === "N/A") return null;
  try {
    const url = `https://query1.finance.yahoo.com/v8/finance/chart/${ticker}?interval=1d&range=1d`;
    const proxy = `https://api.allorigins.win/get?url=${encodeURIComponent(url)}`;
    const resp = await fetch(proxy, {signal: AbortSignal.timeout(5000)});
    if (!resp.ok) return null;
    const data = await resp.json();
    const parsed = JSON.parse(data.contents);
    const price = parsed?.chart?.result?.[0]?.meta?.regularMarketPrice;
    return price ? Math.round(price * 100) / 100 : null;
  } catch { return null; }
}

// ─── DASHBOARD ────────────────────────────────────────────────────────────────
function MATracker({user, onLogout, onUpgrade, onToggleLang, lang}) {
  const t = useT();
  const tier      = user?.tier || "free";
  const isPremium = tier === "investor" || tier === "pro";

  const [selected,      setSelected]      = useState(DEALS[1]);
  const [fStage,        setFStage]        = useState("all");
  const [fRegion,       setFRegion]       = useState("all");
  const [fSector,       setFSector]       = useState("all");
  const [fSize,         setFSize]         = useState("all");
  const [fPayment,      setFPayment]      = useState("all");
  const [fSignal,       setFSignal]       = useState("all");
  const [fStatus,       setFStatus]       = useState("active");
  const [sortBy,        setSortBy]        = useState("probability");
  const [tab,           setTab]           = useState("deals");
  const [search,        setSearch]        = useState("");
  const [livePrices,    setLivePrices]    = useState({});
  const [pricesLoading, setPricesLoading] = useState(false);
  const [pricesUpdated, setPricesUpdated] = useState(null);

  useEffect(() => {
    async function loadPrices() {
      setPricesLoading(true);
      const tickers = [...new Set(DEALS.filter(d => d.status==="active" && d.ticker && d.ticker!=="N/A" && d.offerPrice).map(d => d.ticker))];
      const results = {};
      for (const ticker of tickers) {
        const price = await fetchLivePrice(ticker);
        if (price) results[ticker] = price;
        await new Promise(r => setTimeout(r, 300));
      }
      setLivePrices(results);
      setPricesLoading(false);
      if (Object.keys(results).length > 0) {
        setPricesUpdated(new Date().toLocaleTimeString(lang==="en"?"en-US":"es-ES", {hour:"2-digit",minute:"2-digit"}));
      }
    }
    loadPrices();
  }, []);

  const dealsWithLive = useMemo(() => DEALS.map(d => {
    const lp = livePrices[d.ticker];
    if (!lp || !d.offerPrice || d.status !== "active") return d;
    const spread = (d.offerPrice - lp) / lp * 100;
    return {...d, currentPrice:lp, spreadNum:Math.round(spread*10)/10};
  }), [livePrices]);

  const filtered = useMemo(() => dealsWithLive
    .filter(d => {
      if (!search) return true;
      const q = search.toLowerCase();
      return d.ticker.toLowerCase().includes(q) || d.target.toLowerCase().includes(q) || d.acquirer.toLowerCase().includes(q) || d.sector.toLowerCase().includes(q);
    })
    .filter(d => fStage   === "all" || d.stage       === fStage)
    .filter(d => fRegion  === "all" || d.regionKey   === fRegion)
    .filter(d => fSector  === "all" || d.sectorKey   === fSector)
    .filter(d => fSize    === "all" || d.sizeCat     === fSize)
    .filter(d => fPayment === "all" || d.paymentType === fPayment)
    .filter(d => fSignal  === "all" || d.signal      === fSignal)
    .filter(d => fStatus  === "all" || d.status      === fStatus)
    .sort((a,b) => {
      if (sortBy==="probability") return b.probability - a.probability;
      if (sortBy==="spread")      return b.spreadNum   - a.spreadNum;
      if (sortBy==="premium")     return b.premium     - a.premium;
      if (sortBy==="value")       return b.dealValueNum- a.dealValueNum;
      return 0;
    }),
  [dealsWithLive, search, fStage, fRegion, fSector, fSize, fPayment, fSignal, fStatus, sortBy]);

  const active     = dealsWithLive.filter(d => d.status === "active");
  const buys       = dealsWithLive.filter(d => d.signal === "COMPRAR");
  const spreadsArr = dealsWithLive.filter(d => d.spreadNum > 0);
  const avgSpread  = spreadsArr.length ? (spreadsArr.reduce((s,d) => s+d.spreadNum, 0)/spreadsArr.length).toFixed(1) : "—";
  const activeFilters = [fStage,fRegion,fSector,fSize,fPayment,fSignal,fStatus].filter(v => v!=="all").length;

  function resetFilters() {
    setFStage("all"); setFRegion("all"); setFSector("all");
    setFSize("all"); setFPayment("all"); setFSignal("all"); setFStatus("active");
    setSearch("");
  }

  return (
    <div style={{background:BG, minHeight:"100vh", fontFamily:"'Inter',sans-serif", color:"#e2e8f0", display:"flex", flexDirection:"column"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:${BDR2}; border-radius:99px; }
        .dash-topbar{flex-wrap:wrap;height:auto!important;min-height:56px;padding:8px 16px!important}
        .dash-topbar-metrics{display:flex;gap:16px;align-items:center;flex-wrap:wrap}
        .dash-main{display:grid;grid-template-columns:380px 1fr}
        .dash-left{border-right:1px solid ${BDR}}
        @media(max-width:900px){
          .dash-main{grid-template-columns:1fr!important;grid-template-rows:auto auto}
          .dash-left{border-right:none!important;border-bottom:1px solid #0d1e30;max-height:50vh}
          .dash-right{max-height:50vh}
        }
        @media(max-width:600px){
          .dash-topbar-metrics .metric-item:nth-child(n+3){display:none}
          .filter-bar{padding:8px 12px!important}
        }
      `}</style>

      {/* TOPBAR */}
      <div className="dash-topbar" style={{background:BG2, borderBottom:`1px solid ${BDR}`, padding:"0 24px", height:56, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0}}>
        <div style={{display:"flex", alignItems:"center", gap:10}}>
          <div style={{width:28,height:28,borderRadius:6,background:`linear-gradient(135deg,${BLUE},${PURP})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff"}}>M</div>
          <div>
            <div style={{fontSize:13,fontWeight:800,letterSpacing:2,color:TXT}}>M&A RADAR</div>
            <div style={{fontSize:8,color:BDR2,letterSpacing:1.5}}>MERGER ARBITRAGE TRACKER</div>
          </div>
        </div>

        <div style={{display:"flex", gap:20, alignItems:"center"}}>
          {[
            [t.topActive, active.length, BLUE],
            [t.topBuys,   buys.length,   GREEN],
            [t.topSpread, `${avgSpread}%`,AMBER],
            [t.topTotal,  DEALS.length,  PURP],
          ].map(([l,v,c],i) => (
            <div key={i} style={{textAlign:"center"}}>
              <div style={{fontSize:8,color:BDR2,letterSpacing:1.5,marginBottom:1}}>{l}</div>
              <div style={{fontSize:15,color:c,fontWeight:700,fontFamily:"'JetBrains Mono',monospace"}}>{v}</div>
            </div>
          ))}
          <div style={{textAlign:"center", borderLeft:`1px solid ${BDR}`, paddingLeft:16}}>
            <div style={{fontSize:8,color:BDR2,letterSpacing:1.5,marginBottom:1}}>{t.topPrices}</div>
            {pricesLoading
              ? <div style={{fontSize:9,color:AMBER,fontFamily:"monospace"}}>{t.topLoading}</div>
              : pricesUpdated
                ? <div style={{fontSize:9,color:GREEN,fontFamily:"monospace"}}>● {pricesUpdated}</div>
                : <div style={{fontSize:9,color:"#334155",fontFamily:"monospace"}}>{t.topOffline}</div>
            }
          </div>
          <div style={{borderLeft:`1px solid ${BDR}`,paddingLeft:16,display:"flex",alignItems:"center",gap:8}}>
            {user ? (
              <>
                <div style={{textAlign:"right"}}>
                  <div style={{fontSize:8,color:BDR2,letterSpacing:1.5,marginBottom:1}}>{t.topPlan}</div>
                  <div style={{fontSize:10,fontWeight:700,letterSpacing:1,color:tier==="pro"?PURP:tier==="investor"?BLUE:"#475569",fontFamily:"monospace"}}>{tier.toUpperCase()}</div>
                </div>
                {!isPremium && <button onClick={onUpgrade} style={{background:`linear-gradient(135deg,${BLUE},${PURP})`,border:"none",borderRadius:7,padding:"5px 10px",color:"#fff",fontSize:10,fontWeight:700,letterSpacing:0.8,cursor:"pointer",fontFamily:"inherit"}}>{t.topUpgrade}</button>}
                <button onClick={onToggleLang} style={{background:"transparent",border:`1px solid ${BDR2}`,borderRadius:7,padding:"4px 8px",color:TXT3,fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>{lang==="es"?"EN":"ES"}</button>
                <button onClick={onLogout} style={{background:"transparent",border:`1px solid ${BDR2}`,borderRadius:7,padding:"4px 8px",color:TXT3,fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>↩</button>
              </>
            ) : (
              <>
                <button onClick={onToggleLang} style={{background:"transparent",border:`1px solid ${BDR2}`,borderRadius:7,padding:"5px 8px",color:TXT3,fontSize:10,cursor:"pointer",fontFamily:"inherit"}}>{lang==="es"?"EN":"ES"}</button>
                <button onClick={onUpgrade} style={{background:`linear-gradient(135deg,${BLUE},${PURP})`,border:"none",borderRadius:7,padding:"6px 12px",color:"#fff",fontSize:10,fontWeight:700,letterSpacing:0.8,cursor:"pointer",fontFamily:"inherit"}}>{lang==="es"?"ACCEDER":"LOG IN"}</button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* FILTER BAR */}
      <div className="filter-bar" style={{background:BG2,borderBottom:`1px solid ${BDR}`,padding:"10px 24px",display:"flex",alignItems:"center",gap:8,flexWrap:"wrap",flexShrink:0}}>
        {/* Search */}
        <div style={{position:"relative",flexShrink:0}}>
          <span style={{position:"absolute",left:9,top:"50%",transform:"translateY(-50%)",fontSize:12,color:"#334155",pointerEvents:"none"}}>🔍</span>
          <input type="text" placeholder={t.searchPh} value={search} onChange={e=>setSearch(e.target.value)}
            style={{background:BG,border:`1px solid ${BDR2}`,borderRadius:8,padding:"7px 28px 7px 28px",color:TXT,fontSize:11,fontFamily:"inherit",width:200,outline:"none"}}
            onFocus={e=>e.target.style.borderColor=BLUE} onBlur={e=>e.target.style.borderColor=BDR2}
          />
          {search && <button onClick={()=>setSearch("")} style={{position:"absolute",right:7,top:"50%",transform:"translateY(-50%)",background:"none",border:"none",color:TXT3,cursor:"pointer",fontSize:12,padding:0}}>✕</button>}
        </div>
        <div style={{height:20,width:1,background:BDR,margin:"0 2px"}}/>
        <FilterDropdown label={t.fStatus}  value={fStatus}  onChange={setFStatus}  accentColor={BLUE}   options={[{value:"all",label:t.oAll},{value:"active",label:t.oActive},{value:"completed",label:t.oCompleted},{value:"blocked",label:t.oBlocked}]}/>
        <FilterDropdown label={t.fStage}   value={fStage}   onChange={setFStage}   accentColor="#f97316" options={[{value:"all",label:t.oAll},{value:"regulatory",label:t.oRegulatory},{value:"closing",label:t.oPreclose},{value:"completed",label:t.oCompleted},{value:"blocked",label:t.oBlocked}]}/>
        <FilterDropdown label={t.fRegion}  value={fRegion}  onChange={setFRegion}  accentColor={PURP}   options={[{value:"all",label:t.oGlobal},{value:"usa",label:t.oUSA},{value:"europe",label:t.oEurope}]}/>
        <FilterDropdown label={t.fSector}  value={fSector}  onChange={setFSector}  accentColor="#06b6d4" options={[{value:"all",label:t.oAll},{value:"tech",label:t.oTech},{value:"finance",label:t.oFinance},{value:"energy",label:t.oEnergy},{value:"consumer",label:t.oConsumer},{value:"industrial",label:t.oIndustrial}]}/>
        <FilterDropdown label={t.fSize}    value={fSize}    onChange={setFSize}    accentColor={GREEN}  options={[{value:"all",label:t.oAll},{value:"large",label:t.oLarge},{value:"mid",label:t.oMid}]}/>
        <FilterDropdown label={t.fPayment} value={fPayment} onChange={setFPayment} accentColor={AMBER}  options={[{value:"all",label:t.oAll},{value:"cash",label:t.oCash},{value:"stock",label:t.oStock},{value:"mixed",label:t.oMixed}]}/>
        <FilterDropdown label={t.fSignal}  value={fSignal}  onChange={setFSignal}  accentColor={GREEN}  options={[{value:"all",label:t.oAll2},{value:"COMPRAR",label:t.oBuy},{value:"ACUMULAR",label:t.oAcc},{value:"CAUTO",label:t.oCaut},{value:"EVITAR",label:t.oAvoid}]}/>
        <div style={{height:20,width:1,background:BDR,margin:"0 2px"}}/>
        <FilterDropdown label={t.fSort}    value={sortBy}   onChange={setSortBy}   accentColor="#64748b" options={[{value:"probability",label:t.oProb},{value:"spread",label:t.oSpread},{value:"premium",label:t.oPremium},{value:"value",label:t.oValue}]}/>
        {(activeFilters > 0 || search) && (
          <button onClick={resetFilters} style={{background:"transparent",border:`1px solid #1e293b`,color:"#475569",borderRadius:8,padding:"7px 10px",cursor:"pointer",fontSize:11,fontFamily:"inherit",display:"flex",alignItems:"center",gap:5}}>
            <span>✕</span><span>{t.clearN(activeFilters + (search?1:0))}</span>
          </button>
        )}
      </div>

      {/* MAIN CONTENT */}
      <div className="dash-main" style={{display:"grid",gridTemplateColumns:"380px 1fr",flex:1,overflow:"hidden"}}>
        {/* LEFT PANEL */}
        <div className="dash-left" style={{borderRight:`1px solid ${BDR}`,display:"flex",flexDirection:"column",overflow:"hidden"}}>
          {/* Tabs */}
          <div style={{display:"flex",borderBottom:`1px solid ${BDR}`,flexShrink:0}}>
            {[["deals",t.tabDeals],["glossary",t.tabGlossary]].map(([key,label]) => (
              <button key={key} onClick={()=>setTab(key)} style={{flex:1,padding:"10px",background:"transparent",border:"none",borderBottom:`2px solid ${tab===key?BLUE:"transparent"}`,color:tab===key?BLUE:TXT3,fontSize:11,fontWeight:tab===key?700:400,cursor:"pointer",letterSpacing:0.5,fontFamily:"inherit",transition:"all 0.15s"}}>
                {label}
              </button>
            ))}
          </div>
          {/* Content */}
          <div style={{overflowY:"auto",flex:1,padding:"12px"}}>
            {tab === "deals" ? (
              filtered.length === 0 ? (
                <div style={{textAlign:"center",padding:"48px 24px"}}>
                  <div style={{fontSize:28,marginBottom:12}}>{search?"🔍":"📭"}</div>
                  <div style={{fontSize:13,color:TXT2,marginBottom:8,fontWeight:600}}>
                    {search ? t.emptyQ(search) : t.emptyF}
                  </div>
                  <div style={{fontSize:11,color:"#334155",lineHeight:1.7}}>
                    {search ? t.emptyQHint : t.emptyFHint}
                  </div>
                  <button onClick={resetFilters} style={{marginTop:16,background:"transparent",border:`1px solid ${BDR2}`,borderRadius:8,padding:"7px 16px",color:TXT3,fontSize:11,cursor:"pointer",fontFamily:"inherit"}}>
                    {t.clearAll}
                  </button>
                </div>
              ) : (
                <div style={{display:"flex",flexDirection:"column",gap:8}}>
                  {filtered.map(d => (
                    <DealCard key={d.id} deal={d} onClick={setSelected} selected={selected?.id===d.id} isPremium={isPremium} onUpgrade={onUpgrade}/>
                  ))}
                </div>
              )
            ) : (
              <GlossaryPanel/>
            )}
          </div>
        </div>

        {/* RIGHT PANEL */}
        <div className="dash-right" style={{overflowY:"auto",padding:"24px 28px"}}>
          <DetailPanel deal={dealsWithLive.find(d=>d.id===selected?.id)||selected} isPremium={isPremium} onUpgrade={onUpgrade}/>
        </div>
      </div>

      {/* FOOTER */}
      <div style={{background:BG2,borderTop:`1px solid ${BDR}`,padding:"6px 24px",display:"flex",justifyContent:"space-between",alignItems:"center",flexShrink:0}}>
        <span style={{fontSize:9,color:BDR2,letterSpacing:0.8}}>{t.footerDash}</span>
        <span style={{fontSize:9,color:BDR2,fontFamily:"monospace"}}>{t.version(new Date().toLocaleDateString(lang==="en"?"en-US":"es-ES"))}</span>
      </div>
    </div>
  );
}

// ─── LANDING PAGE ─────────────────────────────────────────────────────────────
const C = {
  bg:"#030a14", bgMid:"#050d18", border:"#0d1e30", borderMd:"#1e3a5f",
  text:"#f0f4f8", textMid:"#94a3b8", textDim:"#4a6080",
  green:"#10b981", blue:"#3b82f6", purple:"#8b5cf6", amber:"#f59e0b",
};

const PREVIEW_DEALS = [
  {ticker:"MASI", target:"Masimo Corp.",        acquirer:"Danaher",          value:"$9.9B",  spread:"+3.1%", signal:"COMPRAR",  sc:"#10b981"},
  {ticker:"VRE",  target:"Veris Residential",   acquirer:"Affinius Capital", value:"$3.4B",  spread:"+1.3%", signal:"COMPRAR",  sc:"#10b981"},
  {ticker:"NATL", target:"NCR Atleos",          acquirer:"Brink's (BCO)",    value:"$6.6B",  spread:"+5.4%", signal:"ACUMULAR", sc:"#3b82f6"},
  {ticker:"TALK", target:"Talkspace",           acquirer:"UHS",              value:"$835M",  spread:"+1.3%", signal:"COMPRAR",  sc:"#10b981"},
  {ticker:"CWAN", target:"Clearwater Analytics",acquirer:"Permira+Warburg",  value:"$8.4B",  spread:"🔒",    signal:"🔒",        sc:"#4a6080"},
  {ticker:"PEN",  target:"Penumbra Inc.",       acquirer:"Boston Scientific", value:"$14.5B", spread:"🔒",    signal:"🔒",        sc:"#4a6080"},
];

function TickerBanner() {
  const items = ["🟢 MASI +3.1%","🔵 NATL +5.4%","🟢 VRE +1.3%","🟢 TALK +1.3%","🔵 CWAN +4.5%","🔵 PEN +6.2%"];
  return (
    <div style={{background:C.bgMid,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`,overflow:"hidden",padding:"10px 0"}}>
      <style>{`@keyframes ticker{from{transform:translateX(0)}to{transform:translateX(-50%)}} .tk{display:flex;gap:60px;animation:ticker 30s linear infinite;white-space:nowrap;width:max-content;} .tk:hover{animation-play-state:paused}`}</style>
      <div className="tk">
        {[...items,...items].map((item,i) => (
          <span key={i} style={{fontSize:11,color:C.textMid,fontFamily:"'JetBrains Mono',monospace",letterSpacing:0.5}}>{item}</span>
        ))}
      </div>
    </div>
  );
}

function DealPreviewRow({deal}) {
  const locked = deal.spread === "🔒";
  return (
    <div className="preview-row" style={{display:"grid",gridTemplateColumns:"72px 1fr 80px 80px",alignItems:"center",gap:8,padding:"10px 16px",borderBottom:`1px solid ${C.border}`,opacity:locked?0.5:1,transition:"background 0.15s",cursor:"default"}}
      onMouseEnter={e=>e.currentTarget.style.background=C.bgMid}
      onMouseLeave={e=>e.currentTarget.style.background="transparent"}
    >
      <div style={{background:C.border,borderRadius:6,padding:"4px 6px",fontSize:10,color:C.textMid,fontFamily:"'JetBrains Mono',monospace",fontWeight:700,textAlign:"center"}}>{deal.ticker}</div>
      <div style={{minWidth:0}}>
        <div style={{fontSize:12,color:C.text,fontWeight:600,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>{deal.target}</div>
        <div className="preview-sub" style={{fontSize:10,color:C.textDim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"}}>by {deal.acquirer} · {deal.value}</div>
      </div>
      <div style={{fontSize:12,color:locked?C.textDim:"#10b981",fontFamily:"'JetBrains Mono',monospace",fontWeight:700,textAlign:"right"}}>{deal.spread}</div>
      <div style={{background:locked?C.border:deal.sc+"22",border:`1px solid ${locked?C.border:deal.sc+"55"}`,borderRadius:5,padding:"3px 6px",fontSize:9,color:locked?C.textDim:deal.sc,fontWeight:700,letterSpacing:0.5,textAlign:"center"}}>{deal.signal}</div>
    </div>
  );
}

function Landing({onEnter, onToggleLang, lang}) {
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const STATS = [
    {value:"20+",  label:t.statDeals,   color:C.blue},
    {value:"$0",   label:t.statCost,    color:C.green},
    {value:"100%", label:t.statSources, color:C.purple},
    {value:"1º",   label:t.statFirst,   color:C.amber},
  ];

  const WHY = [
    {icon:"📡", title:t.why1T, desc:t.why1D},
    {icon:"🎯", title:t.why2T, desc:t.why2D},
    {icon:"🌍", title:t.why3T, desc:t.why3D},
    {icon:"⚡",  title:t.why4T, desc:t.why4D},
  ];

  const TIERS = [
    {name:t.tierFree, price:"$0",    period:t.period, color:C.textMid, features:t.f_free,   locked:t.f_free_locked, cta:t.ctaFreeBtn, highlight:false},
    {name:t.tierInv,  price:"$2.99", period:t.period, color:C.blue,    features:t.f_inv,    locked:[],              cta:t.ctaInvBtn,  highlight:true},
    {name:t.tierPro,  price:"$3.99", period:t.period, color:C.purple,  features:t.f_pro,    locked:[],              cta:t.ctaProBtn,  highlight:false},
  ];

  return (
    <div style={{background:C.bg,minHeight:"100vh",color:C.text,fontFamily:"'Inter',sans-serif"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500;700&display=swap');
        *{box-sizing:border-box;margin:0;padding:0}
        ::-webkit-scrollbar{width:4px}
        ::-webkit-scrollbar-thumb{background:#1e3a5f;border-radius:99px}
        @keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
        @keyframes pulseDot{0%,100%{opacity:1}50%{opacity:0.3}}
        .fu{animation:fadeUp 0.7s ease both}
        .fu1{animation-delay:0.1s}.fu2{animation-delay:0.2s}.fu3{animation-delay:0.3s}.fu4{animation-delay:0.4s}
        .btn{cursor:pointer;border:none;outline:none;transition:all 0.2s ease}
        .btn:hover{transform:translateY(-2px);filter:brightness(1.1)}
        .btn:active{transform:translateY(0)}
        .tc{transition:transform 0.2s ease}
        .tc:hover{transform:translateY(-4px)}
        .nl{color:#4a6080;font-size:12px;letter-spacing:1px;cursor:pointer;transition:color 0.15s;text-decoration:none}
        .nl:hover{color:#94a3b8}
        /* ── RESPONSIVE ── */
        .nav-links{display:flex;gap:20px;align-items:center}
        .stats-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:1px}
        .why-grid{display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
        .tiers-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
        .preview-cols{display:grid;grid-template-columns:72px 1fr 80px 80px;gap:12px}
        .hero-btns{display:flex;gap:12px;justify-content:center;flex-wrap:wrap}
        @media(max-width:768px){
          .nav-links{gap:12px}
          .nav-links .nl{display:none}
          .stats-grid{grid-template-columns:repeat(2,1fr)!important}
          .why-grid{grid-template-columns:1fr!important}
          .tiers-grid{grid-template-columns:1fr!important}
          .preview-row{grid-template-columns:52px 1fr 52px 60px!important;gap:6px!important}
          .preview-header{display:none!important}
          .hero-section{padding:60px 20px 40px!important}
          .section-pad{padding:40px 20px!important}
          .section-pad-sm{padding:20px 20px 40px!important}
          .plans-section{padding:40px 20px!important}
          .footer-inner{flex-direction:column;gap:16px;text-align:center}
        }
        @media(max-width:480px){
          .preview-row{grid-template-columns:46px 1fr 48px 55px!important;gap:4px!important}
          .tier-name{font-size:28px!important}
        }
      `}</style>

      {/* NAV */}
      <nav style={{position:"sticky",top:0,zIndex:100,background:scrolled?C.bgMid+"ee":"transparent",backdropFilter:scrolled?"blur(12px)":"none",borderBottom:scrolled?`1px solid ${C.border}`:"1px solid transparent",padding:"0 20px",height:60,display:"flex",alignItems:"center",justifyContent:"space-between",transition:"all 0.3s ease"}}>
        <div style={{display:"flex",alignItems:"center",gap:10}}>
          <div style={{width:28,height:28,borderRadius:6,background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:13,fontWeight:900,color:"#fff"}}>M</div>
          <span style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:15,letterSpacing:2}}>M&A RADAR</span>
        </div>
        <div className="nav-links" style={{display:"flex",alignItems:"center",gap:20}}>
          <a className="nl" onClick={()=>document.getElementById("como")?.scrollIntoView({behavior:"smooth"})}>{t.howItWorks}</a>
          <a className="nl" onClick={()=>document.getElementById("planes")?.scrollIntoView({behavior:"smooth"})}>{t.pricing}</a>
          <button className="btn" onClick={onEnter} style={{background:"transparent",border:`1px solid ${C.borderMd}`,borderRadius:7,padding:"7px 16px",color:C.textMid,fontSize:11,letterSpacing:1,fontFamily:"inherit"}}>{t.enter}</button>
          <button className="btn" onClick={onToggleLang} style={{background:"transparent",border:`1px solid ${C.border}`,borderRadius:7,padding:"7px 12px",color:C.textDim,fontSize:11,fontFamily:"inherit"}}>{lang==="es"?"EN":"ES"}</button>
        </div>
      </nav>

      {/* HERO */}
      <section className="hero-section" style={{padding:"100px 40px 80px",maxWidth:900,margin:"0 auto",textAlign:"center"}}>
        <div className="fu fu1" style={{display:"inline-flex",alignItems:"center",gap:8,background:C.green+"11",border:`1px solid ${C.green}33`,borderRadius:99,padding:"5px 14px",marginBottom:28}}>
          <span style={{width:6,height:6,borderRadius:"50%",background:C.green,animation:"pulseDot 2s ease infinite",display:"inline-block"}}/>
          <span style={{fontSize:10,color:C.green,letterSpacing:1.5,fontWeight:600}}>{t.liveBadge}</span>
        </div>
        <h1 className="fu fu2" style={{fontFamily:"'Inter',sans-serif",fontWeight:900,fontSize:"clamp(36px,6vw,64px)",lineHeight:1.1,letterSpacing:-1,marginBottom:24}}>
          <span style={{background:`linear-gradient(90deg,${C.blue},${C.purple})`,WebkitBackgroundClip:"text",WebkitTextFillColor:"transparent"}}>{t.heroTitle}</span>
        </h1>
        <p className="fu fu3" style={{fontSize:16,color:C.textMid,lineHeight:1.8,maxWidth:580,margin:"0 auto 40px"}}>{t.heroSub}</p>
        <div className="fu fu4" style={{display:"flex",gap:12,justifyContent:"center",flexWrap:"wrap"}}>
          <button className="btn" onClick={onEnter} style={{background:`linear-gradient(135deg,${C.blue},${C.purple})`,borderRadius:9,padding:"14px 32px",color:"#fff",fontSize:13,fontWeight:700,letterSpacing:1,fontFamily:"inherit",boxShadow:`0 8px 32px ${C.blue}44`}}>{t.ctaFree}</button>
          <button className="btn" onClick={()=>document.getElementById("planes")?.scrollIntoView({behavior:"smooth"})} style={{background:"transparent",border:`1px solid ${C.borderMd}`,borderRadius:9,padding:"14px 32px",color:C.textMid,fontSize:13,letterSpacing:1,fontFamily:"inherit"}}>{t.ctaPlans}</button>
        </div>
      </section>

      <TickerBanner/>

      {/* STATS */}
      <section className="section-pad" style={{padding:"60px 40px",maxWidth:900,margin:"0 auto"}}>
        <div className="stats-grid" style={{display:"grid",gridTemplateColumns:"repeat(4,1fr)",gap:1,background:C.border,borderRadius:12,overflow:"hidden",border:`1px solid ${C.border}`}}>
          {STATS.map((s,i) => (
            <div key={i} style={{background:C.bgMid,padding:"28px 20px",textAlign:"center"}}>
              <div style={{fontFamily:"'Inter',sans-serif",fontSize:36,fontWeight:900,color:s.color,letterSpacing:-1,marginBottom:6}}>{s.value}</div>
              <div style={{fontSize:10,color:C.textDim,letterSpacing:1.5}}>{s.label.toUpperCase()}</div>
            </div>
          ))}
        </div>
      </section>

      {/* DASHBOARD PREVIEW */}
      <section id="como" className="section-pad-sm" style={{padding:"20px 40px 80px",maxWidth:900,margin:"0 auto"}}>
        <div style={{marginBottom:32,textAlign:"center"}}>
          <div style={{fontSize:10,color:C.textDim,letterSpacing:2,marginBottom:10}}>{t.dashSub}</div>
          <h2 style={{fontFamily:"'Inter',sans-serif",fontSize:28,fontWeight:800}}>{t.dashTitle}</h2>
        </div>
        <div style={{background:C.bgMid,border:`1px solid ${C.border}`,borderRadius:12,overflow:"hidden",boxShadow:"0 24px 80px rgba(0,0,0,0.6)"}}>
          <div style={{background:C.bg,borderBottom:`1px solid ${C.border}`,padding:"12px 16px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
            <div style={{display:"flex",gap:6}}>
              {["#ef4444","#f59e0b","#10b981"].map((c,i)=><div key={i} style={{width:10,height:10,borderRadius:"50%",background:c}}/>)}
            </div>
            <div style={{fontSize:10,color:C.textDim,letterSpacing:1}}>maradar.com</div>
            <div style={{fontSize:9,color:C.green,display:"flex",alignItems:"center",gap:5}}>
              <span style={{animation:"pulseDot 2s infinite",display:"inline-block",width:5,height:5,borderRadius:"50%",background:C.green}}/>
              {t.liveTag}
            </div>
          </div>
          <div className="preview-row" style={{display:"grid",gridTemplateColumns:"72px 1fr 80px 80px",gap:8,padding:"8px 16px",borderBottom:`1px solid ${C.border}`}}>
            {["TICKER","EMPRESA","SPREAD","SEÑAL"].map((h,i)=><div key={i} style={{fontSize:9,color:C.textDim,letterSpacing:1}}>{h}</div>)}
          </div>
          {PREVIEW_DEALS.map((d,i)=><DealPreviewRow key={i} deal={d}/>)}
          <div style={{padding:"20px 16px",textAlign:"center"}}>
            <button className="btn" onClick={onEnter} style={{background:`linear-gradient(135deg,${C.blue},${C.purple})`,borderRadius:8,padding:"11px 28px",color:"#fff",fontSize:12,fontWeight:700,letterSpacing:1,fontFamily:"inherit"}}>{t.seeAll}</button>
          </div>
        </div>
      </section>

      {/* WHY */}
      <section className="section-pad" style={{padding:"60px 40px",background:C.bgMid,borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}`}}>
        <div style={{maxWidth:900,margin:"0 auto"}}>
          <div style={{textAlign:"center",marginBottom:48}}>
            <div style={{fontSize:10,color:C.textDim,letterSpacing:2,marginBottom:10}}>{t.whySub}</div>
            <h2 style={{fontFamily:"'Inter',sans-serif",fontSize:28,fontWeight:800}}>{t.whyTitle}</h2>
          </div>
          <div className="why-grid" style={{display:"grid",gridTemplateColumns:"repeat(2,1fr)",gap:20}}>
            {WHY.map((w,i) => (
              <div key={i} style={{background:C.bg,border:`1px solid ${C.border}`,borderRadius:12,padding:24}}>
                <div style={{fontSize:28,marginBottom:12}}>{w.icon}</div>
                <div style={{fontFamily:"'Inter',sans-serif",fontSize:16,fontWeight:700,marginBottom:8,color:C.text}}>{w.title}</div>
                <div style={{fontSize:12,color:C.textMid,lineHeight:1.7}}>{w.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRICING */}
      <section id="planes" className="plans-section" style={{padding:"80px 40px",maxWidth:960,margin:"0 auto"}}>
        <div style={{textAlign:"center",marginBottom:48}}>
          <div style={{fontSize:10,color:C.textDim,letterSpacing:2,marginBottom:10}}>{t.pricingSub}</div>
          <h2 style={{fontFamily:"'Inter',sans-serif",fontSize:32,fontWeight:800,marginBottom:12}}>{t.pricingTitle}</h2>
          <p style={{fontSize:13,color:C.textMid}}>{t.pricingNote}</p>
        </div>
        <div className="tiers-grid" style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:16}}>
          {TIERS.map((tier,i) => (
            <div key={i} className="tc" style={{background:tier.highlight?`linear-gradient(160deg,#0a1628,#0d1e30)`:C.bgMid,border:`1px solid ${tier.highlight?tier.color+"66":C.border}`,borderRadius:14,padding:"28px 24px",position:"relative",overflow:"hidden",boxShadow:tier.highlight?`0 0 60px ${tier.color}22`:"none"}}>
              {tier.highlight && <div style={{position:"absolute",top:14,right:14,background:`linear-gradient(135deg,${C.blue},${C.purple})`,borderRadius:99,padding:"3px 10px",fontSize:9,color:"#fff",fontWeight:700,letterSpacing:1}}>{t.popular}</div>}
              <div style={{marginBottom:20}}>
                <div style={{fontSize:10,color:tier.color,letterSpacing:2,marginBottom:8}}>{tier.name.toUpperCase()}</div>
                <div style={{display:"flex",alignItems:"baseline",gap:4}}>
                  <span className="tier-name" style={{fontFamily:"'Inter',sans-serif",fontSize:36,fontWeight:900,color:C.text}}>{tier.price}</span>
                  <span style={{fontSize:12,color:C.textDim}}>{tier.period}</span>
                </div>
              </div>
              <div style={{marginBottom:20,borderTop:`1px solid ${C.border}`,paddingTop:20}}>
                {tier.features.map((f,j) => (
                  <div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8,fontSize:12,color:C.textMid}}>
                    <span style={{color:tier.color,flexShrink:0,marginTop:1}}>✓</span>{f}
                  </div>
                ))}
                {tier.locked.map((f,j) => (
                  <div key={j} style={{display:"flex",alignItems:"flex-start",gap:8,marginBottom:8,fontSize:12,color:C.textDim,opacity:0.5}}>
                    <span style={{flexShrink:0}}>🔒</span>{f}
                  </div>
                ))}
              </div>
              <button className="btn" onClick={onEnter} style={{width:"100%",borderRadius:8,padding:12,background:tier.highlight?`linear-gradient(135deg,${C.blue},${C.purple})`:"transparent",border:tier.highlight?"none":`1px solid ${tier.color}55`,color:tier.highlight?"#fff":tier.color,fontSize:12,fontWeight:700,letterSpacing:1,fontFamily:"inherit",boxShadow:tier.highlight?`0 4px 20px ${C.blue}44`:"none"}}>{tier.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{borderTop:`1px solid ${C.border}`,padding:"32px 20px",display:"flex",alignItems:"center",justifyContent:"space-between",flexWrap:"wrap",gap:12}}>
        <div style={{display:"flex",alignItems:"center",gap:8}}>
          <div style={{width:22,height:22,borderRadius:5,background:`linear-gradient(135deg,${C.blue},${C.purple})`,display:"flex",alignItems:"center",justifyContent:"center",fontSize:10,fontWeight:900,color:"#fff"}}>M</div>
          <span style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:12,letterSpacing:2,color:C.textDim}}>M&A RADAR</span>
        </div>
        <div style={{fontSize:10,color:C.textDim,letterSpacing:0.5,maxWidth:500,lineHeight:1.6}}>{t.footerLegal}</div>
        <div style={{fontSize:10,color:C.textDim}}>© 2026 M&A RADAR</div>
      </footer>
    </div>
  );
}

// ─── LOGIN MODAL ──────────────────────────────────────────────────────────────
function LoginModal({onClose, onLogin, lang}) {
  const t = useT();
  const [email, setEmail] = useState("");
  const [tier,  setTier]  = useState("free");

  const TIERS_CFG = [
    {key:"free",     label:t.tierFree, price:"$0/mo",    color:"#64748b", desc:t.loginFreeDesc},
    {key:"investor", label:t.tierInv,  price:"$2.99/mo", color:"#3b82f6", desc:t.loginInvDesc},
    {key:"pro",      label:t.tierPro,  price:"$3.99/mo", color:"#8b5cf6", desc:t.loginProDesc},
  ];

  function handleLogin() {
    if (!email.includes("@")) return;
    onLogin({email, tier});
    onClose();
  }

  return (
    <div style={{position:"fixed",inset:0,background:"rgba(0,0,0,0.85)",display:"flex",alignItems:"center",justifyContent:"center",zIndex:1000,backdropFilter:"blur(6px)"}} onClick={onClose}>
      <div style={{background:"#050d18",border:"1px solid #1e3a5f",borderRadius:16,padding:"32px 28px",width:420,boxShadow:"0 24px 80px rgba(0,0,0,0.8)"}} onClick={e=>e.stopPropagation()}>
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:24}}>
          <div>
            <div style={{fontFamily:"'Inter',sans-serif",fontWeight:800,fontSize:18,color:"#f0f4f8"}}>{t.loginTitle}</div>
            <div style={{fontSize:11,color:"#4a6080",marginTop:3}}>{t.loginSub}</div>
          </div>
          <button onClick={onClose} style={{background:"none",border:"none",color:"#4a6080",cursor:"pointer",fontSize:18}}>✕</button>
        </div>
        <div style={{marginBottom:20,display:"flex",flexDirection:"column",gap:8}}>
          {TIERS_CFG.map(tc => (
            <div key={tc.key} onClick={()=>setTier(tc.key)} style={{border:`1px solid ${tier===tc.key?tc.color+"88":"#1e3a5f"}`,borderRadius:10,padding:"12px 16px",cursor:"pointer",background:tier===tc.key?tc.color+"11":"transparent",display:"flex",justifyContent:"space-between",alignItems:"center",transition:"all 0.15s"}}>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:tier===tc.key?tc.color:"#94a3b8"}}>{tc.label}</div>
                <div style={{fontSize:11,color:"#4a6080",marginTop:2}}>{tc.desc}</div>
              </div>
              <div style={{fontSize:13,fontWeight:700,color:tier===tc.key?tc.color:"#334155",fontFamily:"monospace"}}>{tc.price}</div>
            </div>
          ))}
        </div>
        <div style={{marginBottom:16}}>
          <div style={{fontSize:10,color:"#4a6080",letterSpacing:1,marginBottom:6}}>{t.emailLabel}</div>
          <input type="email" placeholder={t.emailPh} value={email} onChange={e=>setEmail(e.target.value)} onKeyDown={e=>e.key==="Enter"&&handleLogin()}
            style={{width:"100%",background:"#030a14",border:"1px solid #1e3a5f",borderRadius:8,padding:"10px 14px",color:"#f0f4f8",fontSize:13,fontFamily:"'Inter',sans-serif",outline:"none"}}
            onFocus={e=>e.target.style.borderColor="#3b82f6"} onBlur={e=>e.target.style.borderColor="#1e3a5f"}
          />
        </div>
        <button onClick={handleLogin} disabled={!email.includes("@")} style={{width:"100%",borderRadius:9,padding:13,background:email.includes("@")?"linear-gradient(135deg,#3b82f6,#8b5cf6)":"#0d1e30",border:"none",color:email.includes("@")?"#fff":"#334155",fontSize:13,fontWeight:700,letterSpacing:1,fontFamily:"'Inter',sans-serif",cursor:email.includes("@")?"pointer":"default",transition:"all 0.2s"}}>
          {tier==="free" ? t.loginFreeCta : t.loginPaidCta(tier)}
        </button>
        <div style={{fontSize:10,color:"#1e3a5f",textAlign:"center",marginTop:12,lineHeight:1.6}}>
          {tier==="free" ? t.loginFreeNote : t.loginPaidNote}
        </div>
      </div>
    </div>
  );
}

// ─── ROOT APP ─────────────────────────────────────────────────────────────────
export default function App() {
  const [view,      setView]      = useState("landing");
  const [user,      setUser]      = useState(() => { try { return JSON.parse(localStorage.getItem("maradar_user")) || null; } catch { return null; } });
  const [showLogin, setShowLogin] = useState(false);
  const [lang,      setLang]      = useState(() => localStorage.getItem("maradar_lang") || "es");

  function toggleLang() {
    const next = lang === "es" ? "en" : "es";
    setLang(next);
    localStorage.setItem("maradar_lang", next);
  }
  function handleLogin(userData) {
    setUser(userData);
    localStorage.setItem("maradar_user", JSON.stringify(userData));
    setView("dashboard");
  }
  function handleLogout() {
    setUser(null);
    localStorage.removeItem("maradar_user");
    setView("landing");
  }

  return (
    <LangCtx.Provider value={lang}>
      {view === "dashboard"
        ? <MATracker user={user} onLogout={handleLogout} onUpgrade={()=>setShowLogin(true)} onToggleLang={toggleLang} lang={lang}/>
        : <Landing onEnter={()=>user?setView("dashboard"):setShowLogin(true)} onToggleLang={toggleLang} lang={lang}/>
      }
      {showLogin && <LoginModal onClose={()=>setShowLogin(false)} onLogin={handleLogin} lang={lang}/>}
    </LangCtx.Provider>
  );
}
