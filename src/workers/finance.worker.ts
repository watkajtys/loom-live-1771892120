
const ASSET_ORDER = ['us-equities', 'emerging-mkts', 'treasuries', 'real-estate'];

// Annualized Expected Returns
const EXPECTED_RETURNS = [0.085, 0.105, 0.032, 0.065]; // Slightly adjusted for variety

// Standard Deviations (Volatilities)
const VOLATILITIES = [0.16, 0.22, 0.05, 0.12];

// Correlation Matrix
// Order: US, EM, Treas, RE
const CORRELATIONS = [
    [1.00,  0.72, -0.32,  0.45], // US Equities
    [0.72,  1.00, -0.15,  0.38], // Emerging Mkts
    [-0.32, -0.15,  1.00,  0.12], // Treasuries
    [0.45,  0.38,  0.12,  1.00]  // Real Estate
];

// Precompute Covariance Matrix
const COVARIANCE_MATRIX = CORRELATIONS.map((row, i) => 
    row.map((corr, j) => corr * VOLATILITIES[i] * VOLATILITIES[j])
);

const RISK_FREE_RATE = 0.025; // 2.5%

self.onmessage = (e: MessageEvent) => {
    const { allocations } = e.data as { allocations: Record<string, number> };

    if (!allocations) return;

    // 1. Parse weights (normalized 0-1)
    const weights = ASSET_ORDER.map(id => (allocations[id] || 0) / 100);

    // 2. Calculate Portfolio Return (Yield)
    // R_p = w . R
    const portfolioYield = weights.reduce((acc, w, i) => acc + w * EXPECTED_RETURNS[i], 0);

    // 3. Calculate Portfolio Variance
    // Var_p = w^T . Cov . w
    let portfolioVariance = 0;
    for (let i = 0; i < weights.length; i++) {
        for (let j = 0; j < weights.length; j++) {
            portfolioVariance += weights[i] * weights[j] * COVARIANCE_MATRIX[i][j];
        }
    }

    const portfolioVolatility = Math.sqrt(portfolioVariance);

    // 4. Calculate Sharpe Ratio
    // Sharpe = (R_p - R_f) / Vol_p
    const sharpeRatio = portfolioVolatility > 0.001 
        ? (portfolioYield - RISK_FREE_RATE) / portfolioVolatility 
        : 0;

    // 5. Calculate Max Drawdown (Approximation)
    // For Gaussian returns, MaxDD is related to Volatility.
    // We'll use a heuristic: Expected Max DD ~ -2.5 * Volatility (99% VaR-ish)
    const maxDrawdown = -2.5 * portfolioVolatility;

    // Send back results
    self.postMessage({
        metrics: {
            yield: portfolioYield,
            volatility: portfolioVolatility,
            sharpeRatio: sharpeRatio,
            maxDrawdown: maxDrawdown
        }
    });
};

export {};
