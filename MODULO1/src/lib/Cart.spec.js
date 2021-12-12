import Cart from './Cart'

describe('Cart', () => {
  let cart

  let product = {
    title: 'Adidas running shoes - men',
    price: 35388,
  }

  let product2 = {
    title: 'Adidas running shoes - women',
    price: 41872,
  }

  beforeEach(() => {
    cart = new Cart()
  })

  describe('getTotals()', () => {
    it('Should return 0 when getTotal() is executed in a newly created', () => {
      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('should multiply quantity and price and receive the total amount', () => {
      cart.add({
        product,
        quantity: 2,
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should ensure no more than on product exists at a time', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product,
        quantity: 1,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })

    it('should update total when a product gets included and then removed', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.add({
        product: product2,
        quantity: 1,
      })

      cart.remove(product)

      expect(cart.getTotal().getAmount()).toEqual(41872)
    })
  })

  describe('checkout', () => {
    it('should return an object with total an the list of items', () => {
      cart.add({
        product,
        quantity: 1,
      })

      cart.add({
        product: product2,
        quantity: 1,
      })

      // rodar com u para fazer p update do snapshot
      expect(cart.checkout()).toMatchInlineSnapshot(`
        Object {
          "items": undefined,
          "total": Object {
            "amount": 77260,
            "currency": "BRL",
            "precision": 2,
          },
        }
      `)
    })
    it('should reset the cart when checkout is called', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.checkout()

      expect(cart.getTotal().getAmount()).toEqual(0)
    })

    it('should return an object with total an list of items', () => {
      cart.add({
        product,
        quantity: 2,
      })

      cart.summary()
      expect(cart.summary()).toMatchInlineSnapshot(`
        Object {
          "formatted": "R$707.76",
          "items": Array [
            Object {
              "product": Object {
                "price": 35388,
                "title": "Adidas running shoes - men",
              },
              "quantity": 2,
            },
          ],
          "total": Object {
            "amount": 70776,
            "currency": "BRL",
            "precision": 2,
          },
        }
      `)
      expect(cart.getTotal().getAmount()).toBeGreaterThan(0)
    })
  })

  describe('especial condition', () => {
    it('should apply percent discount when certain quantity', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }

      cart.add({
        condition,
        product: product,
        quantity: 3,
      })

      expect(cart.getTotal().getAmount()).toEqual(74315)
    })

    it('should NOT apply percent discount when certain quantity below or minimum', () => {
      const condition = {
        percentage: 30,
        minimum: 2,
      }

      cart.add({
        condition,
        product: product,
        quantity: 2,
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should apply quantity discount for even quantities', () => {
      const condition = {
        quantity: 2,
      }

      cart.add({
        condition,
        product,
        quantity: 4,
      })

      expect(cart.getTotal().getAmount()).toEqual(70776)
    })

    it('should receive two or more conditions and determine/apply the best discount. First case.', () => {
      const condition1 = {
        percentage: 30,
        minimum: 2,
      }

      const condition2 = {
        quantity: 2,
      }

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      })

      expect(cart.getTotal().getAmount()).toEqual(106164)
    })

    it('should receive two or more conditions and determine/apply the second discount. Second case.', () => {
      const condition1 = {
        percentage: 80,
        minimum: 2,
      }

      const condition2 = {
        quantity: 2,
      }

      cart.add({
        product,
        condition: [condition1, condition2],
        quantity: 5,
      })

      expect(cart.getTotal().getAmount()).toEqual(35388)
    })
  })
})
