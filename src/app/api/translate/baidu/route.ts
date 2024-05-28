import { NextRequest } from "next/server";
import EventSource from "eventsource";
import baidu_translate from "baidu-translate-api";

export async function POST(request: NextRequest) {
  const { from, to, text } = await request.json();
  console.log(from, to, text);
  try {
    const res = await baidu_translate(text, {
      from: from,
      to: to,
    });
    console.log(res);
    return new Response(JSON.stringify(res), {
      status: 200,
      headers: {
        "Content-type": "application/json",
      },
    });
  } catch (error) {
    console.log(error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: {
        "Content-type": "application/json",
      },
    });
  }
  //   const url = "https://fanyi.baidu.com/ait/text/translate";
  //   const data = {
  //     query: text,
  //     from: "zh",
  //     to: to,
  //     reference: "",
  //     corpusIds: [],
  //     qcSettings: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11"],
  //     needPhonetic: true,
  //     domain: "common",
  //     milliTimestamp: new Date().getTime(),
  //   };
  //   const requestOptions = {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //       Accept: "text/event-stream",
  //       Host: "fanyi.baidu.com",
  //       Origin: "https://fanyi.baidu.com",
  //       "User-Agent":
  //         "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36",
  //       Cookie: `BAIDUID=E4843D4BCAE90F197D4D62C47599389A:FG=1; BAIDUID_BFESS=E4843D4BCAE90F197D4D62C47599389A:FG=1; RT="z=1&dm=baidu.com&si=94533fbf-460c-4f16-a32a-622735b87eda&ss=lwp6281x&sl=2&tt=3w3&bcn=https%3A%2F%2Ffclog.baidu.com%2Flog%2Fweirwood%3Ftype%3Dperf&ld=4j3c`,
  //       "Acs-Token": `1716811257687_1716826545342_yHeZbUmxCpM/XDcnABgFIFwnLPoSS76/R5/i29+xPFbKy/kaCYwVMk5RVlvrBLcHHUYHBK4dUYhMiGeHMi6uZOxjD1s+Qjtju3Znk+ynT7B3TotmNWTyf4AdiDv/cSZapT2/2D8n6b7owzTB/2pugemnhKga+L+7kouwN0JqzyrW3FWm4RPcJNh7/d+xeL1z0su/tIbCXFP9YkK1WHoBp8qXf7m79F+rD/Vf1zvjO9InT5m6i4sh0JBsxfRGIDCvZzeJlS68GFu/kUqnaH+g7xw5Du43kyjsKT+bMkYlqVUSaP9AetZ/u1PLYWv1sig6d5TJnuPkVyLcqEq9GwxGP77JPo3mlCnM7HInJoBS/1wOyesHcHCiD3kKwysqdDkzK38OXw5DXHLJPRDX+N25fHh5SqTGtM8FFcLLSdema6VOXl0gCLXMb3b2vbbFYWAarURLdV31oy6RK2HZy7q7vA/sEDBvq8C+EWIyD+oaFInC1ld+eZewa4MLfKqdy5LMoSLAiWa314p90FLqKFDSFA==`,
  //     },
  //     body: JSON.stringify(data),
  //   };

  //   try {
  //     const response = await fetch(url, requestOptions);
  //     if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
  //     const text = await response.text();
  //     console.log(text);
  //     const dt = text.split("\n\n")[2].split("\n")[1];
  //     const json = JSON.parse(dt.slice(dt.indexOf("{"), dt.lastIndexOf("}") + 1));
  //     console.log(json);
  //     const translatedTexts = json.data.list
  //       .map((item: any) => item.dst)
  //       .join("\n");

  //     // console.log(JSON.parse(translatedText));
  //     return new Response(translatedTexts, {
  //       status: 200,
  //       headers: {
  //         "Content-type": "text/plain",
  //       },
  //     });
  //   } catch (error) {
  //     console.error("Error:", error);
  //   }
}
