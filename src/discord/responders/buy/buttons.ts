import { createResponder } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { getProductData, getStockData } from "#shared/product.js";
import { ResponderType } from "@constatic/base";
import { z } from "zod";

createResponder({
  customId: "/buy/:productId",
  types: [ResponderType.Button],
  cache: "cached",
  parse: z.object({
    productId: z.coerce.number(),
  }).parse,
  async run(interaction, { productId }) {
    const products = getProductData();
    const product = products.find((product) => product.id == productId);

    if (!product) {
      await interaction.update(
        res.danger("O produto não está mais disponível..."),
      );
      return;
    }

    const stock = getStockData();
    const grouped = Map.groupBy(stock, (arg) => arg.productId);
    const items = grouped.get(product.id) ?? [];

    if (items.length == 0) {
      await interaction.update(
        res.warning("Esse produto não possui estoque atualmente."),
      );
      return;
    }

    await interaction.update(
      menus.product.cart(
        {
          product,
          price: product.price,
          delivery: {
            items: 1,
          },
        },
        stock,
      ),
    );
  },
});
