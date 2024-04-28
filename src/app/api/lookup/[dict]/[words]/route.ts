export async function GET(
  request: Request,
  { params }: { params: { dict: string; words: string } }
) {
  const { dict, words } = params;
  const url = `http://localhost:8080/api/lookup?dict=${dict}&words=${words}`;
  const res = await fetch(url);
  const data = await res.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
