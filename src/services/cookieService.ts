import Cookies from 'js-cookie';

export const cookieService = {
  setCookie: (name: string, value: string,expires:number, options?: Cookies.CookieAttributes) => {
    Cookies.set(name, value, {
      expires,
      secure: true,
      sameSite: 'strict',
      ...options,
    });
  },

  getCookie: (name: string): string | undefined => {
    return Cookies.get(name);
  },

  removeCookie: (name: string) => {
    Cookies.remove(name);
  },

  hasCookie: (name: string): boolean => {
    return !!Cookies.get(name);
  },
}; 