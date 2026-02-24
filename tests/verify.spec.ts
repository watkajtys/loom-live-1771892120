import { test, expect } from '@playwright/test';

test('Verify Portfolio Constructor Drag and Drop', async ({ page }) => {
    await page.goto('http://localhost:5173/portfolio-constructor');

    // Target the blocks in the allocation bar using the unique class .cursor-grab
    const usEquitiesBlock = page.locator('.cursor-grab').filter({ hasText: 'US Equities' });
    const emergingMktsBlock = page.locator('.cursor-grab').filter({ hasText: 'Emerging Mkts' });

    await expect(usEquitiesBlock).toBeVisible();
    await expect(emergingMktsBlock).toBeVisible();

    // Get initial percentages
    // The percentage text is inside the block with class text-4xl or text-5xl
    const usEquitiesValLocator = usEquitiesBlock.locator('.text-4xl, .text-5xl, .text-6xl').first();
    const emergingMktsValLocator = emergingMktsBlock.locator('.text-4xl, .text-5xl, .text-6xl').first();

    const parsePercentage = (text: string | null) => {
        if (!text) return 0;
        return parseFloat(text.replace(/[^0-9.]/g, ''));
    };

    const initialUsText = await usEquitiesValLocator.textContent();
    const initialEmergingText = await emergingMktsValLocator.textContent();
    const initialUsVal = parsePercentage(initialUsText);
    const initialEmergingVal = parsePercentage(initialEmergingText);

    console.log(`Initial: US=${initialUsVal}%, EM=${initialEmergingVal}%`);

    // Divider
    const divider = page.locator('.cursor-col-resize').first();
    const box = await divider.boundingBox();
    if (!box) throw new Error('Divider bounding box not found');

    const startX = box.x + box.width / 2;
    const startY = box.y + box.height / 2;

    // Drag
    await page.mouse.move(startX, startY);
    await page.mouse.down();
    
    // Drag by 100 pixels to the right
    await page.mouse.move(startX + 100, startY, { steps: 20 });
    
    // Check volatility
    // The volatility bubble has "Volatility" text.
    const volatilityBubble = page.locator('div').filter({ hasText: 'Volatility' }).last();
    // The value is inside a text-2xl div sibling or child
    // In MetricsDisplay: 
    // <div ...>Volatility</div>
    // <div class="text-2xl ...">14.2%</div>
    // So we can look for the text-2xl inside the parent of "Volatility"
    const volatilityValue = page.locator('div:has(> div:text-is("Volatility")) .text-2xl');

    await expect(volatilityValue).toBeVisible();

    await page.mouse.up();

    // Verify
    const finalUsText = await usEquitiesValLocator.textContent();
    const finalEmergingText = await emergingMktsValLocator.textContent();
    const finalUsVal = parsePercentage(finalUsText);
    const finalEmergingVal = parsePercentage(finalEmergingText);

    console.log(`Final: US=${finalUsVal}%, EM=${finalEmergingVal}%`);

    expect(finalUsVal).toBeGreaterThan(initialUsVal);
    expect(finalEmergingVal).toBeLessThan(initialEmergingVal);

    await page.screenshot({ path: 'evidence.png' });
});
