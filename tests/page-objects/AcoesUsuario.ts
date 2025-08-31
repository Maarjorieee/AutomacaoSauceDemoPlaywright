import { Page, expect } from "@playwright/test";
import { test as base } from "@playwright/test";
import { dadosDeCompraUsuario } from "../fixtures/fixtures";
import { MensagensEmTela } from "../constantes/MensagensEmTela";

export const test = base.extend<{ acoesUsuario: AcoesUsuario }>({
  acoesUsuario: async ({ page }, use) => {
    const acoesUsuario = new AcoesUsuario(page);
        await use(acoesUsuario);
  }
});

export default class AcoesUsuario {
  private readonly page: Page;
  private readonly btnAdicionarAoCarrinho;
  private readonly linkCarrinho;
  private readonly btnCheckout;
  private readonly campoNome;
  private readonly campoSobrenome;
  private readonly campoCep;
  private readonly btnContinue;
  private readonly btnFinalizarCompra;
  private readonly btnRemoverItemDoCarrinho;
  private readonly iconeContadorCarrinho;
  private readonly nomeProdutoCarrinho;
  private readonly msgHeader;

  constructor(page: Page) {
    this.page = page;
    this.btnAdicionarAoCarrinho = this.page.locator('[data-test="add-to-cart-sauce-labs-backpack"]'); 
    this.linkCarrinho = this.page.locator('[data-test="shopping-cart-link"]');
    this.btnCheckout = this.page.locator('[data-test="checkout"]');
    this.campoNome = this.page.locator('[data-test="firstName"]');
    this.campoSobrenome = this.page.locator('[data-test="lastName"]');
    this.campoCep = this.page.locator('[data-test="postalCode"]');
    this.btnContinue = this.page.locator('[data-test="continue"]');
    this.btnFinalizarCompra = this.page.locator('[data-test="finish"]');
    this.btnRemoverItemDoCarrinho = this.page.locator('[data-test="remove-sauce-labs-backpack"]');
    this.iconeContadorCarrinho = this.page.locator('.shopping_cart_badge');
    this.nomeProdutoCarrinho = this.page.locator('.inventory_item_name');
    this.msgHeader = this.page.locator('.complete-header');

  }

async adicionarProdutoAoCarrinho() {
    await this.btnAdicionarAoCarrinho.click();
    await this.linkCarrinho.click();
    await expect(this.nomeProdutoCarrinho).toHaveText(MensagensEmTela.carrinho.produtoBackPack);
}

  async realizarCheckout() {
    await this.btnCheckout.click();
    await this.campoNome.fill(dadosDeCompraUsuario.nome);
    await this.campoSobrenome.fill(dadosDeCompraUsuario.sobrenome);
    await this.campoCep.fill(dadosDeCompraUsuario.cep);
    await this.btnContinue.click();
    await expect(this.nomeProdutoCarrinho).toHaveText(MensagensEmTela.carrinho.produtoBackPack);
    await this.btnFinalizarCompra.click();
    await expect(this.msgHeader).toHaveText(MensagensEmTela.checkout.msgAgradecimento);
  }

  async removerItemDoCarrinho() {
    await this.btnRemoverItemDoCarrinho.click();
    await expect(this.iconeContadorCarrinho).toHaveCount(0);
  }}