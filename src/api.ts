import { getCookie, deleteCookie } from 'cookies-next';
import { HttpMethods } from './constants/api_methods';

export async function apiRequest(method: HttpMethods, url: string = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=86400'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: method !== HttpMethods.GET ? JSON.stringify(data) : null // body data type must match "Content-Type" header
  });

  if (!response.ok) {
    const errorObj = await response.json();
    throw errorObj;
  }

  return response.json(); // parses JSON response into native JavaScript objects
}

export async function authorizedApiRequest(method: HttpMethods, url: string = '', data = {}) {
  // Default options are marked with *
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`, {
    method: method, // *GET, POST, PUT, DELETE, etc.
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin', // include, *same-origin, omit
    headers: {
      Authorization: `Bearer ${getCookie('jwt_token')}`,
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=86400'
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: method !== HttpMethods.GET ? JSON.stringify(data) : null // body data type must match "Content-Type" header
  });

  if (response.status === 401) {
    deleteCookie('jwt_token');
    window.location.href = '/';
    throw new Error('Unauthorized');
  }

  if (!response.ok) {
    const errorObj = await response.json();
    throw errorObj;
  }

  return response.json(); // parses JSON response into native JavaScript objects
}
