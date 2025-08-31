import { test } from './fixtures/fixtures';

test('Remover item do carrinho após adicionar produto', async ({ paginaLogin, acoesUsuario }) => {
  await paginaLogin.acessarUrl();
  await paginaLogin.logarUsuarioPadrao();
  await acoesUsuario.adicionarProdutoAoCarrinho();
  await acoesUsuario.removerItemDoCarrinho();    
});