const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

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
      await loginWith(page, 'user123', 'pass123')

      await expect(page.getByText('user123 has logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'user3', 'pass')

      await expect(page.getByText('wrong username or password')).toBeVisible()
      await expect(page.getByText('user123 has logged in')).not.toBeVisible()
    })

    describe('When logged in', () => {
      beforeEach(async ({ page }) => {
        await loginWith(page, 'user123', 'pass123')
      
      })
      test('a new blog can be created', async ({ page }) => {
        await createBlog(page, 'New Blog', 'Some author', 'site.com')
        await expect(page.getByText('New Blog Some author')).toBeVisible()
      })

      test('a blog in the database can be liked', async ({ page }) => {
        await createBlog(page, 'New Blog', 'Some author', 'site.com')
        await page.getByRole('button', {name:'view'}).click()
        await expect(page.getByTestId('likes')).toHaveText('0like') 
        await page.getByRole('button', {name:'like'}).click()
        await expect(page.getByTestId('likes')).toHaveText('1like')
      })
    })
  })
})