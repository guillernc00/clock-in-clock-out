const puppeteer = require("puppeteer");
const { secret } = require("./secret");
require("dotenv").config();

async function script() {
  const browser = await puppeteer.launch({
    headless: "new",
    args: ["--incognito"],
  });

  const page = await browser.newPage();

  async function logIn() {
    await page.goto(secret.link);

    await page.type("#CompanyId", secret.companyId);
    await page.type("#Username", secret.username);
    await page.type("#Password", secret.password);

    await page.click('button[type="submit"]');
    await page.waitForNavigation();

    try {
      await page.type("#ChallengeAnswer", secret.challengeAnswer);
      await page.click('button[type="submit"]');
      await page.waitForNavigation();
      await page.waitForNavigation();
      await page.waitForNavigation();
    } catch (error) {
      console.error();
    }

    await page.screenshot({ path: "test.png", fullPage: true });
    console.log(companyId);
  }

  async function clockIn() {
    logIn();
    await page.click('button[name="ClockIn"]');
  }

  async function clockOut() {
    logIn();
    await page.click('button[name="ClockOut"]');
  }

  await logIn();

  await browser.close();
}

script();
