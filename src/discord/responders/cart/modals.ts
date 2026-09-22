import { createResponder } from "#base";
import { res } from "#functions";
import { menus } from "#menus";
import { getCouponData } from "#shared/coupons.js";
import { getProductData, getStockData } from "#shared/product.js";
import { ResponderType } from "@constatic/base";
import { createEmbed } from "@magicyan/discord";
import { z } from "zod";
import { cleanCodeBlock, cleanLetter } from "../../../functions/utils/clean.js";

const coupons = getCouponData();
const products = getProductData();
const stock = getStockData();

createResponder({
  customId: "/cart/:productId/:action",
  types: [ResponderType.ModalComponent],
  cache: "cached",
  parse: z.object({
    productId: z.coerce.number(),
    action: z.enum(["addCoupon"]),
  }).parse,
  async run(interaction, { productId, action }) {
    const { fields: inputs } = interaction;

    const embed = createEmbed({ from: interaction });
    const fields = embed.data.fields ?? [];
    const [_productName, totalPrice, totalItems] = Object.entries(fields).map(
      ([_key, data]) => cleanCodeBlock(data.value),
    );

    switch (action) {
      case "addCoupon": {
        const code = inputs.getTextInputValue("code");
        const coupon = coupons.find(
          (coupon) => coupon.code.toLowerCase() == code.toLowerCase(),
        );

        if (!coupon) {
          await interaction.reply(
            res.warning("Esse código de cupom não existe."),
          );
          return;
        }

        const product = products.find((product) => product.id == productId);

        if (!product) {
          await interaction.reply(
            res.warning("Esse produto não está disponível."),
          );
          return;
        }

        const price = Number(cleanLetter(totalPrice).replace(",", "."));
        const priceWithDiscount = price - price * (coupon.discount / 100);

        await interaction.update(
          menus.product.cart(
            {
              product,
              price: priceWithDiscount * 100,
              delivery: {
                items: Number(totalItems),
              },
              couponUsed: true,
            },
            stock,
          ),
        );
        await interaction.followUp(res.success("Cupom usado com sucesso."));
        return;
      }
    }
  },
});
