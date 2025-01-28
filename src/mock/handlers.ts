import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('/api/example', () => {
    return HttpResponse.json({
      message: 'モックレスポンス'
    });    
  }),

  http.post('/api/example', async ({ request }) => {
    const body = await request.json();
    if(Object.keys(body as object).length != 0) {
      return HttpResponse.json({
        message: 'モックレスポンス',
      }, { status: 200 });
    } else {
      return HttpResponse.json({
        message: 'リクエストボディが空です',
      }, { status: 400 });
    }
  }),
];
