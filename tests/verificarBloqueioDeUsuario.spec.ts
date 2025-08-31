import { test } from './fixtures/fixtures';

test('Exibir mensagem de erro ao tentar login com usuário bloqueado', async ({ paginaLogin, acoesUsuario }) => {
  await paginaLogin.acessarUrl();
  await paginaLogin.logarUsuarioBloqueado();     
});