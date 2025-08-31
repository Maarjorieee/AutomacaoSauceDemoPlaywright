import { Page, expect } from "@playwright/test";
import { test as base } from "@playwright/test";
import { MensagensEmTela } from "../constantes/MensagensEmTela";

export const test = base.extend<{ paginaLogin: PaginaLogin }>({
  paginaLogin: async ({ page }, use) => {
    const paginaLogin = new PaginaLogin(page);
    await paginaLogin.acessarUrl();
    await use(paginaLogin);
  }
});

export default class PaginaLogin {
  private readonly page: Page;   
  private readonly campoUsuario;
  private readonly campoSenha;
  private readonly botaoLogin;
  private readonly labelErro;
  private readonly tituloPagina;

  constructor(page: Page) {
    this.page = page;   
    this.campoUsuario = this.page.locator('input[data-test="username"]');
    this.campoSenha = this.page.locator('input[data-test="password"]');
    this.botaoLogin = this.page.locator('input[data-test="login-button"]');
    this.labelErro = this.page.locator('[data-test="error"]');
    this.tituloPagina = this.page.locator('.title');
  }

  async acessarUrl() {
    await this.page.goto('/');
  }

  async logarUsuarioPadrao() {
    await this.campoUsuario.fill('standard_user');
    await this.campoSenha.fill('secret_sauce');
    await this.botaoLogin.click();   
    await expect(this.tituloPagina).toHaveText(MensagensEmTela.geral.produtos);
  }

  async logarUsuarioInvalido() {
    await this.campoUsuario.fill('standard_user');
    await this.campoSenha.fill('wrong_password');
    await this.botaoLogin.click(); 
    await expect(this.labelErro).toHaveText(MensagensEmTela.login.dadosInvalidos);
  }

  async logarUsuarioBloqueado() {
    await this.campoUsuario.fill('locked_out_user');
    await this.campoSenha.fill('secret_sauce');
     await this.botaoLogin.click(); 
    await expect(this.labelErro).toHaveText(MensagensEmTela.login.usuarioBloqueado);
}}  