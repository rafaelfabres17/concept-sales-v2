import { formatPrice, icon } from "#functions";
import { ProductData, StockItem } from "#shared/product.js";
import { capitalize, createEmbed, createRow } from "@magicyan/discord";
import {
  ButtonBuilder,
  ButtonStyle,
  codeBlock,
  type InteractionReplyOptions,
} from "discord.js";

export function buyMenu<R>(product: ProductData, stock: StockItem[]): R {
  const grouped = Map.groupBy(stock, (arg) => arg.productId);
  const items = grouped.get(product.id)?.length ?? 0;

  const embed = createEmbed({
    color: constants.colors.default,
    fields: [
      {
        name: `${icon.cart} | Produto`,
        value: codeBlock(capitalize(product.name)),
        inline: false,
      },
      {
        name: `${icon.money} | Valor`,
        value: codeBlock(formatPrice(product.price)),
        inline: true,
      },
      {
        name: `${icon.box} | Estoque`,
        value: codeBlock(items.toString()),
        inline: true,
      },
    ],
  });

  const components = [
    createRow(
      new ButtonBuilder({
        customId: `/buy/${product.id}`,
        style: ButtonStyle.Success,
        label: "Adicionar ao Carrinho",
        emoji: icon.cart,
        disabled: items == 0,
      }),
    ),
  ];

  return {
    flags: ["Ephemeral"],
    embeds: [embed],
    components,
  } satisfies InteractionReplyOptions as R;
}
