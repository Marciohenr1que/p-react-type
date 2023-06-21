
export const ApiCard = async (title: string, content: string) => {
  const userData = JSON.parse(localStorage.getItem('userData') || '{}')
  const token = userData.token

  const response = await fetch('https://arnia-kanban.vercel.app/api/card', {
    method: 'POST',
    headers: {
      'x-api-key': '52a8b954-e25d-4cc5-86e5-c32e92f994bb',
      'Content-Type': 'application/json',
      'Authorization':token
    },
    body: JSON.stringify({
      title,
      content,
    }),
  });

  if (response.status === 200) {
    return {title, content}
    
  } else {
    throw new Error('Erro na requisição')
  }
}
export const deleteCard = async (cardId: number) => {
  try {
    const response = await fetch(`https://arnia-kanban.vercel.app/api/card/${cardId}`, {
      method: 'DELETE',
    });

    if (response.ok) {
      console.log('excluído');
    } else {
      console.error('erro');
    }
  } catch (error) {
    console.error('Erro', error)
  }
}






