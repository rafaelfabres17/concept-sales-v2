import { createResponder } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { getProductData, getStockData } from "#shared/product.js";
import { ResponderType } from "@constatic/base";
import { brBuilder } from "@magicyan/discord";
import { codeBlock } from "discord.js";
import { z } from "zod";

createResponder({
  customId: "/cart/:menu/:totalItems/:action/:productId",
  types: [ResponderType.Button],
  cache: "cached",
  parse: z.object({
    menu: z.enum(["item", "purchase"]),
    totalItems: z.coerce.number(),
    action: z.enum(["add", "remove", "confirm", "cancel"]),
    productId: z.coerce.number(),
  }).parse,
  async run(interaction, { menu, totalItems, action, productId }) {
    await interaction.deferUpdate();

    const products = getProductData();
    const product = products.find((product) => product.id == productId);

    if (!product) {
      await interaction.editReply(
        res.danger("O produto não está mais disponível..."),
      );
      return;
    }

    const stock = getStockData();
    const grouped = Map.groupBy(stock, (arg) => arg.productId);
    const items = grouped.get(product.id) ?? [];

    switch (menu) {
      case "item": {
        const newTotalItems = action == "add" ? totalItems + 1 : totalItems - 1;
        const newTotalPrice = product.price * newTotalItems;

        switch (action) {
          case "add":
          case "remove": {
            await interaction.editReply(
              menus.product.cart(
                {
                  product,
                  price: newTotalPrice,
                  delivery: {
                    items: newTotalItems,
                  },
                },
                stock,
              ),
            );
            return;
          }
        }
      }
      case "purchase": {
        switch (action) {
          case "confirm": {
            const stockRemainder = Array.from(items);
            const itemsToDelivery = stockRemainder.splice(0, totalItems);

            const message = itemsToDelivery.map(
              (item) => `📦 | ${item.content}`,
            );

            const text =
              itemsToDelivery.length < 2
                ? "Aqui estão seu pedido, Obrigado pela comprar."
                : "Aqui estão seus itens, Obrigado pela comprar";

            await interaction.editReply(
              res.default(text, codeBlock(brBuilder(message))),
            );
            return;
          }
          case "cancel": {
            await interaction.editReply(
              res.default("Carrinho cancelado pelo usuário..."),
            );
            return;
          }
        }
        return;
      }
    }
  },
});
