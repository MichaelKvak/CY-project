import HomePage from "../page-objects/pages/HomePage";
import carBrands from '../fixtures/brands.json'
import carModels from '../fixtures/models.json'


describe("Get Add Update Delete cars by API calls", () => {
  let globalSid;

  beforeEach(() => {
    HomePage.openPage();
    cy.request('POST', '/api/auth/signin', {
        email: Cypress.env("MAIN_USER_EMAIL"),
        password: Cypress.env("MAIN_USER_PASSWORD"),
    }).then((response) => {
        const cookie = response.headers['set-cookie'][0];
        const sid = cookie.split(';')[0].split('=')[1];
        globalSid = sid;

    });        
  });

  it("Add car data (Success - 201)", () => {    
    cy.request({
        method: 'POST',
        url: '/api/cars',
        headers: {
            Cookie: `sid=${globalSid}`,
        },
        body: {
            "carBrandId": carBrands.data[0].id,
            "carModelId": carModels.data[0].id,
            "mileage": 12345
        }
    }).then((response) => {
        const responseStatus = response.status
        expect(response.body.data.brand).eq(carBrands.data[0].title);
        expect(response.body.data.model).eq(carModels.data[0].title);
        expect(response.body.status).to.eq("ok");     
        expect(responseStatus).to.eq(201);
    });
});

  it("Get car data (Success - 200)", () => {    
    cy.request('GET', '/api/cars/brands')
    .then((response) => {
        cy.log(JSON.stringify(response.body.data));
        const responseStatus = response.status
        const firstCarBrand = response.body.data[0];
        expect(response.body.data.length).to.eq(5);
        expect(firstCarBrand.title).to.eq(carBrands.data[0].title);
        expect(response.body.status).to.eq("ok");
        expect(responseStatus).to.eq(200);
  })
});

it("Get car model data by id (Success - 200)", () => {    
    cy.request({
        method: 'Get',
        url: '/api/cars/models'        
    }).then((response) => {
        cy.log(JSON.stringify(response.body.data));
                const modelId = response.body.data[0].id;
                cy.request('GET', `/api/cars/models/${modelId}`)
                    .then((response) => {
                        const responseStatus = response.status
                        const brandTitle = response.body.data.title;
                        expect(brandTitle).to.eq(carModels.data[0].title);
                        expect(response.body.status).to.eq("ok");
                        expect(responseStatus).to.eq(200);
                    })
    });
})

it("Update car data by id (Success - 200)", () => {    
    cy.request({
        method: 'Get',
        url: '/api/cars'        
    }).then((response) => {
        cy.log(JSON.stringify(response.body.data));
                const brandId = response.body.data[0].id;
    cy.request({
        method: 'PUT',
        url: `/api/cars/${brandId}`,
        
        body: {
            "carBrandId": carBrands.data[2].id,
            "carModelId": carModels.data[11].id,
            "mileage": 54321
        }
    }).then((response) => {        
        const responseStatus = response.status
        expect(response.body.data.brand).to.eq(carBrands.data[2].title);
        expect(response.body.data.model).to.eq(carModels.data[11].title);        
        expect(response.body.status).to.eq("ok");
        expect(responseStatus).to.eq(200);
    });
});
})

it("Delete car by ID (Success - 200)", () => {
    cy.request({
        method: 'Get',
        url: '/api/cars'   
    }).then((response) => {
        cy.log(JSON.stringify(response.body.data));
                const carId = response.body.data[0].id;

    cy.request({
        method: 'DELETE',
        url: `/api/cars/${carId}`,
    }).then((response) => {        
        expect(response.status).to.eq(200);        
        expect(response.body.status).to.eq('ok');        
        expect(response.body.data.carId).to.eq(carId);        
    });
});
})

after(() => {
    cy.request({
        method: 'GET',
        url: '/api/cars',
        headers: {
            Cookie: `sid=${globalSid}`,
        },
    }).then((response) => {
        const allCars = response.body.data;
        allCars.forEach((car) => {
            cy.request({
                method: 'DELETE',
                url: `/api/cars/${car.id}`,
                headers: {
                    Cookie: `sid=${globalSid}`,
                },
            }).then((response) => {
                expect(response.status).eq(200);
            })
        })
    });
})



})