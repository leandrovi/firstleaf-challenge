# React Coding Challenge

## Description

This project contains the basis for our coding challenge.

It doesn't define any UI limitations in any way and only gives you the basic components for SEO/Links/Infinite Scrolling while creating a comfortable development environment to get started.

This repo supports both [TypeScript](https://www.typescriptlang.org/) and JavaScript, comes with [Jest](https://jestjs.io/) configurations and allows you to write Unit/Integration tests out of the box.

There will be Readme's across the repo to describe the architecture as well as the challenges you will see.

## Challenges

- [Promo](src/components/Countdown/README.md)
- [TheBucket](src/components/TheBucket/README.md)
- [Countries](src/pages/countries/README.md)

Complete at least 2 of the 3 challenges presented in the repo, make sure to assess them and prioritize as you see fit.

## 🚀 Quick start

1.  **Start developing.**

    Navigate into your new site’s directory and start it up.

    ```shell
    cd my-gatsby-site/
    npm run develop
    ```

2.  **Open the code and start customizing!**

    Your site is now running at http://localhost:8000!

    Edit `src/pages/index.tsx` to see your site update in real-time!

3.  **Useful Documentation**

    - [Documentation](https://www.gatsbyjs.com/docs/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Tutorials](https://www.gatsbyjs.com/docs/tutorial/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Guides](https://www.gatsbyjs.com/docs/how-to/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [API Reference](https://www.gatsbyjs.com/docs/api-reference/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Plugin Library](https://www.gatsbyjs.com/plugins?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)
    - [Cheat Sheet](https://www.gatsbyjs.com/docs/cheat-sheet/?utm_source=starter&utm_medium=readme&utm_campaign=minimal-starter-ts)

My Notes

The app can be visited at: https://firstleaf-leandro.netlify.app/

- Countdown
  - Added tailwind
  - Added shadcn for layout, which has radix behind the hood
  - Extended the custom useProducts hook to have a centralized reducer for products and filters
  - Refactored the product fetching to work with a local cache with a small revalidation logic
  - Used lottie to display a user friendly loading state
- TheBucket
  - Worked on small fixes and improved the performance with memoization
  - The requirements asked to not change the returns at all - so I literally followed that, that's why the UI isn't that good
- Countries
  - Added infinite scrolling with react-window
  - Data fetched during SSG and stored in the data layer
- Analytics
  - Set up segment for analytics
  - It may be used further to track events and send them to a lot of destinations, including google analytics, mixpanel, etc.
  - Added a custom hook useAnalytics to centralize the analytics calls
- General
  - Sentry for error tracking
  - Storybook for component development
