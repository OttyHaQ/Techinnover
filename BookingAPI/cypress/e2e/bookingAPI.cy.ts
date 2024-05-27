const Ajv = require('ajv')
const ajv = new Ajv()



describe("Booking APIs", () => {
  
  const baseUrl = Cypress.env("baseUrl")
  const token = Cypress.env("token")

  it("Create, Get and Update Booking", () => {

    // Create Booking and Validate response

    cy.request({
        method: "POST",
        url: `${baseUrl}/booking`,
        body: {
                firstname: "Jim",
                lastname: "Brown",
                totalprice: 111,
                depositpaid: true,
                bookingdates: {
                checkin: "2018-01-01",
                checkout: "2019-01-01",
                },
                additionalneeds: "Breakfast",
              },
        headers: {
            'Content-Type': 'application/json',
            },
    })
    .then((response) => {

      // Validate schema against response

      const schema = {
        "$schema": "http://json-schema.org/draft-07/schema#",
        "title": "Generated schema for Root",
        "type": "object",
        "properties": {
          "bookingid": {
            "type": "number"
          },
          "booking": {
            "type": "object",
            "properties": {
              "firstname": {
                "type": "string"
              },
              "lastname": {
                "type": "string"
              },
              "totalprice": {
                "type": "number"
              },
              "depositpaid": {
                "type": "boolean"
              },
              "bookingdates": {
                "type": "object",
                "properties": {
                  "checkin": {
                    "type": "string"
                  },
                  "checkout": {
                    "type": "string"
                  }
                },
                "required": [
                  "checkin",
                  "checkout"
                ]
              },
              "additionalneeds": {
                "type": "string"
              }
            },
            "required": [
              "firstname",
              "lastname",
              "totalprice",
              "depositpaid",
              "bookingdates",
              "additionalneeds"
            ]
          }
        },
        "required": [
          "bookingid",
          "booking"
        ]
      };
       
      const validate = ajv.compile(schema)
      const isValid = validate(response.body)

      // Assert that the response is valid according to the schema
      expect(isValid).to.be.true
 
      // Other assertions for the respnse body

      cy.log(response.body.bookingid)
      expect(response.status).to.eq(200);
      expect(response.body.bookingid).to.be.a('number');
      expect(response.body.booking.firstname).to.be.a('string');
      expect(response.body.booking.totalprice).to.be.a("number");
      expect(response.body.booking.additionalneeds).to.eq("Breakfast");

      // Get booking id and validate response
      
      const bookingid = response.body.bookingid;
        
      cy.request({
          method: "GET",
          url: `${baseUrl}/booking/${bookingid}`,
          headers: {
            'Content-Type': 'application/json',
          },
        })
          .then((response) => {
            expect(response.status).to.eq(200);
            expect(response.body.firstname).to.eq("Jim");
            expect(response.body.lastname).to.eq("Brown");
            expect(response.body.depositpaid).to.eq(true);
  
          // Update Booking and validate response

            cy.request({
              method: "PUT",
              url: `${baseUrl}/booking/${bookingid}`,
              body: {
                      firstname: "Jim",
                      lastname: "Brown",
                      totalprice: 111,
                      depositpaid: true,
                      bookingdates: {
                          checkin: "2018-01-01",
                          checkout: "2024-05-27",
                        },
                      additionalneeds: "This Job",
                    },
              headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': token,
              },  
            })
            .then((response) => {
              expect(response.status).to.eq(200);
              expect(response.body.firstname).to.eq("Jim");
              expect(response.body.lastname).to.eq("Brown");
              expect(response.body.bookingdates.checkout).to.eq("2024-05-27");
              expect(response.body.additionalneeds).to.eq("This Job");
         });
      });
    });
  });
});
