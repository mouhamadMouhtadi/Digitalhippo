"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatPrice = exports.cn = void 0;
var clsx_1 = require("clsx");
var tailwind_merge_1 = require("tailwind-merge");
function cn() {
    var inputs = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        inputs[_i] = arguments[_i];
    }
    return (0, tailwind_merge_1.twMerge)((0, clsx_1.clsx)(inputs));
}
exports.cn = cn;
function formatPrice(price, options) {
    if (options === void 0) { options = {}; }
    var _a = options.currency, currency = _a === void 0 ? "USD" : _a, _b = options.notation, notation = _b === void 0 ? "compact" : _b;
    var numericPrice = typeof price === "string" ? parseFloat(price) : price;
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        notation: notation,
        currency: currency,
        maximumFractionDigits: 2,
    }).format(numericPrice);
}
exports.formatPrice = formatPrice;
// export function constructMetadata({
//   title = "DigitalHippo - the marketplace for digital assets",
//   description = "DigitalHippo is an open-source marketplace for high-quality digital goods.",
//   image = "/public/thumbnail.jpg",
//   icons = "/public/favicon.ico",
//   noIndex = false,
// }: {
//   title?: string;
//   description?: string;
//   image?: string;
//   icons?: string;
//   noIndex?: boolean;
// } = {}): Metadata {
//   return {
//     title,
//     description,
//     openGraph: {
//       title,
//       description,
//       images: [
//         {
//           url: image,
//         },
//       ],
//     },
//     twitter: {
//       card: "summary_large_image",
//       title,
//       description,
//       images: [image],
//       creator: "@joshtriedcoding",
//     },
//     icons,
//     metadataBase: new URL("http://localhost:3000/"),
//     ...(noIndex && {
//       robots: {
//         index: false,
//         follow: false,
//       },
//     }),
//   };
// }
