const getAllTokenInLine = (span: HTMLSpanElement) => {
  let parent = span.parentElement;
  if (!parent) return null;
  return Array.from(parent.querySelectorAll("span"));
};

const getAllZhInLine = (span: HTMLSpanElement) => {
  if (!span) return null;
  let tokens: string[] = [];
  getAllTokenInLine(span)?.forEach((token) => {
    let toks = token.getAttribute("zh")?.split("");
    if (toks) tokens = [...tokens, ...toks];
  });

  return tokens;
};

const addFocusStyle = (spans: HTMLSpanElement[]) => {
  spans.forEach((span) => {
    span.classList.add("bg-red-400");
    span.classList.add("rounded-lg");
    span.classList.add("p-1");
  });
};

const clearAllLineFocusStyle = (span: HTMLSpanElement[]) => {
  span.forEach((token) => {
    token.classList.remove("bg-red-400");
    token.classList.remove("rounded-lg");
    token.classList.remove("p-1");
  });
};

export {
  getAllTokenInLine,
  getAllZhInLine,
  clearAllLineFocusStyle,
  addFocusStyle,
};
