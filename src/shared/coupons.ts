export type CouponData = {
  id: number;
  code: string;
  discount: number;
};

export function getCouponData(): CouponData[] {
  const coupons: CouponData[] = [
    {
      id: 1010,
      code: "ICONS",
      discount: 50,
    },
    {
      id: 1020,
      code: "TICKET",
      discount: 25,
    },
  ];

  return coupons;
}
