import { chromium } from 'playwright';

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({
        colorScheme: 'dark',
        viewport: { width: 1200, height: 800 }
    });

    // Navigate and wait for network idle to ensure hydration
    await page.goto('http://localhost:3000/docs/thesis#flashcards', { waitUntil: 'networkidle' });

    // Force docusaurus dark mode by setting the html data-theme
    await page.evaluate(() => {
        document.documentElement.setAttribute('data-theme', 'dark');
    });

    // Wait for the flashcards to actually load from JSON
    try {
        await page.waitForSelector('.cardArea', { timeout: 10000 });
        console.log("Card area found!");
    } catch (e) {
        console.log("Card area didn't load in 10s... taking screenshot anyway to see what is there.");
    }

    // Wait a second for CSS transitions
    await page.waitForTimeout(1000);

    // Take a full page screenshot
    await page.screenshot({ path: 'dark_mode_test.png', fullPage: true });

    // Take an element screenshot of just the flashcard area
    const flashcardLoc = await page.locator('.cardArea').first();
    if (await flashcardLoc.isVisible()) {
        await flashcardLoc.screenshot({ path: 'dark_mode_card.png' });
    } else {
        console.log("Could not find .cardArea for specific element screenshot");
    }

    await browser.close();
    console.log("Screenshots captured");
})();
