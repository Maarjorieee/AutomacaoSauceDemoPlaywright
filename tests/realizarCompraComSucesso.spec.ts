import { test } from './fixtures/fixtures';

test('Finalizar compras com sucesso', async ({ paginaLogin, acoesUsuario }) => {
  await paginaLogin.acessarUrl();
  await paginaLogin.logarUsuarioPadrao();
  await acoesUsuario.adicionarProdutoAoCarrinho();
  await acoesUsuario.realizarCheckout();  
});