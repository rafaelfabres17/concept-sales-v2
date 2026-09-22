import { formatPrice, icon } from "#functions";
import { ProductData, StockItem } from "#shared/product.js";
import { capitalize, createEmbed, wrapButtons } from "@magicyan/discord";
import {
  ButtonBuilder,
  ButtonStyle,
  codeBlock,
  type InteractionReplyOptions,
} from "discord.js";

interface CartData {
  product: ProductData;
  delivery: {
    items: number;
  };
  price: number;
  couponUsed?: boolean;
}

export function cartMenu<R>(data: CartData, stock: StockItem[]): R {
  const { product, delivery, price } = data;
  const grouped = Map.groupBy(stock, (arg) => arg.productId);
  const items = grouped.get(product.id) ?? [];

  const embed = createEmbed({
    color: constants.colors.default,
    fields: [
      {
        name: `${icon.cart} | Produto`,
        value: codeBlock(capitalize(product.name)),
      },
      {
        name: `${icon.money} | Total a Pagar`,
        value: codeBlock(formatPrice(price)),
        inline: true,
      },
      {
        name: `${icon.box} | Items a Receber`,
        value: codeBlock(delivery.items.toString()),
        inline: true,
      },
    ],
  });

  const components = wrapButtons(
    3,
    new ButtonBuilder({
      customId: `/cart/item/${delivery.items}/add/${product.id}`,
      style: ButtonStyle.Success,
      label: "Adicionar Item",
      emoji: icon.add,
      disabled: delivery.items >= items.length,
    }),
    new ButtonBuilder({
      customId: `/cart/item/${delivery.items}/coupon/${product.id}`,
      style: ButtonStyle.Primary,
      label: "Adicionar Cupom",
      emoji: icon.tag,
      disabled: data.couponUsed,
    }),
    new ButtonBuilder({
      customId: `/cart/item/${delivery.items}/remove/${product.id}`,
      style: ButtonStyle.Danger,
      label: "Remover Item",
      emoji: icon.remove,
      disabled: delivery.items == 1,
    }),
    new ButtonBuilder({
      customId: `/cart/purchase/${delivery.items}/confirm/${product.id}`,
      style: ButtonStyle.Success,
      label: "Confirmar Comprar",
      emoji: icon.confirm,
    }),
    new ButtonBuilder({
      customId: `/cart/purchase/${delivery.items}/cancel/${product.id}`,
      style: ButtonStyle.Danger,
      label: "Cancelar Comprar",
      emoji: icon.close,
    }),
  );

  return {
    flags: ["Ephemeral"],
    embeds: [embed],
    components,
  } satisfies InteractionReplyOptions as R;
}
