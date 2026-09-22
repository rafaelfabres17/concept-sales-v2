import { createCommand } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { getProductData, getStockData } from "#shared/product.js";
import {
  ApplicationCommandOptionType,
  ApplicationCommandType,
} from "discord.js";

const products = getProductData();

createCommand({
  name: "comprar",
  description: "Comprar um Produto",
  type: ApplicationCommandType.ChatInput,
  options: [
    {
      name: "id",
      description: "ID do Produto",
      type: ApplicationCommandOptionType.Integer,
      choices: Object.entries(products).map(([_key, data]) => ({
        name: `${data.name}`,
        value: data.id,
      })),
      required,
    },
  ],
  async run(interaction) {
    const { options } = interaction;
    const productId = options.getInteger("id", true);

    const product = products.find((product) => product.id == productId);

    if (!product) {
      await interaction.reply(
        res.danger("O produto não está mais disponível..."),
      );
      return;
    }

    const stock = getStockData();

    await interaction.reply(menus.product.buy(product, stock));
  },
});
