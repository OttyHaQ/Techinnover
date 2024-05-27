Feature: Test Automation Assessment

    Scenario: Fetch and Sort Items by Price
        Given I am In the Features Items section
        Then I should be able to fetch and sort items by price from low to high


    Scenario: Add items to cart
        Given I am on the home page
        When I navigate to women >> Dress >> Women - Tops Products
        And I select the Fancy Green Top
        And I add the green dress to cart
        And I click Continue Shopping
        And I select the Summer White Top
        And I add the white dress to cart
        And I click view cart
        And I click Proceed to checkout
        And I add comment
        And I click on Place Order
        And enter card details
        And I click Pay and Confirm Order
        Then I should get confirmation that order is placed


