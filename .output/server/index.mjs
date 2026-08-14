globalThis.__nitro_main__ = import.meta.url;
import { a as defineLazyEventHandler, c as serve, i as defineHandler, n as HTTPError, o as toEventHandler, s as NodeResponse, t as H3Core } from "./_libs/h3+rou3+srvx.mjs";
import { i as withoutTrailingSlash, n as joinURL, r as withLeadingSlash, t as decodePath } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region node_modules/nitro/dist/runtime/internal/route-rules.mjs
var headers = ((m) => function headersRouteRule(event) {
	for (const [key, value] of Object.entries(m.options || {})) event.res.headers.set(key, value);
});
//#endregion
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/assets/account-CLAZI1pg.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a1b-xcn5NCkLMBnKkshctdLxIxaF1oA\"",
		"mtime": "2026-08-14T19:36:43.628Z",
		"size": 14875,
		"path": "../public/assets/account-CLAZI1pg.js"
	},
	"/assets/avatar-BPKfR5W_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-SkWyet8s5LWcfcWpbU77ou0e/nU\"",
		"mtime": "2026-08-14T19:36:43.630Z",
		"size": 2713,
		"path": "../public/assets/avatar-BPKfR5W_.js"
	},
	"/assets/bank-operation.type-BRAbHIPJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"300-a5Cw3vcVuKyQuhmmdDTQHb1r3i0\"",
		"mtime": "2026-08-14T19:36:43.633Z",
		"size": 768,
		"path": "../public/assets/bank-operation.type-BRAbHIPJ.js"
	},
	"/assets/card-DS3jkULG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bb-zroVirXnvEXQZQ/F8LnTPSl6wvc\"",
		"mtime": "2026-08-14T19:36:43.635Z",
		"size": 955,
		"path": "../public/assets/card-DS3jkULG.js"
	},
	"/assets/cash-closing-CS4JA0Yi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a95-NFUb4s9JnxhMhDVLoqRVRlTAV6M\"",
		"mtime": "2026-08-14T19:36:43.636Z",
		"size": 2709,
		"path": "../public/assets/cash-closing-CS4JA0Yi.js"
	},
	"/assets/cash-session.type-D8acw9ZB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d-7ku7pyekNrkVNvjfWqcwk8aY4Cc\"",
		"mtime": "2026-08-14T19:36:43.639Z",
		"size": 909,
		"path": "../public/assets/cash-session.type-D8acw9ZB.js"
	},
	"/assets/chevron-right-BS3t6MKl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-WeTy23iUvhhfvtCOoTVAZRdkJIw\"",
		"mtime": "2026-08-14T19:36:43.640Z",
		"size": 130,
		"path": "../public/assets/chevron-right-BS3t6MKl.js"
	},
	"/assets/client-D65eEjKv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17a4c-cKMrlYmRcaMj9ZqIrDUTdRxVd6k\"",
		"mtime": "2026-08-14T19:36:43.643Z",
		"size": 96844,
		"path": "../public/assets/client-D65eEjKv.js"
	},
	"/assets/client.type-BmU0XoC9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"265-0ZImNmbn4eEW7hXodnrv+ndb7AU\"",
		"mtime": "2026-08-14T19:36:43.644Z",
		"size": 613,
		"path": "../public/assets/client.type-BmU0XoC9.js"
	},
	"/assets/createLucideIcon-BG0Izd9r.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a2d0-MWIoyQclxdu6u3QW3xexYz4lTMQ\"",
		"mtime": "2026-08-14T19:36:43.647Z",
		"size": 41680,
		"path": "../public/assets/createLucideIcon-BG0Izd9r.js"
	},
	"/assets/credit-DWhmFHD7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-345h70mWX3kd03IZ9AQCTkERxhE\"",
		"mtime": "2026-08-14T19:36:43.649Z",
		"size": 155,
		"path": "../public/assets/credit-DWhmFHD7.js"
	},
	"/assets/dashboard-aKBtF2bG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dddd-zcMPICuo4qgSmQ3E1KOEH6DKw70\"",
		"mtime": "2026-08-14T19:36:43.654Z",
		"size": 56797,
		"path": "../public/assets/dashboard-aKBtF2bG.js"
	},
	"/assets/dashboard-CGyg1ZNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-v0Btnl9OK3/pk7BtJ15r4+xXEUM\"",
		"mtime": "2026-08-14T19:36:43.651Z",
		"size": 138,
		"path": "../public/assets/dashboard-CGyg1ZNW.js"
	},
	"/assets/data-table-BylIq951.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c457-g2PGsgLUFdNsbXEVgtmTxzI2yJA\"",
		"mtime": "2026-08-14T19:36:43.656Z",
		"size": 50263,
		"path": "../public/assets/data-table-BylIq951.js"
	},
	"/assets/DialogTitle-DjWobkoE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c1ac-bkg0CARJ6fiakwCtQS1VzD/MSYs\"",
		"mtime": "2026-08-14T19:36:43.619Z",
		"size": 49580,
		"path": "../public/assets/DialogTitle-DjWobkoE.js"
	},
	"/assets/dist-CcfgJxNn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d95-EkTuWQrfvHpwbSk6kb70nnvdkns\"",
		"mtime": "2026-08-14T19:36:43.658Z",
		"size": 3477,
		"path": "../public/assets/dist-CcfgJxNn.js"
	},
	"/assets/dist-DlxWjgyD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"810-iT7rdEgyYd580OPdjWl0/psHRDc\"",
		"mtime": "2026-08-14T19:36:43.664Z",
		"size": 2064,
		"path": "../public/assets/dist-DlxWjgyD.js"
	},
	"/assets/dist-UCjAJoOc.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e7a6-lpZoDQkahz1R8JjYR6KYlNJhrU0\"",
		"mtime": "2026-08-14T19:36:43.667Z",
		"size": 59302,
		"path": "../public/assets/dist-UCjAJoOc.js"
	},
	"/assets/endpoints-HUKEib47.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae5-ToR5nexAO4lEBxE0yX22K/6QTcM\"",
		"mtime": "2026-08-14T19:36:43.669Z",
		"size": 2789,
		"path": "../public/assets/endpoints-HUKEib47.js"
	},
	"/assets/eye-E7lr_4dn.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-FxInQlqGbhmt/TI+ve6L7cOn09s\"",
		"mtime": "2026-08-14T19:36:43.670Z",
		"size": 256,
		"path": "../public/assets/eye-E7lr_4dn.js"
	},
	"/assets/eye-off-BYhNbmy2.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae-T9lLhpP/DJmJhYiuTmlXCJHpZm8\"",
		"mtime": "2026-08-14T19:36:43.704Z",
		"size": 430,
		"path": "../public/assets/eye-off-BYhNbmy2.js"
	},
	"/assets/field-DENONDUq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98f-D/K2kBWT5n/mWTySz6pC/LZu930\"",
		"mtime": "2026-08-14T19:36:43.750Z",
		"size": 2447,
		"path": "../public/assets/field-DENONDUq.js"
	},
	"/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2": {
		"type": "font/woff2",
		"etag": "\"1cfc-yYSDXNlt/tTRaj6rJo8ZMqvY7pQ\"",
		"mtime": "2026-08-14T19:36:43.927Z",
		"size": 7420,
		"path": "../public/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2"
	},
	"/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2": {
		"type": "font/woff2",
		"etag": "\"4080-mZu3Z7sOWqglha+kefNbUA9Pp+Q\"",
		"mtime": "2026-08-14T19:36:43.940Z",
		"size": 16512,
		"path": "../public/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2"
	},
	"/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2": {
		"type": "font/woff2",
		"etag": "\"3aec-5kpQSZEtAzzU5kdiuro3Zr2YR54\"",
		"mtime": "2026-08-14T19:36:43.929Z",
		"size": 15084,
		"path": "../public/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2"
	},
	"/assets/get-api-error-B2U5tVis.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a59-i8IZFmMOTR4oRXci0rQe1taV540\"",
		"mtime": "2026-08-14T19:36:43.764Z",
		"size": 2649,
		"path": "../public/assets/get-api-error-B2U5tVis.js"
	},
	"/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2": {
		"type": "font/woff2",
		"etag": "\"1f44-6MZ7/PEEOeDVF0eHI650KpwKQV8\"",
		"mtime": "2026-08-14T19:36:43.950Z",
		"size": 8004,
		"path": "../public/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2"
	},
	"/assets/geist-latin-wght-normal-BgDaEnEv.woff2": {
		"type": "font/woff2",
		"etag": "\"72d8-9J+D7/6th5UzRxIgoFX9awJv47A\"",
		"mtime": "2026-08-14T19:36:43.947Z",
		"size": 29400,
		"path": "../public/assets/geist-latin-wght-normal-BgDaEnEv.woff2"
	},
	"/assets/input-Dcia-ALd.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11bd-ANWxQ4sckagu5Ax+021A6VnDbDI\"",
		"mtime": "2026-08-14T19:36:43.767Z",
		"size": 4541,
		"path": "../public/assets/input-Dcia-ALd.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-08-14T19:36:43.772Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/label-C6A_QZDA.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32c-DYT5Cl99kUh03lMOi7kAOd8eId0\"",
		"mtime": "2026-08-14T19:36:43.784Z",
		"size": 812,
		"path": "../public/assets/label-C6A_QZDA.js"
	},
	"/assets/link-Cr_qj8fC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4d4e-9vnee+mt1YHmxrVYaV/zLXp9NRI\"",
		"mtime": "2026-08-14T19:36:43.786Z",
		"size": 19790,
		"path": "../public/assets/link-Cr_qj8fC.js"
	},
	"/assets/Match-BmHdv-QC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1169-odORW7JcRFEWqh4w453DTb7ET3k\"",
		"mtime": "2026-08-14T19:36:43.620Z",
		"size": 4457,
		"path": "../public/assets/Match-BmHdv-QC.js"
	},
	"/assets/matchContext-BS1nh9PE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-woL9EY6L7dDmYZb1RUpk127qLIg\"",
		"mtime": "2026-08-14T19:36:43.799Z",
		"size": 190,
		"path": "../public/assets/matchContext-BS1nh9PE.js"
	},
	"/assets/index-B3ahePs4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5295d-TCX6bXe3xHXu8bJDoQL8lOOvBtI\"",
		"mtime": "2026-08-14T19:36:43.617Z",
		"size": 338269,
		"path": "../public/assets/index-B3ahePs4.js"
	},
	"/assets/me-C4fy_Jze.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"626f-MCHkZ56LpiUyLogI8C/rXglD4nI\"",
		"mtime": "2026-08-14T19:36:43.803Z",
		"size": 25199,
		"path": "../public/assets/me-C4fy_Jze.js"
	},
	"/assets/middleware-cxXansVw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b47-qb4bF453Ds3Xd7vUCl8Kf2X8ssc\"",
		"mtime": "2026-08-14T19:36:43.810Z",
		"size": 2887,
		"path": "../public/assets/middleware-cxXansVw.js"
	},
	"/assets/permission.store-DHOHdaQG.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-oGhLvrmjLjcHdtjPnB/jttz7OC4\"",
		"mtime": "2026-08-14T19:36:43.820Z",
		"size": 543,
		"path": "../public/assets/permission.store-DHOHdaQG.js"
	},
	"/assets/preload-helper-CoZPoZUw.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"160d-7wRCCh9hF3iADMhUHsWVbvmfTKQ\"",
		"mtime": "2026-08-14T19:36:43.829Z",
		"size": 5645,
		"path": "../public/assets/preload-helper-CoZPoZUw.js"
	},
	"/assets/pagination.type-B3Dqmpeq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bfba-j5OHSW4rKU3DNKhNJShxkeQSWak\"",
		"mtime": "2026-08-14T19:36:43.816Z",
		"size": 180154,
		"path": "../public/assets/pagination.type-B3Dqmpeq.js"
	},
	"/assets/query-keys-CrfRSiIb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2719-uEdFFRlmxCD8p+1Ukv0n8hHclrQ\"",
		"mtime": "2026-08-14T19:36:43.830Z",
		"size": 10009,
		"path": "../public/assets/query-keys-CrfRSiIb.js"
	},
	"/assets/react-3BKWdGy3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-7y5khacUeAI0naE7zvk9aPM2omk\"",
		"mtime": "2026-08-14T19:36:43.833Z",
		"size": 7527,
		"path": "../public/assets/react-3BKWdGy3.js"
	},
	"/assets/react-dom-C6PBTCug.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"dfa-w18gkNVRNdAGg2Wnr0pASLqr4+Y\"",
		"mtime": "2026-08-14T19:36:43.840Z",
		"size": 3578,
		"path": "../public/assets/react-dom-C6PBTCug.js"
	},
	"/assets/routes-BdEKy1oB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1070b-oknW+pWuEHp+O2w5uohA3bCyCgc\"",
		"mtime": "2026-08-14T19:36:43.849Z",
		"size": 67339,
		"path": "../public/assets/routes-BdEKy1oB.js"
	},
	"/image.png": {
		"type": "image/png",
		"etag": "\"581b-OvrYqDCRCwB4AJYKg5A8Q6FPLNE\"",
		"mtime": "2026-08-14T18:22:36.018Z",
		"size": 22555,
		"path": "../public/image.png"
	},
	"/assets/separator-CurylgxV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26f-l3STRcoCuBF0N0FvHXaq4dF3wnE\"",
		"mtime": "2026-08-14T19:36:43.866Z",
		"size": 623,
		"path": "../public/assets/separator-CurylgxV.js"
	},
	"/assets/shadowDom-BDpMDnYC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"518-Q08VKXlpmVqLE/zP2cIYGav/1CQ\"",
		"mtime": "2026-08-14T19:36:43.870Z",
		"size": 1304,
		"path": "../public/assets/shadowDom-BDpMDnYC.js"
	},
	"/assets/skeleton-VYPVKOot.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-3K3PJyopeifgxxKNpaCpIGIVG7U\"",
		"mtime": "2026-08-14T19:36:43.872Z",
		"size": 257,
		"path": "../public/assets/skeleton-VYPVKOot.js"
	},
	"/assets/table--vh_CBkm.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e37-0KS25b7vVNv6pwMJGlFUs0/Gyu0\"",
		"mtime": "2026-08-14T19:36:43.875Z",
		"size": 24119,
		"path": "../public/assets/table--vh_CBkm.js"
	},
	"/assets/textarea-BhOQzWbJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"322-kfz45lcchihe1t795wneUI9comY\"",
		"mtime": "2026-08-14T19:36:43.877Z",
		"size": 802,
		"path": "../public/assets/textarea-BhOQzWbJ.js"
	},
	"/assets/trash-2-79F7PDab.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-+NOKHSmYVgMHZ44PqrZwOQqKUkg\"",
		"mtime": "2026-08-14T19:36:43.879Z",
		"size": 551,
		"path": "../public/assets/trash-2-79F7PDab.js"
	},
	"/assets/unauthorized-gGetkPdv.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a9-e3vL4OZPVF1DPm4TwYCT6Q82P1o\"",
		"mtime": "2026-08-14T19:36:43.883Z",
		"size": 1193,
		"path": "../public/assets/unauthorized-gGetkPdv.js"
	},
	"/assets/usePositioner-C04JR3Wi.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4ccf-crvYbGhIG2PV33bDcDXRMTQw9vQ\"",
		"mtime": "2026-08-14T19:36:43.888Z",
		"size": 19663,
		"path": "../public/assets/usePositioner-C04JR3Wi.js"
	},
	"/assets/useMatch-792zs1_j.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-dBIVZ4WvaXQq+n8GlOvmS6MkGfo\"",
		"mtime": "2026-08-14T19:36:43.886Z",
		"size": 642,
		"path": "../public/assets/useMatch-792zs1_j.js"
	},
	"/assets/useQuery-D_W4fLW7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-JG1vTO3LH97PeLRC2WCtKWQsB08\"",
		"mtime": "2026-08-14T19:36:43.891Z",
		"size": 668,
		"path": "../public/assets/useQuery-D_W4fLW7.js"
	},
	"/assets/styles-D1X47J7F.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"185a5-OH9/Dc9R3/hMfEsnTTvc5/bs+To\"",
		"mtime": "2026-08-14T19:36:43.952Z",
		"size": 99749,
		"path": "../public/assets/styles-D1X47J7F.css"
	},
	"/assets/useQuery.account-D5QoErGt.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"589-IjqC8zF6T56bJsto3sutthvQBuE\"",
		"mtime": "2026-08-14T19:36:43.902Z",
		"size": 1417,
		"path": "../public/assets/useQuery.account-D5QoErGt.js"
	},
	"/assets/useQuery.cash-session-BQhACYcF.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"324-uM2LoCee5PSKhqU2MpFztwCEYmM\"",
		"mtime": "2026-08-14T19:36:43.905Z",
		"size": 804,
		"path": "../public/assets/useQuery.cash-session-BQhACYcF.js"
	},
	"/assets/useQuery.user-CVflJjAu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"276-yFbE2982UTuOzEjeJZCCatXAf7M\"",
		"mtime": "2026-08-14T19:36:43.906Z",
		"size": 630,
		"path": "../public/assets/useQuery.user-CVflJjAu.js"
	},
	"/assets/user-DQMhtSux.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19ce-g4hRgr6dT3fA28vH3o2GrMWeukk\"",
		"mtime": "2026-08-14T19:36:43.912Z",
		"size": 6606,
		"path": "../public/assets/user-DQMhtSux.js"
	},
	"/assets/user.type-CTAVacKs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-Mvsr6A6EPwUiS5vg6r38y2g9BAw\"",
		"mtime": "2026-08-14T19:36:43.919Z",
		"size": 621,
		"path": "../public/assets/user.type-CTAVacKs.js"
	},
	"/assets/useStore-CfceB-8s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"261-0EsNju1KJpnq4WYRcmqeqQVDp10\"",
		"mtime": "2026-08-14T19:36:43.911Z",
		"size": 609,
		"path": "../public/assets/useStore-CfceB-8s.js"
	},
	"/assets/view.credit-BtZvy7bP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c45-lUaOQuT1gtFjhq5LFEVzIhgNCio\"",
		"mtime": "2026-08-14T19:36:43.921Z",
		"size": 7237,
		"path": "../public/assets/view.credit-BtZvy7bP.js"
	},
	"/assets/with-selector-DAsWIm2d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6de-ASlANfXrOEuOiwIkTKnTIX0UR9A\"",
		"mtime": "2026-08-14T19:36:43.923Z",
		"size": 1758,
		"path": "../public/assets/with-selector-DAsWIm2d.js"
	},
	"/assets/x-Crv1y2HC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-zCFCFskQ3PCMuYG6gBkKzvkf2J0\"",
		"mtime": "2026-08-14T19:36:43.925Z",
		"size": 154,
		"path": "../public/assets/x-Crv1y2HC.js"
	},
	"/assets/_clientId-CNPBYf_X.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-7FWUJvWrfIETTabd9aAWCcArJVo\"",
		"mtime": "2026-08-14T19:36:43.623Z",
		"size": 295,
		"path": "../public/assets/_clientId-CNPBYf_X.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-07-20T02:41:35.522Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/assets/_clientId-D5b5AhBH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c3-jjZUrsW/aZSXwI61ETXp8S3bjNs\"",
		"mtime": "2026-08-14T19:36:43.625Z",
		"size": 5571,
		"path": "../public/assets/_clientId-D5b5AhBH.js"
	},
	"/assets/_protected-Dd1kjwxx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47-gO1wLEzfxuwgcObEm9R3AgKxdqc\"",
		"mtime": "2026-08-14T19:36:43.627Z",
		"size": 71,
		"path": "../public/assets/_protected-Dd1kjwxx.js"
	},
	"/icons.svg": {
		"type": "image/svg+xml",
		"etag": "\"13a7-+Yl6wl4T3p6mAdLxrF2TU9++/No\"",
		"mtime": "2026-07-20T02:41:35.561Z",
		"size": 5031,
		"path": "../public/icons.svg"
	}
};
//#endregion
//#region #nitro/virtual/public-assets-node
function readAsset(id) {
	const serverDir = dirname(fileURLToPath(globalThis.__nitro_main__));
	return promises.readFile(resolve(serverDir, public_assets_data_default[id].path));
}
//#endregion
//#region #nitro/virtual/public-assets
var publicAssetBases = {};
function isPublicAssetURL(id = "") {
	if (public_assets_data_default[id]) return true;
	for (const base in publicAssetBases) if (id.startsWith(base)) return true;
	return false;
}
function getAsset(id) {
	return public_assets_data_default[id];
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/static.mjs
var METHODS = /* @__PURE__ */ new Set(["HEAD", "GET"]);
var EncodingMap = {
	gzip: ".gz",
	br: ".br",
	zstd: ".zst"
};
var static_default = defineHandler((event) => {
	if (event.req.method && !METHODS.has(event.req.method)) return;
	let id = decodePath(withLeadingSlash(withoutTrailingSlash(event.url.pathname)));
	let asset;
	const encodings = [...(event.req.headers.get("accept-encoding") || "").split(",").map((e) => EncodingMap[e.trim()]).filter(Boolean).sort(), ""];
	for (const encoding of encodings) for (const _id of [id + encoding, joinURL(id, "index.html" + encoding)]) {
		const _asset = getAsset(_id);
		if (_asset) {
			asset = _asset;
			id = _id;
			break;
		}
	}
	if (!asset) {
		if (isPublicAssetURL(id)) {
			event.res.headers.delete("Cache-Control");
			throw new HTTPError({ status: 404 });
		}
		return;
	}
	if (encodings.length > 1) event.res.headers.append("Vary", "Accept-Encoding");
	if (event.req.headers.get("if-none-match") === asset.etag) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	const ifModifiedSinceH = event.req.headers.get("if-modified-since");
	const mtimeDate = new Date(asset.mtime);
	if (ifModifiedSinceH && asset.mtime && new Date(ifModifiedSinceH) >= mtimeDate) {
		event.res.status = 304;
		event.res.statusText = "Not Modified";
		return "";
	}
	if (asset.type) event.res.headers.set("Content-Type", asset.type);
	if (asset.etag && !event.res.headers.has("ETag")) event.res.headers.set("ETag", asset.etag);
	if (asset.mtime && !event.res.headers.has("Last-Modified")) event.res.headers.set("Last-Modified", mtimeDate.toUTCString());
	if (asset.encoding && !event.res.headers.has("Content-Encoding")) event.res.headers.set("Content-Encoding", asset.encoding);
	if (asset.size > 0 && !event.res.headers.has("Content-Length")) event.res.headers.set("Content-Length", asset.size.toString());
	return readAsset(id);
});
//#endregion
//#region #nitro/virtual/routing
var findRouteRules = /* @__PURE__ */ (() => {
	const $0 = [{
		name: "headers",
		route: "/assets/**",
		handler: headers,
		options: { "cache-control": "public, max-age=31536000, immutable" }
	}];
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1) || "/";
		let s = p.split("/");
		if (s.length > 1) {
			if (s[1] === "assets") r.unshift({
				data: $0,
				params: { "_": s.slice(2).join("/") }
			});
		}
		return r;
	};
})();
var _lazy_6hiqhu = defineLazyEventHandler(() => import("./_chunks/renderer-template.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_6hiqhu
	};
	return ((_m, p) => {
		return {
			data,
			params: { "_": p.slice(1) }
		};
	});
})();
var globalMiddleware = [toEventHandler(static_default)].filter(Boolean);
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/prod.mjs
var errorHandler = (error, event) => {
	const res = defaultHandler(error, event);
	return new NodeResponse(typeof res.body === "string" ? res.body : JSON.stringify(res.body, null, 2), res);
};
function defaultHandler(error, event) {
	const unhandled = error.unhandled ?? !HTTPError.isError(error);
	const { status = 500, statusText = "" } = unhandled ? {} : error;
	if (status === 404) {
		const url = event.url || new URL(event.req.url);
		const baseURL = "/";
		if (/^\/[^/]/.test(baseURL) && !url.pathname.startsWith(baseURL)) return {
			status: 302,
			headers: new Headers({ location: `${baseURL}${url.pathname.slice(1)}${url.search}` })
		};
	}
	const headers = new Headers(unhandled ? {} : error.headers);
	headers.set("content-type", "application/json; charset=utf-8");
	return {
		status,
		statusText,
		headers,
		body: {
			error: true,
			...unhandled ? {
				status,
				unhandled: true
			} : typeof error.toJSON === "function" ? error.toJSON() : {
				status,
				statusText,
				message: error.message
			}
		}
	};
}
//#endregion
//#region #nitro/virtual/error-handler
var errorHandlers = [errorHandler];
async function error_handler_default(error, event) {
	for (const handler of errorHandlers) try {
		const response = await handler(error, event, { defaultHandler });
		if (response) return response;
	} catch (error) {
		console.error(error);
	}
}
//#endregion
//#region #nitro/virtual/app
function createNitroApp() {
	const captureError = (error, errorCtx) => {
		if (errorCtx?.event) {
			const errors = errorCtx.event.req.context?.nitro?.errors;
			if (errors) errors.push({
				error,
				context: errorCtx
			});
		}
	};
	const h3App = createH3App({ onError(error, event) {
		return error_handler_default(error, event);
	} });
	let appHandler = (req) => {
		req.context ||= {};
		req.context.nitro = req.context.nitro || { errors: [] };
		return h3App.fetch(req);
	};
	return {
		fetch: appHandler,
		h3: h3App,
		hooks: void 0,
		captureError
	};
}
function createH3App(config) {
	const h3App = new H3Core(config);
	h3App["~findRoute"] = (event) => findRoute(event.req.method, event.url.pathname);
	h3App["~middleware"].push(...globalMiddleware);
	h3App["~getMiddleware"] = (event, route) => {
		const pathname = event.url.pathname;
		const method = event.req.method;
		const middleware = [];
		const routeRules = getRouteRules(method, pathname);
		event.context.routeRules = routeRules?.routeRules;
		if (routeRules?.routeRuleMiddleware.length) middleware.push(...routeRules.routeRuleMiddleware);
		middleware.push(...h3App["~middleware"]);
		if (route?.data?.middleware?.length) middleware.push(...route.data.middleware);
		return middleware;
	};
	return h3App;
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/app.mjs
var APP_ID = "default";
function useNitroApp() {
	let instance = useNitroApp._instance;
	if (instance) return instance;
	instance = useNitroApp._instance = createNitroApp();
	globalThis.__nitro__ = globalThis.__nitro__ || {};
	globalThis.__nitro__[APP_ID] = instance;
	return instance;
}
function getRouteRules(method, pathname) {
	const m = findRouteRules(method, pathname);
	if (!m?.length) return { routeRuleMiddleware: [] };
	const routeRules = {};
	for (const layer of m) for (const rule of layer.data) {
		const currentRule = routeRules[rule.name];
		if (currentRule) {
			if (rule.options === false) {
				delete routeRules[rule.name];
				continue;
			}
			if (typeof currentRule.options === "object" && typeof rule.options === "object") currentRule.options = {
				...currentRule.options,
				...rule.options
			};
			else currentRule.options = rule.options;
			currentRule.route = rule.route;
			currentRule.params = {
				...currentRule.params,
				...layer.params
			};
		} else if (rule.options !== false) routeRules[rule.name] = {
			...rule,
			params: layer.params
		};
	}
	const middleware = [];
	const orderedRules = Object.values(routeRules).sort((a, b) => (a.handler?.order || 0) - (b.handler?.order || 0));
	for (const rule of orderedRules) {
		if (rule.options === false || !rule.handler) continue;
		middleware.push(rule.handler(rule));
	}
	return {
		routeRules,
		routeRuleMiddleware: middleware
	};
}
//#endregion
//#region node_modules/nitro/dist/runtime/internal/error/hooks.mjs
function _captureError(error, type) {
	console.error(`[${type}]`, error);
	useNitroApp().captureError?.(error, { tags: [type] });
}
function trapUnhandledErrors() {
	process.on("unhandledRejection", (error) => _captureError(error, "unhandledRejection"));
	process.on("uncaughtException", (error) => _captureError(error, "uncaughtException"));
}
//#endregion
//#region #nitro/virtual/tracing
var tracingSrvxPlugins = [];
//#endregion
//#region node_modules/nitro/dist/presets/node/runtime/node-server.mjs
var _parsedPort = Number.parseInt(process.env.NITRO_PORT ?? process.env.PORT ?? "");
var port = Number.isNaN(_parsedPort) ? 3e3 : _parsedPort;
var host = process.env.NITRO_HOST || process.env.HOST;
var cert = process.env.NITRO_SSL_CERT;
var key = process.env.NITRO_SSL_KEY;
var nitroApp = useNitroApp();
serve({
	port,
	hostname: host,
	tls: cert && key ? {
		cert,
		key
	} : void 0,
	fetch: nitroApp.fetch,
	plugins: [...tracingSrvxPlugins]
});
trapUnhandledErrors();
var node_server_default = {};
//#endregion
export { node_server_default as default };
