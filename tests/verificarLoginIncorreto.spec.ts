import { test } from './fixtures/fixtures';

test('Verificar credenciais inválidas', async ({ paginaLogin, acoesUsuario }) => {
  await paginaLogin.acessarUrl();
  await paginaLogin.logarUsuarioInvalido();     
});