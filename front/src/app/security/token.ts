import { Service } from '@angular/core';

@Service()
export class Token {
  private readonly key = 'token';

  set(token: string): void {
    localStorage.setItem(this.key, token);
  }

  get(): string | null {
    return localStorage.getItem(this.key);
  }

  clear(): void {
    localStorage.removeItem(this.key);
  }

  isAuthenticated(): boolean {
    return this.get() !== null;
  }
}
