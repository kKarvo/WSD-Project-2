const { test, expect } = require("@playwright/test");

test("Server responds with correct heading", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle("Drill and Practice");
    await expect(page.locator('h1')).toHaveText("Drill-and-practice application");
});

test("Can open register page", async ({ page }) => {
    await page.goto("/");
    await page.locator(`a >> text='Register'`).click();
    await expect(page.locator("h1")).toHaveText("Register");
});

test("Can open login page", async ({ page }) => {
    await page.goto("/");
    await page.locator(`a >> text='Login'`).click();
    await expect(page.locator("h1")).toHaveText("Login");
});

test("Can register an account and login to it", async ({ page }) => {
    await page.goto("/auth/register");
    await page.locator("input[type=email]").type("test@test.com");
    await page.locator("input[type=password]").type("test");
    await page.locator('input[type=submit]').click();
    await expect(page.locator("h1")).toHaveText("Login");
});

test("Can login into an account", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("test@test.com");
    await page.locator("input[type=password]").type("test");
    await page.locator('input[type=submit]').click();
    await expect(page.locator("h1")).toHaveText("Topics");
});

test("Login to admin account and add topic", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator('input[type=submit]').click();
    await expect(page.locator("h1")).toHaveText("Topics");
    await page.locator("input[type=text]").type("test topic");
    await page.getByRole('button', { name: 'Add' }).click();
    await expect(page.locator("li")).toContainText(["Finnish language", "test topic"]);
});

test("Can delete topic", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator('input[type=submit]').click();
    await page.locator("text=Delete").first().click();
    await expect(page.locator("li")).toContainText(["test topic"]);
});

test("Add test topic", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator('input[type=submit]').click();
    await page.getByRole('link', { name: 'test topic' }).click();
    await page.locator("textarea").type("Question #1");
    await page.locator("input[type=submit]").click();
    await expect(page.locator("li")).toContainText(["Question #1"]);
});

test("Access Quiz", async ({ page }) => {
    await page.goto("/auth/login");
    await page.locator("input[type=email]").type("admin@admin.com");
    await page.locator("input[type=password]").type("123456");
    await page.locator('input[type=submit]').click();
    await page.goto("/quiz");
    await expect(page.locator("h1")).toHaveText("Quiz topics");
});

test("API GET request", async ({ request }) => {
    const response = await request.get('http://localhost:7777/api/questions/random');
    await expect(response.ok()).toBeTruthy();
    await expect(response.status()).toBe(200);
    console.log(await response.json());
});