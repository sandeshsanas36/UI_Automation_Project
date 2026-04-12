import { test, expect } from '@playwright/test';
const LoginPage = require('../Pages/LoginPage');
const BasePage = require('../Pages/BasePage');
// const { loadEnv } = require('../config/envLoader');
// loadEnv();


test('Login To Demo Web Shop', async ({ page }) => {

    let basepage = new BasePage(page);
    let loginpage = new LoginPage(page);

    await basepage.navigateToDemoWebShop();
    await basepage.navigateToDemoWebShopLoginPage();
    await loginpage.loginToDemoWebShop();
    console.log("🎊 Test Completed for user loging Successfully")
});
