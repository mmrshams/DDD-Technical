import axios, { AxiosInstance } from 'axios';
const baseUrl = 'http://localhost:3000';

describe('HttpController (e2e)', () => {
  let instance: AxiosInstance;
  beforeAll(() => {
    instance = axios.create({
      baseURL: 'http://localhost:3000/labyrinth',
    });
    // Set up basic authentication (username and password)
    instance.defaults.auth = {
      username: 'your_username',
      password: 'your_password',
    };
  });

  it('(GET) /labyrinth', async () => {
    const response = await instance.get('/');
    expect(response.status).toBe(200);
  });

  it('(POST) /labyrinth', async () => {
    const response = await instance.post('/', {});
    /**[NOTE]: Other assertions can be added later */
    expect(response.status).toBe(200);
  });

  // it('(GET) /labyrinth/:id', async () => {
  // implement it later...
  // });

  // it('(PUT) /labyrinth/:id/start/:x/:y', async () => {
  // implement it later...
  // });
});
