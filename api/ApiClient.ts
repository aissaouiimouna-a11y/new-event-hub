import { APIRequestContext, expect } from '@playwright/test';

const BASE_URL = 'https://rahulshettyacademy.com/api/ecom';

export class ApiClient {
  private token = '';

  constructor(private request: APIRequestContext) {}

  async login(email: string, password: string): Promise<string> {
    const response = await this.request.post(`${BASE_URL}/auth/login`, {
      data: { userEmail: email, userPassword: password },
    });
    expect(response.ok(), `Login failed (status ${response.status()})`).toBeTruthy();

    const body = await response.json();
    expect(body.token, 'No token received after login').toBeTruthy();

    this.token = body.token;
    return this.token;
  }

  async getAllProducts() {
    const response = await this.request.post(`${BASE_URL}/product/get-all-products`, {
      headers: { Authorization: this.token },
    });
    expect(response.ok(), `Get products failed (status ${response.status()})`).toBeTruthy();
    return response.json();
  }

  async createOrder(orderPayload: unknown) {
    const response = await this.request.post(`${BASE_URL}/order/create-order`, {
      data: orderPayload,
      headers: { Authorization: this.token },
    });
    expect(response.ok(), `Create order failed (status ${response.status()})`).toBeTruthy();
    return response.json();
  }

  getToken(): string {
    return this.token;
  }
}