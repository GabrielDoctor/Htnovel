import { TransOption } from "@/app/ui/contexts/SettingContext";
import { languages_google, languages_baidu } from "@/app/ui/parts/SettingModel";

async function translateBing(originalString, from = "", to = "vi") {
  let trans_doc;
  let auth_res = await fetch("https://edge.microsoft.com/translate/auth");
  if (auth_res.ok) {
    let accessToken = await auth_res.text();
    const url1 = `https://api.cognitive.microsofttranslator.com/translate?from=${from}&to=${to}&api-version=3.0&textType=html&includeSentenceLength=true`;
    const settings = {
      method: "POST",
      headers: {
        Authorization: "Bearer " + accessToken,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          Text: originalString,
        },
      ]),
    };
    let doc2 = await fetch(url1, settings);
    if (doc2.ok) {
      let doc2a = await doc2.json();
      trans_doc = doc2a[0].translations[0].text;
    }
  }
  return trans_doc;
}

// async function translateBaidu(
//   originalString: string,
//   from: string = "auto",
//   to: string = "vie"
// ) {
//   to = languages_baidu[languages_google[to]] || to;
//   const res = await fetch(`http://localhost:3000/api/translate/baidu`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       from: from,
//       to: to,
//       text: originalString,
//     }),
//   });
//   const data = await res.text();
//   return data;
// }

export async function translateGoogle(
  originalString,
  from = "auto",
  to = "vi"
) {
  // const lines = originalString.split("\n");
  // const result: string[] = [];
  // for (let line of lines) {
  // let str = "";
  const res = await fetch(
    `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${to}&dt=t&q=${originalString}`,
    {
      method: "POST",
    }
  );
  setTimeout(() => {}, 1000);
  const data = await res.json();
  const translations = getAllTranslationsGoogle(data);
  //   for (const sentence of data[0]) {
  //     console.log(sentence[0]);
  //   }
  //   result.push(str);
  // }
  // console.log(result);
  return translations.join("\n");
}

async function translateGpt(originalString, from = "auto", to = "vi") {
  const res = await fetch(`/api/translate/gpt`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: from,
      to: languages_google[to] || "vietnamese",
      text: originalString,
    }),
  });
  const data = await res.json();
  return data.translated_text;
}

async function translateBaidu(originalString, from = "zh", to = "en") {
  to = googleToBaiduMap[to] || to;
  let a = await fetch(
    "https://cors.moldich.eu.org/?q=https://fanyi.baidu.com/ait/text/translate",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query: originalString,
        from: "zh",
        to: to,
        reference: "",
        corpusIds: [],
        qcSettings: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
        domain: "common",
      }),
    }
  );
  let e = await a.text();
  return getTranslatingJson(e.split("\n"))
    .data.list.map((t) => t.dst)
    .join("\n");
}
function getTranslatingJson(t) {
  for (let n = 0; n < t.length; n++)
    if (
      t[n].includes("event: message") &&
      t[n + 1].includes('event":"Translating"')
    ) {
      let a = JSON.parse(t[n + 1].replace("data: ", ""));
      return a;
    }
  return null;
}

async function translateSTV(originalString) {
  const res = await fetch(`/api/translate/stv`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: originalString,
    }),
  });
  const data = await res.text();
  return data;
}

async function translateGptChivi(originalString) {
  const res = await fetch(`/api/translate/gpt_chivi`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      text: originalString,
    }),
  });
  const data = await res.text();
  return data;
}

export async function translate(
  originalString,
  to = "",
  from = "",
  option = TransOption.Bing
) {
  switch (option) {
    case TransOption.Bing:
      return translateBing(originalString, from, to);
    case TransOption.Baidu:
      return translateBaidu(originalString, from, to);
    case TransOption.Gpt:
      return translateGpt(originalString, from, to);
    case TransOption.Google:
      return translateGoogle(originalString, from, to);
    case TransOption.STV:
      return translateSTV(originalString);
    case TransOption.GPT_CHIVI:
      return translateGptChivi(originalString);
    default:
      throw new Error("Unsupported translation service");
  }
}
