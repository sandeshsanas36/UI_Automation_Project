import {expect} from "@playwright/test";
require("dotenv").config();

class LoginPage {

    constructor(page)   {

        this.page = page;
        this.homePageTittle = page.locator("//img[@alt='Tricentis Demo Web Shop']");
        this.loginPage = page.locator("//a[text()='Log in']");
        this.username_txt = page.locator("//input[@id='Email']");
        this.password_txt = page.locator("//input[@id='Password']");
        this.login_btn = page.locator("//input[@value='Log in'][@type='submit']")
        this.logout_btn = page.locator("//a[text()='Log out']")
    }

    async loginToDemoWebShop() {
        const susername = process.env.USER;
        const spassword = process.env.PASSWORD;
        await this.username_txt.fill(susername);
        await this.password_txt.fill(spassword);
        await this.login_btn.click();
        await expect(this.logout_btn).toBeVisible();
        console.log("✔️  Login successful with user -- Master");
    }
}
module.exports = LoginPage;