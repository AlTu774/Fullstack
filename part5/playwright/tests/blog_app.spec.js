const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'First1',
        username: 'user123',
        password: 'pass123'

      }})
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = await page.getByText('Log in to the application')
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await page.getByTestId('username').fill('user123')
      await page.getByTestId('password').fill('pass123')
      await page.getByRole('button', {name:'login'}).click()

      await expect(page.getByText('user123 has logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await page.getByTestId('username').fill('user3')
      await page.getByTestId('password').fill('pass')
      await page.getByRole('button', {name:'login'}).click()

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('user123 has logged in')).not.toBeVisible()
    })
  })
})