/**
 * Vigilense AI — Central Pricing Configuration
 * ══════════════════════════════════════════════════════════════
 *
 * Single source of truth for ALL pricing constants used across
 * the website (Cost Simulator, Why Now page, etc.).
 *
 * To update pricing: edit the constants below and all calculators
 * will reflect the changes automatically.
 *
 * Loaded via <script src="/pricing-config.js"></script> before
 * any page-specific calculator scripts.
 */
(function() {
    'use strict';

    var P = {};

    // ═══════════════════════════════════════════════════════════
    //  LEGACY SIEM REFERENCE PRICING
    // ═══════════════════════════════════════════════════════════

    P.legacy = {

        // Default rate curve: $/GB/yr term-license pricing
        // Each segment is a piecewise-linear function:
        //   rate = startRate + (gb - fromGB) * slope
        // The slope is negative (rate decreases with volume).
        rateCurve: [
            { upTo: 500,      startRate: 1600, slope: -0.5,    fromGB: 0 },
            { upTo: 2000,     startRate: 1350, slope: -0.28,   fromGB: 500 },
            { upTo: 10000,    startRate: 912,  slope: -0.055,  fromGB: 2000 },
            { upTo: 50000,    startRate: 480,  slope: -0.004,  fromGB: 10000 },
            { upTo: Infinity, startRate: 300,  slope: 0,       fromGB: 50000 }
        ],
        minRate: 180,

        // Infrastructure cost — dynamic scaling (see helpers.infraPct)
        infraCap: 10000000,   // max $10M

        // Enterprise unlimited-license modeling
        // Between blendStart and blendEnd, the model smoothly transitions
        // from per-GB rate-based pricing to a flat enterprise agreement,
        // reflecting how negotiated discounts ramp as volume grows.
        unlimitedBlendStartGB: 10000,
        unlimitedBlendEndGB:   15000,
        unlimitedAnnualCost:   8500000,

        // License caps at extreme volumes (fallback for non-unlimited path)
        licenseCaps: [
            { minVol: 300000, cap: 55000000 },
            { minVol: 80000,  cap: 30000000 }
        ],

        // Admin staffing
        admin: {
            salary: 140000,     // $/yr per admin FTE
            gbPerAdmin: 650,    // 1 admin per this many GB/day
            maxAdmins: 18
        },

        // Training & professional services — SPL training, certifications,
        // Splunk PS hours for complex deployments, custom app development.
        // COST BASIS:
        //   Small: 1-2 admins × $2-3K online training/yr
        //   Medium: team training ($5K) + 20-40 PS hours/yr ($8-16K)
        //   Large: dedicated training program + quarterly PS engagements
        //   Enterprise: continuous PS retainer + dedicated TAM
        trainingPS: [
            { maxGB: 50,       annual: 5000 },
            { maxGB: 500,      annual: 12000 },
            { maxGB: 5000,     annual: 25000 },
            { maxGB: 50000,    annual: 50000 },
            { maxGB: Infinity, annual: 75000 }
        ],

        // Detection compute — search head clusters, scheduled searches,
        // real-time correlation, dashboards. In Splunk's newer model
        // these are SVCs (Splunk Virtual Compute units).
        //
        // KEY: SVC cost scales with BOTH query count AND data volume.
        // Each scheduled search scans proportionally more data at higher
        // volumes, requiring more search head compute. A 1000 TB deployment
        // needs ~10× the SVC capacity of a 100 TB deployment, even with
        // the same number of rules.
        //
        // Model: base tier (flat lookup for ≤50 TB) + volume-proportional
        // scaling beyond 50 TB. The per-GB rate reflects additional SVC
        // capacity needed for larger data scans.
        //
        // COST BASIS (Splunk SVC pricing ~$2,000-3,000/SVC/yr):
        //   50 TB: ~200-300 SVCs = $400-900K
        //   100 TB: ~400-500 SVCs = $800K-1.5M
        //   1000 TB: ~2000-4000 SVCs = $4-12M
        detectionCompute: [
            { maxGB: 10,       annual: 3000 },
            { maxGB: 50,       annual: 12000 },
            { maxGB: 200,      annual: 36000 },
            { maxGB: 500,      annual: 72000 },
            { maxGB: 2000,     annual: 150000 },
            { maxGB: 10000,    annual: 320000 },
            { maxGB: 50000,    annual: 600000 },
            { maxGB: Infinity, annual: 900000 }       // base for >50 TB
        ],
        // Additional SVC cost per GB/day beyond 50 TB.
        // Reflects linear compute scaling for large data scans.
        detectionComputeScaleRate: 3.50   // $/GB/day/yr beyond 50K GB
    };

    // ═══════════════════════════════════════════════════════════
    //  MARKET VARIANCE (negotiation realism knob)
    // ═══════════════════════════════════════════════════════════
    //  Applied to legacy license cost. Range: 0.85–1.15
    //  1.0 = published list pricing, <1.0 = negotiated discount,
    //  >1.0 = premium/urgency surcharge.

    P.marketVariance = 1.0;

    // ═══════════════════════════════════════════════════════════
    //  VIGILENSE BYODb SIEM — DETECTION PLATFORM PRICING
    // ═══════════════════════════════════════════════════════════
    //
    //  PRODUCT BOUNDARY: The SIEM is "The Eyes" — it DETECTS threats
    //  and generates enriched alerts. It does NOT investigate or resolve.
    //  Investigation, resolution, and AI cognition belong exclusively
    //  to the AI SOC Analyst product ("The Brain").
    //
    //  MOAT: We charge for the WORK performed (query logic / IP),
    //  not for the data stored. The customer pays their Cloud Provider
    //  (Snowflake/BigQuery/S3) for STORAGE. Vigilense margin on
    //  data storage: 0%.
    //
    //  PRICING MODEL: COST-PLUS (TIERED MARGIN)
    //  ──────────────────────────────────────────
    //  Revenue = COGS × (1 + tierMargin%)
    //
    //  Every component of the Vigilense platform fee is derived from
    //  a documented real cost (COGS) with a tier-specific margin applied.
    //  Lite tier (30%) keeps entry pricing competitive for small orgs.
    //  Upper tiers (70-200%) capture fair share of the massive savings
    //  delivered to large enterprises while still beating legacy SIEM
    //  by 50%+. This ensures pricing honestly tracks cost-to-serve
    //  while rewarding value creation at scale.
    //
    //  Revenue pillars:
    //    1. Platform Base COGS — fixed per-customer infrastructure
    //    2. Query Compute COGS — variable per-query processing
    //    3. Consolidation COGS — variable per-alert AI clustering
    //    All × (1 + tierMargin) = Platform Price
    // ═══════════════════════════════════════════════════════════

    P.siemUsage = {

        // ── COST-PLUS PARAMETERS ──────────────────────────────
        //
        //  margin:    Defined PER-TIER in platformCOGS[] below.
        //             Escalates from 30% (Lite) to 200% (Scale).
        //             At higher volumes the legacy-vs-Vigilense savings
        //             gap is enormous, so aggressive margin capture
        //             still leaves customers 50%+ better off.
        //             Vigilense deliberately prices below peers to
        //             win on value, not lock-in.
        //
        //  queryCOGS: Vigilense's real cost per query dispatched.
        //             The customer's DB executes the heavy compute,
        //             but Vigilense still pays for:
        //               Alert Engine workers (Cloud Run/K8s):  ~$0.005
        //               Pub/Sub message delivery + ack:        ~$0.002
        //               MongoDB writes (alerts, analytics):    ~$0.003
        //               API orchestration (dispatch, eval):    ~$0.002
        //             TOTAL COGS PER QUERY: ~$0.012
        costPlus: {
            queryCOGS: 0.012    // $/query — real compute cost
        },

        // ── PLATFORM BASE COGS ────────────────────────────────
        //  Fixed annual cost to Vigilense per customer at each tier.
        //  Covers: shared/dedicated compute allocation, schema library
        //  maintenance, DB orchestration infra, SLA monitoring, RBAC,
        //  alert enrichment pipelines (MITRE, severity, asset context).
        //
        //  baseQueries: the query compute capacity INCLUDED in the
        //  base COGS. Queries within this allowance have no marginal
        //  cost (already funded by the base infra). Queries beyond
        //  this are charged at queryCOGS per query.
        //
        //  margin: TIERED profit margin applied to total COGS.
        //    Margins escalate aggressively at higher volumes because
        //    the gap between Legacy SIEM cost and Vigilense COGS widens
        //    enormously. At 500 GB, Legacy SIEM costs ~$800K while
        //    Vigilense COGS is ~$35K — capturing 130% on COGS still
        //    delivers massive savings to the customer.
        //
        //    Lite (≤5 GB):        30% — competitive entry, land small teams
        //    Lite+ (5–10 GB):     40% — slight uplift, still affordable
        //    Starter (≤50 GB):    70% — value proven, customer committed
        //    Growth (≤100 GB):    75% — operational maturity
        //    Growth+ (≤200 GB):   90% — significant savings delivered
        //    Business (≤350 GB): 110% — large savings gap exploited
        //    Business+ (≤500 GB):130% — customer saves 60%+ vs legacy
        //    Professional (≤1 TB):150% — massive enterprise savings
        //    Enterprise (≤5 TB): 170% — hyperscale value capture
        //    Enterprise+ (≤50 TB):190% — dominant savings position
        //    Scale (>50 TB):     200% — max capture, still 50%+ cheaper
        //
        //  COST BASIS:
        //    Lite:         shared infra, basic schema. ~$3-4K real cost.
        //    Starter:      self-serve + light onboarding. ~$8-12K.
        //    Growth:       onboarding support, schema work. ~$15-20K.
        //    Business:     dedicated onboarding. ~$25-32K.
        //    Professional: semi-dedicated resources. ~$38-42K.
        //    Enterprise:   dedicated resources, SLA monitoring. ~$48-52K.
        //    Scale:        dedicated infra, 24/7 on-call. ~$55-65K.
        platformCOGS: [
            { maxGB: 5,        annualCOGS: 3500,   baseQueries: 600000,    tier: 'Lite',         maxQueriesPerHour: 2000,    margin: 0.30 },
            { maxGB: 10,       annualCOGS: 3500,   baseQueries: 600000,    tier: 'Lite+',        maxQueriesPerHour: 2000,    margin: 0.40 },
            { maxGB: 20,       annualCOGS: 6000,   baseQueries: 800000,    tier: 'Starter',      maxQueriesPerHour: 3500,    margin: 0.48 },
            { maxGB: 50,       annualCOGS: 10000,  baseQueries: 1000000,   tier: 'Starter+',    maxQueriesPerHour: 5000,    margin: 0.58 },
            { maxGB: 100,      annualCOGS: 15000,  baseQueries: 1500000,   tier: 'Growth',       maxQueriesPerHour: 12000,   margin: 0.70 },
            { maxGB: 200,      annualCOGS: 20000,  baseQueries: 2000000,   tier: 'Growth+',      maxQueriesPerHour: 20000,   margin: 0.90 },
            { maxGB: 350,      annualCOGS: 25000,  baseQueries: 3000000,   tier: 'Business',     maxQueriesPerHour: 40000,   margin: 1.02 },
            { maxGB: 500,      annualCOGS: 28000,  baseQueries: 3500000,   tier: 'Business+',    maxQueriesPerHour: 60000,   margin: 1.15 },
            { maxGB: 1000,     annualCOGS: 32000,  baseQueries: 4000000,   tier: 'Professional', maxQueriesPerHour: 80000,   margin: 1.40 },
            { maxGB: 2000,     annualCOGS: 36000,  baseQueries: 5000000,   tier: 'Professional+',maxQueriesPerHour: 120000,  margin: 1.70 },
            { maxGB: 5000,     annualCOGS: 40000,  baseQueries: 6000000,   tier: 'Enterprise',   maxQueriesPerHour: 200000,  margin: 1.80 },
            { maxGB: 50000,    annualCOGS: 50000,  baseQueries: 8000000,   tier: 'Enterprise+',  maxQueriesPerHour: 500000,  margin: 1.95 },
            { maxGB: Infinity, annualCOGS: 60000,  baseQueries: 10000000,  tier: 'Scale',        maxQueriesPerHour: 1000000, margin: 2.00 }
        ],

        // ── DETECTION ENGINE ──────────────────────────────────
        //  queriesPerRulePerDay = 24 is the DEFAULT hourly schedule.
        //  In production, billing counts ACTUAL PPL executions per
        //  tenant, not estimates. Customers may configure 5-min
        //  (288/day) or 30-min (48/day) intervals.
        //  Dashboard + hunting queries are computed dynamically in
        //  H.estimateWorkload() using a logarithmic model.
        detection: {
            queriesPerRulePerDay: 24
        },

        // ── CONSOLIDATION COGS ────────────────────────────────
        //  DBSCAN clustering + MiniLM embeddings + Claude LLM.
        //  Triggered by alert volume (rules × trigger rate).
        //  These are RAW COGS — the cost-plus margin is applied
        //  to the total alongside base + query COGS.
        //
        //  COST BASIS per consolidation run (200 alerts):
        //    DBSCAN + MiniLM embeddings (CPU):   ~$0.50-2.00
        //    Claude LLM (naming/referee):        ~$0.02-0.10 per alert
        //    Total for run of 200 alerts:        ~$6-22
        consolidation: {
            triggerRate: 0.02,
            avgAlertsPerRun: 200,
            baseCostPerRun: 1.50,
            costPerAlert: 0.05
        }
    };

    // ═══════════════════════════════════════════════════════════
    //  SUPPORT TIERS  (flat lookup by daily GB volume)
    // ═══════════════════════════════════════════════════════════
    //
    //  COST BASIS:
    //    Lite ($2.4K):  AI chatbot only, community docs, zero scheduled human.
    //                   Real cost ~$1.5K (chatbot infra). MARGIN: ~38%.
    //    Tier 0 ($6K):  pure self-serve + AI chatbot, ~0.02 FTE human.
    //                   Covers community docs + automated ticket routing.
    //    Tier 1 ($12K): self-serve + AI chatbot, ~0.05 FTE human
    //    Tier 2 ($24K): quarterly reviews + email, ~0.1 FTE
    //    Tier 3 ($60K): named CSM, ~0.3 FTE ($180K loaded ÷ 10 accounts)
    //    Tier 4 ($120K): dedicated CSM fraction, ~0.5 FTE
    //    Tier 5 ($240K): dedicated CSM + TAM, ~1.0 FTE
    //    Tier 6 ($360K): dedicated team, ~1.5 FTE
    //    MARGIN: 40-70% across all tiers (AI-assisted support deflection).

    P.support = [
        { maxGB: 10,       annual: 2400 },
        { maxGB: 50,       annual: 6000 },
        { maxGB: 500,      annual: 12000 },
        { maxGB: 2000,     annual: 24000 },
        { maxGB: 10000,    annual: 60000 },
        { maxGB: 50000,    annual: 120000 },
        { maxGB: 200000,   annual: 240000 },
        { maxGB: Infinity, annual: 360000 }
    ];

    // ═══════════════════════════════════════════════════════════
    //  BYODb INFRASTRUCTURE — per-provider pricing ($/GB/day)
    //  Multiply by 365 for annual cost.
    //  Organized by category for UI dropdown.
    //
    //  NOTE: These rates are ESTIMATES based on published cloud pricing.
    //  Actual customer costs vary by region, commitment discounts, data
    //  format, and query patterns. The cost simulator should note this
    //  and ideally allow manual override for customers with known rates.
    //  Vigilense margin on BYODb: 0% (pass-through).
    // ═══════════════════════════════════════════════════════════

    P.byodbProviders = {
        // ── Lake / Warehouse (Budget) ──────────────────────
        securityLake: {
            label: 'Amazon Security Lake (S3 + Athena)',
            category: 'Lake / Warehouse',
            tiers: [
                { upTo: 500,      ratePerGBDay: 0.09 },
                { upTo: 2000,     ratePerGBDay: 0.06 },
                { upTo: 10000,    ratePerGBDay: 0.04 },
                { upTo: 100000,   ratePerGBDay: 0.028 },
                { upTo: Infinity, ratePerGBDay: 0.022 }
            ]
        },
        bigquery: {
            label: 'Google BigQuery',
            category: 'Lake / Warehouse',
            tiers: [
                { upTo: 500,      ratePerGBDay: 0.14 },
                { upTo: 2000,     ratePerGBDay: 0.09 },
                { upTo: 10000,    ratePerGBDay: 0.06 },
                { upTo: 100000,   ratePerGBDay: 0.04 },
                { upTo: Infinity, ratePerGBDay: 0.03 }
            ]
        },

        // ── Columnar Analytics (Mid-Range) ─────────────────
        clickhouse: {
            label: 'ClickHouse Cloud',
            category: 'Columnar Analytics',
            tiers: [
                { upTo: 500,      ratePerGBDay: 0.15 },
                { upTo: 2000,     ratePerGBDay: 0.10 },
                { upTo: 10000,    ratePerGBDay: 0.07 },
                { upTo: 100000,   ratePerGBDay: 0.045 },
                { upTo: Infinity, ratePerGBDay: 0.035 }
            ]
        },
        databricks: {
            label: 'Databricks Lakehouse',
            category: 'Columnar Analytics',
            tiers: [
                { upTo: 500,      ratePerGBDay: 0.18 },
                { upTo: 2000,     ratePerGBDay: 0.13 },
                { upTo: 10000,    ratePerGBDay: 0.09 },
                { upTo: 100000,   ratePerGBDay: 0.06 },
                { upTo: Infinity, ratePerGBDay: 0.045 }
            ]
        },

        // ── Search / SIEM-Optimized (Standard) ─────────────
        opensearch: {
            label: 'AWS OpenSearch',
            category: 'Search / SIEM-Optimized',
            tiers: [
                { upTo: 500,      ratePerGBDay: 0.28 },
                { upTo: 2000,     ratePerGBDay: 0.19 },
                { upTo: 10000,    ratePerGBDay: 0.12 },
                { upTo: 100000,   ratePerGBDay: 0.08 },
                { upTo: Infinity, ratePerGBDay: 0.065 }
            ]
        },
        snowflake: {
            label: 'Snowflake',
            category: 'Search / SIEM-Optimized',
            tiers: [
                { upTo: 500,      ratePerGBDay: 0.24 },
                { upTo: 2000,     ratePerGBDay: 0.16 },
                { upTo: 10000,    ratePerGBDay: 0.10 },
                { upTo: 100000,   ratePerGBDay: 0.07 },
                { upTo: Infinity, ratePerGBDay: 0.055 }
            ]
        },
        elasticsearch: {
            label: 'Elastic Cloud (Elasticsearch)',
            category: 'Search / SIEM-Optimized',
            tiers: [
                { upTo: 500,      ratePerGBDay: 0.35 },
                { upTo: 2000,     ratePerGBDay: 0.24 },
                { upTo: 10000,    ratePerGBDay: 0.15 },
                { upTo: 100000,   ratePerGBDay: 0.10 },
                { upTo: Infinity, ratePerGBDay: 0.08 }
            ]
        }
    };

    // Default provider (cheapest option)
    P.byodbDefault = 'securityLake';

    // ═══════════════════════════════════════════════════════════
    //  DATA INGESTION PIPELINE — cost of getting logs INTO BYODb
    // ═══════════════════════════════════════════════════════════
    //
    //  With Splunk, Universal/Heavy Forwarders are bundled into the
    //  license and forwarder compute is captured in Legacy infra %.
    //  With BYODb, the customer needs a data pipeline: streaming
    //  service (Kinesis Firehose, Dataflow, Cribl), schema
    //  normalization (OCSF/ECS transform), buffering, and retry.
    //
    //  COST BASIS (blended estimate):
    //    AWS-native sources (CloudTrail, VPC FL, etc.): ~$0.00/GB
    //      (ingestion is bundled into Security Lake pricing)
    //    Third-party/custom sources via Kinesis Firehose: ~$0.029/GB
    //    Lambda/Glue transformation:                      ~$0.005/GB
    //    Assuming ~40-60% of logs are cloud-native (free), blended
    //    rate is lower than raw Firehose pricing.
    //
    //  At scale, more logs tend to be cloud-native (AWS/GCP/Azure
    //  service logs), so the blended rate decreases.
    //
    //  Rates are cumulative-tiered (like storage), multiply by 365
    //  for annual cost.
    P.dataIngestion = [
        { upTo: 500,      ratePerGBDay: 0.018 },   // ~$6.57/GB/yr — small orgs, mostly custom sources
        { upTo: 2000,     ratePerGBDay: 0.014 },   // ~$5.11/GB/yr — mix of cloud-native + custom
        { upTo: 10000,    ratePerGBDay: 0.010 },   // ~$3.65/GB/yr — enterprise, more cloud-native
        { upTo: 100000,   ratePerGBDay: 0.007 },   // ~$2.56/GB/yr — heavy cloud-native %
        { upTo: Infinity, ratePerGBDay: 0.005 }    // ~$1.83/GB/yr — hyperscale, bulk streaming deals
    ];

    // Keep backward-compat flat alias for pages that don't use the dropdown
    P.byodbInfra = P.byodbProviders[P.byodbDefault].tiers;

    // ═══════════════════════════════════════════════════════════
    //  AI SOC ANALYST — RESPONSE PLATFORM PRICING ("The Brain")
    // ═══════════════════════════════════════════════════════════
    //
    //  PRODUCT BOUNDARY: The AI SOC is the ONLY product that
    //  investigates, reasons, and resolves. It is the "digital
    //  labour" that replaces L1/L2/L3 analysts.
    //
    //  Revenue pillars:
    //    1. AI SOC Platform — flat annual license for the AI engine
    //    2. AI Investigation Compute — per-case variable cost
    //    3. Human-in-the-loop — customer retains minimal staff
    // ═══════════════════════════════════════════════════════════

    //  AI SOC Platform Tiers — covers the AI engine: resolution
    //  orchestration, LLM cognition, SOAR actions, RAG pipeline.
    //
    //  COST BASIS:
    //    LLM inference: $2-8/M tokens (model-dependent)
    //    Resolution orchestration: $0.10-0.30/action
    //    RAG embedding pipeline: ~$5-15K/yr per customer
    //    At Starter (1K alerts × $0.50 avg LLM cost/alert × 365) ≈ $183K real cost
    //    → $60K platform fee UNDER-COVERS at Starter. Revenue comes from
    //      Investigation Compute + bundle upsell. Accept thin margin at entry
    //      to land customers, expand to Sovereign SOC.
    //    At Scale (50K+ alerts): volume LLM cost negotiation + caching
    //      brings real cost to ~$0.15/alert. $600K tier is healthy.
    //    MARGIN: -10% to +20% at Starter (loss-leader), 40-60% at Scale.

    P.aiSocPlatform = [
        { maxAlerts: 1000,     annual: 60000,  tier: 'Starter' },
        { maxAlerts: 5000,     annual: 120000, tier: 'Professional' },
        { maxAlerts: 15000,    annual: 240000, tier: 'Business' },
        { maxAlerts: 50000,    annual: 420000, tier: 'Enterprise' },
        { maxAlerts: Infinity, annual: 600000, tier: 'Scale' }
    ];

    //  AI Investigation Compute — per automated deep-dive.
    //
    //  INVESTIGATION COMPLEXITY MODEL:
    //    Each alert is investigated individually. Consolidated groups are
    //    then re-investigated with aggregated context. Investigations can
    //    loop multiple times for complex incidents. This means compute per
    //    investigation is HIGHLY VARIABLE:
    //
    //    Light  (50%): quick triage, 1-2 LLM calls
    //      Real cost: $0.10-0.30    Charge: ~$1.00
    //    Medium (35%): standard investigation, 3-5 LLM calls + tool calls
    //      Real cost: $0.50-1.50    Charge: ~$2.00
    //    Heavy  (15%): deep dive with multi-loop reasoning, 5-15+ LLM calls
    //      Real cost: $2.00-8.00    Charge: ~$5.00
    //
    //    Weighted avg real cost: 0.50×$0.20 + 0.35×$1.00 + 0.15×$5.00 = $1.00
    //    Weighted avg charge:    0.50×$1.00 + 0.35×$2.00 + 0.15×$5.00 = $1.95
    //    BLENDED MARGIN: ~49%
    //
    //  The tiered pricing below reflects the weighted average. As customers
    //  scale, caching and model optimization reduce real costs.
    //    FLOOR RATE $0.80 at extreme volume reflects negotiated enterprise
    //    deals with high cache hit rates — still marginal at ~20-30%.

    P.aiInvestigation = {
        // Complexity distribution (for internal cost modeling)
        complexity: {
            light:  { weight: 0.50, realCost: 0.20, charge: 1.00 },
            medium: { weight: 0.35, realCost: 1.00, charge: 2.00 },
            heavy:  { weight: 0.15, realCost: 5.00, charge: 5.00 }
        },
        // Pricing tiers (weighted-average charge per investigation)
        tiers: [
            { upTo: 250000,   rate: 2.00 },
            { upTo: 1000000,  rate: 1.40 },
            { upTo: 5000000,  rate: 1.00 },
            { upTo: Infinity, rate: 0.80 }     // floor: enterprise cache-optimized
        ]
    };

    // Backward compat alias
    P.aiCompute = P.aiInvestigation.tiers;

    // ═══════════════════════════════════════════════════════════
    //  SOVEREIGN SOC BUNDLE DISCOUNT
    // ═══════════════════════════════════════════════════════════
    //  Incentivises customers to buy SIEM + SOC together.
    //  Applied to Vigilense platform costs (not pass-through BYODb
    //  or customer-retained staff).

    P.bundleDiscount = 0.15;  // 15% off Vigilense platform costs

    // ═══════════════════════════════════════════════════════════
    //  DEDICATED INFRASTRUCTURE ADD-ON (Enterprise/Scale only)
    // ═══════════════════════════════════════════════════════════
    //  For customers requiring dedicated Alert Engine workers,
    //  guaranteed SLA, or data residency. Priced at reserved
    //  compute cost + margin.
    P.dedicatedInfra = {
        available: ['Enterprise', 'Scale'],  // only these tiers qualify
        annualBase: 48000,                   // base: reserved 2-vCPU worker pool
        perWorker:  18000,                   // each additional dedicated worker/yr
        description: 'Dedicated Alert Engine workers, guaranteed SLA, data residency'
    };

    // Vigilense platform admin overhead — tiered by volume.
    // Someone still approves access requests, configures SSO, reviews policies.
    // Scales with deployment complexity.
    //
    // COST BASIS: This is a customer-facing cost. Vigilense's internal
    // support staff covering this is separate (in support tiers).
    P.vigAdminOverhead = [
        { maxGB: 10,       annual: 3600,  fte: 0.025, desc: '~1 hr/wk' },
        { maxGB: 100,      annual: 9000,  fte: 0.06,  desc: '~2 hrs/wk' },
        { maxGB: 500,      annual: 18000, fte: 0.12,  desc: '~5 hrs/wk' },
        { maxGB: 5000,     annual: 30000, fte: 0.20, desc: '~8 hrs/wk' },
        { maxGB: Infinity, annual: 36000, fte: 0.24, desc: '~10 hrs/wk' }
    ];

    // ═══════════════════════════════════════════════════════════
    //  SOC STAFFING DEFAULTS
    // ═══════════════════════════════════════════════════════════

    P.socDefaults = {
        l1Salary:           75000,
        l2Multiplier:       1.40,
        l3Multiplier:       1.85,
        mgrMultiplier:      2.10,
        benefitsPct:        35,
        turnoverPct:        25,
        recruitCost:        20000,
        trainingCost:       8000,
        alertsPerAnalyst:   30,
        investigationRate:  40,
        soarTooling:        150000,
        threatIntel:        50000,
        autoResolveRate:    75,
        reviewRate:         80,
        reviewerSalary:     95000,
        detEngSalary:       120000,
        irLeadSalary:       150000
    };

    // ═══════════════════════════════════════════════════════════
    //  SHIFT MODELS
    // ═══════════════════════════════════════════════════════════

    P.shifts = {
        '24/7': { count: 3, fteMult: 4.7, premium: 1.10 },
        '16/5': { count: 2, fteMult: 2.3, premium: 1.05 },
        '8/5':  { count: 1, fteMult: 1.15, premium: 1.0 }
    };

    // ═══════════════════════════════════════════════════════════
    //  DETECTION ENGINEERING & IR LEAD HEADCOUNT TIERS
    // ═══════════════════════════════════════════════════════════

    P.detEngTiers = [
        { maxAlerts: 2000,     count: 1 },
        { maxAlerts: 10000,    count: 1 },
        { maxAlerts: 30000,    count: 2 },
        { maxAlerts: Infinity, count: 3 }
    ];

    P.irLeadTiers = [
        { maxAlerts: 5000,     count: 0 },
        { maxAlerts: 30000,    count: 1 },
        { maxAlerts: Infinity, count: 2 }
    ];

    // ═══════════════════════════════════════════════════════════
    //  EDITORIAL REFERENCE
    // ═══════════════════════════════════════════════════════════
    //  Reference scenario used by the "receipt" on the Why Now page.

    P.editorial = {
        exampleGB: 500,       // Reference scenario: 500 GB/day
        ingestionRate: 0.88   // $/GB/day editorial rate (blog content)
    };


    // ═══════════════════════════════════════════════════════════
    //  HELPER FUNCTIONS
    // ═══════════════════════════════════════════════════════════

    var H = {};

    /**
     * Generic cumulative-tiered cost calculator.
     *
     * @param {number}  volume     - total units (GB, rules, investigations, etc.)
     * @param {Array}   tiers      - array of { upTo, [rateKey]: number }
     * @param {string}  rateKey    - property name for the per-unit rate
     * @param {number}  [multiplier=1] - optional multiplier (e.g. 365 for daily→annual)
     * @returns {number} total cost (not rounded)
     */
    H.tieredCost = function(volume, tiers, rateKey, multiplier) {
        var cost = 0;
        var remaining = volume;
        var prevCap = 0;
        multiplier = multiplier || 1;
        for (var i = 0; i < tiers.length && remaining > 0; i++) {
            var tierCap = tiers[i].upTo;
            var tierSize = (tierCap === Infinity) ? remaining : (tierCap - prevCap);
            var inTier = Math.min(remaining, tierSize);
            cost += inTier * tiers[i][rateKey] * multiplier;
            remaining -= inTier;
            prevCap = tierCap;
        }
        return cost;
    };

    /**
     * Look up a flat-tier value (support, AI SOC platform, etc.).
     * Returns the first tier object where value <= tier[key].
     */
    H.lookupTier = function(value, tiers, key) {
        for (var i = 0; i < tiers.length; i++) {
            if (value <= tiers[i][key]) return tiers[i];
        }
        return tiers[tiers.length - 1];
    };

    // ── Legacy SIEM helpers ──────────────────────────────────

    /**
     * Compute default legacy SIEM rate ($/GB/yr) for a given daily volume.
     */
    H.legacyRate = function(gb) {
        var curve = P.legacy.rateCurve;
        for (var i = 0; i < curve.length; i++) {
            if (gb <= curve[i].upTo || i === curve.length - 1) {
                var rate = curve[i].startRate + (gb - curve[i].fromGB) * curve[i].slope;
                return Math.max(P.legacy.minRate, Math.round(rate));
            }
        }
        return P.legacy.minRate;
    };

    /**
     * Compute dynamic legacy infrastructure cost as a fraction of license.
     * Scales logarithmically: ~20% at tiny volumes, floors at 9% for enterprise.
     */
    H.infraPct = function(vol) {
        return Math.min(0.20, Math.max(0.09, 0.20 - Math.log10(vol) / 20));
    };

    /**
     * Get legacy license cap for a given volume.
     */
    H.legacyLicenseCap = function(vol) {
        var caps = P.legacy.licenseCaps;
        for (var i = 0; i < caps.length; i++) {
            if (vol > caps[i].minVol) return caps[i].cap;
        }
        return Infinity;
    };

    /**
     * Compute full legacy SIEM scenario.
     * @param {number} vol   - daily GB volume
     * @param {number} [rate] - override $/GB/yr rate
     * @param {number} [rules] - detection rule count (affects SVC compute)
     * Returns { license, licenseCapped, infra, admins, adminCost, total, rate }
     */
    H.legacyScenario = function(vol, rate, rules) {
        if (!rate) rate = H.legacyRate(vol);
        var licenseCapped = false;

        // Enterprise unlimited-license modeling (smooth blend)
        var license;
        var blendStart = P.legacy.unlimitedBlendStartGB;
        var blendEnd   = P.legacy.unlimitedBlendEndGB;
        var rateBased  = vol * rate * P.marketVariance;
        var cap = H.legacyLicenseCap(vol);
        if (rateBased > cap) { rateBased = cap; }

        if (vol <= blendStart) {
            license = rateBased;
            if (license >= cap) licenseCapped = true;
        } else if (vol >= blendEnd) {
            license = P.legacy.unlimitedAnnualCost;
            licenseCapped = true;
            rate = Math.round(license / vol);
        } else {
            // Linear blend between rate-based and unlimited flat
            var t = (vol - blendStart) / (blendEnd - blendStart);
            license = Math.round(rateBased + (P.legacy.unlimitedAnnualCost - rateBased) * t);
            licenseCapped = true;
            rate = Math.round(license / vol);
        }

        var infraPct = H.infraPct(vol);
        var infra = Math.min(Math.round(license * infraPct), P.legacy.infraCap);

        // Admin staffing — fractional at small volumes, whole FTEs at scale.
        // At <200 GB/day the SIEM is typically managed part-time by existing
        // IT staff, not a dedicated hire.
        var efficiency = 1 + Math.log10(Math.max(1, vol)) * 0.35;
        var rawAdmins = vol / (P.legacy.admin.gbPerAdmin * efficiency);

        var admins, adminFTE;
        if (vol < 200) {
            // Part-time: minimum 0.05 FTE (~2 hrs/wk), fractional up to ~0.3 FTE
            adminFTE = Math.max(0.05, Math.round(rawAdmins * 100) / 100);
            admins = adminFTE;
        } else {
            // Full-time headcount: at least 1, rounded up
            admins = Math.ceil(rawAdmins);
            admins = Math.min(P.legacy.admin.maxAdmins, Math.max(1, admins));
            adminFTE = admins;
        }

        var adminCost = Math.round(adminFTE * P.legacy.admin.salary);

        // Detection compute (search heads, SVCs, scheduled searches)
        // Three scaling factors:
        //   1. Base tier (volume-based): minimum SVC capacity for data size
        //   2. Volume scaling (>50 TB): additional SVCs for large data scans
        //   3. Rule scaling: more scheduled searches = more SVC capacity
        //      Baseline rules assumed per volume tier; if actual rules exceed
        //      baseline, compute scales proportionally.
        var detComputeBase = H.lookupTier(vol, P.legacy.detectionCompute, 'maxGB').annual;
        var detComputeScale = vol > 50000
            ? Math.round((vol - 50000) * P.legacy.detectionComputeScaleRate)
            : 0;

        // Rule-based SVC scaling: each tier's cost assumes a baseline rule
        // count proportional to volume. More rules = more scheduled searches
        // = more search head compute.
        var baselineRules = Math.max(50, Math.min(1000, Math.round(200 * (vol / 500))));
        var actualRules = rules || baselineRules;
        var ruleMultiplier = Math.max(1.0, actualRules / baselineRules);
        var detCompute = Math.round((detComputeBase + detComputeScale) * ruleMultiplier);

        // Training & professional services (SPL training, PS hours)
        var trainingPS = H.lookupTier(vol, P.legacy.trainingPS, 'maxGB').annual;

        var total = license + infra + adminCost + detCompute + trainingPS;
        return {
            license: license, licenseCapped: licenseCapped,
            infra: infra, admins: admins, adminFTE: adminFTE,
            adminCost: adminCost, detCompute: detCompute,
            trainingPS: trainingPS,
            total: total, rate: rate
        };
    };

    // ── Vigilense BYODb SIEM helpers (Detection Platform) ────

    /**
     * Estimate SIEM detection workload from daily GB volume and rule count.
     * Returns detection-only metrics (no investigation/resolution — those
     * belong to the AI SOC Analyst product).
     */
    H.estimateWorkload = function(vol, rules) {
        var u = P.siemUsage;

        // 1. Detection queries: rule-driven (hourly default schedule)
        var detectionQueriesPerDay = rules * u.detection.queriesPerRulePerDay;

        // 2. Dashboard + hunting + ad-hoc queries
        //    Dashboard count is driven by org complexity (teams, use-cases,
        //    compliance requirements), NOT raw data volume. A company at
        //    50 TB and 500 TB likely has similar dashboard counts — the extra
        //    data is more log sources, not more dashboards.
        //
        //    Model: two-phase growth with smooth continuity at 1,000 GB.
        //      Phase 1 (≤1,000 GB): moderate linear + sqrt growth
        //        200 base + vol×2 + sqrt(vol)×15
        //        → 217 at 1 GB, 550 at 100 GB, 2,674 at 1,000 GB
        //      Phase 2 (>1,000 GB): logarithmic growth (caps ~25-30K/day)
        //        2,674 base + log10(vol/1000) × 8,000
        //        → 10,674 at 10 TB, 18,674 at 100 TB, 26,674 at 1,000 TB
        //
        //    This reflects that even the largest SOCs have finite dashboards
        //    and analyst headcount. Actual billing should meter real widget
        //    executions per tenant.
        var dashboardQueriesPerDay;
        if (vol <= 1000) {
            dashboardQueriesPerDay = Math.round(200 + vol * 2 + Math.sqrt(vol) * 15);
        } else {
            // Continuous with phase 1 at vol=1000 (value ≈ 2674)
            dashboardQueriesPerDay = Math.round(2674 + Math.log10(vol / 1000) * 8000);
        }

        var queriesPerDay = detectionQueriesPerDay + dashboardQueriesPerDay;
        var annualQueries = Math.round(queriesPerDay * 365);

        // 3. Consolidation cost estimate (DBSCAN + embeddings + LLM)
        //    Alerts/day derived from detection runs × trigger rate.
        var c = u.consolidation;
        var alertsPerDay = Math.round(detectionQueriesPerDay * c.triggerRate);
        var consolidationRunsPerDay = Math.max(1, Math.ceil(alertsPerDay / c.avgAlertsPerRun));
        var alertsPerRun = Math.min(alertsPerDay, c.avgAlertsPerRun);
        var annualConsolidationCost = Math.round(
            consolidationRunsPerDay * 365 * (c.baseCostPerRun + alertsPerRun * c.costPerAlert)
        );

        return {
            detectionQueriesPerDay: detectionQueriesPerDay,
            dashboardQueriesPerDay: dashboardQueriesPerDay,
            queriesPerDay:  Math.round(queriesPerDay),
            annualQueries:  annualQueries,
            alertsPerDay:   alertsPerDay,
            consolidationRunsPerDay: consolidationRunsPerDay,
            annualConsolidationCost: annualConsolidationCost
        };
    };

    /**
     * Compute full Vigilense BYODb SIEM cost (detection platform only).
     * Does NOT include investigation/resolution/LLM — those are AI SOC.
     *
     * @param {number} vol          - daily GB volume
     * @param {number} rules        - detection rule count
     * @param {string} [providerKey] - BYODb provider key
     * @returns {object} itemised cost breakdown + workload metrics
     */
    H.vigilenseSiemCost = function(vol, rules, providerKey) {
        var u = P.siemUsage;
        var cp = u.costPlus;
        var w = H.estimateWorkload(vol, rules);

        // ── 1. Platform Base COGS (fixed per-customer infra) ──
        var platTier     = H.lookupTier(vol, u.platformCOGS, 'maxGB');
        var baseCOGS     = platTier.annualCOGS;
        var platformTier = platTier.tier;

        // ── 2. Query Compute COGS (variable) ──
        //    Queries within the tier's baseQueries are funded by
        //    the base COGS (no marginal cost). Only queries beyond
        //    that incur per-query compute cost.
        //
        //    Volume multiplier: at extreme volumes, orchestration cost
        //    per query increases modestly (larger result sets, heavier
        //    enrichment context, higher throughput requirements).
        //    The HEAVY compute (data scanning) is on the customer's DB
        //    and already captured in BYODb pricing.
        //    Multiplier: 1.0 at ≤1 TB, grows log10 up to ~1.3× at 1000 TB.
        var volMultiplier = vol <= 1000 ? 1.0
            : 1.0 + Math.log10(vol / 1000) * 0.10;
        var effectiveQueryCOGS = cp.queryCOGS * volMultiplier;

        var baseQueries     = platTier.baseQueries || 0;
        var marginalQueries = Math.max(0, w.annualQueries - baseQueries);
        var queryCOGS       = Math.round(marginalQueries * effectiveQueryCOGS);

        // ── 3. Consolidation COGS (variable — AI clustering) ──
        var consolidationCOGS = w.annualConsolidationCost;

        // ── Total COGS → Price with tier-specific margin ──
        var tierMargin    = platTier.margin;
        var totalCOGS     = baseCOGS + queryCOGS + consolidationCOGS;
        var platformPrice = Math.round(totalCOGS * (1 + tierMargin));

        // Support is priced separately (own cost structure)
        var supportCost = H.supportCost(vol);

        // "Vigilense Platform" in the UI = platform price + support
        var vigilensePlatformCost = platformPrice + supportCost;

        // ── BYODb pass-through (storage + ingestion pipeline) ──
        var byodbStorage  = H.byodbStorageCost(vol, providerKey);
        var dataIngestion = H.dataIngestionCost(vol);
        var byodbCost     = byodbStorage + dataIngestion;

        // ── Governance (customer admin overhead) ──
        var adminTier = H.lookupTier(vol, P.vigAdminOverhead, 'maxGB');
        var adminCost = adminTier.annual;
        var adminDesc = adminTier.fte + ' FTE — ' + adminTier.desc;

        var total = vigilensePlatformCost + byodbCost + adminCost;

        return {
            // ── Grouped for simplified UI (3 line items) ──
            vigilensePlatformCost: vigilensePlatformCost,
            byodbCost:          byodbCost,
            adminCost:          adminCost,

            // ── Cost-plus breakdown (transparent) ──
            platformTier:       platformTier,
            baseCOGS:           baseCOGS,
            baseQueries:        baseQueries,
            marginalQueries:    marginalQueries,
            queryCOGS:          queryCOGS,
            consolidationCOGS:  consolidationCOGS,
            totalCOGS:          totalCOGS,
            margin:             tierMargin,
            platformPrice:      platformPrice,
            supportCost:        supportCost,

            // ── BYODb breakdown ──
            byodbProviderLabel: H.byodbLabel(providerKey),
            byodbStorage:       byodbStorage,
            dataIngestion:      dataIngestion,
            byodbEffective:     (byodbCost / vol / 365).toFixed(3),

            // ── Governance ──
            adminDesc:          adminDesc,

            // ── Totals ──
            total:              total,
            workload:           w
        };
    };

    /**
     * Compute BYODb storage annual cost (rounded).
     * @param {number} vol   - daily GB volume
     * @param {string} [providerKey] - key from P.byodbProviders (defaults to P.byodbDefault)
     */
    H.byodbStorageCost = function(vol, providerKey) {
        var provider = P.byodbProviders[providerKey || P.byodbDefault];
        return Math.round(H.tieredCost(vol, provider.tiers, 'ratePerGBDay', 365));
    };

    /**
     * Compute data ingestion pipeline annual cost (rounded).
     * Covers: streaming service, schema normalization, buffering.
     * @param {number} vol   - daily GB volume
     */
    H.dataIngestionCost = function(vol) {
        return Math.round(H.tieredCost(vol, P.dataIngestion, 'ratePerGBDay', 365));
    };

    /**
     * Compute total BYODb cost (storage + ingestion pipeline).
     * @param {number} vol   - daily GB volume
     * @param {string} [providerKey] - key from P.byodbProviders
     */
    H.byodbCost = function(vol, providerKey) {
        return H.byodbStorageCost(vol, providerKey) + H.dataIngestionCost(vol);
    };

    /**
     * Get provider display label.
     */
    H.byodbLabel = function(providerKey) {
        var p = P.byodbProviders[providerKey || P.byodbDefault];
        return p ? p.label : providerKey;
    };

    /**
     * Get support annual cost by volume.
     */
    H.supportCost = function(vol) {
        return H.lookupTier(vol, P.support, 'maxGB').annual;
    };

    // ── AI SOC helpers ───────────────────────────────────────

    /**
     * Get AI SOC Platform cost and tier by daily alert volume.
     * Returns { annual, tier }
     */
    H.aiSocPlatformCost = function(dailyAlerts) {
        var t = H.lookupTier(dailyAlerts, P.aiSocPlatform, 'maxAlerts');
        return { annual: t.annual, tier: t.tier };
    };

    /**
     * Compute AI Investigation Compute annual cost (rounded).
     */
    H.aiComputeCost = function(investigations) {
        return Math.round(H.tieredCost(investigations, P.aiCompute, 'rate'));
    };

    /**
     * Get detection engineering headcount by daily alerts.
     */
    H.detEngCount = function(dailyAlerts) {
        return H.lookupTier(dailyAlerts, P.detEngTiers, 'maxAlerts').count;
    };

    /**
     * Get IR lead headcount by daily alerts.
     */
    H.irLeadCount = function(dailyAlerts) {
        return H.lookupTier(dailyAlerts, P.irLeadTiers, 'maxAlerts').count;
    };

    // ── Hard Truth TCO Comparison ────────────────────────────
    // Addresses the "Where did the $750k go?" objection by
    // explicitly breaking out each cost category side-by-side.

    /**
     * Generate a structured comparison for the three major cost buckets.
     * @param {number} vol   - daily GB volume
     * @param {string} [providerKey] - BYODb provider key (defaults to P.byodbDefault)
     * @returns {Array<{label, legacy, vigilense, explanation}>}
     */
    H.getHardTruthComparison = function(vol, rules, providerKey) {
        var r = rules || Math.round(vol / 10);
        var leg = H.legacyScenario(vol, null, r);
        var vig = H.vigilenseSiemCost(vol, r, providerKey);

        return [
            {
                label: 'Data Infrastructure',
                legacy: leg.infra,
                vigilense: vig.byodbCost,
                explanation: 'Legacy: provisioned indexers, forwarders, storage. Vigilense: cloud storage + ingestion pipeline (pass-through, 0% Vigilense margin).'
            },
            {
                label: 'Operations & Maintenance',
                legacy: leg.adminCost + leg.trainingPS,
                vigilense: vig.adminCost,
                explanation: 'Legacy: ' + leg.admins + ' admin FTEs ($' + Math.round(leg.adminCost/1000) + 'K) + training/PS ($' + Math.round(leg.trainingPS/1000) + 'K). Vigilense: ' + vig.adminDesc + '.'
            },
            {
                label: 'Software License vs. Detection Platform',
                legacy: leg.license + leg.detCompute,
                vigilense: vig.vigilensePlatformCost,
                explanation: 'Legacy: per-GB ingestion tax + SVC compute. Vigilense: cost-plus platform (COGS $' + Math.round(vig.totalCOGS/1000) + 'K + ' + Math.round(vig.margin*100) + '% margin) + support. Add AI SOC Analyst for investigation & response.'
            }
        ];
    };

    // ── Formatting helpers ───────────────────────────────────

    /**
     * Format a number as currency string (e.g. $1,234,567).
     */
    H.fmtCurrency = function(n) {
        return '$' + n.toLocaleString('en-US');
    };

    P.helpers = H;
    window.VIGILENSE_PRICING = P;

})();
