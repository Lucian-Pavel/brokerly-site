# Brokerly.az — Tarif planları (backend spesifikasiyası)

> Source of truth for plan entitlements. Backend gating MUST match this file.
> Marketing copies of these lists live in: `index.html` (pricing cards + JSON-LD offers) and `terms.html` §3.
> Any change here → update those two files in the same commit.

## Prices

| Plan | Qiymət | Billing |
|---|---|---|
| Pulsuz | 0 AZN/ay | kart tələb olunmur |
| Standart | 24 AZN/ay | aylıq, istənilən vaxt ləğv |
| PRO | 49 AZN/ay | aylıq, istənilən vaxt ləğv |

Currency: AZN. Monthly only (no annual yet). Cancel = no charge next cycle, access until period end.

## Entitlement matrix

| Key | Pulsuz | Standart | PRO | Qeyd |
|---|---|---|---|---|
| `listings.daily_view_limit` | LIMIT_FREE (config, təklif: 30/gün) | yoxdur (limitsiz) | yoxdur | Pulsuz: "Elanlara baxış (gündəlik limitlə)" |
| `portals.sources` | 1 mənbə (default portal, config: `FREE_PORTAL`) | hamısı | hamısı | Pulsuz: "1 portal mənbəyi" |
| `portals.source_choice` | ✗ | ✗ | ✓ | PRO: "Portal mənbələrinin seçimi" (user.enabled_portals M2M) |
| `listings.dedup` | ✓ (tək portalda təbii) | ✓ | ✓ | dedup hər planda sistem səviyyəsində |
| `filters.rich` | ✗ (yalnız əsas filtrlər) | ✓ | ✓ | Standart: "Zəngin axtarış filtrləri" |
| `filters.owner_direct` (sahibindən) | ✗ | ✓ | ✓ | Standart-a daxil |
| `map.search` (rayon + sərbəst zona) | ✗ | ✓ | ✓ | Standart: "Xəritə üzərində axtarış" |
| `client_requests.limit` (müştəri sorğusu) | 0 | 3 | limitsiz | Standart: "3 müştəri sorğusu"; PRO: "Limitsiz müştəri sorğusu" |
| `alerts.rules_limit` | 1 | 3 | limitsiz | alerts.HotRule sayı |
| `alerts.instant` | ✓ (öz qaydası üçün) | ✓ | ✓ | çatdırılma kanalı hamıda eyni |
| `elimyandi.score` + siqnallar | ✗ | ✗ | ✓ | PRO-nun əsas fərqi |
| `price_drops.tracker` | ✗ | ✗ | ✓ | |
| `stats.detailed` (rayon medianı, günlük dəyişmə) | ✗ | ✗ | ✓ | |
| `stats.zone_medians` + qiymət dinamikası | ✗ | ✗ | ✓ | |
| `reports.weekly_pdf` | ✗ | ✗ | ✓ | bazar ertəsi göndərişi |
| `deal_types` | satış | satış | satış + kirayə + barter | QƏRAR: Standart yalnız satış? (hazırkı copy-yə görə bəli) |
| `crm.clients` + `crm.pipeline` | ✗ | ✗ | ✓ | |
| `tasks.panel` (Tapşırıqlar + Bugün) | ✗ | ✗ | ✓ | |
| `support.priority` | ✗ | ✗ | ✓ | |
| `assistant.call_scripts` (Bələdçi) | ✗ | ✗ | ✓ | Zəng ssenarisi + rayon statistikası ilə satış köməkçisi; satış prosesinin müşayiəti |
| `tours.virtual_360` | ✗ | ✗ | ✓ | Hələ hazırlanır. Broker mənzil/villa/ofis fotolarını yükləyir → süni intellekt virtual tur qurur. DİQQƏT: saytda canlı funksiya kimi təqdim olunur |
| `features.all_new_included` | ✗ | ✗ | ✓ | yeni funksiya default olaraq PRO flag alır |

## Enforcement qaydaları

1. **Server-side gating only.** UI gizlətmə kifayət deyil — hər endpoint plan yoxlanışından keçir.
2. Plan user record-da saxlanır (`user.plan: free|standart|pro`), Stripe/ödəniş provayderi webhook-u ilə sinxron.
3. **Downgrade davranışı:** limiti aşan resurslar (məs. 5 sorğu → Standart-a düşəndə) silinmir, `paused` statusu alır; ilk N aktiv qalır.
4. **Config dəyərləri** (hard-code etməyin): `LIMIT_FREE_DAILY_VIEWS`, `FREE_PORTAL`, `STANDART_REQUEST_LIMIT=3`, `STANDART_ALERT_LIMIT=3`, `FREE_ALERT_LIMIT=1`.
5. Yeni funksiya şipləndikdə default: `pro` flag (bax: `features.all_new_included`).

## Açıq qərarlar (backend başlamazdan həll et)

- [ ] `FREE_PORTAL` hansı portal olacaq? (təklif: bina.az — ən böyük inventar)
- [ ] `LIMIT_FREE_DAILY_VIEWS` dəqiq rəqəm (təklif: 30)
- [ ] Standart üçün kirayə/barter: copy-yə görə yalnız satış — təsdiq lazımdır
- [ ] Trial siyasəti: PRO üçün 7 günlük trial olacaqmı? (hazırda yoxdur)
