import HomePage from "../page-objects/pages/HomePage";

describe("Add car form", () => {
  let globalSid;

  beforeEach(() => {
    HomePage.openPage();
    cy.request("POST", "/api/auth/signin", {
      email: Cypress.env("MAIN_USER_EMAIL"),
      password: Cypress.env("MAIN_USER_PASSWORD"),
    }).then((response) => {
      const cookie = response.headers["set-cookie"][0];
      const sid = cookie.split(";")[0].split("=")[1];
      globalSid = sid;
    });
  });

  it("Change user name and verify in UI", () => {    
    const requestBody = {
      photo: "default-user.png",
      name: "Polar",
      lastName: "Bear",
      dateBirth: "2021-03-17T15:21:05.000Z",
      country: "Ukraine",
    };

    cy.request({
      method: "PUT",
      url: "api/users/profile",
      headers: {
        cookie: `sid=${globalSid}`,
      },
      body: requestBody,
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body.data.name).to.eq("Polar");
      expect(response.body.data.lastName).to.eq("Bear");
    });
    
    cy.intercept("GET", "api/users/profile", {
      statusCode: 200,
      body: {
        status: "ok",
        data: {
          userId: 171558,
          photoFilename: "default-user.png",
          name: "Polar",
          lastName: "Bear",
        },
      },
    }).as("getProfile");

    cy.visit("/panel/profile", {
      headers: {
        cookie: `sid=${globalSid}`,
      },
    });

    cy.wait("@getProfile");

    cy.get('p[class="profile_name display-4"]', { timeout: 10000 })
      .invoke("text")
      .should("equal", "Polar Bear");
  });

  after(() => {
    const resetRequestBody = {
      photo: "default-user.png",
      name: "Michael",
      lastName: "Kvak",
      dateBirth: "2021-03-17T15:21:05.000Z",
      country: "Ukraine",
    };

    cy.request({
      method: "PUT",
      url: "api/users/profile",
      headers: {
        cookie: `sid=${globalSid}`,
      },
      body: resetRequestBody,
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });
});
