/**
 * Vigilense AI — Central Pricing Configuration
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

    // ─────────────────────────────────────────────────────────
    //  LEGACY SIEM REFERENCE PRICING
    // ─────────────────────────────────────────────────────────

    P.legacy = {

        // Default rate curve: $/GB/yr term-license pricing
        rateCurve: [
            { upTo: 500,      startRate: 1600, slope: -0.5,    fromGB: 0 },
            { upTo: 2000,     startRate: 1350, slope: -0.28,   fromGB: 500 },
            { upTo: 10000,    startRate: 912,  slope: -0.055,  fromGB: 2000 },
            { upTo: 50000,    startRate: 480,  slope: -0.004,  fromGB: 10000 },
            { upTo: Infinity, startRate: 300,  slope: 0,       fromGB: 50000 }
        ],
        minRate: 180,

        infraCap: 10000000,

        // Enterprise unlimited-license modeling
        unlimitedBlendStartGB: 10000,
        unlimitedBlendEndGB:   15000,
        unlimitedAnnualCost:   8500000,

        licenseCaps: [
            { minVol: 300000, cap: 55000000 },
            { minVol: 80000,  cap: 30000000 }
        ],

        admin: {
            salary: 140000,
            gbPerAdmin: 650,
            maxAdmins: 18
        },

        trainingPS: [
            { maxGB: 50,       annual: 5000 },
            { maxGB: 500,      annual: 12000 },
            { maxGB: 5000,     annual: 25000 },
            { maxGB: 50000,    annual: 50000 },
            { maxGB: Infinity, annual: 75000 }
        ],

        detectionCompute: [
            { maxGB: 10,       annual: 3000 },
            { maxGB: 50,       annual: 12000 },
            { maxGB: 200,      annual: 36000 },
            { maxGB: 500,      annual: 72000 },
            { maxGB: 2000,     annual: 150000 },
            { maxGB: 10000,    annual: 320000 },
            { maxGB: 50000,    annual: 600000 },
            { maxGB: Infinity, annual: 900000 }
        ],
        detectionComputeScaleRate: 3.50
    };

    // ─────────────────────────────────────────────────────────
    //  MARKET VARIANCE
    // ─────────────────────────────────────────────────────────
    P.marketVariance = 1.0;

    // ─────────────────────────────────────────────────────────
    //  VIGILENSE BYODb SIEM — DETECTION PLATFORM PRICING
    // ─────────────────────────────────────────────────────────

    P.siemUsage = {

        // Pre-computed platform pricing per tier
        platformTiers: [
            { maxGB: 5,        annualPrice: 4550,   baseQueries: 600000,    tier: 'Lite',          maxQueriesPerHour: 2000 },
            { maxGB: 10,       annualPrice: 4900,   baseQueries: 600000,    tier: 'Lite+',         maxQueriesPerHour: 2000 },
            { maxGB: 20,       annualPrice: 8880,   baseQueries: 800000,    tier: 'Starter',       maxQueriesPerHour: 3500 },
            { maxGB: 50,       annualPrice: 15800,  baseQueries: 1000000,   tier: 'Starter+',      maxQueriesPerHour: 5000 },
            { maxGB: 100,      annualPrice: 25500,  baseQueries: 1500000,   tier: 'Growth',        maxQueriesPerHour: 12000 },
            { maxGB: 200,      annualPrice: 38000,  baseQueries: 2000000,   tier: 'Growth+',       maxQueriesPerHour: 20000 },
            { maxGB: 350,      annualPrice: 50500,  baseQueries: 3000000,   tier: 'Business',      maxQueriesPerHour: 40000 },
            { maxGB: 500,      annualPrice: 60200,  baseQueries: 3500000,   tier: 'Business+',     maxQueriesPerHour: 60000 },
            { maxGB: 1000,     annualPrice: 76800,  baseQueries: 4000000,   tier: 'Professional',  maxQueriesPerHour: 80000 },
            { maxGB: 2000,     annualPrice: 97200,  baseQueries: 5000000,   tier: 'Professional+', maxQueriesPerHour: 120000 },
            { maxGB: 5000,     annualPrice: 112000, baseQueries: 6000000,   tier: 'Enterprise',    maxQueriesPerHour: 200000 },
            { maxGB: 50000,    annualPrice: 147500, baseQueries: 8000000,   tier: 'Enterprise+',   maxQueriesPerHour: 500000 },
            { maxGB: Infinity, annualPrice: 180000, baseQueries: 10000000,  tier: 'Scale',         maxQueriesPerHour: 1000000 }
        ],

        // Pre-computed per-tier pricing factors for variable costs
        // (applied to marginal query and consolidation costs)
        tierFactors: [
            { maxGB: 5,        factor: 1.30 },
            { maxGB: 10,       factor: 1.40 },
            { maxGB: 20,       factor: 1.48 },
            { maxGB: 50,       factor: 1.58 },
            { maxGB: 100,      factor: 1.70 },
            { maxGB: 200,      factor: 1.90 },
            { maxGB: 350,      factor: 2.02 },
            { maxGB: 500,      factor: 2.15 },
            { maxGB: 1000,     factor: 2.40 },
            { maxGB: 2000,     factor: 2.70 },
            { maxGB: 5000,     factor: 2.80 },
            { maxGB: 50000,    factor: 2.95 },
            { maxGB: Infinity, factor: 3.00 }
        ],

        // Query pricing
        queryRate: 0.012,

        // Detection engine
        detection: {
            queriesPerRulePerDay: 24
        },

        // Consolidation pricing (DBSCAN clustering + embeddings)
        consolidation: {
            triggerRate: 0.02,
            avgAlertsPerRun: 200,
            baseCostPerRun: 1.50,
            costPerAlert: 0.05
        }
    };

    // ─────────────────────────────────────────────────────────
    //  SUPPORT TIERS
    // ─────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────
    //  BYODb INFRASTRUCTURE — per-provider pricing ($/GB/day)
    // ─────────────────────────────────────────────────────────

    P.byodbProviders = {
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

    P.byodbDefault = 'securityLake';

    // ─────────────────────────────────────────────────────────
    //  DATA INGESTION PIPELINE
    // ─────────────────────────────────────────────────────────

    P.dataIngestion = [
        { upTo: 500,      ratePerGBDay: 0.018 },
        { upTo: 2000,     ratePerGBDay: 0.014 },
        { upTo: 10000,    ratePerGBDay: 0.010 },
        { upTo: 100000,   ratePerGBDay: 0.007 },
        { upTo: Infinity, ratePerGBDay: 0.005 }
    ];

    P.byodbInfra = P.byodbProviders[P.byodbDefault].tiers;

    // ─────────────────────────────────────────────────────────
    //  AI SOC ANALYST — RESPONSE PLATFORM PRICING
    // ─────────────────────────────────────────────────────────

    P.aiSocPlatform = [
        { maxAlerts: 1000,     annual: 60000,  tier: 'Starter' },
        { maxAlerts: 5000,     annual: 120000, tier: 'Professional' },
        { maxAlerts: 15000,    annual: 240000, tier: 'Business' },
        { maxAlerts: 50000,    annual: 420000, tier: 'Enterprise' },
        { maxAlerts: Infinity, annual: 600000, tier: 'Scale' }
    ];

    // AI Investigation pricing tiers (per investigation)
    P.aiInvestigation = {
        tiers: [
            { upTo: 250000,   rate: 2.00 },
            { upTo: 1000000,  rate: 1.40 },
            { upTo: 5000000,  rate: 1.00 },
            { upTo: Infinity, rate: 0.80 }
        ]
    };

    P.aiCompute = P.aiInvestigation.tiers;

    // ─────────────────────────────────────────────────────────
    //  SOVEREIGN SOC BUNDLE DISCOUNT
    // ─────────────────────────────────────────────────────────

    P.bundleDiscount = 0.15;

    // ─────────────────────────────────────────────────────────
    //  DEDICATED INFRASTRUCTURE ADD-ON
    // ─────────────────────────────────────────────────────────

    P.dedicatedInfra = {
        available: ['Enterprise', 'Scale'],
        annualBase: 48000,
        perWorker:  18000,
        description: 'Dedicated Alert Engine workers, guaranteed SLA, data residency'
    };

    // Admin overhead tiers
    P.vigAdminOverhead = [
        { maxGB: 10,       annual: 3600,  fte: 0.025, desc: '~1 hr/wk' },
        { maxGB: 100,      annual: 9000,  fte: 0.06,  desc: '~2 hrs/wk' },
        { maxGB: 500,      annual: 18000, fte: 0.12,  desc: '~5 hrs/wk' },
        { maxGB: 5000,     annual: 30000, fte: 0.20,  desc: '~8 hrs/wk' },
        { maxGB: Infinity, annual: 36000, fte: 0.24,  desc: '~10 hrs/wk' }
    ];

    // ─────────────────────────────────────────────────────────
    //  SOC STAFFING DEFAULTS
    // ─────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────
    //  SHIFT MODELS
    // ─────────────────────────────────────────────────────────

    P.shifts = {
        '24/7': { count: 3, fteMult: 4.7, premium: 1.10 },
        '16/5': { count: 2, fteMult: 2.3, premium: 1.05 },
        '8/5':  { count: 1, fteMult: 1.15, premium: 1.0 }
    };

    // ─────────────────────────────────────────────────────────
    //  DETECTION ENGINEERING & IR LEAD HEADCOUNT TIERS
    // ─────────────────────────────────────────────────────────

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

    // ─────────────────────────────────────────────────────────
    //  EDITORIAL REFERENCE
    // ─────────────────────────────────────────────────────────

    P.editorial = {
        exampleGB: 500,
        ingestionRate: 0.88
    };


    // ─────────────────────────────────────────────────────────
    //  HELPER FUNCTIONS
    // ─────────────────────────────────────────────────────────

    var H = {};

    /**
     * Generic cumulative-tiered cost calculator.
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
     * Look up a flat-tier value.
     */
    H.lookupTier = function(value, tiers, key) {
        for (var i = 0; i < tiers.length; i++) {
            if (value <= tiers[i][key]) return tiers[i];
        }
        return tiers[tiers.length - 1];
    };

    // ── Legacy SIEM helpers ──

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

    H.infraPct = function(vol) {
        return Math.min(0.20, Math.max(0.09, 0.20 - Math.log10(vol) / 20));
    };

    H.legacyLicenseCap = function(vol) {
        var caps = P.legacy.licenseCaps;
        for (var i = 0; i < caps.length; i++) {
            if (vol > caps[i].minVol) return caps[i].cap;
        }
        return Infinity;
    };

    H.legacyScenario = function(vol, rate, rules) {
        if (!rate) rate = H.legacyRate(vol);
        var licenseCapped = false;

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
            var t = (vol - blendStart) / (blendEnd - blendStart);
            license = Math.round(rateBased + (P.legacy.unlimitedAnnualCost - rateBased) * t);
            licenseCapped = true;
            rate = Math.round(license / vol);
        }

        var infraPct = H.infraPct(vol);
        var infra = Math.min(Math.round(license * infraPct), P.legacy.infraCap);

        var efficiency = 1 + Math.log10(Math.max(1, vol)) * 0.35;
        var rawAdmins = vol / (P.legacy.admin.gbPerAdmin * efficiency);

        var admins, adminFTE;
        if (vol < 200) {
            adminFTE = Math.max(0.05, Math.round(rawAdmins * 100) / 100);
            admins = adminFTE;
        } else {
            admins = Math.ceil(rawAdmins);
            admins = Math.min(P.legacy.admin.maxAdmins, Math.max(1, admins));
            adminFTE = admins;
        }

        var adminCost = Math.round(adminFTE * P.legacy.admin.salary);

        var detComputeBase = H.lookupTier(vol, P.legacy.detectionCompute, 'maxGB').annual;
        var detComputeScale = vol > 50000
            ? Math.round((vol - 50000) * P.legacy.detectionComputeScaleRate)
            : 0;

        var baselineRules = Math.max(50, Math.min(1000, Math.round(200 * (vol / 500))));
        var actualRules = rules || baselineRules;
        var ruleMultiplier = Math.max(1.0, actualRules / baselineRules);
        var detCompute = Math.round((detComputeBase + detComputeScale) * ruleMultiplier);

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

    // ── Vigilense BYODb SIEM helpers ──

    H.estimateWorkload = function(vol, rules) {
        var u = P.siemUsage;

        var detectionQueriesPerDay = rules * u.detection.queriesPerRulePerDay;

        var dashboardQueriesPerDay;
        if (vol <= 1000) {
            dashboardQueriesPerDay = Math.round(200 + vol * 2 + Math.sqrt(vol) * 15);
        } else {
            dashboardQueriesPerDay = Math.round(2674 + Math.log10(vol / 1000) * 8000);
        }

        var queriesPerDay = detectionQueriesPerDay + dashboardQueriesPerDay;
        var annualQueries = Math.round(queriesPerDay * 365);

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
     */
    H.vigilenseSiemCost = function(vol, rules, providerKey) {
        var u = P.siemUsage;
        var w = H.estimateWorkload(vol, rules);

        // Platform base pricing (pre-computed annual fee)
        var platTier     = H.lookupTier(vol, u.platformTiers, 'maxGB');
        var basePrice    = platTier.annualPrice;
        var platformTier = platTier.tier;

        // Variable cost pricing factor for this tier
        var tf = H.lookupTier(vol, u.tierFactors, 'maxGB');
        var priceFactor = tf.factor;

        // Query pricing (marginal queries beyond included allowance)
        var volMultiplier = vol <= 1000 ? 1.0
            : 1.0 + Math.log10(vol / 1000) * 0.10;
        var effectiveQueryRate = u.queryRate * volMultiplier;

        var baseQueries     = platTier.baseQueries || 0;
        var marginalQueries = Math.max(0, w.annualQueries - baseQueries);
        var queryPrice      = Math.round(marginalQueries * effectiveQueryRate * priceFactor);

        // Consolidation pricing (AI clustering)
        var consolidationPrice = Math.round(w.annualConsolidationCost * priceFactor);

        var platformPrice = basePrice + queryPrice + consolidationPrice;

        // Support
        var supportCost = H.supportCost(vol);

        // Vigilense Platform total = platform price + support
        var vigilensePlatformCost = platformPrice + supportCost;

        // BYODb pass-through (storage + ingestion pipeline)
        var byodbStorage  = H.byodbStorageCost(vol, providerKey);
        var dataIngestion = H.dataIngestionCost(vol);
        var byodbCost     = byodbStorage + dataIngestion;

        // Governance (customer admin overhead)
        var adminTier = H.lookupTier(vol, P.vigAdminOverhead, 'maxGB');
        var adminCost = adminTier.annual;
        var adminDesc = adminTier.fte + ' FTE — ' + adminTier.desc;

        var total = vigilensePlatformCost + byodbCost + adminCost;

        return {
            vigilensePlatformCost: vigilensePlatformCost,
            byodbCost:          byodbCost,
            adminCost:          adminCost,

            platformTier:       platformTier,
            platformPrice:      platformPrice,
            supportCost:        supportCost,

            byodbProviderLabel: H.byodbLabel(providerKey),
            byodbStorage:       byodbStorage,
            dataIngestion:      dataIngestion,
            byodbEffective:     (byodbCost / vol / 365).toFixed(3),

            adminDesc:          adminDesc,

            total:              total,
            workload:           w
        };
    };

    H.byodbStorageCost = function(vol, providerKey) {
        var provider = P.byodbProviders[providerKey || P.byodbDefault];
        return Math.round(H.tieredCost(vol, provider.tiers, 'ratePerGBDay', 365));
    };

    H.dataIngestionCost = function(vol) {
        return Math.round(H.tieredCost(vol, P.dataIngestion, 'ratePerGBDay', 365));
    };

    H.byodbCost = function(vol, providerKey) {
        return H.byodbStorageCost(vol, providerKey) + H.dataIngestionCost(vol);
    };

    H.byodbLabel = function(providerKey) {
        var p = P.byodbProviders[providerKey || P.byodbDefault];
        return p ? p.label : providerKey;
    };

    H.supportCost = function(vol) {
        return H.lookupTier(vol, P.support, 'maxGB').annual;
    };

    // ── AI SOC helpers ──

    H.aiSocPlatformCost = function(dailyAlerts) {
        var t = H.lookupTier(dailyAlerts, P.aiSocPlatform, 'maxAlerts');
        return { annual: t.annual, tier: t.tier };
    };

    H.aiComputeCost = function(investigations) {
        return Math.round(H.tieredCost(investigations, P.aiCompute, 'rate'));
    };

    H.detEngCount = function(dailyAlerts) {
        return H.lookupTier(dailyAlerts, P.detEngTiers, 'maxAlerts').count;
    };

    H.irLeadCount = function(dailyAlerts) {
        return H.lookupTier(dailyAlerts, P.irLeadTiers, 'maxAlerts').count;
    };

    // ── Hard Truth TCO Comparison ──

    H.getHardTruthComparison = function(vol, rules, providerKey) {
        var r = rules || Math.round(vol / 10);
        var leg = H.legacyScenario(vol, null, r);
        var vig = H.vigilenseSiemCost(vol, r, providerKey);

        return [
            {
                label: 'Data Infrastructure',
                legacy: leg.infra,
                vigilense: vig.byodbCost,
                explanation: 'Legacy: provisioned indexers, forwarders, storage. Vigilense: cloud storage + ingestion pipeline (pass-through).'
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
                explanation: 'Legacy: per-GB ingestion license + SVC compute. Vigilense: usage-based platform fee + support. Add AI SOC Analyst for investigation & response.'
            }
        ];
    };

    // ── Formatting ──

    H.fmtCurrency = function(n) {
        return '$' + n.toLocaleString('en-US');
    };

    P.helpers = H;
    window.VIGILENSE_PRICING = P;

})();
