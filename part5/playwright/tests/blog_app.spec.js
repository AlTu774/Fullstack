const { test, expect, beforeEach, describe } = require('@playwright/test')
import loginWith from './helper'

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
      //await page.getByTestId('username').fill('user123')
      //await page.getByTestId('password').fill('pass123')
      //await page.getByRole('button', {name:'login'}).click()
      await loginWith(page, 'user123', 'pass123')

      await expect(page.getByText('user123 has logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      /*await page.getByTestId('username').fill('user3')
      await page.getByTestId('password').fill('pass')
      await page.getByRole('button', {name:'login'}).click()
      */
      await loginWith(page, 'user3', 'pass')

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('user123 has logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'user123', 'pass123')
      
      })
      test('a new blog can be created', async ({ page }) => {
        await page.getByRole('button', {name: 'create'}).click()
        await page.getByPlaceholder('title').fill('New Blog')
        await page.getByPlaceholder('author').fill('Some author')
        await page.getByPlaceholder('url').fill('site.com')
        await page.getByRole('button', {name: 'create'}).click()

        await expect(page.getByText('New Blog Some author')).toBeVisible()
      })
    })
  })
})