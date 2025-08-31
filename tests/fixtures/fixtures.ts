import { test as base } from '@playwright/test';
import PaginaLogin from '../page-objects/PaginaLogin';
import AcoesUsuario from '../page-objects/AcoesUsuario';

export const test = base.extend<{
  paginaLogin: PaginaLogin;
  acoesUsuario: AcoesUsuario;
}>({
  paginaLogin: async ({ page }, use) => {
    await use(new PaginaLogin(page));
  },
  acoesUsuario: async ({ page }, use) => {
    await use(new AcoesUsuario(page));
  },
});

export const dadosDeCompraUsuario = {
  nome: 'Marjorie',
  sobrenome: 'Silveira',
  cep: '12345-678'
};