# Promo Challenge

- Refactor Countdown component into a functional component.
- Create a new Header component using the Countdown and matching this image:
- Update the ProductGrid to show more information about the products, the DB references is located here: `test/db.json`, each product card should show at least the `name` and the `tag_line`, feel free to add more info
- Include the Header with the Countdown and ProductGrid Component in the `pages/promo.tsx`, stacked layout
- Create a filter on the promo page by `color`
- There is a test suit added for the `pages/promo.tsx` page, make sure that all test cases passes, add more test if necessary
- Fix any bugs along the way.
- Make sure that the site builds correctly

![img.png](../../images/img.png)

# Design specifications

- Header should stretch full window width, but content should be contained in 1320px centered.
- When the screen size is so narrow that the countdown and logo don't fit, the label portion of the countdown should disappear.
- ProductGrid should be contained in 1320px max width container, and the cards distributions should be as follows:
  - max and max + (> 1320px width) 3 cards, bottle image on the left side of the card
  - lg (1024px width) 3 cards, bottle image on top side of the card, stacked with the product info
  - md (768px width) 2 cards with the bottle image on the left side of the card
  - sm (375 width) 1 card with the image on top
- Logo file is located in /images.

## Notes

- Make all the necessary changes to ensure the correct functionality of the pages, please feel free to use any apis or resources provided by [Gatsby v5](https://www.gatsbyjs.com/docs/how-to/)
