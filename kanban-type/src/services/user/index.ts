export const ApiLogin = async (email: string, password: string) => {
  const response = await fetch('https://arnia-kanban.vercel.app/api/user/login', {
    method: 'POST',
    headers: {
      'x-api-key': '52a8b954-e25d-4cc5-86e5-c32e92f994bb',
      'Content-Type': 'application/json',
      'Authorization': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGE0YjdiMjBkYzExZDNiODFmZTIxNiIsIm5hbWUiOiJUZXN0ZSBUZXN0ZSIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwiaWF0IjoxNjg2Nzg0OTgxLCJleHAiOjE2ODY4NzEzODF9._E0VMxDo3RmvQSN1A6QKyDdzeLmUKwbXqpPDEZMC_bM'
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });

  if (response.status === 200) {
    const data = await response.json();

    localStorage.setItem('userData', JSON.stringify(data))
    localStorage.setItem('userName', data.name)

    return data;
  } else {
    throw new Error('Erro na requisição');
  }
}
export const ApiCadastro = async (email: string, password: string, name: string) => {
    
    const response = await fetch('https://arnia-kanban.vercel.app/api/user', {
    
    method: 'POST',
    headers: {
      'x-api-key': '52a8b954-e25d-4cc5-86e5-c32e92f994bb',
      'Content-Type': 'application/json',
      
    },
    body: JSON.stringify({
      email,
      password,
      name,
    }),
  })

  if (response.status === 201) {
    return response.json()
  } else {
    throw new Error('Erro na requisição')
  }
}






