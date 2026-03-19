import {expect} from "@playwright/test";
require("dotenv").config();

class basePage {

    constructor(page)   {

        this.page = page;
        this.homePageTittle = page.locator("//img[@alt='Tricentis Demo Web Shop']")
        this.loginPage = page.locator("//a[text()='Log in']");
    }

    async navigateToDemoWebShop() {
        const targetUrl = process.env.BASE_URL_DEMOWEBSHOP ;
        await this.page.goto(targetUrl);
        console.log(targetUrl)
        await expect(this.homePageTittle).toBeVisible();
        console.log("✔️  Demo Web Shop Home page Open Successfully")
    }
        async navigateToDemoWebShopLoginPage(){
        await this.loginPage.click();
        console.log("✔️  Demo Web Shop Login page Open Successfully")
    }
}
module.exports = basePage;