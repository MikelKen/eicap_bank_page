globalThis.__nitro_main__ = import.meta.url;
import { NodeResponse, serve } from "./_libs/h3-v2+rou3+srvx.mjs";
import { H3Core, HTTPError, defineHandler, defineLazyEventHandler, toEventHandler } from "./_libs/h3+rou3+srvx.mjs";
import { createMatcherFromFind, headers, memoizeRouteRulesMatcher } from "./_libs/h3-rules.mjs";
import { decodePath, joinURL, withLeadingSlash, withoutTrailingSlash } from "./_libs/ufo.mjs";
import { promises } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
//#region #nitro/virtual/public-assets-data
var public_assets_data_default = {
	"/icons.svg": {
		"type": "image/svg+xml",
		"etag": "\"13a7-+Yl6wl4T3p6mAdLxrF2TU9++/No\"",
		"mtime": "2026-07-20T02:41:35.561Z",
		"size": 5031,
		"path": "../public/icons.svg"
	},
	"/assets/account-Dcnc5c85.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3a1b-HSRh81Gw+h8cQsvUtz/g8qfr3yk\"",
		"mtime": "2026-08-15T18:58:00.194Z",
		"size": 14875,
		"path": "../public/assets/account-Dcnc5c85.js"
	},
	"/assets/avatar-Dn0-VCoP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a99-gc9dmFSNVybTNZXy1/sIASv/ndI\"",
		"mtime": "2026-08-15T18:58:00.196Z",
		"size": 2713,
		"path": "../public/assets/avatar-Dn0-VCoP.js"
	},
	"/assets/bank-operation.type-BRAbHIPJ.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"300-a5Cw3vcVuKyQuhmmdDTQHb1r3i0\"",
		"mtime": "2026-08-15T18:58:00.197Z",
		"size": 768,
		"path": "../public/assets/bank-operation.type-BRAbHIPJ.js"
	},
	"/assets/card-0l-4Roer.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"3bb-9qJfsYTImxcSLhu1OEAKjafrFOc\"",
		"mtime": "2026-08-15T18:58:00.198Z",
		"size": 955,
		"path": "../public/assets/card-0l-4Roer.js"
	},
	"/assets/cash-closing-BzEbVn-Q.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ab8-CnvGfvnprVdsv56rnyGJaqE/ncg\"",
		"mtime": "2026-08-15T18:58:00.207Z",
		"size": 2744,
		"path": "../public/assets/cash-closing-BzEbVn-Q.js"
	},
	"/assets/cash-session.type-D8acw9ZB.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"38d-7ku7pyekNrkVNvjfWqcwk8aY4Cc\"",
		"mtime": "2026-08-15T18:58:00.213Z",
		"size": 909,
		"path": "../public/assets/cash-session.type-D8acw9ZB.js"
	},
	"/assets/chevron-right-DEaqmTrR.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"82-0vmgD2f6ipB2F6iTBwa5AAZWATw\"",
		"mtime": "2026-08-15T18:58:00.216Z",
		"size": 130,
		"path": "../public/assets/chevron-right-DEaqmTrR.js"
	},
	"/assets/client-CT7N3jZf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"17a27-6zUaO1dcxRAcFzYTWpWexc73zDk\"",
		"mtime": "2026-08-15T18:58:00.217Z",
		"size": 96807,
		"path": "../public/assets/client-CT7N3jZf.js"
	},
	"/assets/client.type-BmU0XoC9.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"265-0ZImNmbn4eEW7hXodnrv+ndb7AU\"",
		"mtime": "2026-08-15T18:58:00.222Z",
		"size": 613,
		"path": "../public/assets/client.type-BmU0XoC9.js"
	},
	"/assets/createLucideIcon-BG5TsR8s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b083-bVU4f9NMc9Tb25YQ4Z4BIh6VjNo\"",
		"mtime": "2026-08-15T18:58:00.231Z",
		"size": 45187,
		"path": "../public/assets/createLucideIcon-BG5TsR8s.js"
	},
	"/assets/credit-DXHpnvVS.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9b-FYdFAJTk6WqbAkUao/corX1TEVs\"",
		"mtime": "2026-08-15T18:58:00.233Z",
		"size": 155,
		"path": "../public/assets/credit-DXHpnvVS.js"
	},
	"/assets/dashboard-CGyg1ZNW.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"8a-v0Btnl9OK3/pk7BtJ15r4+xXEUM\"",
		"mtime": "2026-08-15T18:58:00.235Z",
		"size": 138,
		"path": "../public/assets/dashboard-CGyg1ZNW.js"
	},
	"/assets/dashboard-DN5RCtJU.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ddb3-44xDKI+GP3houY6wrdXJuhSopCo\"",
		"mtime": "2026-08-15T18:58:00.246Z",
		"size": 56755,
		"path": "../public/assets/dashboard-DN5RCtJU.js"
	},
	"/assets/data-table-Dzj-AlBx.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c457-D9a8oNvKKO/SEBNPibE0BVgRzvQ\"",
		"mtime": "2026-08-15T18:58:00.248Z",
		"size": 50263,
		"path": "../public/assets/data-table-Dzj-AlBx.js"
	},
	"/assets/DialogTitle-BgWxO5lP.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"c185-wWrrsQ4TA4pGRIbmMSREaZ9N3jM\"",
		"mtime": "2026-08-15T18:58:00.186Z",
		"size": 49541,
		"path": "../public/assets/DialogTitle-BgWxO5lP.js"
	},
	"/assets/dist-A3ZrKWXl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"e78b-JljUsop+Sel6Q5IxSmoWTm5kSLc\"",
		"mtime": "2026-08-15T18:58:00.250Z",
		"size": 59275,
		"path": "../public/assets/dist-A3ZrKWXl.js"
	},
	"/assets/dist-BD-6iFU4.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"d9c-yLGey5lRGBnhKBpNU6fikVgBOFY\"",
		"mtime": "2026-08-15T18:58:00.251Z",
		"size": 3484,
		"path": "../public/assets/dist-BD-6iFU4.js"
	},
	"/assets/dist-DlxWjgyD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"810-iT7rdEgyYd580OPdjWl0/psHRDc\"",
		"mtime": "2026-08-15T18:58:00.255Z",
		"size": 2064,
		"path": "../public/assets/dist-DlxWjgyD.js"
	},
	"/assets/endpoints-HUKEib47.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"ae5-ToR5nexAO4lEBxE0yX22K/6QTcM\"",
		"mtime": "2026-08-15T18:58:00.269Z",
		"size": 2789,
		"path": "../public/assets/endpoints-HUKEib47.js"
	},
	"/assets/eye-BnRpb6D_.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"100-5QqtUduFaM+u2rOaf2rTrCgLdZU\"",
		"mtime": "2026-08-15T18:58:00.283Z",
		"size": 256,
		"path": "../public/assets/eye-BnRpb6D_.js"
	},
	"/assets/eye-off-CH-a-NX7.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1ae-m84chFu4WbgRqP5nrSO9jKNxl1I\"",
		"mtime": "2026-08-15T18:58:00.289Z",
		"size": 430,
		"path": "../public/assets/eye-off-CH-a-NX7.js"
	},
	"/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2": {
		"type": "font/woff2",
		"etag": "\"1cfc-yYSDXNlt/tTRaj6rJo8ZMqvY7pQ\"",
		"mtime": "2026-08-15T18:58:00.403Z",
		"size": 7420,
		"path": "../public/assets/geist-cyrillic-ext-wght-normal-DjL33-gN.woff2"
	},
	"/assets/field-DMn0QFHy.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"98f-gs7FvEvcJYgIhPBVBVWS4Y5Jdy0\"",
		"mtime": "2026-08-15T18:58:00.292Z",
		"size": 2447,
		"path": "../public/assets/field-DMn0QFHy.js"
	},
	"/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2": {
		"type": "font/woff2",
		"etag": "\"3aec-5kpQSZEtAzzU5kdiuro3Zr2YR54\"",
		"mtime": "2026-08-15T18:58:00.405Z",
		"size": 15084,
		"path": "../public/assets/geist-cyrillic-wght-normal-BEAKL7Jp.woff2"
	},
	"/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2": {
		"type": "font/woff2",
		"etag": "\"4080-mZu3Z7sOWqglha+kefNbUA9Pp+Q\"",
		"mtime": "2026-08-15T18:58:00.407Z",
		"size": 16512,
		"path": "../public/assets/geist-latin-ext-wght-normal-DC-KSUi6.woff2"
	},
	"/assets/geist-latin-wght-normal-BgDaEnEv.woff2": {
		"type": "font/woff2",
		"etag": "\"72d8-9J+D7/6th5UzRxIgoFX9awJv47A\"",
		"mtime": "2026-08-15T18:58:00.408Z",
		"size": 29400,
		"path": "../public/assets/geist-latin-wght-normal-BgDaEnEv.woff2"
	},
	"/assets/get-api-error-RK9VCSQV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"a59-eFgAfOo1aD1U4sCZZzWNps84g5A\"",
		"mtime": "2026-08-15T18:58:00.293Z",
		"size": 2649,
		"path": "../public/assets/get-api-error-RK9VCSQV.js"
	},
	"/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2": {
		"type": "font/woff2",
		"etag": "\"1f44-6MZ7/PEEOeDVF0eHI650KpwKQV8\"",
		"mtime": "2026-08-15T18:58:00.411Z",
		"size": 8004,
		"path": "../public/assets/geist-vietnamese-wght-normal-6IgcOCM7.woff2"
	},
	"/assets/index-BxLKJqjo.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"528a5-qMA0erNZtyrBjVP9xYv04w7N814\"",
		"mtime": "2026-08-15T18:58:00.184Z",
		"size": 338085,
		"path": "../public/assets/index-BxLKJqjo.js"
	},
	"/assets/input-nDZY5ELb.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"11bd-kCp8Z7KHXNFrpLeB4JfnnDRapKs\"",
		"mtime": "2026-08-15T18:58:00.295Z",
		"size": 4541,
		"path": "../public/assets/input-nDZY5ELb.js"
	},
	"/assets/jsx-runtime-Cx0BB4qO.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"440-7GwVHNgO4EUMk3cR4Bh6KGJPPX4\"",
		"mtime": "2026-08-15T18:58:00.296Z",
		"size": 1088,
		"path": "../public/assets/jsx-runtime-Cx0BB4qO.js"
	},
	"/assets/link-Y8B8CQTD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4bd5-31KbH6Hm716kNtIxL6iuGpV0abY\"",
		"mtime": "2026-08-15T18:58:00.303Z",
		"size": 19413,
		"path": "../public/assets/link-Y8B8CQTD.js"
	},
	"/assets/label-fi43IIfL.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"32c-yCRMRaQYjpkLW1jaPFEgnh8Ae7w\"",
		"mtime": "2026-08-15T18:58:00.297Z",
		"size": 812,
		"path": "../public/assets/label-fi43IIfL.js"
	},
	"/assets/Match-BXjnK-RE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1204-T+dQ6/WEtg2zGZq0Vs6XQRBRCus\"",
		"mtime": "2026-08-15T18:58:00.187Z",
		"size": 4612,
		"path": "../public/assets/Match-BXjnK-RE.js"
	},
	"/assets/matchContext-BS1nh9PE.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"be-woL9EY6L7dDmYZb1RUpk127qLIg\"",
		"mtime": "2026-08-15T18:58:00.316Z",
		"size": 190,
		"path": "../public/assets/matchContext-BS1nh9PE.js"
	},
	"/assets/me-BcM8F6iD.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"626f-XxtCRddJibjGiLYhu3TCsOKVB4w\"",
		"mtime": "2026-08-15T18:58:00.322Z",
		"size": 25199,
		"path": "../public/assets/me-BcM8F6iD.js"
	},
	"/assets/middleware-D_9skMxC.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"b4b-QZcybpgO4DqpClo6wYbR0CyaI2k\"",
		"mtime": "2026-08-15T18:58:00.327Z",
		"size": 2891,
		"path": "../public/assets/middleware-D_9skMxC.js"
	},
	"/assets/pagination.type-B3Dqmpeq.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2bfba-j5OHSW4rKU3DNKhNJShxkeQSWak\"",
		"mtime": "2026-08-15T18:58:00.329Z",
		"size": 180154,
		"path": "../public/assets/pagination.type-B3Dqmpeq.js"
	},
	"/assets/preload-helper-CRfK4cRY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"161e-b9JKm6pIMl64uxiXu4CZxWldwYU\"",
		"mtime": "2026-08-15T18:58:00.337Z",
		"size": 5662,
		"path": "../public/assets/preload-helper-CRfK4cRY.js"
	},
	"/assets/permission.store-BAxbSXP5.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"21f-bY/T/0vDDtdbMDAH177TM2IHbAI\"",
		"mtime": "2026-08-15T18:58:00.331Z",
		"size": 543,
		"path": "../public/assets/permission.store-BAxbSXP5.js"
	},
	"/assets/query-keys-BDYzWS8g.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"2719-Pz63Kz8RALVVETh4hv+YOJYqV9I\"",
		"mtime": "2026-08-15T18:58:00.342Z",
		"size": 10009,
		"path": "../public/assets/query-keys-BDYzWS8g.js"
	},
	"/assets/react-3BKWdGy3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1d67-7y5khacUeAI0naE7zvk9aPM2omk\"",
		"mtime": "2026-08-15T18:58:00.345Z",
		"size": 7527,
		"path": "../public/assets/react-3BKWdGy3.js"
	},
	"/assets/routes-CzduBwaI.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"10721-75txFw4CiHgqtRkzlcLGC6u/2+8\"",
		"mtime": "2026-08-15T18:58:00.347Z",
		"size": 67361,
		"path": "../public/assets/routes-CzduBwaI.js"
	},
	"/_redirects": {
		"type": "text/plain; charset=utf-8",
		"etag": "\"14-f2613ktzjsgwO/GeQwiyL93pflg\"",
		"mtime": "2026-07-19T16:12:53.301Z",
		"size": 20,
		"path": "../public/_redirects"
	},
	"/assets/separator-CXv6CjgK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26f-D3tEgk9svB1+kaNIg89KNFL7KlA\"",
		"mtime": "2026-08-15T18:58:00.348Z",
		"size": 623,
		"path": "../public/assets/separator-CXv6CjgK.js"
	},
	"/assets/shadowDom-BxtzNEUf.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"518-AUyXyVpx9XP7lFeZiZG8UGL6L+o\"",
		"mtime": "2026-08-15T18:58:00.349Z",
		"size": 1304,
		"path": "../public/assets/shadowDom-BxtzNEUf.js"
	},
	"/assets/skeleton-CmQ7MLX1.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"101-YiIzNoELpoYyJQW5k8OSF8b2sIA\"",
		"mtime": "2026-08-15T18:58:00.361Z",
		"size": 257,
		"path": "../public/assets/skeleton-CmQ7MLX1.js"
	},
	"/image.png": {
		"type": "image/png",
		"etag": "\"581b-OvrYqDCRCwB4AJYKg5A8Q6FPLNE\"",
		"mtime": "2026-08-14T18:22:36.018Z",
		"size": 22555,
		"path": "../public/image.png"
	},
	"/assets/textarea-BVljAJwe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"322-FypMoyNw2/kKaVWDKZNmU0cDJng\"",
		"mtime": "2026-08-15T18:58:00.369Z",
		"size": 802,
		"path": "../public/assets/textarea-BVljAJwe.js"
	},
	"/assets/table-DnWXC0ZT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"5e12-hUO1oH8FwHUWnv72Rkrdu7+/SRU\"",
		"mtime": "2026-08-15T18:58:00.365Z",
		"size": 24082,
		"path": "../public/assets/table-DnWXC0ZT.js"
	},
	"/assets/trash-2-DpE-gQKu.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"227-Wa/yLuQUYaTfmH+2xjQg0y4D3GY\"",
		"mtime": "2026-08-15T18:58:00.373Z",
		"size": 551,
		"path": "../public/assets/trash-2-DpE-gQKu.js"
	},
	"/assets/styles-D1X47J7F.css": {
		"type": "text/css; charset=utf-8",
		"etag": "\"185a5-OH9/Dc9R3/hMfEsnTTvc5/bs+To\"",
		"mtime": "2026-08-15T18:58:00.413Z",
		"size": 99749,
		"path": "../public/assets/styles-D1X47J7F.css"
	},
	"/assets/unauthorized-BLfAJfuX.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4a9-YxEzX8tDmY5HaVdDs4pqsnDjrpI\"",
		"mtime": "2026-08-15T18:58:00.377Z",
		"size": 1193,
		"path": "../public/assets/unauthorized-BLfAJfuX.js"
	},
	"/assets/usePositioner-Dme9d9ZV.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"4cb4-KsDXi5kmPhIpTTSIf+9qnUcGJdI\"",
		"mtime": "2026-08-15T18:58:00.379Z",
		"size": 19636,
		"path": "../public/assets/usePositioner-Dme9d9ZV.js"
	},
	"/assets/useMatch-DC5aJbVl.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"282-RIeiaGim+Q1Y+5H8kNZUcmVSl9w\"",
		"mtime": "2026-08-15T18:58:00.378Z",
		"size": 642,
		"path": "../public/assets/useMatch-DC5aJbVl.js"
	},
	"/assets/useQuery-CkWiujuY.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"29c-fM3+rQ+xrZ3WKHHL93wWjqOYMqI\"",
		"mtime": "2026-08-15T18:58:00.381Z",
		"size": 668,
		"path": "../public/assets/useQuery-CkWiujuY.js"
	},
	"/assets/useQuery.cash-session-DGtwxjvT.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"324-K9OLi9dOmjNmmLxyl2y9DqDzBbE\"",
		"mtime": "2026-08-15T18:58:00.385Z",
		"size": 804,
		"path": "../public/assets/useQuery.cash-session-DGtwxjvT.js"
	},
	"/assets/useQuery.account-DM4rMqlH.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"589-ieFK88Gba8QIPDw4sQe50oM5Xlg\"",
		"mtime": "2026-08-15T18:58:00.382Z",
		"size": 1417,
		"path": "../public/assets/useQuery.account-DM4rMqlH.js"
	},
	"/assets/useQuery.user-CpHIib0a.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"276-ya9kYJe/4sq8jmILzRF6sefORhM\"",
		"mtime": "2026-08-15T18:58:00.386Z",
		"size": 630,
		"path": "../public/assets/useQuery.user-CpHIib0a.js"
	},
	"/assets/user-Dp73vtBe.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"19ce-icLA/PCfse3QSKldipg1uy+ATPQ\"",
		"mtime": "2026-08-15T18:58:00.390Z",
		"size": 6606,
		"path": "../public/assets/user-Dp73vtBe.js"
	},
	"/assets/user.type-CTAVacKs.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"26d-Mvsr6A6EPwUiS5vg6r38y2g9BAw\"",
		"mtime": "2026-08-15T18:58:00.392Z",
		"size": 621,
		"path": "../public/assets/user.type-CTAVacKs.js"
	},
	"/assets/useStore-CfceB-8s.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"261-0EsNju1KJpnq4WYRcmqeqQVDp10\"",
		"mtime": "2026-08-15T18:58:00.388Z",
		"size": 609,
		"path": "../public/assets/useStore-CfceB-8s.js"
	},
	"/assets/view.credit-FYa7MVQj.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"1c45-RFxGtdBWVhLgGEhQZ5fbG3+ZB4I\"",
		"mtime": "2026-08-15T18:58:00.394Z",
		"size": 7237,
		"path": "../public/assets/view.credit-FYa7MVQj.js"
	},
	"/assets/with-selector-DAsWIm2d.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"6de-ASlANfXrOEuOiwIkTKnTIX0UR9A\"",
		"mtime": "2026-08-15T18:58:00.396Z",
		"size": 1758,
		"path": "../public/assets/with-selector-DAsWIm2d.js"
	},
	"/assets/x-CtyYzqWK.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"9a-zRCjRngpqR17JLwrRgmtx/U5YPU\"",
		"mtime": "2026-08-15T18:58:00.399Z",
		"size": 154,
		"path": "../public/assets/x-CtyYzqWK.js"
	},
	"/assets/_clientId-C7v2h2n0.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"15c3-toBp4b9rQyRTIhWmRtQsIe3uxPY\"",
		"mtime": "2026-08-15T18:58:00.189Z",
		"size": 5571,
		"path": "../public/assets/_clientId-C7v2h2n0.js"
	},
	"/assets/_clientId-DN45YD0U.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"127-NczhewZdWM9nCICbrXXyGKaUhzo\"",
		"mtime": "2026-08-15T18:58:00.191Z",
		"size": 295,
		"path": "../public/assets/_clientId-DN45YD0U.js"
	},
	"/favicon.svg": {
		"type": "image/svg+xml",
		"etag": "\"2532-P1u486agW3ymimJYHS3VvIiBLK8\"",
		"mtime": "2026-07-20T02:41:35.522Z",
		"size": 9522,
		"path": "../public/favicon.svg"
	},
	"/assets/_protected-CqX2RqU3.js": {
		"type": "text/javascript; charset=utf-8",
		"etag": "\"47-CskSI1QR8Az/f1e7xm7omlH7yt4\"",
		"mtime": "2026-08-15T18:58:00.192Z",
		"size": 71,
		"path": "../public/assets/_protected-CqX2RqU3.js"
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
	const $0 = {
		route: "/assets/**",
		rules: [{
			name: "headers",
			route: "/assets/**",
			handler: headers,
			options: { "cache-control": "public, max-age=31536000, immutable" }
		}]
	};
	return (m, p) => {
		let r = [];
		if (p.charCodeAt(p.length - 1) === 47) p = p.slice(0, -1);
		let s = p.split("/");
		if (s.length > 1 && s[s.length - 1] === "") {
			s.pop();
			p = p.slice(0, -1);
		}
		if (s.length > 1) {
			if (s[1] === "assets") r.push({
				data: $0,
				params: { "_": p.slice(8) }
			});
		}
		return r.reverse();
	};
})();
var _lazy_35f6Vv = defineLazyEventHandler(() => import("./_chunks/ssr-renderer.mjs"));
var findRoute = /* @__PURE__ */ (() => {
	const data = {
		route: "/**",
		handler: _lazy_35f6Vv
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
var _matchRouteRules;
function getRouteRules(method, pathname) {
	return (_matchRouteRules ??= memoizeRouteRulesMatcher(createMatcherFromFind(findRouteRules)))(method, pathname);
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
